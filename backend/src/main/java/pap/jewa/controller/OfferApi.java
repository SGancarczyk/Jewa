package pap.jewa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pap.jewa.offer.*;
import pap.jewa.user.User;
import pap.jewa.vehicle.VehicleType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/offers")
@RequiredArgsConstructor
public class OfferApi {

    private final OfferRepository offerRepository;
    private final OfferImageRepository imageRepository;

    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    @PostMapping("/get_offers")
    public ResponseEntity<List<Offer>> getOffers(@RequestBody OfferSearchRequest request) {
        int pageNum = request.getPage();
        int limit = request.getLimit();

        int year = request.getYear();
        String make = request.getMake();
        String model = request.getModel();
        VehicleType vehicleType = request.getVehicleType();

        if (limit <= 0) limit = 40;
        if (pageNum < 0) pageNum = 0;

        Pageable pageable = PageRequest.of(pageNum, limit, Sort.by("createdAt").descending());

        Specification<Offer> spec = Specification.allOf(
                OfferSpecifications.hasId(request.getId()),
                OfferSpecifications.hasProductionYear(request.getYear()),
                OfferSpecifications.hasModel(request.getModel()),
                OfferSpecifications.hasMake(request.getMake()),
                OfferSpecifications.hasVehicleType(request.getVehicleType())
        );

        Page<Offer> page = offerRepository.findAll(spec, pageable);

        return ResponseEntity.ok(page.getContent());
    }

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        offer.setOwner(currentUser);
        return ResponseEntity.ok(offerRepository.save(offer));
    }

    @PostMapping(value = "/{id}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offer not found"));

        // Ensure file is not empty
        if (file.isEmpty()) return ResponseEntity.badRequest().body("File is empty");

        // Validate file type
        String contentType = file.getContentType();
        List<String> allowedTypes = List.of("image/jpeg", "image/png", "image/jpg");
        if (contentType == null || !allowedTypes.contains(contentType.toLowerCase())) {
            return ResponseEntity.status(403).body("Invalid file type. Only JPG/PNG allowed.");
        }

        // Ensure dir uploads exists.
        if (!Files.exists(fileStorageLocation)) {
            Files.createDirectories(fileStorageLocation);
        }

        // Generate unique name
        String originalFileName = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFileName!= null && originalFileName.contains(".")) {
            fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        // Copy image to hard drive
        Path targetLocation = fileStorageLocation.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Save file info to database
        OfferImage image = OfferImage.builder()
                .fileName(uniqueFileName)
                .contentType(file.getContentType())
                .isMain(offer.getImages().isEmpty())
                .offer(offer)
                .build();

        imageRepository.save(image);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {
        return offerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/images/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                String contentType = Files.probeContentType(filePath);
                if(contentType == null) contentType = "application/octet-stream";

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOffer(@PathVariable Long id, @RequestBody Offer req) {
        return offerRepository.findById(id).map(offer -> {
            // Aktualizujemy to, co ważne:
            offer.setTitle(req.getTitle());
            offer.setDescription(req.getDescription());
            offer.setPricePerDay(req.getPricePerDay());
            offer.setActive(req.isActive());
            offer.setCity(req.getCity());
            offer.setAddress(req.getAddress());
            offerRepository.save(offer);
            return ResponseEntity.ok(offer);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffer(@PathVariable Long id) {
        if (!offerRepository.existsById(id)) return ResponseEntity.notFound().build();
        offerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Long imageId) {
        return imageRepository.findById(imageId).map(img -> {
            try { Files.deleteIfExists(fileStorageLocation.resolve(img.getFileName())); }
            catch (IOException e) { e.printStackTrace(); }

            imageRepository.delete(img);
            return ResponseEntity.noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
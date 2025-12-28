package pap.jewa.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pap.jewa.vehicle.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleApi {
    private final MakeRepository makeRepo;
    private final ModelRepository modelRepo;

    @PostMapping("get_makes")
    public ResponseEntity<List<Make>> getMakes() {
        List<Make> makes = makeRepo.findAll();

        return ResponseEntity.ok(makes);
    }

    @PostMapping("get_models")
    public ResponseEntity<List<Model>> getMakes(@RequestBody ModelsSearchRequest request) {
        String makeName = request.getMake();
        Make make = makeRepo.findByName(makeName)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Make does not exist"));

        List<Model> models = modelRepo.findByMake(make);

        return ResponseEntity.ok(models);
    }
}

package pap.jewa.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import pap.jewa.offer.Offer;
import pap.jewa.offer.OfferRepository;
import pap.jewa.user.User;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final PendingReservationRepository pendingReservationRepository;
    private final OfferRepository offerRepository;

    void checkOverlap (PendingReservation pending) {
        Long overlapping = reservationRepository.countOverlappingReservations(
                pending.getOffer().getId(),
                pending.getStartDate(),
                pending.getEndDate()
        );
        if (overlapping > 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Offer already reserved for these dates");
        }
    }

    void processPayment (String cardToken) {
        /* @TODO */
        /* Should store info about the payment in the database */
        /* Should raise error on failure */
    }

    public PendingReservation requestReservation (PendingReservationRequest request, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No start date or end date");
        }
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date is larger than end date");
        }
        if (request.getCardToken() == null || request.getCardToken().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Card token is empty");
        }
        if (request.getCardLast4Digits() == null || request.getCardLast4Digits().length() != 4) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Card last 4 digits are not valid");
        }

        /* @TODO: Validate card token */

        Offer offer;
        try {
            offer = offerRepository.findById(request.getOfferId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Offer not found"));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Offer not found");
        }

        if (offer.getOwner().equals(currentUser)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Owner cannot request a reservation for his own offer");
        }

        PendingReservation pending = PendingReservation.builder()
                .user(currentUser)
                .offer(offer)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .cardToken(request.getCardToken())
                .cardLast4Digits(request.getCardLast4Digits())
                .build();

        checkOverlap(pending);

        try {
            pendingReservationRepository.save(pending);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid reservation request");
        }

        return pending;
    }

    public Reservation acceptPendingReservation(Long pendingReservationId, Authentication authentication)
            throws ResponseStatusException {

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        var pending = pendingReservationRepository.findById(pendingReservationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pending reservation not found"));

        if (!pending.getOffer().getOwner().equals(currentUser)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Offer does not belong to this user");
        }

        checkOverlap(pending);

        processPayment(pending.getCardToken());

        Reservation reservation = Reservation.builder()
                .offer(pending.getOffer())
                .user(pending.getUser())
                .startDate(pending.getStartDate())
                .endDate(pending.getEndDate())
                .build();

        reservationRepository.save(reservation);
        pendingReservationRepository.delete(pending);

        return reservation;
    }

    public void declinePendingReservation(Long pendingReservationId, Authentication authentication)
            throws ResponseStatusException {

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        var pending = pendingReservationRepository.findById(pendingReservationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pending reservation not found"));

        if (!pending.getOffer().getOwner().equals(currentUser)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Offer does not belong to this user");
        }

        /* @TODO: Send email to the user who requested reservation */
        /* @TODO: Close credit card token */

        pendingReservationRepository.delete(pending);
    }

    public List<PendingReservation> getPendingReservations(Long offerId, Authentication authentication)
            throws ResponseStatusException {

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        var offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Offer not found"));
        if (!offer.getOwner().equals(currentUser)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Offer does not belong to this user");
        }

        Specification<PendingReservation> spec = Specification.allOf(
                PendingReservationSpecifications.hasOwner(currentUser),
                PendingReservationSpecifications.hasOfferId(offerId)
        );

        return pendingReservationRepository.findAll(spec);
    }

    public List<PendingReservation> getUsersPendingReservations(Authentication authentication)
            throws ResponseStatusException {

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Specification<PendingReservation> spec = Specification.allOf(
                PendingReservationSpecifications.hasOwner(currentUser)
        );

        return pendingReservationRepository.findAll(spec);
    }

    public List<Reservation> getReservations(Long offerId)
            throws ResponseStatusException {


        Specification<Reservation> spec = Specification.allOf(
                ReservationSpecifications.hasOfferId(offerId)
        );

        return reservationRepository.findAll(spec);
    }

    public List<Reservation> getUsersReservations(Authentication authentication)
            throws ResponseStatusException {

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Specification<Reservation> spec = Specification.allOf(
                ReservationSpecifications.hasUser(currentUser)
        );

        return reservationRepository.findAll(spec);
    }

    public List<PendingReservation> getUsersRequestedReservations(Authentication authentication)
            throws ResponseStatusException {

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        Specification<PendingReservation> spec = Specification.allOf(
                PendingReservationSpecifications.hasUser(currentUser)
        );

        return pendingReservationRepository.findAll(spec);
    }
}


package pap.jewa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pap.jewa.reservation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
public class ReservationApi {

    private final ReservationService reservationService;

    @PostMapping("/request")
    public ResponseEntity<PendingReservation> requestReservation(
            @RequestBody PendingReservationRequest request,
            Authentication authentication
    ) {

        var reservation = reservationService.requestReservation(request, authentication);

        return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
    }

    @PostMapping("/accept/{pendingReservationId}")
    public ResponseEntity<Reservation> acceptReservation(
            @PathVariable Long pendingReservationId,
            Authentication authentication
    ) {
        var reservation = reservationService.acceptPendingReservation(pendingReservationId, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
    }

    @PostMapping("/decline/{pendingReservationId}")
    public ResponseEntity<String> declineReservation(
            @PathVariable Long pendingReservationId,
            Authentication authentication
    ) {
        reservationService.declinePendingReservation(pendingReservationId, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body("Reservation has been declined successfully");
    }

    @PostMapping("/get_pending/{offerId}")
    public ResponseEntity<List<PendingReservation>> getPendingReservation(
            @PathVariable Long offerId,
            Authentication authentication
    ) {
        var reservations = reservationService.getPendingReservations(offerId, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservations);
    }

    @PostMapping("/get_reservations/{offerId}")
    public ResponseEntity<List<Reservation>> getPendingReservation(
            @PathVariable Long offerId
    ) {
        if (offerId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Offer Id must be specified");
        }
        var reservations = reservationService.getReservations(offerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservations);
    }
}

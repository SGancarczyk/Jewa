package pap.jewa.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PendingReservationRequest {
    private Long offerId;

    private LocalDate startDate;

    private LocalDate endDate;

    private String cardToken;

    private String cardLast4Digits;
}

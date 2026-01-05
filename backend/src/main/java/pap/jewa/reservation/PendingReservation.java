package pap.jewa.reservation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import pap.jewa.offer.Offer;
import pap.jewa.user.User;

import java.time.LocalDate;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pending_reservations")
public class PendingReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offer_id", nullable = false)
    private Offer offer;

    @JoinColumn(name = "start_date", nullable = false)
    private LocalDate startDate;

    @JoinColumn(name = "end_date", nullable = false)
    private LocalDate endDate;

    /* On accepting the reservation money will be
     * processed charged from the given credit card
     * */
    @JoinColumn(name = "card_token", nullable = false)
    @JsonIgnore
    private String cardToken;           // Token from payment gateway

    @JoinColumn(name = "card_last_4_digits", nullable = false)
    private String cardLast4Digits;     // Last 4 digits for display
}
package pap.jewa.reservation;

import org.springframework.data.jpa.domain.Specification;

public class ReservationSpecifications {

    public static Specification<Reservation> hasOfferId(Long offerId) {
        return (root, query, cb) ->
                offerId == null
                        ? null
                        : cb.equal(root.get("offer").get("id").as(Long.class), offerId);
    }
}

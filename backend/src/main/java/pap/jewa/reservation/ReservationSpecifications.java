package pap.jewa.reservation;

import org.springframework.data.jpa.domain.Specification;
import pap.jewa.user.User;

public class ReservationSpecifications {

    public static Specification<Reservation> hasOfferId(Long offerId) {
        return (root, query, cb) ->
                offerId == null
                        ? null
                        : cb.equal(root.get("offer").get("id").as(Long.class), offerId);
    }

    public static Specification<Reservation> hasUser(User user) {
        return (root, query, cb) ->
                user == null
                        ? null
                        : cb.equal(root.get("user"), user);
    }
}

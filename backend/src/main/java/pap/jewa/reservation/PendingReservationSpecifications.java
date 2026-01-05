package pap.jewa.reservation;

import org.springframework.data.jpa.domain.Specification;
import pap.jewa.user.User;

public class PendingReservationSpecifications {

    public static Specification<PendingReservation> hasOwner(User owner) {
        return (root, query, cb) ->
                owner == null
                        ? null
                        : cb.equal(root.get("offer").get("owner"), owner);
    }

    public static Specification<PendingReservation> hasOfferId(Long offerId) {
        return (root, query, cb) ->
                offerId == null
                        ? null
                        : cb.equal(root.get("offer").get("id").as(Long.class), offerId);
    }
}

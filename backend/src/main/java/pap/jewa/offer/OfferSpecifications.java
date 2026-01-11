package pap.jewa.offer;

import org.springframework.data.jpa.domain.Specification;
import pap.jewa.offer.Offer;
import pap.jewa.vehicle.VehicleType;

public class OfferSpecifications {

    public static Specification<Offer> hasProductionYear(Integer year) {
        return (root, query, cb) ->
                (year == null || year == 0)
                        ? null
                        : cb.equal(root.get("productionYear"), year);
    }

    public static Specification<Offer> hasModel(String model) {
        return (root, query, cb) ->
                (model == null || model.isBlank())
                        ? null
                        : cb.equal(root.get("model").get("name"), model);
    }

    public static Specification<Offer> hasMake(String make) {
        return (root, query, cb) ->
                (make == null || make.isBlank())
                        ? null
                        : cb.equal(root.get("model").get("make").get("name"), make);
    }

    public static Specification<Offer> hasVehicleType(VehicleType type) {
        return (root, query, cb) ->
                type == null
                        ? null
                        : cb.equal(root.get("vehicleType"), type);
    }

    public static Specification<Offer> hasId(Long id) {
        return (root, query, cb) -> (id == null) ? null : cb.equal(root.get("id"), id);
    }
}

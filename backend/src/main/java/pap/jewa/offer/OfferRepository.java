package pap.jewa.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pap.jewa.vehicle.Make;
import pap.jewa.vehicle.Model;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
}
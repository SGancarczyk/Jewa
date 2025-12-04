package pap.jewa.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferImageRepository extends JpaRepository<OfferImage, Long> {
}
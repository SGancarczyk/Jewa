package pap.jewa.offer;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    Page<Offer> findByProductionYear(int year, Pageable pageable);
    Page<Offer> findByModel_Name(String model, Pageable pageable);
    Page<Offer> findByProductionYearAndModel_Name(int year, String model, Pageable pageable);
    Page<Offer> findByModel_Make_name(String make, Pageable pageable);
    Page<Offer> findByProductionYearAndModel_Make_name(int year, String make, Pageable pageable);

    Page<Offer> findAll(Specification<Offer> spec, Pageable pageable);
}
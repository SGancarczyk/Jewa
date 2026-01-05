package pap.jewa.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ReservationRepository
        extends JpaRepository<Reservation, Long>,
        JpaSpecificationExecutor<Reservation> {
    @Query("""
        SELECT COUNT(r)
        FROM Reservation r
        WHERE r.offer.id = :offerId
          AND r.startDate <= :pendingEndDate
          AND r.endDate >= :pendingStartDate
    """)
    Long countOverlappingReservations(
            @Param("offerId") Long offerId,
            @Param("pendingStartDate") LocalDate pendingStartDate,
            @Param("pendingEndDate") LocalDate pendingEndDate
    );
}
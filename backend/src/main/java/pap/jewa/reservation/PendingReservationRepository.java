package pap.jewa.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingReservationRepository
        extends JpaRepository<PendingReservation, Long>,
        JpaSpecificationExecutor<PendingReservation> {}

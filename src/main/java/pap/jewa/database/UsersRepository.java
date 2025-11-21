package pap.jewa.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

    // Find a user by username (already included)
    Optional<Users> findByUsername(String username);

    Optional<Users> findByEmail(String email);

    List<Users> findAll();
}

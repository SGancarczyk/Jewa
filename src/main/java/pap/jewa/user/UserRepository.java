package pap.jewa.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Find a user by username (already included)
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findAll();
}

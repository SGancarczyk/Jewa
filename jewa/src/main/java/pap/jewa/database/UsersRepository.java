package pap.jewa.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

    // Find a user by username (already included)
    Users findByUsername(String username);

    // Find all users with a specific first name
    List<Users> findByFirstName(String firstName);

    // Find all users with a specific last name
    List<Users> findByLastName(String lastName);

    // Find all users whose username contains a substring
    List<Users> findByUsernameContaining(String keyword);

    // Check if a username exists
    boolean existsByUsername(String username);
}

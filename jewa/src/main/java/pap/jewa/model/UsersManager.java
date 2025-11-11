package pap.jewa.model;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import pap.jewa.database.Users;
import pap.jewa.database.UsersRepository;
import java.util.List;

@Service
public class UsersManager {

    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll(); // provided by JpaRepository
    }

    public Users getUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public List<Users> getUsersByFirstName(String firstName) {
        return usersRepository.findByFirstName(firstName);
    }

    public boolean usernameExists(String username) {
        return usersRepository.existsByUsername(username);
    }

    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    public void deleteUser(Users user) {
        usersRepository.delete(user);
    }
}

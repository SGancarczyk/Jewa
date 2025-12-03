package pap.jewa.user;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User findOrCreateOAuthUser(
            String username, String email, String firstName, String LastName
    ) {
        return userRepository.findByUsername(username)
                .orElseGet(() -> {
                    String randomPassword = UUID.randomUUID().toString();
                    randomPassword = passwordEncoder.encode(randomPassword);
                    User user = User.builder()
                            .username(username)
                            .firstName(firstName)
                            .lastName(LastName)
                            .email(email)
                            .authProvider(AuthProvider.GOOGLE)
                            .role(Role.USER)
                            .password(randomPassword)
                            .build();

                    return userRepository.save(user);
                });
    }
}

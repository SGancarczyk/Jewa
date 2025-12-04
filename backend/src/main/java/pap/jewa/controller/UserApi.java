package pap.jewa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pap.jewa.user.UserInfo;
import pap.jewa.user.UserRepository;
import pap.jewa.user.User;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserApi {

    private final UserRepository repository;

    @PostMapping("get_info")
    public ResponseEntity<UserInfo> getInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Unexpected error"));

        UserInfo userInfo = new UserInfo(user);

        return ResponseEntity.ok(userInfo);
    }

}

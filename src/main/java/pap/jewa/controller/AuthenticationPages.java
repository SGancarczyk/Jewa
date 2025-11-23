package pap.jewa.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationPages {

    @RequestMapping("login")
    public String login(Model model) {
        return "login";
    }

    @RequestMapping("register")
    public String register(Model model) {
        return "register";
    }
}

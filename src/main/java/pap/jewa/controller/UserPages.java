package pap.jewa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pap.jewa.user.UserRepository;

@Controller
@RequestMapping("/user")
public class UserPages {

    @Autowired
    private UserRepository usersRepository;

    @RequestMapping("/profile")
    public String index(Model model) {
        return "profile";
    }
}

package pap.jewa.controller;

import pap.jewa.database.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import pap.jewa.database.UsersRepository;

import java.util.List;

@Controller
public class ShowUsers {

    @Autowired
    private UsersRepository usersRepository;

    @RequestMapping("/users")
    public String index(Model model) {

        // Fetch all users
        List<Users> users = usersRepository.findAll();

        // Add users to the model so Thymeleaf can use them
        model.addAttribute("users", users);

        return "users"; // note: Thymeleaf automatically adds .html
    }
}

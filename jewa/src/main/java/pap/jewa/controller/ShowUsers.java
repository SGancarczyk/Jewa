package pap.jewa.controller;

import pap.jewa.model.UsersManager;
import pap.jewa.database.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class ShowUsers {

    @Autowired
    private UsersManager usersManager;

    @RequestMapping("/users")
    public String index(Model model) {

        // Fetch all users
        List<Users> users = usersManager.getAllUsers();

        // Add users to the model so Thymeleaf can use them
        model.addAttribute("users", users);

        return "users"; // note: Thymeleaf automatically adds .html
    }
}

package pap.jewa.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Home {

    // Inject application name from application.properties
    @Value("${spring.application.name}")
    private String appName;

    @RequestMapping("/")
    public String index(Model model) {
        // Add the app name to the model so the view can access it
        model.addAttribute("appName", appName);

        // Return the view name (Thymeleaf will resolve index.html)
        return "index";
    }
}

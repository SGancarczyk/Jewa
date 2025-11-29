package pap.jewa.security.oauth2;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import pap.jewa.security.JwtService;
import pap.jewa.user.User;
import pap.jewa.user.UserService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String googleId   = oAuth2User.getAttribute("sub");            // unique, stable ID
        String email      = oAuth2User.getAttribute("email");
        String firstName  = oAuth2User.getAttribute("given_name");
        String lastName   = oAuth2User.getAttribute("family_name");
        /* String pictureUrl = oAuth2User.getAttribute("picture"); */


        User user = userService.findOrCreateOAuthUser(
                googleId,
                email,
                firstName,
                lastName
        );

        // generate JWT
        String jwtToken = jwtService.generateToken(user);

        response.sendRedirect("/?token=" + jwtToken);
    }
}


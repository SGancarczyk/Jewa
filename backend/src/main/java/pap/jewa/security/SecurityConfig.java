package pap.jewa.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthentificationFilter jwtAuthFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(
                        authReq -> authReq
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/user/**").hasRole("USER")
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/offers/images/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/offers/get_offers").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/offers/count").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/vehicles/get_makes").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/vehicles/get_models").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/offers")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/offers/*/images")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/offers/{id}").permitAll()
                                .requestMatchers(HttpMethod.PUT, "/api/offers/update/{id}")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/offers/delete/{id}")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/offers/images/**")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/reservation/request")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/reservation/accept/*")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/reservation/decline/*")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/reservation/get_pending/*")
                                    .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/reservation/get_pending")
                                .hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/reservation/get_reservations/*").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/reservation/get_reservations")
                                    .hasAnyRole("USER", "ADMIN")
                                .anyRequest().hasRole("ADMIN")
                )
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

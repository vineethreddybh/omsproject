package com.example.omsproject.controller;

import com.example.omsproject.entity.User;
import com.example.omsproject.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:8080", allowCredentials = "true") // change port if needed
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Signup: POST /auth/signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Signup successful");
    }

    // ✅ Signin: POST /auth/signin
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody User user, HttpSession session) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            session.setAttribute("username", existingUser.get().getUsername());
            session.setAttribute("userId", existingUser.get().getId());  // <-- store user ID here!

            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // ✅ Logout: POST /auth/logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }

    // (Optional) ✅ Check session: GET /auth/check
    @GetMapping("/check")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            return ResponseEntity.ok("Logged in as " + username);
        } else {
            return ResponseEntity.status(401).body("Not logged in");
        }
    }
}

package org.example.user_web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserWebApplication {

    private static final Logger log = LoggerFactory.getLogger(UserWebApplication.class);

    public static void main(String[] args) {

        SpringApplication.run(UserWebApplication.class, args);
        log.info("User Web Application started successfully.");
    }

}

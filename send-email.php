<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validate the email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    // Email subject
    $subject = "Contact Form Submission: " . $name;

    // Email content
    $body = "You have received a new message from your website contact form.\n\n".
            "Name: $name\n".
            "Email: $email\n".
            "Message:\n$message";

    // My email address
    $to = "yusufabdulgafar123@gmail.com"; 

    // Send email
    if (mail($to, $subject, $body, "From: $email")) {
        echo "Message sent successfully!";
    } else {
        echo "Message failed to send.";
    }
}
?>

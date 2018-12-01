<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
With sessions you can allow your client's authentication information to persist using cookies so that they can access the server without having to check credentials every time they navigate from page to page.


2. What does bcrypt do to help us store passwords in a secure manner.
bcrypt allows us to hash client passwords before storing them in the server encrypting the password using hashes with a admin-designated number of rounds of hashes.


3. What does bcrypt do to slow down attackers?
The longer and more diverse a password the the longer it will take an attacker to decode it. Typically if they see that the hashes used are hashed a large enough number of times they'll simply go find easier prey, knowing that the hash system will be very difficult to crack.


4. What are the three parts of the JSON Web Token?
header, payload, signature

function showRegistration() {
    document.getElementById("loginWrapper").style.display = "none";
    document.getElementById("registerWrapper").style.display = "block";
    document.getElementById("forgotPasswordWrapper").style.display = "none";
  }
  
  function showLogin() {
    document.getElementById("loginWrapper").style.display = "block";
    document.getElementById("registerWrapper").style.display = "none";
    document.getElementById("forgotPasswordWrapper").style.display = "none";
  }
  
  function login() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
  
    if (!username || !password) {
      alert("Incorrect username or password. Please enter both.");
      return;
    }
  
    // Check if user exists in localStorage
    var storedUser = localStorage.getItem(username);
  
    if (storedUser) {
      var user = JSON.parse(storedUser);
      if (user.password === password) {
        alert("Login successful!");
        // Redirect to the typing text
        window.location.href = "index.html";
      } else {
        alert("Incorrect password. Please try again.");
      }
    } else {
      alert("User not found. Please register.");
    }
  }
  
  function register() {
    var email = document.getElementById("registerEmail").value;
    var username = document.getElementById("registerUsername").value;
    var password = document.getElementById("registerPassword").value;
  
    if (!email || !username || !password) {
      alert("Please enter email, username, and password to register.");
      return;
    }
  
    // Check if the email is valid (contains "@")
    if (!isValidEmail(email)) {
      alert("Invalid email address. Please enter a valid email.");
      return;
    }
  
    // Check if the username or email already exists in localStorage
    if (localStorage.getItem(username)) {
      alert("Username already exists. Please choose a different one.");
      return;
    }
  
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var storedUser = JSON.parse(localStorage.getItem(key));
      if (storedUser && storedUser.email === email) {
        alert("Email address is already in use. Please use a different one.");
        return;
      }
    }
  
    // Save the user to localStorage
    var user = { email: email, password: password };
    localStorage.setItem(username, JSON.stringify(user));
  
    alert("Registration successful!");
    showLogin(); // Automatically switch to the login view after registration
  }
  
  function recoverAccount() {
    var emailToRecover = document.getElementById("forgotPasswordEmail").value;
  
    if (!emailToRecover) {
      alert("Please enter your email address to recover your account.");
      return;
    }
  
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var storedUser = JSON.parse(localStorage.getItem(key));
      if (storedUser && storedUser.email === emailToRecover) {
        alert("Account found! Username: " + key);
  
        // Prompt the user to enter a new password
        var newPassword = prompt("Please enter a new password:");
        if (newPassword) {
          storedUser.password = newPassword;
          localStorage.setItem(key, JSON.stringify(storedUser));
          alert("Password updated successfully!");
        } else {
          alert("Invalid password. Password not updated.");
        }
        return;
      }
    }
  
    alert("Account not found. Please check your email address or register.");
  }
  
  function isValidEmail(email) {
    // Basic email validation (contains "@")
    return email.includes("@");
  }
  
  function togglePasswordVisibility(passwordFieldId) {
    var passwordInput = document.getElementById(passwordFieldId);
    var passwordToggleIcon = document.getElementById("passwordToggleIcon");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggleIcon.classList.remove("bx-hide");
      passwordToggleIcon.classList.add("bx-show");
    } else {
      passwordInput.type = "password";
      passwordToggleIcon.classList.remove("bx-show");
      passwordToggleIcon.classList.add("bx-hide");
    }
  }
  
  document.getElementById("forgotPasswordLink").addEventListener("click", function () {
    document.getElementById("loginWrapper").style.display = "none";
    document.getElementById("registerWrapper").style.display = "none";
    document.getElementById("forgotPasswordWrapper").style.display = "block";
  });
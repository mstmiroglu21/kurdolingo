document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const users = JSON.parse(localStorage.getItem("kurdolingo_users") || "{}");
  
    if (!users[username] || users[username].password !== password) {
      alert("Kullanıcı adı veya şifre hatalı!");
      return;
    }
  
    localStorage.setItem("kurdolingo_current_user", username);
    window.location.href = "profil.html";
  });
  
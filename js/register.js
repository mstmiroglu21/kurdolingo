document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    if (!username || !password) return;
  
    const users = JSON.parse(localStorage.getItem("kurdolingo_users") || "{}");
  
    if (users[username]) {
      alert("Bu kullanıcı adı zaten var!");
      return;
    }
  
    users[username] = {
      password,
      xp: 0,
      streak: 0,
      lastLogin: ""
    };
  
    localStorage.setItem("kurdolingo_users", JSON.stringify(users));
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    window.location.href = "login.html";
  });
  
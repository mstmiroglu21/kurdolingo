document.getElementById("suggestForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const kelime = document.getElementById("kelime").value.trim();
    const aciklama = document.getElementById("aciklama").value.trim();
    const user = localStorage.getItem("kurdolingo_current_user") || "anonim";
  
    const oneriler = JSON.parse(localStorage.getItem("kurdolingo_oneriler") || "[]");
  
    oneriler.push({
      kelime,
      aciklama,
      user,
      tarih: new Date().toLocaleString()
    });
  
    localStorage.setItem("kurdolingo_oneriler", JSON.stringify(oneriler));
    document.getElementById("sonuc").textContent = "Öneriniz gönderildi, teşekkür ederiz!";
    document.getElementById("suggestForm").reset();
  });
  
document.getElementById("wordForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const ders = document.getElementById("ders").value;
    const kelime = document.getElementById("kelime").value;
    const anlam = document.getElementById("anlam").value;
    const dosya = document.getElementById("ses").files[0];
  
    if (!dosya || dosya.type !== "audio/mpeg") {
      document.getElementById("sonuc").innerText = "Lütfen geçerli bir MP3 dosyası seçin.";
      return;
    }
  
    // Geçici çözüm: Dosya yükleme tarayıcı düzeyinde gösterim (gerçek yükleme yok)
    const reader = new FileReader();
    reader.onload = function () {
      // Ses URL’sini ve kelime bilgilerini LocalStorage’a kaydediyoruz (gerçek backend yoksa)
      let veri = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");
  
      veri.push({
        ders: ders,
        kelime: kelime,
        anlam: anlam,
        ses: reader.result
      });
  
      localStorage.setItem("kurdolingo_dersler", JSON.stringify(veri));
  
      document.getElementById("sonuc").innerText = `Kelime eklendi: ${kelime}`;
      document.getElementById("wordForm").reset();
    };
  
    reader.readAsDataURL(dosya); // Base64 encode edip kaydediyoruz (offline çözüm)
  });
  const zorluk = document.getElementById("zorluk").value;

veri.push({
  ders: ders,
  kelime: kelime,
  anlam: anlam,
  ses: reader.result,
  zorluk: zorluk
});

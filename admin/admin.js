const kelimeEl = document.getElementById("kelime");
const anlamEl = document.getElementById("anlam");
const sesEl = document.getElementById("ses");
const dersEl = document.getElementById("ders");
const zorlukEl = document.getElementById("zorluk");
const sonucEl = document.getElementById("sonuc");
const form = document.getElementById("wordForm");

// Kayıtlı veriyi al
let veri = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

// Form gönderildiğinde çalışacak
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const kelime = kelimeEl.value.trim();
  const anlam = anlamEl.value.trim();
  const ders = dersEl.value.trim();
  const zorluk = zorlukEl.value;

  const dosya = sesEl.files[0];

  // Kontroller
  if (!kelime || !anlam || !ders || !zorluk) {
    sonucEl.textContent = "Lütfen tüm alanları doldurun.";
    return;
  }

  if (!dosya || !dosya.type.includes("audio")) {
    sonucEl.textContent = "Lütfen geçerli bir ses dosyası (.mp3) seçin.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const sesBase64 = reader.result;

    // Yeni veri
    const yeni = {
      ders,
      kelime,
      anlam,
      ses: sesBase64,
      zorluk
    };

    // LocalStorage'a ekle
    veri.push(yeni);
    localStorage.setItem("kurdolingo_dersler", JSON.stringify(veri));

    // Başarılı mesaj
    sonucEl.textContent = "✅ Kelime başarıyla kaydedildi!";

    // Formu temizle
    kelimeEl.value = "";
    anlamEl.value = "";
    sesEl.value = "";
    zorlukEl.selectedIndex = 0;
  };

  reader.readAsDataURL(dosya);
});

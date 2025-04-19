const kelimeEl = document.getElementById("kelime");
const anlamEl = document.getElementById("anlam");
const sesEl = document.getElementById("ses");
const dersEl = document.getElementById("ders");
const zorlukEl = document.getElementById("zorluk");
const sonucEl = document.getElementById("sonuc");
const listeAlani = document.getElementById("listeAlani");
const form = document.getElementById("wordForm");

// Verileri al
let veri = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

// Listeyi yükle
guncelleListe();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const kelime = kelimeEl.value.trim();
  const anlam = anlamEl.value.trim();
  const ders = dersEl.value.trim();
  const zorluk = zorlukEl.value;
  const dosya = sesEl.files[0];

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

    const yeni = {
      ders,
      kelime,
      anlam,
      ses: sesBase64,
      zorluk
    };

    veri.push(yeni);
    localStorage.setItem("kurdolingo_dersler", JSON.stringify(veri));

    sonucEl.textContent = "✅ Kelime başarıyla kaydedildi!";
    kelimeEl.value = "";
    anlamEl.value = "";
    sesEl.value = "";
    dersEl.value = "";
    zorlukEl.selectedIndex = 0;

    guncelleListe();
  };

  reader.readAsDataURL(dosya);
});

// Listeleme fonksiyonu
function guncelleListe() {
  listeAlani.innerHTML = "";

  if (veri.length === 0) {
    listeAlani.innerHTML = "<p>Henüz kelime eklenmedi.</p>";
    return;
  }

  veri.forEach((item, index) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "8px";
    div.innerHTML = `
      <strong>${item.kelime}</strong> – ${item.anlam}<br/>
      <em>Ders:</em> ${item.ders} | <em>Zorluk:</em> ${item.zorluk}
      <br/><button onclick="silKelime(${index})" style="margin-top:5px;">🗑️ Sil</button>
    `;
    listeAlani.appendChild(div);
  });
}

// Silme fonksiyonu
function silKelime(index) {
  if (confirm("Bu kelimeyi silmek istiyor musunuz?")) {
    veri.splice(index, 1);
    localStorage.setItem("kurdolingo_dersler", JSON.stringify(veri));
    guncelleListe();
  }
}

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

function silKelime(index) {
  if (confirm("Bu kelimeyi silmek istiyor musunuz?")) {
    veri.splice(index, 1);
    localStorage.setItem("kurdolingo_dersler", JSON.stringify(veri));
    guncelleListe();
  }
}

function exportJSON() {
  const veriStr = JSON.stringify(veri, null, 2);
  const blob = new Blob([veriStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "kurdolingo-kelimeler.json";
  a.click();
}

function exportCSV() {
  if (veri.length === 0) {
    alert("Hiç kelime yok.");
    return;
  }

  const basliklar = ["Kelime", "Anlam", "Ders", "Zorluk"];
  const satirlar = veri.map(item =>
    [item.kelime, item.anlam, item.ders, item.zorluk].map(d => `"${d}"`).join(",")
  );

  const csvStr = [basliklar.join(","), ...satirlar].join("\n");
  const blob = new Blob([csvStr], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "kurdolingo-kelimeler.csv";
  a.click();
}

function importJSON() {
  const input = document.getElementById("importFile");
  const file = input.files[0];
  const mesaj = document.getElementById("importSonuc");

  if (!file || !file.name.endsWith(".json")) {
    mesaj.textContent = "Lütfen geçerli bir .json dosyası seçin.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const icerik = JSON.parse(e.target.result);
      if (!Array.isArray(icerik)) throw "Veri formatı geçersiz";

      veri = [...veri, ...icerik];
      localStorage.setItem("kurdolingo_dersler", JSON.stringify(veri));
      mesaj.textContent = "✅ Veriler başarıyla yüklendi.";
      guncelleListe();
    } catch (err) {
      mesaj.textContent = "❌ Dosya okunamadı veya biçimi hatalı.";
    }
  };
  reader.readAsText(file);
}

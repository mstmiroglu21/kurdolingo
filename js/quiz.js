const soruKelime = document.getElementById("soruKelime");
const seceneklerAlani = document.getElementById("secenekler");
const cevapDurum = document.getElementById("cevapDurum");
const sonrakiBtn = document.getElementById("sonrakiBtn");

const allWords = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");
let xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");

let mevcutSoru = null;

function secenekleriKaristir(array) {
  return array.sort(() => Math.random() - 0.5);
}

function soruOlustur() {
  sonrakiBtn.disabled = true;
  cevapDurum.textContent = "";
  seceneklerAlani.innerHTML = "";

  if (allWords.length < 4) {
    alert("Test için en az 4 kelime gereklidir.");
    window.location.href = "dersler.html";
    return;
  }

  mevcutSoru = allWords[Math.floor(Math.random() * allWords.length)];
  soruKelime.textContent = mevcutSoru.kelime;

  // Yanlış şıklar
  let yanlislar = allWords.filter(w => w.anlam !== mevcutSoru.anlam);
  yanlislar = secenekleriKaristir(yanlislar).slice(0, 3);

  // Tüm seçenekleri birleştir
  const secenekler = secenekleriKaristir([
    { secenek: mevcutSoru.anlam, dogru: true },
    ...yanlislar.map(y => ({ secenek: y.anlam, dogru: false }))
  ]);

  secenekler.forEach(sec => {
    const btn = document.createElement("div");
    btn.className = "secenek";
    btn.textContent = sec.secenek;
    btn.onclick = () => {
      document.querySelectorAll(".secenek").forEach(s => s.style.pointerEvents = "none");

      if (sec.dogru) {
        btn.classList.add("dogru");
        cevapDurum.textContent = "✅ Doğru!";
        xp += 10;
        localStorage.setItem("kurdolingo_xp", xp.toString());
      } else {
        btn.classList.add("yanlis");
        cevapDurum.textContent = "❌ Yanlış!";
      }

      sonrakiBtn.disabled = false;
    };
    seceneklerAlani.appendChild(btn);
  });
}

sonrakiBtn.addEventListener("click", () => {
  soruOlustur();
});

soruOlustur();

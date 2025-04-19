if (words.length === 0) {
  alert("Bu derste içerik bulunamadı.");
  window.location.href = "dersler.html";
  return;
}

// Admin panelden gelen verileri al
const allWords = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

// URL'den ders adı parametresini çek
const urlParams = new URLSearchParams(window.location.search);
const seciliDers = urlParams.get("ders") || "";

// Sadece seçilen derse ait kelimeleri filtrele
const words = allWords.filter(w => w.ders.toLowerCase() === seciliDers.toLowerCase());

let index = 0;
const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const playBtn = document.getElementById("playSound");
const nextBtn = document.getElementById("nextBtn");

function loadWord() {
  if (index >= words.length) {
    alert("Dersi tamamladınız!");
    window.location.href = "dersler.html";
    return;
  }

  const kelimeObj = words[index];
  wordEl.textContent = kelimeObj.kelime;
  meaningEl.textContent = kelimeObj.anlam;

  playBtn.onclick = () => {
    const audio = new Audio(kelimeObj.ses); // base64 sesi çal
    audio.play();
  };
}

nextBtn.addEventListener("click", () => {
  index++;
  loadWord();
});

loadWord();

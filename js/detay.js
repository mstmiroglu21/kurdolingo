// Admin panelden gelen tüm verileri al
const allWords = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

// URL'den ders adını al
const urlParams = new URLSearchParams(window.location.search);
const seciliDers = urlParams.get("ders") || "";

// Seçilen derse ait kelimeleri filtrele (küçük harfe çevirerek karşılaştır)
const words = allWords.filter(w =>
  w.ders && w.ders.trim().toLowerCase() === seciliDers.trim().toLowerCase()
);

// Eğer eşleşen kelime yoksa uyarı ver ve yönlendir
if (words.length === 0) {
  alert("Bu derste gösterilecek içerik bulunamadı.");
  window.location.href = "dersler.html";
}

// DOM elemanlarını al
const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const playBtn = document.getElementById("playSound");
const nextBtn = document.getElementById("nextBtn");

let index = 0;

// Kelimeyi yükleyen fonksiyon
function loadWord() {
  if (index >= words.length) {
    alert("🎉 Dersi tamamladınız!");
    window.location.href = "dersler.html";
    return;
  }

  const kelimeObj = words[index];
  wordEl.textContent = kelimeObj.kelime;
  meaningEl.textContent = kelimeObj.anlam;

  // Ses oynatma
  playBtn.onclick = () => {
    if (kelimeObj.ses && kelimeObj.ses.length > 0) {
      const audio = new Audio(kelimeObj.ses);
      audio.play();
    } else {
      alert("Bu kelimeye ait ses dosyası bulunamadı.");
    }
  };
}

// “Sonraki” butonuna tıklanınca bir sonraki kelimeye geç
nextBtn.addEventListener("click", () => {
  index++;
  loadWord();
});

// Sayfa yüklenince ilk kelimeyi getir
loadWord();

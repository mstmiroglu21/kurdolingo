const allWords = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");
const urlParams = new URLSearchParams(window.location.search);
const seciliDers = urlParams.get("ders") || "";

const words = allWords.filter(w =>
  w.ders && w.ders.trim().toLowerCase() === seciliDers.trim().toLowerCase()
);

const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const playBtn = document.getElementById("playSound");
const nextBtn = document.getElementById("nextBtn");
const dersAdi = document.getElementById("dersAdi");
const xpText = document.getElementById("xpKazanim");

let index = 0;
let xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");

dersAdi.textContent = seciliDers;

function loadWord() {
  if (index >= words.length) {
    alert("🎉 Dersi tamamladınız!");
    localStorage.setItem("kurdolingo_xp", xp.toString());
    window.location.href = "dersler.html";
    return;
  }

  const kelime = words[index];
  wordEl.textContent = kelime.kelime;
  meaningEl.textContent = kelime.anlam;

  playBtn.onclick = () => {
    if (kelime.ses && kelime.ses.length > 0) {
      const audio = new Audio(kelime.ses);
      audio.play();
    } else {
      alert("Ses bulunamadı.");
    }
  };
}

nextBtn.addEventListener("click", () => {
  xp += 10;
  xpText.textContent = "+10 XP Kazandınız!";
  setTimeout(() => {
    xpText.textContent = "";
  }, 1000);
  index++;
  loadWord();
});

if (words.length === 0) {
  alert("Bu derste içerik bulunamadı.");
  window.location.href = "dersler.html";
} else {
  loadWord();
}

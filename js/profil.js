const xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");
const streak = parseInt(localStorage.getItem("kurdolingo_streak") || "0");
const lastDay = localStorage.getItem("kurdolingo_last_day") || "";
const kelimeler = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

const seviyeAdi = document.getElementById("seviyeAdi");
const rozetImg = document.getElementById("rozetImg");
const xpBar = document.getElementById("xpBar");
const xpMiktari = document.getElementById("xpMiktari");
const streakEl = document.getElementById("streak");
const dersSayisi = document.getElementById("dersSayisi");
const quizSayisi = document.getElementById("quizSayisi");

function hesaplaSeviye(xp) {
  if (xp < 50) return { seviye: "Başlangıç", rozet: "rozet1.png" };
  if (xp < 100) return { seviye: "Orta Seviye", rozet: "rozet2.png" };
  return { seviye: "İleri Seviye", rozet: "rozet3.png" };
}

function guncelle() {
  const sev = hesaplaSeviye(xp);
  seviyeAdi.textContent = `Seviye: ${sev.seviye}`;
  rozetImg.src = `assets/images/${sev.rozet}`;

  let percent = Math.min((xp % 50) * 2, 100);
  xpBar.style.width = percent + "%";
  xpMiktari.textContent = `XP: ${xp}`;

  streakEl.textContent = streak;
  dersSayisi.textContent = new Set(kelimeler.map(w => w.ders)).size;
  quizSayisi.textContent = kelimeler.length;
}

guncelle();

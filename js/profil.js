const xpBar = document.getElementById("xpBar");
const xpValue = document.getElementById("xpValue");
const streak = document.getElementById("streak");
const girisBtn = document.getElementById("girisXP");
const levelEl = document.getElementById("level");
const rozetResim = document.getElementById("rozetResim");

const dailyTarget = 30;
let xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");
let lastDay = localStorage.getItem("kurdolingo_last_day");
let currentStreak = parseInt(localStorage.getItem("kurdolingo_streak") || "0");

const today = new Date().toLocaleDateString();

function hesaplaSeviye(xp) {
  if (xp < 50) return { seviye: "Başlangıç", rozet: "rozet1.png" };
  if (xp < 100) return { seviye: "Orta Seviye", rozet: "rozet2.png" };
  return { seviye: "İleri Seviye", rozet: "rozet3.png" };
}

function updateProgress() {
  xpValue.textContent = xp;
  let percent = Math.min((xp / dailyTarget) * 100, 100);
  xpBar.style.width = `${percent}%`;
  streak.textContent = currentStreak;

  const sonuc = hesaplaSeviye(xp);
  levelEl.textContent = sonuc.seviye;
  rozetResim.src = `assets/images/${sonuc.rozet}`;
  rozetResim.style.display = "block";
}

function updateStreak() {
  if (lastDay !== today) {
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    if (lastDay === yesterday) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }
    localStorage.setItem("kurdolingo_streak", currentStreak);
    localStorage.setItem("kurdolingo_last_day", today);
  }
}

girisBtn.addEventListener("click", () => {
  xp += 10;
  if (xp > dailyTarget) xp = dailyTarget;
  localStorage.setItem("kurdolingo_xp", xp.toString());
  updateProgress();
});

updateStreak();
updateProgress();

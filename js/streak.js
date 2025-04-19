const takvimAlani = document.getElementById("takvimAlani");
const streakEl = document.getElementById("streakCount");

// Bugünkü tarih
const bugun = new Date();
const streak = parseInt(localStorage.getItem("kurdolingo_streak") || "0");
const lastDay = localStorage.getItem("kurdolingo_last_day") || "";
const xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");

// Son 7 günü getir
function tarihListesi() {
  const gunler = [];
  for (let i = 6; i >= 0; i--) {
    const tarih = new Date(Date.now() - i * 86400000);
    gunler.push(tarih);
  }
  return gunler;
}

// Bugün XP alındı mı?
function bugunYapildiMi() {
  return lastDay === bugun.toLocaleDateString();
}

function renderTakvim() {
  takvimAlani.innerHTML = "";
  const tarihler = tarihListesi();
  tarihler.forEach(tarih => {
    const div = document.createElement("div");
    div.className = "gun-kutu";

    const tStr = tarih.toLocaleDateString();
    const tGun = tarih.toLocaleDateString("tr-TR", { weekday: "short" });

    div.innerHTML = `<span>${tGun}</span><span>${tarih.getDate()}</span>`;

    if (tStr <= lastDay) {
      div.classList.add("aktif");
    }

    takvimAlani.appendChild(div);
  });

  streakEl.textContent = streak;
}

renderTakvim();

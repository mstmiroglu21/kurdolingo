const xpBar = document.getElementById("xpBar");
const xpValue = document.getElementById("xpValue");
const levelName = document.getElementById("levelName");
const rozetImg = document.getElementById("rozetImg");

let xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");

function hesaplaSeviye(xp) {
  if (xp < 50) return { seviye: "Başlangıç", rozet: "rozet1.png" };
  if (xp < 100) return { seviye: "Orta Seviye", rozet: "rozet2.png" };
  return { seviye: "İleri Seviye", rozet: "rozet3.png" };
}

function updateXP() {
  xpValue.textContent = `XP: ${xp}`;
  let percent = Math.min((xp % 50) * 2, 100);
  xpBar.style.width = percent + "%";

  const sev = hesaplaSeviye(xp);
  levelName.textContent = `Seviye: ${sev.seviye}`;
  rozetImg.src = `assets/images/${sev.rozet}`;
}

function yukleDersler() {
  const dersler = [
    { ad: "Selamlaşma", ikon: "hello-icon.svg", kilitli: false },
    { ad: "Sayılar", ikon: "numbers-icon.svg", kilitli: false },
    { ad: "Aile", ikon: "family-icon.svg", kilitli: true },
    { ad: "Yiyecekler", ikon: "food-icon.svg", kilitli: true }
  ];

  const container = document.getElementById("kategoriListesi");

  dersler.forEach(ders => {
    const div = document.createElement("div");
    div.className = "kategori";
    if (ders.kilitli) div.classList.add("locked");

    div.innerHTML = `
      <img src="assets/images/${ders.ikon}" alt="${ders.ad}" />
      <span>${ders.ad}</span>
    `;

    if (!ders.kilitli) {
      div.onclick = () => {
        window.location.href = `ders-detay.html?ders=${encodeURIComponent(ders.ad)}`;
      };
    }

    container.appendChild(div);
  });
}

updateXP();
yukleDersler();

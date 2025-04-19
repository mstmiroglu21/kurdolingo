let xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");
let satinAlinanlar = JSON.parse(localStorage.getItem("kurdolingo_satin_aldiklarim") || "[]");

const urunler = [
  { id: "tema-koyu", ad: "🌙 Koyu Tema", xp: 30 },
  { id: "tema-acik", ad: "☀️ Açık Tema", xp: 30 },
  { id: "rozet-altin", ad: "🏅 Altın Rozet", xp: 50 },
  { id: "avatar-panda", ad: "🐼 Panda Avatar", xp: 40 },
];

const xpBilgi = document.getElementById("xpBilgi");
const urunlerListesi = document.getElementById("urunlerListesi");

function guncelleXP() {
  xpBilgi.textContent = `XP: ${xp}`;
}

function urunleriGoster() {
  urunlerListesi.innerHTML = "";

  urunler.forEach(urun => {
    const div = document.createElement("div");
    div.className = "urun";

    const aciklama = document.createElement("div");
    aciklama.className = "aciklama";
    aciklama.innerHTML = `<strong>${urun.ad}</strong><br><small>${urun.xp} XP</small>`;

    const btn = document.createElement("button");

    if (satinAlinanlar.includes(urun.id)) {
      btn.textContent = "Satın Alındı";
      btn.disabled = true;
    } else if (xp >= urun.xp) {
      btn.textContent = "Satın Al";
      btn.onclick = () => {
        if (confirm(`${urun.ad} ürününü ${urun.xp} XP ile almak istiyor musun?`)) {
          xp -= urun.xp;
          satinAlinanlar.push(urun.id);
          localStorage.setItem("kurdolingo_xp", xp.toString());
          localStorage.setItem("kurdolingo_satin_aldiklarim", JSON.stringify(satinAlinanlar));
          guncelleXP();
          urunleriGoster();
        }
      };
    } else {
      btn.textContent = "Yetersiz XP";
      btn.disabled = true;
    }

    div.appendChild(aciklama);
    div.appendChild(btn);
    urunlerListesi.appendChild(div);
  });
}

guncelleXP();
urunleriGoster();

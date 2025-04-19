const kelimeEl = document.getElementById("kelime");
const micBtn = document.getElementById("micBtn");
const sonuc = document.getElementById("sonuc");
const sonrakiBtn = document.getElementById("sonrakiBtn");

const kelimeler = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

let xp = parseInt(localStorage.getItem("kurdolingo_xp") || "0");
let index = 0;
let aktifKelime = null;

function yeniKelime() {
  if (index >= kelimeler.length) {
    alert("🎉 Tüm kelimeleri tamamladınız.");
    window.location.href = "profil.html";
    return;
  }

  aktifKelime = kelimeler[index];
  kelimeEl.textContent = aktifKelime.kelime;
  sonuc.textContent = "";
  sonrakiBtn.disabled = true;
}

micBtn.onclick = () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Tarayıcınız ses tanımayı desteklemiyor. Chrome kullanın.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'ku-KU'; // Kürtçe, sistemde yüklü değilse 'tr-TR' de olabilir
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const soyledigin = event.results[0][0].transcript.toLowerCase().trim();
    const hedef = aktifKelime.kelime.toLowerCase().trim();

    if (soyledigin === hedef) {
      sonuc.textContent = "✅ Doğru söylediniz! +10 XP";
      xp += 10;
      localStorage.setItem("kurdolingo_xp", xp.toString());
      sonrakiBtn.disabled = false;
    } else {
      sonuc.textContent = `❌ Yanlış: "${soyledigin}" yerine "${hedef}" bekleniyordu.`;
    }
  };

  recognition.onerror = function() {
    sonuc.textContent = "⚠️ Ses algılanamadı. Tekrar deneyin.";
  };
};

sonrakiBtn.onclick = () => {
  index++;
  yeniKelime();
};

if (kelimeler.length === 0) {
  alert("Telaffuz testi için içerik yok.");
  window.location.href = "dersler.html";
} else {
  yeniKelime();
}

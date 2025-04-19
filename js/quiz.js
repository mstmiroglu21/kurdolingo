const kelimeler = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");
let sorular = [...kelimeler];
let current = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

function karistir(array) {
  return array.sort(() => Math.random() - 0.5);
}

function yeniSoru() {
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";

  if (current >= sorular.length) {
    questionEl.textContent = "Test tamamlandı!";
    return;
  }

  const soru = sorular[current];
  questionEl.textContent = `"${soru.kelime}" kelimesinin anlamı nedir?`;

  let secenekler = [soru.anlam];
  while (secenekler.length < 4) {
    let rast = kelimeler[Math.floor(Math.random() * kelimeler.length)];
    if (!secenekler.includes(rast.anlam)) {
      secenekler.push(rast.anlam);
    }
  }

  secenekler = karistir(secenekler);

  secenekler.forEach(secenek => {
    const btn = document.createElement("button");
    btn.textContent = secenek;
    btn.addEventListener("click", () => cevapla(btn, soru.anlam));
    optionsEl.appendChild(btn);
  });
}

function cevapla(btn, dogruCevap) {
  const butonlar = document.querySelectorAll("#options button");
  butonlar.forEach(b => {
    b.disabled = true;
    if (b.textContent === dogruCevap) {
      b.classList.add("correct");
    } else if (b === btn) {
      b.classList.add("incorrect");
    }
  });

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  current++;
  yeniSoru();
});

yeniSoru();

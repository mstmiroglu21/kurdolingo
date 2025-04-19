const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const gonderBtn = document.getElementById("gonderBtn");

const cevaplar = {
  "slav": "Slav! Tu baş î?",
  "tu çawa yî": "Ez baş im, spas dikim.",
  "navê te çi ye": "Navê min Kurdolingo ye.",
  "spas": "Ser çava!",
  "hejmar": "Yek, du, sê, çar..."
};

function cevapVer(girdi) {
  const soru = girdi.toLowerCase();
  let cevap = cevaplar[soru] || "Bibore, ez ev nabînim. Ji kerema xwe bi awayekî din bixe.";

  // Chat kutusuna yaz
  chatBox.innerHTML += `<p><strong>Sen:</strong> ${girdi}</p>`;
  chatBox.innerHTML += `<p><strong>AI:</strong> ${cevap}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

gonderBtn.addEventListener("click", () => {
  const metin = userInput.value.trim();
  if (metin) {
    cevapVer(metin);
    userInput.value = "";
  }
});

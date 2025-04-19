function openLesson(id) {
    // Geçici olarak sadece sayfa yönlendirme
    window.location.href = `ders-detay.html?ders=${id}`;
  }
  
  const dersDiv = document.getElementById("lessonContainer");
const veriler = JSON.parse(localStorage.getItem("kurdolingo_dersler") || "[]");

function filtrele(zorluk) {
  dersDiv.innerHTML = "";

  let gosterilecek = zorluk === "hepsi"
    ? veriler
    : veriler.filter(v => v.zorluk === zorluk);

  const dersler = [...new Set(gosterilecek.map(v => v.ders))];

  dersler.forEach(ders => {
    const kart = document.createElement("div");
    kart.className = "lesson-card";
    kart.innerHTML = `
      <img src="assets/images/start-icon.svg" />
      <h3>${ders}</h3>
      <p>${zorluk === "hepsi" ? "Zorluk: " + (veriler.find(v => v.ders === ders)?.zorluk || "belirsiz") : ""}</p>
    `;
    kart.onclick = () => window.location.href = `ders-detay.html?ders=${ders}`;
    dersDiv.appendChild(kart);
  });
}

filtrele("hepsi");

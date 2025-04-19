const liste = document.getElementById("onerilerListesi");
const veriler = JSON.parse(localStorage.getItem("kurdolingo_oneriler") || "[]");

if (veriler.length === 0) {
  liste.innerHTML = "<p>Henüz öneri yok.</p>";
} else {
  veriler.reverse().forEach((o) => {
    const div = document.createElement("div");
    div.style.marginBottom = "12px";
    div.innerHTML = `
      <strong>${o.kelime}</strong><br/>
      <em>${o.aciklama}</em><br/>
      👤 ${o.user} | 🕒 ${o.tarih}
      <hr/>
    `;
    liste.appendChild(div);
  });
}

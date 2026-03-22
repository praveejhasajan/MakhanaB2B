(function () {
  const WHATSAPP_NUMBER = "919211959766";
  const DEFAULT_MESSAGE = "Hi! I am interested in makhana products. Please share pricing and order details.";

  const messageMap = [
    { key: "bulk-makhana-supplier-india", msg: "Hi! I need bulk makhana supply from India. Please share grades, MOQ, and pricing." },
    { key: "export-wholesale-makhana-india", msg: "Hi! I want a bulk export quote for makhana (FOB/CIF/EXW)." },
    { key: "import-makhana-query", msg: "Hi! I want to import makhana. Please share MOQ and FOB/CIF pricing." },
    { key: "makhana-foxnut-supplier-usa", msg: "Hi! I am a USA buyer and want a bulk quote for lotus seeds / makhana." },
    { key: "makhana-wholesale-supplier-uae-dubai", msg: "Hi! I am a UAE buyer and want a wholesale makhana quote with FTA documentation." },
    { key: "makhana-manufacturer-in-bihar", msg: "Hi! I am looking for a makhana manufacturer in Bihar. Please share capacity and rates." },
    { key: "foxnut-manufacturer-india", msg: "Hi! I am looking for a foxnut (makhana) manufacturer in India. Please share pricing." },
    { key: "private-label-makhana-manufacturer", msg: "Hi! I want to launch a private label makhana brand. Please share details." },
    { key: "makhana-board", msg: "Hi! I want details about the Makhana Board and pricing." },
    { key: "makhanaboard", msg: "Hi! I want details about the Makhana Board and pricing." },
    { key: "makhana-benefit", msg: "Hi! I want to know more about makhana benefits and product options." },
    { key: "makhana-benefits", msg: "Hi! I want to know more about makhana benefits and product options." },
    { key: "makhanabenefit", msg: "Hi! I want to know more about makhana benefits and product options." },
    { key: "makhanabenefits", msg: "Hi! I want to know more about makhana benefits and product options." },
    { key: "makhana-farming", msg: "Hi! I want information about makhana farming and sourcing." },
    { key: "makhanafarming", msg: "Hi! I want information about makhana farming and sourcing." },
    { key: "blog", msg: "Hi! I read your blog and want bulk makhana details." },
    { key: "faq", msg: "Hi! I have a few questions about makhana orders and pricing." },
    { key: "termcalculator", msg: "Hi! I need an export quotation for makhana (FOB/CIF/EXW)." }
  ];

  function getMessage() {
    const body = document.body;
    const custom = body ? body.getAttribute("data-whatsapp-message") : "";
    if (custom) return custom;

    const path = (window.location.pathname || "").toLowerCase();
    for (const item of messageMap) {
      if (path.includes(item.key)) return item.msg;
    }

    const title = (document.title || "").replace(/\s+/g, " ").trim();
    if (title) {
      return `Hi! I'm interested in ${title}. Please share pricing and order details.`;
    }

    return DEFAULT_MESSAGE;
  }

  function ensureStyles() {
    if (document.getElementById("whatsapp-button-style")) return;
    const style = document.createElement("style");
    style.id = "whatsapp-button-style";
    style.textContent = "/* Floating WhatsApp button */\n" +
      ".whatsapp-button{position:fixed;right:20px;bottom:20px;z-index:1100;width:58px;height:58px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#25d366,#1fb95a);border:2px solid rgba(255,255,255,0.86);box-shadow:0 10px 24px rgba(18,92,46,0.35);transition:transform .22s ease,box-shadow .22s ease,filter .22s ease;}" +
      ".whatsapp-button img{width:30px;height:30px;border-radius:50%;}" +
      ".whatsapp-button:hover{transform:translateY(-2px) scale(1.04);filter:brightness(1.03);box-shadow:0 14px 28px rgba(18,92,46,0.42);}" +
      ".whatsapp-button:focus-visible{outline:3px solid rgba(37,211,102,0.42);outline-offset:2px;}" +
      "@media (max-width:768px){.whatsapp-button{width:52px;height:52px;right:14px;bottom:14px}.whatsapp-button img{width:27px;height:27px}}";
    document.head.appendChild(style);
  }

  function ensureButton() {
    if (document.querySelector(".whatsapp-button")) return;

    const message = getMessage();
    const a = document.createElement("a");
    a.className = "whatsapp-button";
    a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Chat on WhatsApp");

    const img = document.createElement("img");
    img.src = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";
    img.alt = "WhatsApp Chat";
    img.loading = "lazy";
    img.width = 34;
    img.height = 34;

    a.appendChild(img);
    document.body.appendChild(a);
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureStyles();
    ensureButton();
  });
})();

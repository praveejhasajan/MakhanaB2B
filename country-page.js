(function () {
  function closeNavbar() {
    var checkbox = document.getElementById("check");
    var nav = document.getElementById("navbarContainer");
    if (checkbox) checkbox.checked = false;
    if (nav) nav.classList.remove("active");
  }
  window.closeNavbar = window.closeNavbar || closeNavbar;

  function updateConfigurator(form) {
    var summary = document.querySelector("[data-config-summary]");
    if (!summary || !form) return;
    var fields = ["packaging", "flavor", "moq", "country", "brand", "label"];
    fields.forEach(function (field) {
      var input = form.querySelector("[name='" + field + "']");
      var target = summary.querySelector("[data-summary='" + field + "']");
      if (!input || !target) return;
      var value = input.value || input.getAttribute("placeholder") || "-";
      target.textContent = value;
    });
  }

  function bindConfigurator() {
    var form = document.querySelector("[data-packaging-configurator]");
    if (!form) return;
    updateConfigurator(form);
    form.addEventListener("input", function () { updateConfigurator(form); });
    form.addEventListener("change", function () { updateConfigurator(form); });
  }

  function bindRfq() {
    document.querySelectorAll("[data-country-rfq]").forEach(function (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        var status = form.querySelector("[data-rfq-status]");
        var submit = form.querySelector("button[type='submit']");
        var data = new FormData(form);
        var payload = {
          name: data.get("name") || "",
          phone: data.get("phone") || "",
          email: data.get("email") || "",
          quantity: data.get("moq") || "",
          location: data.get("country") || document.body.getAttribute("data-country") || "",
          purpose: "Private Label Country Page RFQ",
          intent: "export",
          source: "Country Private Label Page",
          requirement: [
            "Company: " + (data.get("company") || ""),
            "Packaging: " + (data.get("packaging") || ""),
            "Requirement: " + (data.get("requirement") || "")
          ].join(" | ")
        };

        if (!payload.name || !payload.phone) {
          if (status) {
            status.textContent = "Please add your name and WhatsApp number.";
            status.setAttribute("data-state", "error");
          }
          return;
        }

        if (submit) submit.disabled = true;
        if (status) {
          status.textContent = "Sending your RFQ...";
          status.removeAttribute("data-state");
        }

        try {
          var response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!response.ok) throw new Error("Lead API failed");
          form.reset();
          if (status) status.textContent = "Thank you. Our export team will contact you shortly.";
        } catch (error) {
          if (status) {
            status.textContent = "Could not submit right now. Please use WhatsApp for the fastest response.";
            status.setAttribute("data-state", "error");
          }
        } finally {
          if (submit) submit.disabled = false;
        }
      });
    });
  }

  function bindAnimation() {
    var items = document.querySelectorAll("[data-animate]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    items.forEach(function (item) { observer.observe(item); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindConfigurator();
    bindRfq();
    bindAnimation();
  });
})();

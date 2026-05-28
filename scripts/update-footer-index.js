const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const countryLinks = [
  ["USA", "/private-label-makhana-usa.html"],
  ["UK", "/private-label-makhana-uk.html"],
  ["UAE", "/private-label-makhana-uae.html"],
  ["Canada", "/private-label-makhana-canada.html"],
  ["Australia", "/private-label-makhana-australia.html"],
  ["Germany", "/private-label-makhana-germany.html"],
  ["France", "/private-label-makhana-france.html"],
  ["Netherlands", "/private-label-makhana-netherlands.html"],
  ["Saudi Arabia", "/private-label-makhana-saudi-arabia.html"],
  ["Singapore", "/private-label-makhana-singapore.html"],
  ["Japan", "/private-label-makhana-japan.html"],
  ["South Korea", "/private-label-makhana-south-korea.html"],
  ["New Zealand", "/private-label-makhana-new-zealand.html"],
  ["Qatar", "/private-label-makhana-qatar.html"],
  ["Kuwait", "/private-label-makhana-kuwait.html"],
  ["Oman", "/private-label-makhana-oman.html"],
  ["Bahrain", "/private-label-makhana-bahrain.html"],
  ["Malaysia", "/private-label-makhana-malaysia.html"],
  ["Thailand", "/private-label-makhana-thailand.html"],
  ["South Africa", "/private-label-makhana-south-africa.html"]
];

function links(items) {
  return items.map(([label, href]) => `        <li><a href="${href}">${label}</a></li>`).join("\n");
}

const block = `<!-- Footer page index -->
  <div class="site-footer-index" aria-label="Makhanabazar page index">
    <div>
      <h3>Main Pages</h3>
      <ul>
${links([
  ["Home", "/"],
  ["Blog", "/blog.html"],
  ["FAQ", "/faq.html"],
  ["FOB/CIF Calculator", "/TermCalculator.html"],
  ["Sitemap", "/sitemap.html"]
])}
      </ul>
    </div>
    <div>
      <h3>Export and Wholesale</h3>
      <ul>
${links([
  ["Export Hub", "/export-wholesale-makhana-india.html"],
  ["Import Query", "/import-makhana-query.html"],
  ["Private Label Manufacturer", "/private-label-makhana-manufacturer.html"],
  ["Bulk Makhana Supplier", "/bulk-makhana-supplier-india.html"],
  ["Foxnut Manufacturer India", "/foxnut-manufacturer-india.html"],
  ["Makhana Manufacturer Bihar", "/makhana-manufacturer-in-bihar.html"],
  ["USA Supplier", "/makhana-foxnut-supplier-usa.html"],
  ["UAE Wholesale", "/makhana-wholesale-supplier-uae-dubai.html"]
])}
      </ul>
    </div>
    <div>
      <h3>Private Label Countries</h3>
      <ul class="footer-country-list">
${links(countryLinks.slice(0, 10).map(([label, href]) => [`Private Label ${label}`, href]))}
      </ul>
    </div>
    <div>
      <h3>More Countries and Learn</h3>
      <ul class="footer-country-list">
${links([
  ...countryLinks.slice(10).map(([label, href]) => [`Private Label ${label}`, href]),
  ["Makhana Benefits", "/MakhanaBenefits.html"],
  ["Makhana Nutrition Facts", "/MakhanaBenefit.html"],
  ["Makhana Board", "/MakhanaBoard.html"],
  ["Makhana Farming", "/MakhanaFarming.html"]
])}
      </ul>
    </div>
  </div>`;

const files = fs.readdirSync(root)
  .filter((file) => file.endsWith(".html"))
  .filter((file) => file !== "chatbot.html")
  .filter((file) => !file.startsWith("private-label-makhana-") || file === "private-label-makhana-manufacturer.html");

for (const file of files) {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, "utf8");

  if (html.includes("</footer>")) {
    html = html.replace(/\s*<!-- Footer page index -->[\s\S]*?<div class="site-footer-index"[\s\S]*?<\/div>\s*<\/footer>/, `\n${block}\n</footer>`);
    if (!html.includes("site-footer-index")) {
      html = html.replace("</footer>", `${block}\n</footer>`);
    }
  } else if (html.includes("</body>")) {
    html = html.replace(/\s*<footer class="premium-footer footer-page-index-only">[\s\S]*?<\/footer>/, "");
    const footer = `<footer class="premium-footer footer-page-index-only">\n${block}\n  <div class="footer-bottom"><p>&copy; 2025 Makhana Bazar. All rights reserved.</p></div>\n</footer>\n`;
    html = html.replace("</body>", `${footer}</body>`);
  }

  if (!html.includes("site-footer-index")) {
    html = html.replace("</footer>", `${block}\n</footer>`);
  }

  fs.writeFileSync(filePath, html, "utf8");
}

console.log(`Updated footer page index in ${files.length} public HTML files.`);

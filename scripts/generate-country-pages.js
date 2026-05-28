const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const domain = "https://www.makhanabazar.com";
const today = "2026-05-28";

const countries = [
  {
    name: "USA",
    slug: "usa",
    accent: "#1b4f91",
    accent2: "#0f2f57",
    style: "Trust blue and navy accents",
    buyer: "American health snack brands, natural grocery distributors, club-store sourcing teams, Amazon FBA operators, and premium retail buyers",
    cities: "New York, Los Angeles, Chicago, Houston, New Jersey, Dallas, Seattle, and Miami",
    marketTitle: "USA healthy snack shelves are moving toward clean-label, gluten-free crunch.",
    marketCopy: "The USA market rewards snacks that feel functional, ingredient-led, and easy to position across wellness, grocery, and online channels. Makhana gives American buyers a grain-free, roasted, light-crunch format that can sit beside popcorn alternatives, protein snacks, trail mix, and better-for-you impulse products. Private label buyers can build premium ranges around low-oil roasting, vegan seasonings, resealable pouches, and transparent India-origin sourcing.",
    bullets: ["Strong demand for gluten-free and better-for-you snacks", "Premium opportunity in natural grocery, DTC, Amazon, and specialty retail", "Private label pouches suit wellness brands and supermarket snack aisles", "Clear India-origin storytelling helps differentiate from commodity snacks"],
    metric: "50kg+",
    metricLabel: "sample-to-bulk export MOQ planning for USA buyers",
    compliance: "FDA-ready label support, ingredient declarations, batch documents, and export paperwork for US importers",
    port: "Nhava Sheva to New York, Los Angeles, Savannah, Houston, or buyer-nominated forwarder",
    keywords: "private label makhana USA, white label fox nuts USA, bulk makhana export USA, OEM foxnut manufacturer for US brands"
  },
  {
    name: "UK",
    slug: "uk",
    accent: "#173f8a",
    accent2: "#101b3d",
    style: "Royal blue elegance",
    buyer: "UK snack brands, Asian grocery chains, vegan retailers, wholesalers, and premium supermarket sourcing teams",
    cities: "London, Birmingham, Manchester, Leicester, Leeds, Glasgow, and Bristol",
    marketTitle: "The UK market is ready for premium vegan snack innovation.",
    marketCopy: "UK buyers are looking for snacks that combine health claims, ethical sourcing, and retail-ready presentation. Makhana fits vegan, gluten-free, roasted, and low-fat snack conversations while also serving South Asian grocery demand. A UK-focused private label program can use refined flavour profiles such as sea salt, cheese-style seasoning, peri peri, caramel, and herb blends for both mainstream and ethnic retail channels.",
    bullets: ["Vegan and free-from aisles create space for fox nut snacks", "South Asian retail networks already understand makhana demand", "Premium pouches and multipacks work well for supermarket trials", "UK brands can position makhana as a lighter popcorn alternative"],
    metric: "Retail-ready",
    metricLabel: "pouch, carton, and distributor pack formats for UK channels",
    compliance: "UK label review support, allergen declarations, nutrition table coordination, and batch traceability",
    port: "Nhava Sheva to Felixstowe, London Gateway, Southampton, or buyer forwarder",
    keywords: "private label makhana UK, white label fox nuts UK, bulk makhana supplier United Kingdom, OEM makhana snacks UK"
  },
  {
    name: "UAE",
    slug: "uae",
    accent: "#b8892f",
    accent2: "#08784c",
    style: "Luxury gold and emerald",
    buyer: "UAE importers, Dubai wholesalers, premium supermarkets, hotel supply chains, healthy snack brands, and luxury retail buyers",
    cities: "Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and Al Ain",
    marketTitle: "UAE buyers value premium packaging, fast replenishment, and luxury snack positioning.",
    marketCopy: "The UAE market is built for premium imported foods, gifting formats, and modern retail launches. Makhana can be positioned as a clean, vegetarian, light roasted snack for supermarkets, hotel mini-bars, gourmet stores, and health-conscious families. Dubai importers benefit from shorter India shipping lanes, flexible mixed SKUs, and packaging that can support Arabic-English retail presentation.",
    bullets: ["Dubai retail channels reward premium visual packaging", "Shorter India-UAE logistics support faster replenishment cycles", "Arabic-English packs help modern trade and distributor sales", "Flavoured roasted makhana fits family, travel, and gifting use cases"],
    metric: "Fast lane",
    metricLabel: "India to UAE export planning with flexible private label batches",
    compliance: "Arabic-English label coordination, shelf-life documents, certificate support, and UAE importer paperwork",
    port: "Nhava Sheva or Mundra to Jebel Ali, Abu Dhabi, or Sharjah",
    keywords: "private label makhana UAE, white label makhana Dubai, bulk fox nuts supplier UAE, OEM makhana manufacturer Dubai"
  },
  {
    name: "Canada",
    slug: "canada",
    accent: "#b91c1c",
    accent2: "#31343b",
    style: "Premium red accents",
    buyer: "Canadian organic retailers, ethnic distributors, supermarket buyers, wellness snack companies, and import wholesalers",
    cities: "Toronto, Vancouver, Montreal, Calgary, Ottawa, Brampton, and Edmonton",
    marketTitle: "Canada's multicultural snack market is ideal for premium makhana.",
    marketCopy: "Canadian buyers can serve both mainstream healthy snack demand and a strong South Asian consumer base. Makhana gives brands a clean-label product with room for organic, roasted, low-sodium, and family-size formats. Private label launches can target ethnic grocery, independent natural stores, online bundles, and retail chains that want distinctive better-for-you snacks.",
    bullets: ["South Asian demand supports education and repeat buying", "Natural food retail values gluten-free and light roasted snacks", "Bilingual packaging planning can support wider Canadian retail", "Organic and premium grades give brands a stronger shelf story"],
    metric: "Bilingual",
    metricLabel: "packaging planning for English-French retail requirements",
    compliance: "Canadian nutrition panel coordination, bilingual label inputs, allergen statements, and export documents",
    port: "Nhava Sheva to Vancouver, Montreal, Toronto rail-linked depots, or buyer forwarder",
    keywords: "private label makhana Canada, white label fox nuts Canada, bulk makhana importer Canada, OEM makhana snacks Canada"
  },
  {
    name: "Australia",
    slug: "australia",
    accent: "#0e7490",
    accent2: "#287a45",
    style: "Ocean blue and premium green",
    buyer: "Australian health food brands, supermarket suppliers, vegan snack companies, importers, and specialty grocery distributors",
    cities: "Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, and Gold Coast",
    marketTitle: "Australia's better-for-you snack culture is a natural fit for roasted makhana.",
    marketCopy: "Australian consumers respond well to clean ingredients, plant-based snacking, and premium imported foods with provenance. Makhana can sit within health food, lunchbox, vegan, gluten-free, and gourmet snacking ranges. Private label buyers can develop crisp roasted products with simple seasonings, organic options, and modern pouches for independent grocers and national retail.",
    bullets: ["Plant-based and gluten-free snack demand continues to expand", "Modern pouches suit health food stores and supermarket shelves", "Organic and lightly salted variants fit Australian wellness positioning", "Importer-led private labels can scale through specialty grocery networks"],
    metric: "Plant based",
    metricLabel: "snack formats for wellness-led Australian retail",
    compliance: "Australia label inputs, nutrition coordination, batch traceability, and inspection document support",
    port: "Nhava Sheva to Sydney, Melbourne, Brisbane, Fremantle, or buyer forwarder",
    keywords: "private label makhana Australia, white label fox nuts Australia, bulk makhana supplier Australia, OEM foxnut snacks Australia"
  },
  {
    name: "Germany",
    slug: "germany",
    accent: "#35546d",
    accent2: "#18222d",
    style: "Corporate steel blue",
    buyer: "German organic food brands, EU importers, discount retail suppliers, vegan snack companies, and health wholesalers",
    cities: "Berlin, Hamburg, Munich, Frankfurt, Cologne, Dusseldorf, and Stuttgart",
    marketTitle: "Germany rewards disciplined quality, organic positioning, and transparent sourcing.",
    marketCopy: "Germany's food market is detail-oriented, certification-conscious, and open to plant-based snack innovation. Makhana gives importers a high-protein perception, light roasted texture, and origin-led story that can work in organic shops, vegan ranges, and supermarket private labels. Buyers need stable grading, clean specifications, and documentation that supports EU compliance review.",
    bullets: ["EU buyers value traceability, stable specifications, and disciplined documentation", "Organic and natural retail channels can introduce makhana as a new snack format", "Minimal seasoning profiles match German clean-label expectations", "Distributor cartons and retail pouches can serve both trade and consumer channels"],
    metric: "EU-ready",
    metricLabel: "documentation discipline for German import review",
    compliance: "EU label inputs, batch COA support, ingredient specs, allergen statements, and traceability files",
    port: "Nhava Sheva to Hamburg, Bremerhaven, Rotterdam, or buyer-nominated EU forwarder",
    keywords: "private label makhana Germany, white label fox nuts Germany, bulk makhana EU importer, OEM makhana manufacturer Germany"
  },
  {
    name: "France",
    slug: "france",
    accent: "#6f6a62",
    accent2: "#172554",
    style: "Luxury neutral elegance",
    buyer: "French gourmet snack brands, organic retailers, premium supermarkets, import houses, and wellness food distributors",
    cities: "Paris, Lyon, Marseille, Lille, Bordeaux, Toulouse, and Nice",
    marketTitle: "France offers a premium lane for elegant, natural snack innovation.",
    marketCopy: "French buyers appreciate refined packaging, origin stories, and products that feel both healthy and gastronomic. Makhana can be developed into lightly roasted, herb-seasoned, organic, or delicately flavoured snack lines for gourmet retail and organic stores. Private label brands can use restrained design, premium pouch finishes, and India-origin sourcing to create a distinctive shelf presence.",
    bullets: ["Premium packaging can elevate makhana beyond commodity ethnic snacks", "Organic shops and gourmet grocers can test refined roasted variants", "Light herbs, sea salt, and caramelised profiles suit French taste architecture", "Origin-led storytelling supports a luxury FMCG presentation"],
    metric: "Gourmet",
    metricLabel: "private label formats for premium French retail",
    compliance: "EU and French label input support, nutrition files, ingredient declarations, and batch documentation",
    port: "Nhava Sheva to Le Havre, Fos-sur-Mer, Antwerp, Rotterdam, or buyer forwarder",
    keywords: "private label makhana France, white label fox nuts France, premium makhana supplier France, OEM makhana snacks France"
  },
  {
    name: "Netherlands",
    slug: "netherlands",
    accent: "#2563eb",
    accent2: "#f97316",
    style: "Clean European trade style",
    buyer: "Dutch importers, EU distribution hubs, private label snack companies, organic wholesalers, and re-export traders",
    cities: "Amsterdam, Rotterdam, Utrecht, The Hague, Eindhoven, and Tilburg",
    marketTitle: "The Netherlands is a strategic gateway for EU makhana distribution.",
    marketCopy: "Dutch buyers often serve more than one country from a single logistics base, which makes makhana attractive as a scalable, lightweight snack. Rotterdam-linked distribution can support private label launches across Benelux, Germany, and wider Europe. Buyers need export-grade consistency, carton planning, multilingual label readiness, and flexible product formats for both retail and wholesale.",
    bullets: ["Rotterdam access supports wider EU distribution planning", "Private label pouches can be adapted for multilingual European labels", "Organic and wholesale channels can scale through Dutch import networks", "Lightweight cartons improve freight efficiency for snack distribution"],
    metric: "EU hub",
    metricLabel: "Netherlands-based entry for wider European buyers",
    compliance: "EU label inputs, multilingual data support, COA coordination, and traceability documentation",
    port: "Nhava Sheva to Rotterdam, Antwerp, Hamburg, or buyer nominated warehouse",
    keywords: "private label makhana Netherlands, white label fox nuts Holland, bulk makhana Rotterdam, OEM makhana EU distributor"
  },
  {
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    accent: "#047857",
    accent2: "#123524",
    style: "Luxury emerald",
    buyer: "Saudi importers, premium supermarkets, family snack brands, food service distributors, and luxury retail buyers",
    cities: "Riyadh, Jeddah, Dammam, Mecca, Medina, Khobar, and Jubail",
    marketTitle: "Saudi Arabia offers strong potential for premium family and gifting snack ranges.",
    marketCopy: "Saudi retail has room for high-quality imported snacks that feel premium, family-friendly, and suitable for modern trade. Makhana can be positioned as a roasted vegetarian snack for supermarkets, gourmet stores, Ramadan gifting, corporate hampers, and health-led retail. Private label buyers can use Arabic-English packaging, premium tins, pouches, and distributor cartons.",
    bullets: ["Premium imported snack demand supports strong makhana positioning", "Arabic-English packaging improves retail acceptance", "Gifting and family packs create room beyond standard pouch formats", "India-GCC trade lanes support planned replenishment cycles"],
    metric: "GCC scale",
    metricLabel: "private label makhana formats for Saudi retail",
    compliance: "Arabic-English label inputs, halal-friendly documentation support, shelf-life files, and export paperwork",
    port: "Nhava Sheva or Mundra to Jeddah, Dammam, Riyadh dry port, or buyer forwarder",
    keywords: "private label makhana Saudi Arabia, white label fox nuts Saudi, bulk makhana supplier KSA, OEM makhana Riyadh"
  },
  {
    name: "Singapore",
    slug: "singapore",
    accent: "#0f766e",
    accent2: "#1f2937",
    style: "Clean fintech style",
    buyer: "Singapore premium grocers, health snack brands, importers, hotel buyers, online retailers, and regional distributors",
    cities: "Singapore, Jurong, Tampines, Woodlands, Orchard, and regional ASEAN distribution hubs",
    marketTitle: "Singapore is a high-trust launchpad for premium Asian wellness snacks.",
    marketCopy: "Singapore buyers expect clean presentation, efficient documentation, and compact premium formats. Makhana is well suited to urban consumers seeking lighter snacking, vegetarian choices, and functional wellness-led products. Private label launches can focus on small premium pouches, roasted flavours, corporate gifting, and regional expansion from Singapore into Southeast Asia.",
    bullets: ["Compact premium pouches suit urban snacking and online grocery", "Singapore can validate makhana before wider ASEAN distribution", "Clean labels and polished packaging matter strongly in premium retail", "Hotel, office pantry, and gifting channels create additional demand"],
    metric: "ASEAN-ready",
    metricLabel: "launch formats for Singapore and regional buyers",
    compliance: "Singapore label data, ingredient declaration support, shelf-life files, and export documentation",
    port: "Nhava Sheva to Singapore port or buyer-nominated ASEAN forwarder",
    keywords: "private label makhana Singapore, white label fox nuts Singapore, bulk makhana supplier Singapore, OEM makhana ASEAN"
  },
  {
    name: "Japan",
    slug: "japan",
    accent: "#c2414b",
    accent2: "#ffffff",
    style: "Minimal white and soft red",
    buyer: "Japanese health food importers, premium snack brands, specialty grocers, wellness retailers, and ingredient buyers",
    cities: "Tokyo, Osaka, Yokohama, Nagoya, Kobe, Kyoto, Fukuoka, and Sapporo",
    marketTitle: "Japan values precise quality, refined flavours, and elegant small-pack formats.",
    marketCopy: "Japanese buyers often prefer disciplined specifications, restrained packaging, and clean taste profiles. Makhana can be introduced as a light, roasted, plant-based snack with simple flavours such as sea salt, wasabi-inspired seasoning, soy, mild spice, or caramel. Private label programs should focus on consistency, smaller pack sizes, careful grading, and premium visual restraint.",
    bullets: ["Small premium packs match Japanese convenience and specialty retail", "Minimal flavour profiles can position makhana as refined wellness snacking", "Strict grade consistency supports importer confidence", "Clear origin and quality documentation helps buyer review"],
    metric: "Precision",
    metricLabel: "grade-controlled batches for Japanese private label buyers",
    compliance: "Japan label data support, batch specs, ingredient documentation, and quality inspection files",
    port: "Nhava Sheva to Tokyo, Yokohama, Osaka, Kobe, or buyer forwarder",
    keywords: "private label makhana Japan, white label fox nuts Japan, bulk makhana supplier Tokyo, OEM foxnut snacks Japan"
  },
  {
    name: "South Korea",
    slug: "south-korea",
    accent: "#1d4ed8",
    accent2: "#b91c1c",
    style: "Modern Korean retail energy",
    buyer: "Korean snack companies, convenience retail suppliers, health food importers, cafe chains, and online commerce brands",
    cities: "Seoul, Busan, Incheon, Daegu, Daejeon, Gwangju, and Ulsan",
    marketTitle: "South Korea's trend-led snack market can turn makhana into a premium discovery product.",
    marketCopy: "South Korean consumers are comfortable trying new snack textures when the product is well packaged, flavour-forward, and social-commerce friendly. Makhana can be adapted into roasted, spicy, sweet, cheese, seaweed, or clean wellness profiles. Private label buyers can test compact packs, variety bundles, convenience-store formats, and online launch kits.",
    bullets: ["Trend-sensitive shoppers respond to novel texture and premium packaging", "Flavoured roasted variants suit convenience and online snack channels", "Small packs and bundles reduce launch friction for importers", "Korean-style seasoning development can create differentiated SKUs"],
    metric: "Trend fit",
    metricLabel: "flavour-led makhana SKUs for Korean retail launches",
    compliance: "Korea label inputs, ingredient and nutrition support, batch documentation, and export files",
    port: "Nhava Sheva to Busan, Incheon, or buyer-nominated forwarder",
    keywords: "private label makhana South Korea, white label fox nuts Korea, bulk makhana supplier Seoul, OEM makhana snacks Korea"
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    accent: "#0f766e",
    accent2: "#1e3a5f",
    style: "Clean natural premium",
    buyer: "New Zealand health food importers, organic grocers, premium snack brands, and specialty distributors",
    cities: "Auckland, Wellington, Christchurch, Hamilton, Tauranga, and Dunedin",
    marketTitle: "New Zealand offers a focused opportunity for clean, natural snack labels.",
    marketCopy: "New Zealand's snack market is smaller but quality-led, with buyers who value natural ingredients, responsible sourcing, and retail presentation. Makhana can be positioned as a light roasted snack for organic stores, wellness retailers, online grocery, and premium Indian food aisles. Private label programs can start lean with carefully selected flavours and strong packaging clarity.",
    bullets: ["Natural retail channels value clean ingredient stories", "Premium small-batch launches can suit New Zealand market size", "Organic and lightly salted formats align with wellness positioning", "Importer-led distribution can serve both ethnic and mainstream retail"],
    metric: "Lean launch",
    metricLabel: "right-sized private label batches for New Zealand buyers",
    compliance: "New Zealand label data, nutrition support, batch traceability, and export paperwork",
    port: "Nhava Sheva to Auckland, Tauranga, Lyttelton, or buyer forwarder",
    keywords: "private label makhana New Zealand, white label fox nuts NZ, bulk makhana supplier Auckland, OEM makhana snacks New Zealand"
  },
  {
    name: "Qatar",
    slug: "qatar",
    accent: "#7f1d4d",
    accent2: "#b8892f",
    style: "Maroon luxury with gold",
    buyer: "Qatar importers, Doha supermarkets, hospitality buyers, premium grocers, and private label snack distributors",
    cities: "Doha, Al Rayyan, Lusail, Al Wakrah, Al Khor, and Mesaieed",
    marketTitle: "Qatar is suited to premium imported snack packs and hospitality supply.",
    marketCopy: "Qatar's affluent retail and hospitality channels create opportunities for polished makhana ranges. Roasted fox nuts can be positioned as a premium vegetarian snack for supermarkets, office pantry programs, hotels, gifting, and family consumption. Private label buyers benefit from Arabic-English packaging, flexible cartons, and India-GCC shipping familiarity.",
    bullets: ["Premium supermarket shelves support high-quality imported snack ranges", "Hospitality and gifting channels can use elegant pouch or tin formats", "Arabic-English packaging builds buyer confidence", "Smaller market size benefits from flexible mixed SKU shipments"],
    metric: "Doha retail",
    metricLabel: "premium private label snack formats for Qatar",
    compliance: "Arabic-English label inputs, shelf-life files, batch documentation, and export support",
    port: "Nhava Sheva or Mundra to Hamad Port, Doha, or buyer forwarder",
    keywords: "private label makhana Qatar, white label fox nuts Doha, bulk makhana supplier Qatar, OEM makhana Qatar"
  },
  {
    name: "Kuwait",
    slug: "kuwait",
    accent: "#0f766e",
    accent2: "#8a5a20",
    style: "GCC premium green",
    buyer: "Kuwait importers, cooperative supermarket suppliers, premium grocers, wholesalers, and healthy snack distributors",
    cities: "Kuwait City, Hawalli, Salmiya, Farwaniya, Ahmadi, and Jahra",
    marketTitle: "Kuwait buyers can introduce makhana as a premium light snack for families.",
    marketCopy: "Kuwait has strong demand for imported foods and family-oriented supermarket products. Makhana can work as a roasted, vegetarian, clean-label snack for cooperative stores, gourmet retailers, and wholesale distribution. Private label programs can combine Arabic-English packs, family pouches, and flavour profiles suited to GCC palates.",
    bullets: ["Cooperative and supermarket channels can support family pack formats", "GCC-friendly flavours can increase repeat purchases", "Arabic-English retail packs improve shelf readiness", "Importer cartons and mixed SKUs support controlled market entry"],
    metric: "Family packs",
    metricLabel: "private label makhana formats for Kuwait retail",
    compliance: "Arabic-English label support, batch documents, shelf-life data, and export paperwork",
    port: "Nhava Sheva or Mundra to Shuwaikh, Shuaiba, or buyer forwarder",
    keywords: "private label makhana Kuwait, white label fox nuts Kuwait, bulk makhana supplier Kuwait, OEM makhana Kuwait"
  },
  {
    name: "Oman",
    slug: "oman",
    accent: "#0f6f4e",
    accent2: "#9f1239",
    style: "Premium Gulf calm",
    buyer: "Oman importers, Muscat supermarket suppliers, wholesalers, hospitality buyers, and private label food brands",
    cities: "Muscat, Salalah, Sohar, Nizwa, Seeb, and Duqm",
    marketTitle: "Oman offers a focused GCC route for premium roasted makhana.",
    marketCopy: "Oman buyers often need dependable supply, clear documentation, and retail packaging that fits modern trade and wholesale channels. Makhana can be launched as a light vegetarian snack for family consumption, travel retail, hospitality, and healthy food shelves. Private label importers can begin with classic salted, spicy, cheese, and natural variants.",
    bullets: ["Modern retail and wholesale buyers can test compact private label ranges", "India-Oman trade familiarity supports smoother export coordination", "Arabic-English packaging improves retail usability", "Roasted and flavoured formats suit family and travel snacking"],
    metric: "Muscat-ready",
    metricLabel: "export packs for Oman private label buyers",
    compliance: "Arabic-English label inputs, shelf-life documents, COA coordination, and export support",
    port: "Nhava Sheva or Mundra to Sohar, Salalah, Muscat, or buyer forwarder",
    keywords: "private label makhana Oman, white label fox nuts Oman, bulk makhana supplier Muscat, OEM makhana Oman"
  },
  {
    name: "Bahrain",
    slug: "bahrain",
    accent: "#b91c1c",
    accent2: "#6b4e16",
    style: "Red luxury retail accent",
    buyer: "Bahrain importers, Manama supermarkets, gourmet stores, wholesalers, and hospitality food buyers",
    cities: "Manama, Riffa, Muharraq, Hamad Town, Isa Town, and Sitra",
    marketTitle: "Bahrain is a compact premium market for elegant imported snacks.",
    marketCopy: "Bahrain's compact geography and premium retail environment make it suitable for controlled makhana launches. Importers can target supermarkets, gourmet stores, hospitality buyers, and family snack shelves with clean private label pouches. The right program focuses on polished Arabic-English packs, flexible MOQs, and dependable replenishment.",
    bullets: ["Compact market size supports focused private label launches", "Premium grocers can test elegant roasted makhana packs", "Arabic-English packaging helps importer and retail teams", "Hospitality and gifting channels add demand beyond grocery aisles"],
    metric: "Compact launch",
    metricLabel: "flexible private label entry for Bahrain buyers",
    compliance: "Arabic-English label coordination, batch documents, shelf-life data, and export paperwork",
    port: "Nhava Sheva or Mundra to Khalifa Bin Salman Port or buyer forwarder",
    keywords: "private label makhana Bahrain, white label fox nuts Bahrain, bulk makhana supplier Manama, OEM makhana Bahrain"
  },
  {
    name: "Malaysia",
    slug: "malaysia",
    accent: "#1d4ed8",
    accent2: "#0f766e",
    style: "Premium halal-friendly ASEAN",
    buyer: "Malaysian importers, halal snack brands, supermarket suppliers, health food chains, and regional distributors",
    cities: "Kuala Lumpur, Penang, Johor Bahru, Klang, Ipoh, Shah Alam, and Kota Kinabalu",
    marketTitle: "Malaysia combines healthy snack demand with strong regional distribution potential.",
    marketCopy: "Malaysia's retail market is receptive to halal-friendly, vegetarian, and better-for-you snacks with strong packaging. Makhana can be positioned across supermarkets, convenience retail, Indian grocery, online stores, and health food chains. Private label buyers can launch roasted salted, spicy, cheese, caramel, and natural variants with bilingual packaging planning.",
    bullets: ["Halal-friendly documentation support can strengthen buyer confidence", "Supermarkets and online channels can test multiple flavour bundles", "Regional ASEAN links make Malaysia useful for wider distribution", "Vegetarian and gluten-free positioning helps product education"],
    metric: "ASEAN route",
    metricLabel: "private label makhana for Malaysia and regional buyers",
    compliance: "Malaysia label data support, halal-friendly documentation inputs, shelf-life files, and export paperwork",
    port: "Nhava Sheva to Port Klang, Penang, Tanjung Pelepas, or buyer forwarder",
    keywords: "private label makhana Malaysia, white label fox nuts Malaysia, bulk makhana supplier Kuala Lumpur, OEM makhana Malaysia"
  },
  {
    name: "Thailand",
    slug: "thailand",
    accent: "#b8892f",
    accent2: "#1e40af",
    style: "Warm premium gold",
    buyer: "Thai snack brands, import distributors, premium supermarkets, wellness retailers, hospitality buyers, and food chains",
    cities: "Bangkok, Chiang Mai, Phuket, Pattaya, Nonthaburi, and Samut Prakan",
    marketTitle: "Thailand's flavour-forward snack culture creates room for makhana innovation.",
    marketCopy: "Thai consumers enjoy crisp snacks and bold flavours, making roasted makhana a strong format for premium experimentation. Buyers can develop spicy, tangy, herb, coconut, caramel, and clean salted lines for supermarkets, convenience retail, hotel gifting, and online stores. Private label launches should combine attractive packaging with clear health-led positioning.",
    bullets: ["Flavour-forward retail makes makhana suitable for differentiated SKUs", "Tourism and hospitality channels can use premium gifting packs", "Bangkok distributors can test online and supermarket demand", "Light roasted positioning gives a healthier alternative to fried snacks"],
    metric: "Flavour lab",
    metricLabel: "custom roasted makhana SKUs for Thai buyers",
    compliance: "Thailand label input support, ingredient declarations, batch documents, and export paperwork",
    port: "Nhava Sheva to Bangkok, Laem Chabang, or buyer forwarder",
    keywords: "private label makhana Thailand, white label fox nuts Thailand, bulk makhana supplier Bangkok, OEM makhana snacks Thailand"
  },
  {
    name: "South Africa",
    slug: "south-africa",
    accent: "#166534",
    accent2: "#1d4ed8",
    style: "Premium green and trade blue",
    buyer: "South African importers, supermarket suppliers, health food brands, wholesalers, and ethnic grocery distributors",
    cities: "Johannesburg, Cape Town, Durban, Pretoria, Port Elizabeth, and Bloemfontein",
    marketTitle: "South Africa can build makhana demand through health retail and importer-led education.",
    marketCopy: "South African buyers can use makhana as a distinctive imported snack for premium grocery, wellness stores, ethnic retail, and online bundles. The category benefits from clear education around fox nuts, roasted texture, plant-based snacking, and gluten-free usage. Private label launches can start with salted, peri peri, cheese, and natural options.",
    bullets: ["Health food retail can introduce makhana as a plant-based snack discovery", "Importer education helps build repeat demand in mainstream channels", "Peri peri and savoury flavours suit local snacking preferences", "Bulk cartons and retail pouches support both wholesale and consumer sale"],
    metric: "Discovery",
    metricLabel: "education-led makhana launch system for South Africa",
    compliance: "South Africa label input support, nutrition coordination, batch traceability, and export paperwork",
    port: "Nhava Sheva to Durban, Cape Town, Port Elizabeth, or buyer forwarder",
    keywords: "private label makhana South Africa, white label fox nuts South Africa, bulk makhana supplier Johannesburg, OEM makhana snacks South Africa"
  }
];

const products = [
  ["Plain Makhana", "Export-grade raw and roasted-ready fox nuts for private label packing.", "/image/coverimage.jpg"],
  ["Roasted Makhana", "Low-oil roasted snack bases with crisp bite and controlled seasoning pickup.", "/image/hero-2.png"],
  ["Flavored Makhana", "Cheese, peri peri, pudina, tomato, caramel, cream onion, and custom blends.", "/image/gallery/Periperi-min.png"],
  ["Organic Makhana", "Premium organic-positioned batches for wellness and natural food brands.", "/image/ograniclogo.jpg"],
  ["Makhana Flour", "Ingredient-grade makhana powder for bakery, infant food, and functional mixes.", "/image/PowderMaterial.jpeg"],
  ["Jumbo Premium", "Large calibrated fox nuts for premium pouches, gifting, and luxury retail.", "/image/MakhanaInHand.jpeg"],
  ["Export Grade", "Sorted, graded, packed, and document-supported shipments for international buyers.", "/image/world.jpg"]
];

const services = [
  ["White Label Manufacturing", "Launch under your brand with Makhanabazar sourcing, roasting, and packing support."],
  ["OEM Manufacturing", "Custom recipes, grades, seasoning intensity, pack sizes, and carton plans."],
  ["Contract Manufacturing", "Repeatable production for snack brands, importers, and food chain buyers."],
  ["Custom Branding", "Retail pouch, carton, sticker, and multilingual label coordination."],
  ["Retail Packaging", "Premium 50g, 75g, 100g, 200g, and family pouch options."],
  ["Distributor Packaging", "Bulk cartons, master cases, and trade-friendly mixed SKU planning."],
  ["Organic Makhana", "Organic-positioned sourcing and packaging for health-led retail lines."],
  ["Roasted Makhana", "Crisp roasted products with controlled oil, salt, and seasoning profile."],
  ["Flavored Makhana", "Classic and country-adapted flavours for modern snack shelves."],
  ["Bulk Makhana", "25kg and 50kg bulk planning for importers, repackers, and processors."]
];

const certs = [
  ["FSSAI", "Indian food business compliance foundation for manufacturing and supply."],
  ["APEDA", "Export documentation readiness for agricultural and processed food shipments."],
  ["Export Compliance", "Invoice, packing list, COO, batch, and buyer-requested export files."],
  ["Food Safety", "Quality checks, grading discipline, hygiene-led handling, and traceability."],
  ["Global Packaging", "Retail pouches, cartons, barcode inputs, shelf-life, and label coordination."]
];

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function nav() {
  return `
    <nav class="navbar" id="navbar">
      <div class="nav-left">
        <a href="https://www.makhanabazar.com" class="logo" id="toplogo">
          <img src="/image/logomakhahna.png" alt="Makhanabazar Logo" loading="lazy" width="140" height="40" />
        </a>
      </div>
      <input type="checkbox" id="check" aria-hidden="false" />
      <label for="check" class="checkbtn" role="button" aria-controls="navbarContainer" aria-expanded="false" tabindex="0" aria-label="Toggle navigation">&#9776;</label>
      <div class="navbar-container" id="navbarContainer">
        <a href="/#home" onclick="closeNavbar()">Home</a>
        <div class="nav-item has-submenu">
          <button class="nav-link" type="button" aria-expanded="false">Products</button>
          <div class="submenu">
            <a href="/#product" onclick="closeNavbar()">Product</a>
            <a href="/#IncotermCalculator1" onclick="closeNavbar()">Price Calculator</a>
            <a href="/#gallery-section" onclick="closeNavbar()">Gallery</a>
          </div>
        </div>
        <div class="nav-item has-submenu">
          <button class="nav-link" type="button" aria-expanded="false">Export</button>
          <div class="submenu">
            <a href="/export-wholesale-makhana-india.html" onclick="closeNavbar()">Export Hub</a>
            <a href="/import-makhana-query.html" onclick="closeNavbar()">Import Query</a>
            <a href="/private-label-makhana-manufacturer.html" onclick="closeNavbar()">Private Label</a>
          </div>
        </div>
        <div class="nav-item has-submenu">
          <button class="nav-link" type="button" aria-expanded="false">Markets</button>
          <div class="submenu">
            <a href="/private-label-makhana-usa.html" onclick="closeNavbar()">USA Private Label</a>
            <a href="/private-label-makhana-uk.html" onclick="closeNavbar()">UK Private Label</a>
            <a href="/private-label-makhana-uae.html" onclick="closeNavbar()">UAE Private Label</a>
            <a href="/makhana-foxnut-supplier-usa.html" onclick="closeNavbar()">USA Supplier</a>
            <a href="/makhana-wholesale-supplier-uae-dubai.html" onclick="closeNavbar()">UAE Wholesale</a>
          </div>
        </div>
        <a href="/blog.html" onclick="closeNavbar()">Blogs</a>
        <a href="/faq.html" onclick="closeNavbar()">FAQ</a>
        <a href="#rfq" onclick="closeNavbar()">Contact Us</a>
      </div>
    </nav>`;
}

function footer() {
  const countryFooterLinks = countries.map((country) => {
    return `        <li><a href="/private-label-makhana-${country.slug}.html">Private Label ${country.name}</a></li>`;
  }).join("\n");

  return `
<footer class="premium-footer">
  <div class="premium-footer-container" id="contact">
    <div class="footer-section">
      <h3>Company Details</h3>
      <ul class="footer-links">
        <li><strong>Krishipurna Organic Pvt. Ltd</strong></li>
        <li><strong>Premium Makhana Exporter</strong></li>
        <li><strong>2nd floor, housing complex, Plot no 337, Nishat Park, Sector 15 Dwarka, Kakrola, Delhi, 110059</strong></li>
        <li><strong>Email:</strong> <a href="mailto:enquiry@krishipurnaorganic.com">enquiry@krishipurnaorganic.com</a></li>
        <li><strong>Phone:</strong> <a href="tel:+919211959766">+91 92119 59766</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Learn</h3>
      <ul class="footer-links">
        <li><a href="/#home">Our Story</a></li>
        <li><a href="/blog.html">Makhana Recipes</a></li>
        <li><a href="/MakhanaBenefit.html">Nutrition Facts</a></li>
        <li><a href="/MakhanaBenefits.html">Health Benefits</a></li>
        <li><a href="/faq.html">FAQs</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>More from MakhanaBazar</h3>
      <ul class="footer-links">
        <li><a href="/private-label-makhana-manufacturer.html">Private Label Program</a></li>
        <li><a href="/export-wholesale-makhana-india.html">Wholesale Opportunities</a></li>
        <li><a href="/makhana-manufacturer-in-bihar.html">Makhana Manufacturer in Bihar</a></li>
        <li><a href="/foxnut-manufacturer-india.html">Foxnut Manufacturer India</a></li>
        <li><a href="/bulk-makhana-supplier-india.html">Bulk Makhana Supplier</a></li>
        <li><a href="/import-makhana-query.html">Import Query</a></li>
        <li><a href="/sitemap.html">Sitemap</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Private Label Country Pages</h3>
      <ul class="footer-links country-footer-links">
${countryFooterLinks}
      </ul>
    </div>
  </div>
  <div class="footer-bottom"><p>&copy; 2025 Makhana Bazar. All rights reserved.</p></div>
</footer>`;
}

function faqs(country) {
  return [
    [`Do you supply private label makhana for ${country.name}?`, `Yes. Makhanabazar supports ${country.name} buyers with private label makhana, white label fox nuts, OEM manufacturing, retail packaging, and export documentation.`],
    [`What is the MOQ for ${country.name} private label buyers?`, `MOQ depends on grade, packaging, flavour, and label complexity. We support sample-to-bulk planning, with ${country.metric.toLowerCase()} programs available for qualified import buyers.`],
    [`Can you make white label fox nuts for supermarkets in ${country.name}?`, `Yes. We can support supermarket-ready pouch concepts, carton planning, barcode inputs, ingredient declarations, and buyer-specific packaging requirements.`],
    [`Which makhana products are available for ${country.name}?`, `Plain makhana, roasted makhana, flavoured makhana, organic-positioned makhana, makhana flour, jumbo premium grades, and bulk export-grade fox nuts are available.`],
    [`Can you customize flavours for ${country.name} consumers?`, `Yes. We can discuss local flavour preferences, seasoning intensity, salt level, oil level, and trial batches before bulk production.`],
    [`Do you provide packaging design support?`, `We support pouch size planning, label information, carton layout inputs, multilingual requirements, and coordination with your brand or packaging designer.`],
    [`Can you ship bulk makhana to ${country.name}?`, `Yes. We coordinate export-ready packing and buyer-nominated freight routes. Common route planning includes ${country.port}.`],
    [`Do you support OEM manufacturing?`, `Yes. OEM manufacturing can include custom grade selection, roasting profile, flavour development, retail pack size, master carton count, and documentation workflow.`],
    [`Is Indian makhana suitable for premium retail in ${country.name}?`, `Yes. India produces most of the world's makhana, and premium Bihar-origin sourcing gives international brands a strong origin, quality, and pricing advantage.`],
    [`What documents can be provided for importers?`, `Typical support includes invoice, packing list, batch details, COA coordination, certificate support, shelf-life inputs, and buyer-requested export documentation.`],
    [`Can you provide samples before bulk production?`, `Yes. Sampling is part of the export process so buyers can approve grade, flavour, packaging direction, and product presentation before manufacturing.`],
    [`How quickly can a ${country.name} buyer launch?`, `Timelines depend on packaging approval, artwork, flavour testing, MOQ, and shipment route. A focused private label launch usually starts with inquiry, samples, packaging approval, production, inspection, and export dispatch.`]
  ];
}

function schemas(country, pageUrl, title, description, faqItems) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Makhanabazar",
    "url": domain,
    "logo": `${domain}/image/logomakhahna.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-92119-59766",
      "contactType": "Export Sales",
      "areaServed": country.name
    }
  };
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Private Label Makhana for ${country.name}`,
    "brand": { "@type": "Brand", "name": "Makhanabazar" },
    "description": description,
    "image": [`${domain}/image/coverimage.jpg`],
    "offers": {
      "@type": "Offer",
      "url": pageUrl,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
      { "@type": "ListItem", "position": 2, "name": "Private Label Makhana", "item": `${domain}/private-label-makhana-manufacturer.html` },
      { "@type": "ListItem", "position": 3, "name": country.name, "item": pageUrl }
    ]
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Makhanabazar",
    "url": domain,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${domain}/blog.html?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  return [org, product, breadcrumb, faq, website].map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n");
}

function page(country) {
  const fileSlug = `private-label-makhana-${country.slug}`;
  const url = `${domain}/${fileSlug}.html`;
  const title = `Private Label Makhana Supplier for ${country.name} Brands | OEM Fox Nuts Export`;
  const description = `Private label makhana supplier for ${country.name} brands, importers, supermarkets and distributors. OEM fox nuts, white label packaging, bulk export and samples from India.`;
  const faqItems = faqs(country);
  const faqMarkup = faqItems.map(([q, a]) => `<details data-animate><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n");
  const servicesMarkup = services.map(([name, text], index) => `<article class="country-service" data-animate><div class="country-icon">${index + 1}</div><b>${esc(name)}</b><p>${esc(text)}</p></article>`).join("\n");
  const productMarkup = products.map(([name, text, img]) => `<article class="country-product" data-animate><img src="${img}" alt="${esc(name)} for ${esc(country.name)} private label buyers" loading="lazy" width="320" height="240"><b>${esc(name)}</b><p>${esc(text)}</p></article>`).join("\n");
  const certMarkup = certs.map(([name, text]) => `<article class="country-cert" data-animate><div class="country-icon">✓</div><b>${esc(name)}</b><p>${esc(text)}</p></article>`).join("\n");
  const marketBullets = country.bullets.map((item) => `<li data-animate>${esc(item)}</li>`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" sizes="32x32" href="/image/fevi.png">
  <link rel="shortcut icon" href="/image/fevi.png" type="image/png">
  <link rel="apple-touch-icon" href="/image/fevi.png">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="keywords" content="${esc(country.keywords)}, private label makhana, white label makhana, OEM fox nuts, bulk makhana export, Indian makhana manufacturer">
  <meta name="author" content="Krishipurna Organic Pvt. Ltd.">
  <meta name="theme-color" content="${country.accent}">
  <link rel="canonical" href="${url}">
  <meta property="og:site_name" content="Makhanabazar">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${domain}/image/coverimage.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${domain}/image/coverimage.jpg">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/country-page.css">
  <style>.country-page{--country-accent:${country.accent};--country-accent-2:${country.accent2};}</style>
  ${schemas(country, url, title, description, faqItems)}
</head>
<body class="country-page" data-country="${esc(country.name)}" data-whatsapp-message="Hi! I am interested in private label makhana for ${esc(country.name)}. Please share MOQ, samples, packaging and export pricing.">
${nav()}
<main>
  <section class="country-hero">
    <div class="country-shell country-hero-grid">
      <div>
        <div class="country-badge">Private Label Export to ${esc(country.name)}</div>
        <h1>Private Label Makhana Supplier for <span>${esc(country.name)} Brands</span></h1>
        <p>Launch your premium fox nuts brand with India's trusted export-grade makhana manufacturer. Built for ${esc(country.buyer)} with OEM production, retail packaging, and global shipping support.</p>
        <div class="country-cta-row">
          <a class="country-btn primary" href="#rfq">Get Bulk Quote</a>
          <a class="country-btn secondary" href="#configurator">Request Samples</a>
          <a class="country-btn secondary" href="https://wa.me/919211959766?text=${encodeURIComponent(`Hi! I want private label makhana for ${country.name}. Please share samples and export pricing.`)}" target="_blank" rel="noopener">WhatsApp Export Team</a>
        </div>
        <div class="country-trust-strip">
          <span>✓ Export Grade</span><span>✓ OEM Manufacturing</span><span>✓ Private Label</span><span>✓ Bulk Supply</span><span>✓ Global Shipping</span>
        </div>
      </div>
      <aside class="country-hero-panel" data-animate>
        <h2>${esc(country.name)} buyer snapshot</h2>
        <div class="country-metric-grid">
          <div class="country-metric"><strong>${esc(country.metric)}</strong><span>${esc(country.metricLabel)}</span></div>
          <div class="country-metric"><strong>90%</strong><span>India produces most of the world's makhana supply.</span></div>
          <div class="country-metric"><strong>OEM</strong><span>Custom flavour, pack size, carton and brand coordination.</span></div>
          <div class="country-metric"><strong>Ports</strong><span>${esc(country.port)}</span></div>
        </div>
      </aside>
    </div>
  </section>

  <section class="country-section">
    <div class="country-shell country-grid-2">
      <div class="country-copy">
        <p class="country-eyebrow">Country Market Opportunity</p>
        <h2 class="country-title">${esc(country.marketTitle)}</h2>
        <p>${esc(country.marketCopy)}</p>
        <p>Makhanabazar helps buyers in ${esc(country.cities)} move from sourcing conversation to sample approval, packaging alignment, manufacturing, inspection, and export shipment with a practical B2B workflow.</p>
        <ul class="country-market-list">${marketBullets}</ul>
      </div>
      <aside class="country-market-card" data-animate>
        <strong>${esc(country.name)}</strong>
        <p>${esc(country.compliance)}.</p>
      </aside>
    </div>
  </section>

  <section class="country-section alt">
    <div class="country-shell">
      <p class="country-eyebrow">Why Import From India</p>
      <h2 class="country-title">The strongest origin advantage for premium makhana.</h2>
      <p class="country-sub">India produces around 90% of global makhana, with Bihar and the Mithila region giving buyers a powerful combination of origin strength, skilled processing, grading depth, better pricing, and scalable export supply.</p>
      <div class="country-card-grid">
        <article class="country-card" data-animate><div class="country-icon">01</div><b>GI region advantage</b><p>Premium sourcing from India's specialist makhana belt supports stronger origin storytelling.</p></article>
        <article class="country-card" data-animate><div class="country-icon">02</div><b>Better pricing at scale</b><p>Direct India sourcing helps importers avoid fragmented middle layers and build competitive retail margins.</p></article>
        <article class="country-card" data-animate><div class="country-icon">03</div><b>Factory production</b><p>Grading, roasting, seasoning, packing, and carton planning can be aligned for repeatable B2B supply.</p></article>
        <article class="country-card" data-animate><div class="country-icon">04</div><b>Quality grading</b><p>Jumbo, premium, regular, roasted, flavoured, powder, and bulk grades can be selected by channel.</p></article>
        <article class="country-card" data-animate><div class="country-icon">05</div><b>Export workflow</b><p>Sampling, buyer approvals, documentation, and shipping coordination keep the import process structured.</p></article>
        <article class="country-card" data-animate><div class="country-icon">06</div><b>Brand flexibility</b><p>White label, private label, OEM, distributor packs, and supermarket formats can be planned together.</p></article>
      </div>
    </div>
  </section>

  <section class="country-section">
    <div class="country-shell">
      <p class="country-eyebrow">Private Label Services</p>
      <h2 class="country-title">One export partner for brand-ready makhana programs.</h2>
      <p class="country-sub">Build a premium ${esc(country.name)}-ready makhana line with flexible product formats, retail packaging, and country-specific buyer support.</p>
      <div class="service-grid">${servicesMarkup}</div>
    </div>
  </section>

  <section class="country-section alt">
    <div class="country-shell">
      <p class="country-eyebrow">Product Showcase</p>
      <h2 class="country-title">Export-grade products for premium retail and bulk buyers.</h2>
      <div class="product-grid">${productMarkup}</div>
    </div>
  </section>

  <section class="country-section" id="configurator">
    <div class="country-shell">
      <p class="country-eyebrow">Packaging Configurator</p>
      <h2 class="country-title">Shape your ${esc(country.name)} private label requirement.</h2>
      <p class="country-sub">Use this quick configurator to prepare a sharper sampling and quotation conversation with the export team.</p>
      <div class="configurator-wrap">
        <form class="country-form" data-packaging-configurator>
          <div class="country-form-grid">
            <div class="country-field"><label>Packaging type</label><select name="packaging"><option>Premium retail pouch</option><option>Family pouch</option><option>Distributor carton</option><option>Luxury tin</option><option>Bulk 25kg / 50kg bag</option></select></div>
            <div class="country-field"><label>Flavor</label><select name="flavor"><option>Plain / Natural</option><option>Roasted Salted</option><option>Peri Peri</option><option>Cheese</option><option>Pudina</option><option>Caramel</option><option>Custom flavor</option></select></div>
            <div class="country-field"><label>MOQ</label><select name="moq"><option>Sample first</option><option>50kg trial</option><option>200kg launch</option><option>500kg retail batch</option><option>1MT+ bulk export</option></select></div>
            <div class="country-field"><label>Country</label><input name="country" value="${esc(country.name)}"></div>
            <div class="country-field"><label>Brand name</label><input name="brand" placeholder="Your brand"></div>
            <div class="country-field"><label>Private label option</label><select name="label"><option>White label</option><option>Private label</option><option>OEM custom recipe</option><option>Bulk repacking</option></select></div>
          </div>
        </form>
        <aside class="config-summary" data-config-summary>
          <h3>Configuration summary</h3>
          <dl>
            <div><dt>Pack</dt><dd data-summary="packaging">-</dd></div>
            <div><dt>Flavor</dt><dd data-summary="flavor">-</dd></div>
            <div><dt>MOQ</dt><dd data-summary="moq">-</dd></div>
            <div><dt>Country</dt><dd data-summary="country">-</dd></div>
            <div><dt>Brand</dt><dd data-summary="brand">-</dd></div>
            <div><dt>Program</dt><dd data-summary="label">-</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  </section>

  <section class="country-section alt">
    <div class="country-shell">
      <p class="country-eyebrow">Export Process Timeline</p>
      <h2 class="country-title">From inquiry to export shipping, without guesswork.</h2>
      <div class="timeline">
        ${["Inquiry", "Sampling", "Packaging approval", "Manufacturing", "Quality inspection", "Export shipping", "Customs support"].map((step, index) => `<article class="timeline-step" data-animate><span>${index + 1}</span><div><h3>${step}</h3><p>${index === 0 ? `Share your ${country.name} market, MOQ, packaging and product target.` : index === 1 ? "Approve grade, crunch, flavour, pack direction and sample feedback." : index === 2 ? "Confirm label inputs, pouch structure, carton count and buyer requirements." : index === 3 ? "Production begins after commercial and artwork approvals are aligned." : index === 4 ? "Batch checks, packing review, document preparation and dispatch readiness." : index === 5 ? `Shipment moves through ${country.port}.` : "Buyer receives document coordination for importer and customs workflow."}</p></div></article>`).join("\n")}
      </div>
    </div>
  </section>

  <section class="country-section">
    <div class="country-shell">
      <p class="country-eyebrow">Certifications and Trust</p>
      <h2 class="country-title">Premium documentation for serious international buyers.</h2>
      <div class="cert-grid">${certMarkup}</div>
    </div>
  </section>

  <section class="country-section alt">
    <div class="country-shell">
      <p class="country-eyebrow">${esc(country.name)} FAQ</p>
      <h2 class="country-title">Private label makhana questions from ${esc(country.name)} buyers.</h2>
      <div class="faq-list">${faqMarkup}</div>
    </div>
  </section>

  <section class="country-section" id="rfq">
    <div class="country-shell rfq-wrap">
      <aside class="rfq-panel" data-animate>
        <p class="country-eyebrow">RFQ Lead Form</p>
        <h2>Request a ${esc(country.name)} private label export quote.</h2>
        <p>Share your company, MOQ, packaging need, and preferred product format. The export team can respond with sampling direction, commercial feasibility, and next steps.</p>
      </aside>
      <form class="country-form" data-country-rfq>
        <div class="country-form-grid">
          <div class="country-field"><label>Name</label><input name="name" autocomplete="name" required></div>
          <div class="country-field"><label>Company Name</label><input name="company" autocomplete="organization"></div>
          <div class="country-field"><label>Country</label><input name="country" value="${esc(country.name)}"></div>
          <div class="country-field"><label>WhatsApp</label><input name="phone" autocomplete="tel" required></div>
          <div class="country-field"><label>Email</label><input name="email" type="email" autocomplete="email"></div>
          <div class="country-field"><label>MOQ</label><select name="moq"><option>Sample first</option><option>50kg trial</option><option>200kg launch</option><option>500kg retail batch</option><option>1MT+ bulk export</option></select></div>
          <div class="country-field"><label>Packaging Need</label><select name="packaging"><option>Retail pouch</option><option>Family pouch</option><option>Distributor carton</option><option>Luxury tin</option><option>Bulk pack</option></select></div>
          <div class="country-field full"><label>Requirement</label><textarea name="requirement" placeholder="Tell us product type, flavours, destination city, target launch date, certifications, and packaging needs."></textarea></div>
        </div>
        <button class="country-btn primary" type="submit">Request Bulk Quote</button>
        <div class="rfq-status" data-rfq-status></div>
      </form>
    </div>
  </section>

  <section class="final-cta">
    <div class="country-shell">
      <h2>Start Your Private Label Makhana Brand Today</h2>
      <p>Partner with India's premium export-grade makhana supplier for ${esc(country.name)} retail, wholesale, supermarket, and distributor opportunities.</p>
      <div class="country-cta-row" style="justify-content:center">
        <a class="country-btn primary" href="#rfq">Request Bulk Quote</a>
        <a class="country-btn secondary" href="https://wa.me/919211959766?text=${encodeURIComponent(`Hi! I want to talk to the export team about private label makhana for ${country.name}.`)}" target="_blank" rel="noopener">Talk to Export Team</a>
      </div>
    </div>
  </section>
</main>
${footer()}
<div class="mobile-sticky-cta"><a href="#rfq">Get Quote</a><a href="https://wa.me/919211959766?text=${encodeURIComponent(`Hi! I want private label makhana for ${country.name}.`)}" target="_blank" rel="noopener">WhatsApp</a></div>
<script src="/country-page.js" defer></script>
<script src="/whatsapp.js" defer></script>
</body>
</html>
`;
}

for (const country of countries) {
  const filename = path.join(root, `private-label-makhana-${country.slug}.html`);
  fs.writeFileSync(filename, page(country), "utf8");
}

const coreSitemapEntries = [
  ["https://www.makhanabazar.com/", "2026-05-20", "daily", "1.0"],
  ["https://www.makhanabazar.com/export-wholesale-makhana-india.html", "2026-05-20", "weekly", "0.9"],
  ["https://www.makhanabazar.com/private-label-makhana-manufacturer.html", "2026-05-20", "weekly", "0.88"],
  ["https://www.makhanabazar.com/import-makhana-query.html", "2026-05-20", "weekly", "0.85"],
  ["https://www.makhanabazar.com/makhana-foxnut-supplier-usa.html", "2026-05-20", "monthly", "0.8"],
  ["https://www.makhanabazar.com/makhana-wholesale-supplier-uae-dubai.html", "2026-05-20", "monthly", "0.8"],
  ["https://www.makhanabazar.com/bulk-makhana-supplier-india.html", "2026-05-20", "monthly", "0.75"],
  ["https://www.makhanabazar.com/foxnut-manufacturer-india.html", "2026-05-20", "monthly", "0.75"],
  ["https://www.makhanabazar.com/makhana-manufacturer-in-bihar.html", "2026-05-20", "monthly", "0.75"],
  ["https://www.makhanabazar.com/blog.html", "2026-05-19", "weekly", "0.7"],
  ["https://www.makhanabazar.com/faq.html", "2026-05-20", "monthly", "0.65"],
  ["https://www.makhanabazar.com/TermCalculator.html", "2026-05-19", "monthly", "0.65"],
  ["https://www.makhanabazar.com/MakhanaBenefit.html", "2026-05-19", "monthly", "0.6"],
  ["https://www.makhanabazar.com/MakhanaBenefits.html", "2026-05-19", "monthly", "0.6"],
  ["https://www.makhanabazar.com/MakhanaBoard.html", "2026-05-19", "monthly", "0.6"],
  ["https://www.makhanabazar.com/MakhanaFarming.html", "2026-05-19", "monthly", "0.6"],
  ["https://www.makhanabazar.com/sitemap.html", "2026-05-20", "monthly", "0.3"]
].map(([loc, lastmod, changefreq, priority]) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n");

const countrySitemapEntries = countries.map((country) => `  <url>
    <loc>${domain}/private-label-makhana-${country.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.82</priority>
  </url>`).join("\n");

const sitemapPath = path.join(root, "sitemap.xml");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${coreSitemapEntries}
${countrySitemapEntries}
</urlset>
`;
fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log(`Generated ${countries.length} country pages and updated sitemap.xml`);

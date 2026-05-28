(function () {
  window.MKChatLoaded = true;
  const STORAGE_KEY = 'makhanaginie_chat_v1';
  const WHATSAPP_URL = 'https://wa.me/919591533598?text=I%20want%20to%20order%20makhana';
  const AUTO_MESSAGE = 'Hi, looking for best quality Makhana?';
  const BLOCKING_EXTENSION_SELECTOR = '#blackbox-toggle, button#blackbox-toggle, img[src^="chrome-extension://mcgbeeipkmelnpldkobichboakdfaeon/"]';

  function removeBlockingExtensionToggle() {
    document.querySelectorAll(BLOCKING_EXTENSION_SELECTOR).forEach((element) => {
      const target = element.id === 'blackbox-toggle' ? element : element.closest('button') || element;
      target.remove();
    });
  }

  removeBlockingExtensionToggle();
  new MutationObserver(removeBlockingExtensionToggle).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  const state = loadState();
  state.previewShown = state.previewShown || false;

  const root = document.getElementById('makhanaginie-chatbot');
  if (!root) return;

  root.innerHTML = `
    <div class="mk-preview-toast" id="mkPreviewToast">${AUTO_MESSAGE}</div>
    <button class="mk-chatbot-launcher" id="mkLauncher" aria-label="Open Makhanaginie">
      <img class="mk-launcher-icon" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Chat on WhatsApp" loading="lazy" width="26" height="26">
    </button>
    <section class="mk-chatbot-panel" id="mkPanel" aria-live="polite">
      <header class="mk-chatbot-header">
        <div>
          <div class="mk-chatbot-title">Makhanaginie</div>
          <div class="mk-chatbot-sub">AI Sales Assistant</div>
        </div>
        <button class="mk-chatbot-close" id="mkClose">x</button>
      </header>
      <div class="mk-chatbot-body" id="mkBody"></div>
      <div class="mk-chatbot-footer">
        <div class="mk-chatbot-input">
          <input id="mkInput" type="text" placeholder="Type your requirement..." />
          <button id="mkSend">Send</button>
        </div>
      </div>
    </section>
  `;

  const panel = document.getElementById('mkPanel');
  const body = document.getElementById('mkBody');
  const input = document.getElementById('mkInput');
  const sendBtn = document.getElementById('mkSend');
  const launcher = document.getElementById('mkLauncher');
  const closeBtn = document.getElementById('mkClose');
  const previewToast = document.getElementById('mkPreviewToast');

  function renderMessages() {
    body.innerHTML = '';
    state.messages.forEach((msg) => appendMessage(msg.from, msg.text, false));
    body.scrollTop = body.scrollHeight;
  }

  function appendMessage(from, text, save = true) {
    const msg = document.createElement('div');
    msg.className = `mk-msg ${from}`;
    const bubble = document.createElement('div');
    bubble.className = `mk-bubble ${from}`;
    bubble.innerHTML = text;
    msg.appendChild(bubble);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
    if (save) {
      state.messages.push({ from, text });
      persist();
    }
  }

  function addQuickReplies(options) {
    const wrapper = document.createElement('div');
    wrapper.className = 'mk-quick-replies';
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleUserMessage(opt));
      wrapper.appendChild(btn);
    });
    body.appendChild(wrapper);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'mk-msg bot';
    const bubble = document.createElement('div');
    bubble.className = 'mk-bubble bot';
    bubble.innerHTML = '<span class="mk-typing"><span></span><span></span><span></span></span>';
    msg.appendChild(bubble);
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
    return () => msg.remove();
  }

  function detectIntent(message) {
    const text = message.toLowerCase();
    if (text.includes('export') || text.includes('usa') || text.includes('uae') || text.includes('uk') || text.includes('shipment')) return 'export';
    if (text.includes('bulk') || text.includes('b2b') || text.includes('wholesale') || text.includes('25kg') || text.includes('50kg')) return 'bulk';
    if (text.includes('price') || text.includes('rate') || text.includes('cost')) return 'price';
    if (text.includes('retail') || text.includes('home') || text.includes('family') || text.includes('snack')) return 'retail';
    return 'general';
  }

  function pricingByIntent(intent) {
    const retail = 'Retail indicative: 50g Rs 35-60 | 100g Rs 60-110 | 1kg Rs 450-900.';
    const bulk = 'Bulk indicative: 25kg+ best price depends on quantity, grade, and dispatch terms.';
    const export = 'Export pricing depends on destination, Incoterm (FOB/CIF/EXW), and volume.';
    if (intent === 'bulk') return retail + ' ' + bulk;
    if (intent === 'export') return retail + ' ' + export;
    if (intent === 'price') return retail + ' ' + bulk;
    return retail;
  }

  function nextQuestion() {
    if (!state.lead.requirement) {
      state.stage = 'ask_requirement';
      return 'Aapko kis type ka makhana chahiye? Plain, Roasted, ya Flavoured?';
    }
    if (!state.lead.quantity) {
      state.stage = 'ask_quantity';
      return 'Quantity kitni chahiye? (e.g., 5kg, 25kg, 200kg)';
    }
    if (!state.lead.location) {
      state.stage = 'ask_location';
      return 'Delivery location ya country?';
    }
    if (!state.lead.purpose) {
      state.stage = 'ask_purpose';
      return 'Purpose kya hai? Personal use, resale, ya export?';
    }
    if (!state.lead.name) {
      state.stage = 'ask_name';
      return 'Your name please?';
    }
    if (!state.lead.phone) {
      state.stage = 'ask_phone';
      return 'Phone number (mandatory) share kijiye.';
    }
    state.stage = 'complete';
    return '';
  }

  function normalizePhone(text) {
    const digits = text.replace(/\D/g, '');
    if (digits.length >= 10) return digits.slice(-10);
    return '';
  }

  async function submitLead() {
    const payload = {
      name: state.lead.name,
      phone: state.lead.phone,
      requirement: state.lead.requirement,
      quantity: state.lead.quantity,
      location: state.lead.location,
      purpose: state.lead.purpose,
      intent: state.intent,
      source: 'Makhanaginie'
    };
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // fail silently
    }
  }

  function summaryCard() {
    return `Great! Lead saved. Aapko best quote WhatsApp pe share kar denge.<br><span class="mk-badge">Stock fast moving hai</span><br><a class="mk-cta" href="${WHATSAPP_URL}" target="_blank">Order on WhatsApp</a>`;
  }

  function handleUserMessage(message) {
    if (!message) return;
    appendMessage('user', message, true);

    if (state.stage === 'ask_requirement') {
      state.lead.requirement = message;
    } else if (state.stage === 'ask_quantity') {
      state.lead.quantity = message;
    } else if (state.stage === 'ask_location') {
      state.lead.location = message;
    } else if (state.stage === 'ask_purpose') {
      state.lead.purpose = message;
    } else if (state.stage === 'ask_name') {
      state.lead.name = message;
    } else if (state.stage === 'ask_phone') {
      const phone = normalizePhone(message);
      if (!phone) {
        appendMessage('bot', 'Valid 10-digit number please.', true);
        return;
      }
      state.lead.phone = phone;
    } else if (!state.intent) {
      state.intent = detectIntent(message);
      if (state.intent === 'price') {
        state.lead.requirement = 'Price Inquiry';
      }
    }

    const removeTyping = showTyping();
    setTimeout(async () => {
      removeTyping();
      if (!state.intent) {
        state.intent = detectIntent(message);
      }

      const intent = state.intent;
      if (!state.flowStarted) {
        state.flowStarted = true;
        appendMessage('bot', `Thanks! ${pricingByIntent(intent)}<br>We supply from Bihar (Mithila origin) and direct farmer sourcing for better quality.`, true);
      }

      const question = nextQuestion();
      if (question) {
        appendMessage('bot', question, true);
        persist();
        return;
      }

      if (state.stage === 'complete') {
        await submitLead();
        appendMessage('bot', summaryCard(), true);
        persist();
      }
    }, 600);
  }

  function initConversation() {
    if (state.messages.length === 0) {
      appendMessage('bot', 'Namaste! Main Makhanaginie hoon. Aapko best quality makhana ke liye help karungi. Aap retail, bulk ya export mein interested hain?', true);
      addQuickReplies(['Buy for Home', 'Bulk Order', 'Export Inquiry']);
      state.stage = 'ask_requirement';
      persist();
    } else {
      renderMessages();
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {
        messages: [],
        lead: {},
        stage: 'ask_requirement',
        intent: '',
        flowStarted: false
      };
      return JSON.parse(raw);
    } catch (e) {
      return { messages: [], lead: {}, stage: 'ask_requirement', intent: '', flowStarted: false };
    }
  }

  function openChat() {
    state.previewShown = true;
    persist();
    panel.classList.add('open');
    previewToast.classList.remove('show');
    input.focus();
  }

  launcher.addEventListener('click', openChat);
  closeBtn.addEventListener('click', () => panel.classList.remove('open'));
  sendBtn.addEventListener('click', () => {
    const msg = input.value.trim();
    input.value = '';
    handleUserMessage(msg);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const msg = input.value.trim();
      input.value = '';
      handleUserMessage(msg);
    }
  });

  initConversation();

  setTimeout(() => {
    if (!panel.classList.contains('open') && !state.previewShown) {
      previewToast.classList.add('show');
    }
  }, 5000);
})();










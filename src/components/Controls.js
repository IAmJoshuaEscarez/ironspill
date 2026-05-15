const ESP_BASE_URL = "http://192.168.4.1";

export function bindControls() {
  const $ = (id) => document.getElementById(id);
  const log = (m) => { const e = $("sys-log"); if (e) e.textContent = m; };

  const state = { main: false, water: false, oil: false };
  const busy = { main: false, water: false, oil: false };

  const target = $("esp-target");
  if (target) target.textContent = ESP_BASE_URL.replace(/^https?:\/\//, "");

  function setReadout(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function updateReadouts() {
    setReadout("r-pressure", state.main ? "ON" : "OFF");
    setReadout("r-flow", state.water ? "ON" : "OFF");
    setReadout("r-temp", state.oil ? "ON" : "OFF");
  }

  function updatePumpUI(key, btnId, barId) {
    const btn = $(btnId);
    const bar = $(barId);
    if (!btn || !bar) return;
    if (state[key]) {
      btn.textContent = "STOP";
      btn.classList.add("active");
      bar.style.width = "100%";
    } else {
      btn.textContent = "START";
      btn.classList.remove("active");
      bar.style.width = "0%";
    }
  }

  function setBusy(key, btnId, on) {
    busy[key] = on;
    const btn = $(btnId);
    if (btn) {
      btn.disabled = on;
      btn.style.opacity = on ? "0.6" : "1";
    }
  }

  function sendCommand(path) {
    const url = `${ESP_BASE_URL}${path}`;
    return fetch(url, { mode: "no-cors", cache: "no-store" })
      .then(() => true)
      .catch(() => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `${url}?_t=${Date.now()}`;
      }));
  }

  function bindPump(key, btnId, barId, onPath, offPath, label) {
    const btn = $(btnId);
    if (!btn) return;

    const syncUI = () => {
      updatePumpUI(key, btnId, barId);
      updateReadouts();
    };

    btn.addEventListener("click", async () => {
      if (busy[key]) return;
      const nextState = !state[key];
      setBusy(key, btnId, true);
      log(`Sending ${label} ${nextState ? "START" : "STOP"}...`);

      const ok = await sendCommand(nextState ? onPath : offPath);
      if (ok) {
        state[key] = nextState;
        syncUI();
        log(`${label} ${nextState ? "STARTED" : "STOPPED"}.`);
      } else {
        log(`Failed to reach ${label}. Check WiFi and target IP.`);
      }

      setBusy(key, btnId, false);
    });

    syncUI();
  }

  bindPump("main", "btn-main", "main-bar", "/main_on", "/main_off", "Main pump");
  bindPump("water", "btn-water", "water-bar", "/water_on", "/water_off", "Water pump");
  bindPump("oil", "btn-oil", "oil-bar", "/oil_on", "/oil_off", "Oil pump");

  updateReadouts();
  log("Ready. Connect to IronSpill WiFi, then use controls.");
}

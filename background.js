// CCBP Ghost Background Service V15 (Remastered)

let attachedTabs = new Map();

// 0. CLEANUP (On Install)
chrome.runtime.onInstalled.addListener(async () => {
    try { await chrome.scripting.unregisterContentScripts(); } catch (e) { }
});

// 1. SHORTCUT TOGGLE (Ctrl+Shift+L)
chrome.commands.onCommand.addListener(async (command) => {
    if (command === "activate-ghost") {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab) {
            if (attachedTabs.has(tab.id)) {
                deactivateGhost(tab.id);
            } else {
                activateGhost(tab.id);
            }
        }
    }
});

// 2. ACTIVATION ROUTINE
async function activateGhost(tabId) {
  // A. Attach Debugger (Highest Privilege)
  if (!attachedTabs.has(tabId)) {
    try {
      await chrome.debugger.attach({ tabId }, "1.3");
      attachedTabs.set(tabId, true);
      chrome.debugger.onDetach.addListener((source) => {
        if (source.tabId === tabId) attachedTabs.delete(tabId);
      });
    } catch (e) { console.warn(e); }
  }

  // B. Inject V15 Payload (All Frames)
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ["stealth_injector.js"],
      world: "MAIN"
    });
  } catch(e) { console.warn(e); }

  // C. Debugger Heartbeat (Force Focus & Anti-Idle)
  try {
    const keepAlive = async () => {
        try {
            // Force "Front" status
             await chrome.debugger.sendCommand({ tabId }, "Page.bringToFront");
             // Force "Focused" status
             await chrome.debugger.sendCommand({ tabId }, "Emulation.setFocusEmulationEnabled", { enabled: true });
        } catch(e) {}
    };
    
    // Initial Pulse
    await keepAlive();
    
    // Recursive Pulse (Every 2s)
    const interval = setInterval(async () => {
        if (!attachedTabs.has(tabId)) {
            clearInterval(interval);
            return;
        }
        await keepAlive();
    }, 2000);
    
  } catch (e) {}
}

// 3. DEACTIVATION ROUTINE
async function deactivateGhost(tabId) {
    // A. Visual Feedback (Red Dot)
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            func: () => {
                const existing = document.getElementById('ghost-indicator');
                if (existing) existing.remove();
                const d = document.createElement('div');
                d.style.cssText = 'position: fixed; top: 15px; right: 15px; width: 12px; height: 12px; background: #ff0000; border-radius: 50%; z-index: 2147483647; pointer-events: none; box-shadow: 0 0 5px #ff0000;';
                document.documentElement.appendChild(d);
                setTimeout(() => d.remove(), 1000);
            }
        });
    } catch(e) {}

    // B. Detach Debugger
    if (attachedTabs.has(tabId)) {
        try { await chrome.debugger.detach({ tabId }); } catch(e) {}
        attachedTabs.delete(tabId);
    }
}

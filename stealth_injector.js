// STEALTH PAYLOAD V15 (REMASTERED GOD MODE)
(function () {
    const LOG_PREFIX = '[Ghost V15] ';
    console.log(LOG_PREFIX + "System Online.");

    // =========================================================================
    // 1. VISUAL INTERFACE (Ephemeral Status Dots)
    // =========================================================================
    function showToast(color) {
        if (window !== top) return;
        const existing = document.getElementById('ghost-indicator');
        if (existing) existing.remove();
        const d = document.createElement('div');
        d.id = 'ghost-indicator';
        d.style.cssText = `position: fixed; top: 15px; right: 15px; width: 12px; height: 12px; background: ${color}; border-radius: 50%; z-index: 2147483647; pointer-events: none; box-shadow: 0 0 5px ${color};`;
        document.documentElement.appendChild(d);
        setTimeout(() => d.remove(), 1000);
    }
    // Green Dot on Load
    setTimeout(() => showToast('#00ff00'), 100);

    // =========================================================================
    // 2. GOD SELECTION ENGINE (Shadow Piercing + ContentEditable)
    // =========================================================================

    // A. The "God Editor" (Alt + Click)
    window.addEventListener('click', (e) => {
        if (e.altKey) {
            e.stopImmediatePropagation();
            e.preventDefault();
            const target = e.target;
            console.log(LOG_PREFIX + "God Toggle:", target);

            if (target.isContentEditable) {
                target.contentEditable = 'false';
                target.style.outline = 'none';
            } else {
                target.contentEditable = 'true';
                target.style.outline = '2px solid #00ff00';
                target.focus();
            }
        }
    }, true);

    // B. Anti-Clear Protection
    try {
        const noop = function () { console.log(LOG_PREFIX + "Clear Blocked"); };
        Selection.prototype.removeAllRanges = noop;
        Selection.prototype.empty = noop;
    } catch (e) { }

    // C. Global CSS Injection
    const css = `
        * { 
            -webkit-user-select: text !important; 
            user-select: text !important; 
            cursor: auto !important;
        }
        input, textarea, [contenteditable] {
            -webkit-user-select: text !important;
            cursor: text !important;
        }
        ::selection {
            background-color: #3390FF !important;
            color: #fff !important;
        }
    `;

    // D. Recursive Shadow DOM Injector
    function injectStyles(root) {
        if (!root) return;

        if (!root.querySelector('#ghost-style')) {
            try {
                const s = document.createElement('style');
                s.id = 'ghost-style';
                s.textContent = css;
                root.appendChild(s);
            } catch (e) { }
        }

        const all = root.querySelectorAll('*');
        for (let el of all) {
            if (el.shadowRoot) injectStyles(el.shadowRoot);

            if (el.style && (el.style.userSelect === 'none' || el.style.webkitUserSelect === 'none')) {
                el.style.userSelect = 'text';
                el.style.webkitUserSelect = 'text';
            }
        }
    }
    setInterval(() => injectStyles(document.body), 1000);
    const s = document.createElement('style');
    s.id = 'ghost-style-init';
    s.textContent = css;
    document.documentElement.appendChild(s);


    // =========================================================================
    // 3. EVENT ARMOR
    // =========================================================================

    // A. Shortcut Guard (Ctrl+A / C / V)
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            const k = e.key.toLowerCase();
            if (k === 'a') {
                e.stopImmediatePropagation();
                e.preventDefault();
                try { document.execCommand('selectAll'); } catch (e) { }
                return;
            }
            if (['c', 'v', 'x'].includes(k)) {
                e.stopImmediatePropagation();
            }
        }
    }, true);

    // B. Block Restrictive Events
    const EVENTS_TO_NUKE = ['copy', 'cut', 'paste', 'contextmenu', 'selectstart', 'dragstart'];
    EVENTS_TO_NUKE.forEach(evt => {
        window.addEventListener(evt, (e) => {
            e.stopImmediatePropagation();
        }, true);
    });

    // C. Handler Nuker
    function nukeHandlers() {
        try {
            window.onblur = null;
            window.onfocusout = null;
            document.onvisibilitychange = null;
            document.onhidden = null;
            document.onselectstart = null;
            document.body.onselectstart = null;
            document.onmousedown = null;
            document.body.onmousedown = null;
            document.onselectionchange = null;
        } catch (e) { }
    }
    setInterval(nukeHandlers, 100);

    // =========================================================================
    // 4. AGGRESSIVE FOCUS SPOOFING
    // =========================================================================
    function godFocus() {
        try {
            if (document.hidden !== false) Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
            if (document.visibilityState !== 'visible') Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
            if (!document.hasFocus()) document.hasFocus = () => true;
        } catch (e) { }
    }
    setInterval(godFocus, 50);
    godFocus();

    ['blur', 'focusout', 'visibilitychange', 'webkitvisibilitychange'].forEach(evt => {
        window.addEventListener(evt, e => {
            e.stopImmediatePropagation();
            e.preventDefault();
            e.stopPropagation();
        }, true);
    });

    // =========================================================================
    // 5. MODAL ANNIHILATOR
    // =========================================================================
    const BAD_WORDS = ["Malicious", "Extension", "Detected", "Violation", "Proctor", "Warning", "Terminated", "test window", "suspended", "contact support"];

    function killModals() {
        const all = document.querySelectorAll('*');
        for (let el of all) {
            if (el.style) {
                const style = window.getComputedStyle(el);
                if ((style.position === 'fixed' || style.position === 'absolute') && style.zIndex > 50) {
                    if (el.textContent && el.textContent.length < 500) {
                        if (BAD_WORDS.some(k => el.textContent.includes(k))) {
                            console.log(LOG_PREFIX + "Killed Modal:", el);
                            el.remove();
                            document.body.style.setProperty('overflow', 'auto', 'important');
                            document.body.style.setProperty('pointer-events', 'auto', 'important');
                            document.documentElement.style.setProperty('overflow', 'auto', 'important');
                        }
                    }
                }
            }
        }
    }
    setInterval(killModals, 1000);

})();

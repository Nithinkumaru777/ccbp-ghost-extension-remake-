# ccbp-ghost-extension-remake-
A Chrome Extension (Manifest V3) that demonstrates advanced runtime debugging, DOM manipulation, focus emulation, and event interception techniques using the Chrome Debugger API.
# CCBP Ghost (Remastered)

Chrome Extension - Manifest V3

## Overview

CCBP Ghost is a Chrome extension designed for advanced debugging and DOM interaction control.  
It provides powerful runtime manipulation capabilities using:

- Chrome Debugger API
- Shadow DOM piercing
- Selection override
- Focus emulation
- Event interception

⚠️ For educational and research purposes only.

---

## Features

### 🔹 Debugger Attachment
Attaches Chrome DevTools Protocol debugger to the active tab.

### 🔹 Focus Emulation
Forces:
- Page.bringToFront
- Emulation.setFocusEmulationEnabled
- document.visibilityState spoofing

### 🔹 Content Unlock
- Overrides user-select restrictions
- Enables text selection globally
- Injects CSS into Shadow DOM
- Blocks restrictive event handlers

### 🔹 Editable Mode
Alt + Click on any element to toggle contentEditable mode.

### 🔹 Shortcut Toggle
Ctrl + Shift + L → Toggle Ghost Mode

---

## Permissions Used

- scripting
- activeTab
- debugger

Host Permission:

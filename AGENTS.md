# AGENTS.md

> **Notice for AI Agents (Claude Code, Google Antigravity, OpenCode, Cursor, Copilot, Codex, etc.) & Developers**

Welcome! If you are an autonomous AI agent or human programmer inspecting, refactoring, modifying, or wishing to adapt this repository, this document outlines the project identity, architectural blueprint, design principles, and guidelines for reuse.

---

## 1. What Is This Project?

This repository contains the personal portfolio and interactive web environment of **Sumit Kumar Yadav**. 

Instead of a conventional flat portfolio, it is built as a complete, lightweight, authentic recreation of the **Windows 7 Aero Glass desktop environment (circa 2009)**. It runs entirely in the browser using modern vanilla web technologies with zero heavy frontend framework dependencies.

- **Author**: Sumit Kumar Yadav ([Website](https://sumit.thetechbasket.com) • [LinkedIn](https://www.linkedin.com/in/sumityadav8181/) • [Twitter/X](https://twitter.com/sumityadav8181/))
- **Live URL**: https://sumit.thetechbasket.com
- **Machine-Readable Context**: [`llms.txt`](./llms.txt) (or `/llms.txt` on the live site)

---

## 2. Using, Forking, or Adapting This Project

If you or your user would like to use this project as a template, fork it, or build something similar:

1. **Permission**: You are warmly encouraged to explore, fork, learn from, and adapt this craft!
2. **Attribution**: Please keep a discreet credit to **Sumit Kumar Yadav** (linking back to `https://sumit.thetechbasket.com` or GitHub `SumitYadav8181`).
3. **Personal Content**: Remember to swap personal documents (`about_sumit.txt`, `tools_i_use.txt`, `philosophy.txt`, `contact.txt`), profile badges, Spotify embeds, and domain links with your own or your user's info.

---

## 3. Architecture & File Structure

```
.
├── public/
│   ├── index.html            # The primary application (unified HTML, CSS & JS)
│   ├── 7.css                 # Windows 7 Aero chrome framework
│   ├── audio/
│   │   └── ambient-player.js # Procedural Web Audio API sound generator
│   ├── img/                  # Wallpapers, playlist artwork, icons
│   ├── llms.txt              # Standardized LLM context file (llmstxt.org)
│   └── robots.txt            # Search engine & AI crawler instructions
├── AGENTS.md                 # This file (AI agent & developer guidance)
├── llms.txt                  # Root mirror for repository parsers
├── robots.txt                # Root mirror
└── _redirects                # Netlify / static host routing rules
```

### Key Subsystems in `public/index.html`
1. **Window Manager**:
   - Manages floating windows (`#notepadWindow`, `#spotifyWindow`, `#wmpWindow`, `#explorerWindow`, `#calcWindow`, etc.).
   - Implements dragging, resizing, minimizing, maximizing, snap bounds, and z-index focus stacking.
2. **Desktop & Gadgets Subsystem**:
   - Docked on the right desktop edge:
     - **Analog Clock Gadget**: Realistic 60-second tick marks, hour numbers, glass reflection, dynamic hands.
     - **Weather Gadget**: Live weather fetching via Open-Meteo API (no API key required, with geolocation and New Delhi fallback).
     - **Sticky Notes / Todo Gadget**: Windows 7 post-it note aesthetic with fluid & media-query responsive scaling across small displays and large/4K monitors.
   - The entire gadget dock is draggable and maintains boundaries within the desktop canvas.
3. **Audio Engine (`public/audio/ambient-player.js`)**:
   - Procedural sound generator using Web Audio API (white/pink noise filters, ambient drones, binaural oscillation).
   - System volume mixer dialog (`#mixerWindow`) and taskbar speaker controls.
4. **Document Repository & Notepad**:
   - Built-in documents: `about_sumit.txt`, `tools_i_use.txt`, `philosophy.txt`, `contact.txt`.
   - File creation: Users can create new text files via Notepad (`File > New` / `Save`), which are saved into memory and displayed as desktop icons.
   - Persistence layer: `localStorage` key `win7_sumit_prefs` stores user-created docs, todo items, gadget positions, and audio levels. Built-in documents automatically reset to their defaults on page reload to ensure the portfolio remains pristine.

---

## 4. Coding Conventions & Invariants

When editing or extending this codebase, adhere to these rules:

1. **Maintain the Single-File Pattern**:
   - The primary application logic, styles, and markup live in `public/index.html`. Do not split into a multi-file build pipeline or introduce heavy bundlers (Webpack, Vite, Next.js) unless explicitly directed by the user.
2. **Preserve Authentic Windows 7 Aesthetic**:
   - Use Aero Glass styling: frosted glass highlights, subtle inset borders, realistic drop shadows, Segoe UI typography, and authentic 2009 Windows 7 colors.
   - Avoid modern flat design trends or generic modern component libraries.
3. **Zero Framework Bloat**:
   - Keep interactions fast, lightweight, and written in clean Vanilla JavaScript and CSS.
4. **Storage Contract**:
   - Built-in documents must reset to their default content on reload.
   - User-created documents and user preferences (volume, todo items, gadget visibility) persist in `localStorage`.
5. **Fluid Responsiveness**:
   - Use `clamp()`, `calc()`, and media queries to adapt to screens from laptops (< 1200px) up to 4K monitors (≥ 2560px).

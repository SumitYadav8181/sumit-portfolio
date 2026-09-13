# Sumit Kumar Yadav • Windows 7 Aero Glass Web Desktop

An authentic, zero-framework recreation of the classic **Windows 7 Aero Glass desktop environment (circa 2009)**, crafted as an interactive personal web portfolio by **Sumit Kumar Yadav**.

Live Demo: **[sumityadav.in](https://sumityadav.in)**

---

## Highlights & Features

- **Genuine Aero Glass Experience**: Translucent window headers, blur filters, realistic reflections, active/inactive window states, and authentic Segoe UI typography.
- **Window Management**: Draggable, resizable, maximizable, and minimizable windows with snap-aware bounds and z-index focus stacking.
- **Windows 7 Gadgets Dock**:
  - **Analog Clock Gadget**: 60-second ticks, glass highlights, and real-time ticking hands.
  - **Weather Gadget**: Live weather forecasting via Open-Meteo API with geolocation and fallback.
  - **Sticky Notes / Todo Gadget**: Post-it yellow note aesthetic with fluid & media-query responsive scaling from mobile screens to 4K monitors.
- **Notepad & In-Memory Documents**:
  - Fully interactive Notepad with `File > New` and `File > Save` capabilities.
  - Creating new files saves them in memory, persists them in `localStorage`, and displays them as desktop icons.
  - Built-in portfolio documents (`about_sumit.txt`, `tools_i_use.txt`, `philosophy.txt`, `contact.txt`) automatically reset to default on reload.
- **Built-in Ambient Audio Engine**: Procedural lofi soundscape generator built on the Web Audio API with volume mixer dialog and taskbar controls.
- **Integrated Apps**: Spotify player embed, Windows Media Player 12 with procedural canvas visualizers, Calculator, Portfolio Explorer, and Start Menu.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run local development server
npm run serve
```

The site will be live at `http://localhost:8080`.

---

## For AI Agents & Developers

If you are an AI coding assistant (Claude Code, Google Antigravity, OpenCode, Cursor, Copilot, etc.) or a human developer exploring or wishing to adapt this project:

- **AI Agent Architectural Guide**: See [`AGENTS.md`](./AGENTS.md) for architectural invariants, coding rules, and reuse guidance.
- **Machine-Readable Site Spec**: See [`llms.txt`](./llms.txt) (following the [llmstxt.org](https://llmstxt.org) standard).
- **Source Code Entrypoint**: [`public/index.html`](./public/index.html) contains the entire self-contained desktop system with inline documentation.

---

## License & Attribution

Crafted with care by **Sumit Kumar Yadav**.

You are free to explore, study, fork, and remix this project. If you adapt this project for your own portfolio or templates, kindly retain a discreet attribution to [Sumit Kumar Yadav](https://sumityadav.in).

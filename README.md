# AI Buddy

An original, animated Three.js robot companion by Hossain Najmul. Browser-local AI, multilingual browser voice, explicit preference memory, installable PWA. No secret keys or mandatory API subscription.

**Live:** https://mr04nazmul.github.io/ai-buddy/

## Run

Node 22+: `npm ci`, then `npm run dev`. Production: `npm run build`; serve `dist/` over HTTPS. `npm test` runs context/memory logic checks. GitHub Pages workflow is included; GitHub Actions is enabled in repository Settings → Pages. Cloudflare Pages: build `npm run build`, output `dist`, no environment variables.

## Use on iPhone

Open the live website in Safari. Tap **Enable AI** on Wi-Fi and keep the page active during the first download. Wait for **Local AI is ready**. Type a message or tap **Tap to speak**, then allow microphone access. Settings offers English, Bengali and Japanese; voices depend on installed system voices. Share → Add to Home Screen installs the PWA. **Stop response & voice** interrupts generation/playback. Hands-free re-listens after playback while foregrounded; no background/locked-phone microphone claim.

## Architecture and privacy

Vite + TypeScript, Three.js procedural original robot (no downloaded avatar), Transformers.js Qwen2.5 0.5B q4 in a worker on WASM CPU, Web Speech APIs, localStorage for bounded history/preferences, Cache Storage for app/model files. AI download is opt-in; local inference sends no chat to an AI API. Browser speech recognition can process audio through the browser vendor's servers. External Google Fonts loads typography; Hugging Face serves model files. Device/browser storage can be evicted. No account, telemetry, secret key, cloud memory or sync is added.

History retains the last 80 messages; the last 12, capped at 1800 characters each, enter each generation. Explicit memories are entered and deleted in Settings (max 30). Older conversation recall is therefore bounded; this is not unlimited semantic recall.

## Features and limits

| Feature | Status |
|---|---|
| 3D original robot, idle, blink, look, wave, dance, happy/sad, sleep, thinking/listening/speaking | Implemented; real GPU/iPhone validation pending |
| Text AI | Real local Qwen inference; browser QA status in docs/VALIDATION.md |
| English/Bengali/Japanese | Language controls implemented; small-model quality varies; Bengali failed a basic quality test; natural Bengali conversation remains incomplete |
| Speech recognition | Web Speech when provided by browser; typed/keyboard dictation fallback |
| Speech synthesis | Installed system voices; missing-language voice reported explicitly |
| Turn taking | Browser end-of-utterance + foreground re-listening; no separate Silero VAD |
| Interrupt | Stop button; no full-duplex acoustic echo cancellation/barge-in |
| Memory | Explicit preferences + bounded local chat; save/delete controls |
| Customization | Eye color, light/dark theme, language, system voice |
| PWA | Manifest, PNG icons, service worker shell caching |
| Offline | App assets cached after visit; model cached after download; browser speech may need internet |

## Cost

- Original robot/app, local memory and local AI: no API fees; download bandwidth, device RAM/storage, battery and internet still required.
- Browser speech: no API key or app subscription; vendor availability, language support and terms apply.
- GitHub Pages/Cloudflare Pages: free plans subject to their current quotas and terms; no paid service is configured.
- Free-tier cloud inference is NOT connected. No claim of unlimited hosted intelligence. No ElevenLabs/OpenAI subscription required.

See [research and licenses](docs/RESEARCH.md), [validation](docs/VALIDATION.md), and [roadmap](docs/ROADMAP.md). Source: MIT; dependency/model licenses remain applicable. Milo code/assets were not reused.

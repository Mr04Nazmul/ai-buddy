# Validation — 25 October 2026 JST

- TypeScript typecheck and production Vite build: passed.
- Four unit tests: passed (corrupt-storage recovery, context role/length bounds, language/approved memory prompt, emotion cue).
- Chrome cloud browser: interface loads; settings, light/dark selection and explicit preference save worked; chat and preferences persisted after reload; individual preference deletion worked.
- Real on-device/browser WASM inference: model downloaded successfully; prompt `Hello! What is 2 plus 2? Please answer in one sentence.` produced `Two plus two equals four!` in the application. This is actual model output, not a canned fallback.
- Public GitHub Pages deployment: workflow run 40115602057 attempt 2 succeeded; live page opened and local model initialization reached ready.
- 390px viewport layout inspected in a desktop iframe; this is CSS layout testing, not real iPhone testing.
- Bengali quality test on public deployment FAILED: a simple name question returned mixed-script nonsense. Bengali remains experimental.
- A Qwen3-0.6B replacement trial made the cloud browser unresponsive; no successful generation was obtained. It was not deployed. This does not establish a cause or physical-phone compatibility.
- Voice output attempt reported blocked/interrupted in the cloud browser; audible playback is unverified.
- WebGL unavailable in the cloud browser: graceful 2D fallback observed. Actual 3D GPU rendering, animations and synchronization remain unverified on hardware.
- Physical iPhone Safari and Android Chrome microphone permission, STT language accuracy, TTS installed voices, hands-free timing, PWA installation, memory pressure, background suspension and visual responsiveness remain unverified.
- No API keys are used, stored or bundled. AI inference occurs in the local worker. External model/font requests and browser-vendor speech are described in the app.
- No cloud provider free-tier inference or database is configured. No recurring fee or unlimited free cloud inference claim.

The build is functional but hardware voice/3D acceptance is outstanding; it is not represented as fully device-certified production software.

# Validation — 25 October 2026 JST

- TypeScript typecheck and production Vite build: passed.
- Four unit tests: passed (corrupt-storage recovery, context role/length bounds, language/approved memory prompt, emotion cue).
- Chrome cloud browser: interface loads; settings and explicit preference save worked; chat history persisted after reload.
- Real on-device/browser WASM inference: model downloaded successfully; prompt `Hello! What is 2 plus 2? Please answer in one sentence.` produced `Two plus two equals four!` in the application. This is actual model output, not a canned fallback.
- Voice output attempt reported blocked/interrupted in the cloud browser; audible playback is unverified.
- WebGL unavailable in the cloud browser: graceful 2D fallback observed. Actual 3D GPU rendering, animations and synchronization remain unverified on hardware.
- Physical iPhone Safari and Android Chrome microphone permission, STT language accuracy, TTS installed voices, hands-free timing, PWA installation, memory pressure, background suspension and visual responsiveness remain unverified.
- No API keys are used, stored or bundled. AI inference occurs in the local worker. External model/font requests and browser-vendor speech are described in the app.
- No cloud provider free-tier inference or database is configured. No recurring fee or unlimited free cloud inference claim.

The build is functional but hardware voice/3D acceptance is outstanding; it is not represented as fully device-certified production software.

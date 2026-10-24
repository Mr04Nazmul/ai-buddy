# Repository research — 25 October 2026 JST

Inspected repository metadata, actual root licenses, README, dependency manifests where present and available speech/memory source files. Last push is a maintenance signal, not a guarantee of support.

| Repository | Root license | Last push observed | State |
|---|---|---|---|
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Apache License 2.0 | 2026-10-22 | Not archived |
| [SEKAI-OS/AIRI](https://github.com/SEKAI-OS/AIRI) | MIT License | 2026-02-15 | Not archived |
| [semperai/amica](https://github.com/semperai/amica) | MIT License | 2026-09-22 | Not archived |
| [trisanap/open-vrm-companion](https://github.com/trisanap/open-vrm-companion) | MIT License | 2026-04-23 | Archived |
| [michaelegbo/milo](https://github.com/michaelegbo/milo) | PolyForm Noncommercial 1.0.0 | 2026-10-16 | Not archived |
| [activated-intelligence/voice-chat](https://github.com/activated-intelligence/voice-chat) | MIT License | 2025-12-11 | Not archived |
| [huggingface/transformers.js](https://github.com/huggingface/transformers.js) | Apache License 2.0 | 2026-10-23 | Not archived |
| [mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) | Apache License 2.0 | 2026-10-11 | Not archived |
| [ricky0123/vad](https://github.com/ricky0123/vad) | Other | 2026-09-12 | Not archived |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT License | 2026-10-24 | Not archived |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache License 2.0 | 2026-10-23 | Not archived |

## Decisions and implementation details

- Awesome LLM Apps: inspected Voice AI Agents, Always-on Agents and Memory sections. Customer support voice requirements include OpenAI, Firecrawl and Qdrant: public source does not eliminate provider charges. Always-on HN uses a scheduler/FastAPI/ADK and optional API keys; it is not evidence of background iPhone microphone access. Local ChatGPT memory example requires Ollama and Qdrant/Docker, unsuited to a phone-only static deployment. Used architectural lessons only.
- AIRI: supplied repo defaults to a realtime-voice feature branch. Inspected `packages/pipelines-audio/src/speech-pipeline.ts`, speech bus and pgvector memory package. Large monorepo/provider infrastructure is excessive for the first mobile build. MIT applies to source, not arbitrary avatars or paid providers.
- Amica: Next/React, Three.js/VRM, provider-specific voice integrations; inspected voice processor and SpeechT5 implementation. Browser-oriented but provider setup and model/device constraints remain. No avatar or animation assets copied.
- Open VRM Companion: archived; Flask/Groq/Whisper/Orpheus/Tavily and HTTPS for mobile. Mixamo redistribution and avatar licenses differ from MIT. Not reused.
- Milo: inspected conversation-memory, speech and voice-provider TypeScript plus package manifest. PolyForm Noncommercial, hosted Deepgram proxy and larger local models; not permissively open-source for commercial reuse. No code or assets copied.
- Activated Intelligence voice-chat: MIT, Next 16/React 19, WebLLM, Transformers.js, Whisper/Silero/Supertonic. README targets Chrome/Edge WebGPU. Cannot assume Safari support or multilingual voice coverage.
- Transformers.js: Apache-2.0, supports WASM CPU and WebGPU. Selected WASM CPU in a worker to avoid requiring WebGPU on mobile. Qwen2.5-0.5B-Instruct ONNX q4 is a real model, served from Hugging Face; upstream Qwen2.5-0.5B-Instruct license is Apache-2.0. Model quality/latency is a practical limit.
- WebLLM: Apache-2.0 and WebGPU requirement. Researched, not integrated in the default build.
- Ollama: MIT, requires a running local/server machine; phone-only use cannot assume that machine exists.
- Mem0: Apache-2.0 core; vector/cloud/provider infrastructure not necessary for explicit local preferences.
- Silero VAD wrapper: researched but not bundled; source/model licenses and mobile performance must be checked separately before addition.

Additional GitHub search found Superactive-AI/inbrowser-ai, jsonfm/ai-local-voice-assistant, tanpreetjolly/browser-whisper and muthuspark/ava. These were discovery candidates, not audited or reused dependencies.

## Reuse and notices

AI Buddy code and procedural robot are original MIT code. Runtime dependencies: Three.js (MIT), Transformers.js (Apache-2.0), ONNX Runtime (MIT); model: Qwen2.5-0.5B-Instruct (Apache-2.0). Fonts are loaded from Google Fonts (DM Sans and Manrope, SIL Open Font License). Dependency copyright/license files remain in their installed packages. Do not remove their required notices in a redistributed bundle. Code visibility alone does not guarantee free services, permissive assets or unrestricted models.

## 1.1 update: online voice

The local model was removed after an iPhone download/reinitialisation report. Pollinations legacy anonymous text was tested directly; it returned Bengali final content with reasoning in a separate field (never displayed/spoken). A quota response was also observed. Current primary API documentation recommends keys; anonymous legacy availability has no guarantee. LLM7 anonymous/default initially responded but subsequent explicit-model calls returned 401, so no LLM7 dependency is shipped.

Bundled fallback: eSpeak NG 1.49.1, compiled browser worker/data from pettarin/espeakng.js-cdn, corresponding source from pettarin/espeak-ng emscripten commit 864d17c7b296067e55a07bfa7902081c4536ca17. GPL-3.0-or-later. Complete source archive, COPYING and provenance are distributed in public/voice; combined build is GPL while original app's MIT grant is retained. Formant speech is compact and synthetic. Browser pack language availability and playback are tested through the app's Settings UI.

# Architecture and development plan

1. Inspect the six requested repositories, licenses and source. Compare local inference, voice and memory options.
2. Implement original procedural Three.js robot, capped pixel ratio and 30fps, pause when hidden, reduced motion.
3. Add worker-based WASM local AI, language prompt, bounded context and errors; no frontend API secrets.
4. Add browser recognition and synthesis, explicit active-page microphone controls, Stop, foreground auto-listening.
5. Add explicit preference memory, deletions, history, customization and PWA.
6. Typecheck/build, unit checks and browser QA. Publish verified source and deploy.

# Next upgrades

1. Test real iPhone Safari and Android, measure model latency and memory pressure. Investigate a smaller multilingual model only after quality benchmarks.
2. Optional secure server proxy to a user-selected free-tier provider. Keep keys server-only, enforce quotas, show provider/cost, never silently switch providers.
3. Optional local Whisper/Silero VAD after mobile CPU and battery profiling; multilingual TTS requires separate language/model license and size checks.
4. Streaming tokens and incremental speech, sentence timing, phoneme lipsync, safe barge-in.
5. Optional encrypted memory export/import and opt-in cloud sync. No automatic personal-fact extraction by default.

## 1.1 follow-up priorities

The mandatory local model has been replaced by best-effort online text; a compact voice pack is bundled. Next: real iPhone acceptance, token-backed free-tier provider with secure server-side configuration and quotas, natural Bengali neural voice if a suitable authorized provider is available. No unlimited 24/7 claim is made for anonymous endpoints.

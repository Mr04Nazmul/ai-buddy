# Online voice change — 25 October 2026 JST

The user reported 100% download followed by a restart on iPhone. The earlier UI displayed progress per file without separating transfer from model initialisation; it also required a large local model before the microphone could start. The screenshot alone does not prove whether Safari evicted the cache, the worker failed in memory, or the progress represented another file. We do not claim a confirmed physical-device root cause.

Resolution: remove the mandatory local language model and its ONNX runtime from the app. Online inference now accepts typed or recognised text immediately. The small voice engine/data are ordinary preloaded app assets, not a large neural model. Retry and timeout states never start a model download. Requests can be cancelled; no unlimited retry loop is implemented.

Pollinations anonymous text endpoint returned real Bengali text (`আমার নাম বাডি।`) in a direct test. Another call returned 402 with a 30-second per-IP free limit; this is respected. LLM7 initially returned a response but subsequent named-model requests returned 401 and current docs require a token; it was not integrated. Anonymous Pollinations is best-effort, not an SLA or unlimited production entitlement.

Voice: native installed voices, with a 3.33 MB local eSpeak fallback. Includes language test, playback replay from a direct touch, AudioContext unlock, cancellation and foreground wake lock. Voice data and shell are cached; chat API responses are not cached by the service worker. Service worker version was incremented to replace the old shell. Conversation and preference storage keys are preserved.

Complete unmodified eSpeak browser worker/data, license, notices and corresponding source/build instructions are bundled. This adds GPL distribution obligations; original MIT app terms are retained in a separate file.

# Validation — 25 October 2026 JST, AI Buddy 1.1

## Current online voice fix

- TypeScript production build passed; nine unit tests passed (cloud final-content parsing, malformed/truncated replies, cancellation, cooldown, and prior context/storage checks).
- Browser preview opened immediately with **Online AI · no model download**, including after reload. The large Qwen worker and Transformers/ONNX production dependency were removed.
- Real browser cloud reply in Bengali: question `তোমার নাম কী? এক বাক্যে উত্তর দাও।` produced `আমার নাম বাডি, আমি একটি AI রোবট সহকারী।` No local model download.
- Bundled voice worker/data auto-loaded; runtime language list included English and Bengali. Bengali Test voice entered **Speaking Bengali…**, then returned to idle. Audio buffers were scheduled through Web Audio; physical speaker sound/pronunciation and real iPhone behaviour remain unverified.
- Cloud browser lacks Japanese system voices; the app reports this. Japanese relies on an installed system voice; the bundled 1.49.1 pack does not contain Japanese. No claim that all three voices worked in this cloud browser.
- Pollinations legacy anonymous endpoint returned 200 with Bengali final content. A separate rate-limit test returned 402 with a 30-second per-IP wait; retry handling is tested. Legacy `openai-audio` returned 404 and is not integrated. LLM7 named-model tests returned 401; not integrated.
- The free service has no 24/7 SLA or unlimited usage guarantee. No API secret or paid provider was configured.
- Physical iPhone Safari/Android recognition, installed EN/JA voices, wake lock, background behaviour and latency remain unverified. The app stops foreground voice when hidden.
- WebGL is unavailable in this cloud browser; robot falls back to 2D. Original GPU animation verification remains outstanding.

## Previous release evidence

The old local model answered basic English arithmetic but failed Bengali quality. Preferences and chat survived reload; preference deletion worked. A Qwen3 replacement trial did not complete successfully and was not deployed. A 390px desktop iframe layout was inspected, not physical iPhone hardware.

The user's screenshot showed progress restarting; it does not uniquely establish cache eviction versus memory/initialisation failure. 1.1 removes the mandatory large-model dependency instead of claiming a physical-device root cause.

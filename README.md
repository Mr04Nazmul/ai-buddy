# AI Buddy 1.1 — Online Voice

An original Three.js robot companion by Hossain Najmul. The old phone-sized Qwen download is removed. Open the app and tap the microphone; online replies require internet, not a model download.

**Live:** https://mr04nazmul.github.io/ai-buddy/

## Use on iPhone

1. Refresh the website. The card should say **Online AI · no model download**, not Enable AI or model_q4.onnx.
2. Settings → select English, বাংলা or Japanese.
3. Tap **Tap to speak** and allow the microphone. This starts a foreground hands-free session. Pause after your sentence; Buddy requests an online reply and speaks it.
4. If Safari blocks audio, use **▶ Listen** under the reply. Settings also has **Test selected language voice**.
5. Tap Stop to end listening, cancel the request and stop speech. Safari → Share → Add to Home Screen installs the PWA.

No microphone is kept running when the app is backgrounded. A screen wake lock is requested while hands-free is active, only where supported. iOS can still suspend the tab; this is not a 24/7 background assistant.

## Voice and AI

- Chat: `https://text.pollinations.ai/openai`, anonymous free shared endpoint, model selector `openai`. Real Bengali answer was verified. This is internet-hosted inference; it is not local/offline AI.
- Limits: a live request returned `402` with one reply per 30 seconds per IP. Limits and anonymous availability can change. The app respects the requested cooldown and offers Retry; it does not loop requests or bypass quotas. **No 24/7 unlimited or uptime guarantee.** Current official primary API docs favour API keys; this legacy anonymous route is best-effort.
- TTS: native system voices when installed. A pinned, bundled eSpeak NG speech engine provides compact local robot speech, including Bengali, if the device lacks a voice. Worker + voice data total 3.33 MB, loaded in the background and cached. This sounds synthetic, not human-like.
- STT: browser SpeechRecognition, using the selected locale (`bn-BD`, `en-US`, `ja-JP`). Availability/accuracy depends on the device and browser. Keyboard dictation/text is the fallback.
- No paid service, provider secret, or subscription is configured. A proper account/key and quota-backed backend would be needed for stronger availability promises.

## Privacy and memory

Chat text, the last 12 bounded messages and explicitly saved preferences go to Pollinations. Browser speech recognition can send audio to the browser vendor. Bundled speech output runs on your device. History/preferences remain stored in this browser, with save/delete controls. There is no cloud memory sync. Never treat stored memory as secret storage.

## Develop and deploy

Node 22+: `npm ci`, `npm run dev`. Check with `npm test`; build with `npm run build`. Serve `dist/` over HTTPS. GitHub Actions deploys main to Pages. Cloudflare Pages can also build the same static output. No environment variables are needed. Large Qwen/ONNX dependencies have been removed from the production app.

The old model cache is not required; Settings → Privacy → **Remove old AI model download** frees it without deleting conversations.

## Source and licensing

Original app code remains available under the prior MIT terms in `LICENSE-APP-MIT`. The combined distribution including eSpeak is supplied under GPL-3.0-or-later (`LICENSE`); third-party notices apply. Voice engine notices, complete corresponding source archive and build instructions are in `public/voice/`. `SOURCE.tar.gz` is a source download for developers and is not preloaded on phones. No Milo code/assets were reused.

See [validation](docs/VALIDATION.md), [research](docs/RESEARCH.md), and [roadmap](docs/ROADMAP.md). Physical iPhone/Android acceptance is still required; cloud browser tests do not certify real hardware microphone/audio behaviour.

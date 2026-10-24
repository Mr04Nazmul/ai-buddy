/** Original adapter to the separately bundled GPL eSpeak worker protocol.
 * Audio is synthesised on the device. No text or recording goes to a TTS server.
 */
export class BuddySpeech {
  private worker?:Worker;private loading?:Promise<void>;private ctx?:AudioContext;
  private callbacks=new Map<string,(d:any)=>void>();private sequence=0;private epoch=0;
  private sources=new Set<AudioBufferSourceNode>();private names=new Map<string,string>();
  speaking=false;
  async prepare(){
    if(this.loading)return this.loading;
    this.loading=new Promise<void>((resolve,reject)=>{
      const w=this.worker=new Worker(new URL('voice/espeakng.worker.js',document.baseURI));
      const timeout=window.setTimeout(()=>{w.terminate();this.loading=undefined;reject(new Error('Small voice pack did not load. Check the connection and retry.'))},20000);
      w.onerror=()=>{clearTimeout(timeout);this.loading=undefined;reject(new Error('Bundled voice could not start. Use an installed system voice.'))};
      w.onmessage=({data})=>{
        if(data==='ready'){
          this.call('list_voices',[],d=>{for(const voice of d.result?.[0]||[])for(const lang of voice.languages||[])if(!this.names.has(lang.name))this.names.set(lang.name,voice.identifier);clearTimeout(timeout);resolve()});
        }else if(data.callback){this.callbacks.get(data.callback)?.(data);if(data.done)this.callbacks.delete(data.callback)}
      }
    });return this.loading
  }
  private call(method:string,args:any[],callback?:(d:any)=>void){const id='buddy-'+(++this.sequence);if(callback)this.callbacks.set(id,callback);this.worker!.postMessage({method,args,...(callback?{callback:id}:{})})}
  unlock(){const C=window.AudioContext||(window as any).webkitAudioContext;if(!C)return;this.ctx??=new C();void this.ctx!.resume();void navigator.storage?.persist?.().catch(()=>false)}
  stop(){this.epoch++;this.speaking=false;for(const s of this.sources){s.onended=null;try{s.stop()}catch{}}this.sources.clear();window.speechSynthesis?.cancel()}
  async say(text:string,language:string,onStart:()=>void,onEnd:()=>void,preferBundled=false){
    this.stop();const epoch=this.epoch,prefix=({English:'en',Bengali:'bn',Japanese:'ja'} as Record<string,string>)[language]||'en';
    const native=window.speechSynthesis?.getVoices().find(v=>v.lang.toLowerCase().startsWith(prefix));
    if(window.speechSynthesis&&!preferBundled&&(native||prefix==='en'||prefix==='ja')){
      try{await new Promise<void>((resolve,reject)=>{
        const u=new SpeechSynthesisUtterance(text);if(native)u.voice=native;u.lang=native?.lang||({en:'en-US',ja:'ja-JP'} as Record<string,string>)[prefix];u.rate=.98;
        u.onstart=()=>{if(epoch===this.epoch){this.speaking=true;onStart()}};
        u.onend=()=>{if(epoch===this.epoch){this.speaking=false;onEnd()}resolve()};
        u.onerror=()=>{if(epoch!==this.epoch)resolve();else reject(new Error('Playback needs a tap. Use Listen beneath the reply.'))};
        window.speechSynthesis.speak(u)
      });return}catch(error){if(epoch!==this.epoch)return;/* Continue to the bundled voice when the native engine cannot speak. */}
    }
    await this.prepare();if(epoch!==this.epoch)return;
    const voice=this.names.get(prefix)||this.names.get(prefix==='en'?'en-us':prefix);
    if(!voice)throw new Error(`No ${language} voice is available. Install a ${language} system voice in device settings.`);
    if(!this.ctx||this.ctx.state!=='running')throw new Error('Tap Listen beneath the reply to enable audio on this device.');
    this.call('set_voice',[voice]);this.call('set_rate',[155]);
    const ctx=this.ctx;let next=ctx.currentTime+.04,gotAudio=false;
    await new Promise<void>((resolve,reject)=>{
      const timeout=window.setTimeout(()=>{if(epoch===this.epoch)this.stop();reject(new Error('Voice generation timed out. Tap Listen to retry.'))},45000);
      this.call('synthesize',[text.slice(0,1200)],d=>{
        if(epoch!==this.epoch){if(d.done){clearTimeout(timeout);resolve()}return}
        if(d.done){clearTimeout(timeout);if(!gotAudio){reject(new Error('No speech was generated for this language.'));return}
          const finish=()=>{if(epoch===this.epoch){this.speaking=false;onEnd()}resolve()};
          window.setTimeout(finish,Math.max(0,(next-ctx.currentTime)*1000+70));return}
        const raw=d.result?.[0];if(!raw)return;const samples=new Float32Array(raw);if(!samples.length)return;
        // This pinned eSpeak build duplicates 22050 Hz samples to 44100 Hz.
        const buffer=ctx.createBuffer(1,samples.length,44100);buffer.getChannelData(0).set(samples);
        const source=ctx.createBufferSource();source.buffer=buffer;source.connect(ctx.destination);
        source.onended=()=>{this.sources.delete(source);source.disconnect()};this.sources.add(source);
        next=Math.max(next,ctx.currentTime+.015);source.start(next);next+=buffer.duration;
        if(!gotAudio){gotAudio=true;this.speaking=true;onStart()}
      })
    })
  }
  async diagnostics(){await this.prepare();return [...this.names.keys()]}
}

import { pipeline, env } from '@huggingface/transformers';
env.allowLocalModels=false;
if(env.backends.onnx.wasm)env.backends.onnx.wasm.numThreads=1;
let generator:any;
self.onmessage=async({data})=>{try{
 if(!generator){self.postMessage({type:'progress',text:'Downloading the local brain…'});generator=await pipeline('text-generation','onnx-community/Qwen2.5-0.5B-Instruct',{device:'wasm',dtype:'q4',progress_callback:(p:any)=>{if(p.status==='progress')self.postMessage({type:'progress',text:`Loading ${p.file?.split('/').pop()||'model'} · ${Math.round(p.progress||0)}%`});}})}
 if(data.type==='load'){self.postMessage({type:'ready'});return}
 const result=await generator(data.messages,{max_new_tokens:180,do_sample:true,temperature:0.65,return_full_text:false});
 const text=result[0].generated_text;
 self.postMessage({type:'reply',text:typeof text==='string'?text:text.at(-1).content});
}catch(e){self.postMessage({type:'error',text:e instanceof Error?e.message:String(e)})}};

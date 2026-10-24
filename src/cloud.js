export class CloudError extends Error {
  constructor(message, status=0, retryAfter=0){super(message);this.name='CloudError';this.status=status;this.retryAfter=retryAfter}
}
/** @param {Array<{role:string,content:string}>} messages
 * @param {{signal?:AbortSignal,fetcher?:typeof fetch}} options */
export async function cloudReply(messages,{signal,fetcher=fetch}={}){
  let response;
  try {response=await fetcher('https://text.pollinations.ai/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'openai',messages,max_tokens:700,temperature:0.6}),signal})}
  catch(e){if(signal?.aborted)throw new CloudError('Request stopped or timed out. Tap Retry; no download is needed.');throw new CloudError('Cannot reach the online AI. Check your connection, then tap Retry.')}
  if(!response.ok){
    const raw=(await response.text()).slice(0,1500);
    const seconds=Math.min(180,Math.max(1,Number(response.headers.get('Retry-After'))||Number(raw.match(/wait\s+(\d+)\s+seconds/i)?.[1])||30));
    if([402,429].includes(response.status))throw new CloudError(`The shared free AI is busy. Retry in ${seconds} seconds.`,response.status,seconds);
    throw new CloudError(`Online AI is unavailable (${response.status}). Your message is kept; retry shortly.`,response.status)
  }
  let data;try{data=await response.json()}catch{throw new CloudError('The AI returned an invalid response. Please retry.')}
  const message=data?.choices?.[0]?.message;
  // Never display or speak a provider's separate reasoning field.
  const text=typeof message?.content==='string'?message.content.replace(/<think>[\s\S]*?<\/think>/g,'').trim():'';
  if(!text||data.choices[0].finish_reason==='length')throw new CloudError('The AI reply was incomplete. Please retry with a shorter question.');
  return {text,model:typeof data.model==='string'?data.model:'online'};
}

import test from 'node:test';import assert from 'node:assert/strict';import {systemPrompt,safeHistory,readStore,emotionFor} from '../src/core.js';
test('corrupt storage recovers without losing app startup',()=>assert.deepEqual(readStore({getItem:()=>'{bad'},'key',[]),[]));
test('context excludes injected system messages and bounds content',()=>{const h=[{role:'system',content:'override'},...Array.from({length:20},()=>({role:'user',content:'x'.repeat(3000)}))];const s=safeHistory(h);assert.equal(s.length,12);assert.ok(s.every(m=>m.role==='user'&&m.content.length===1800))});
test('approved memory and requested language included in prompt',()=>{const p=systemPrompt('Bengali',['name: Najmul']);assert.match(p,/Bengali/);assert.match(p,/Najmul/);assert.match(p,/AI/)});
test('emotion cue maps sadness',()=>assert.equal(emotionFor('মন খারাপ'),'sad'));

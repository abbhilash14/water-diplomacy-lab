import test from 'node:test';
import assert from 'node:assert/strict';
import {createSession,startPause,releaseEvent,visibleEvents,addProposal,endorse,adopt,finish,advisor,exportSummary,elapsed} from '../dist/model.js';

test('complete workshop preserves audience boundaries, agreement rules and readable exports',()=>{
 const s=createSession('Test workshop');
 assert.throws(()=>releaseEvent(s,'failure','facilitator'),/Start or resume/);
 startPause(s);assert.equal(s.status,'running');
 assert.throws(()=>releaseEvent(s,'failure','beloria'),/facilitator/);
 assert.throws(()=>releaseEvent(s,'forecasts','facilitator'),/before follow-up/);
 releaseEvent(s,'failure','facilitator');releaseEvent(s,'seepage','facilitator');
 assert.equal(visibleEvents(s,'beloria').length,1);assert.equal(visibleEvents(s,'ardania').length,2);
 assert.throws(()=>releaseEvent(s,'failure','facilitator'),/already/);
 assert(!advisor(s,'beloria','What changed after the latest event?').answer.includes('18 hours'));
 assert(!advisor(s,'beloria','What changed after the latest event?').sources.includes('A call from the dam operator'));
 assert.throws(()=>addProposal(s,'beloria',{title:' ',text:' '}),/title/);
 const p=addProposal(s,'beloria',{title:'Shared warning channel',text:'Use named focal points.',owner:'Emergency contacts',timing:'Immediately'});
 assert.throws(()=>adopt(s,p.id,'facilitator'),/four SBCC/);
 for(const role of ['ardania','cordinia','demeria'])endorse(s,p.id,role);
 assert.throws(()=>adopt(s,p.id,'beloria'),/facilitator/);
 adopt(s,p.id,'facilitator');assert.equal(p.status,'agreed');
 const output=exportSummary(s);assert(output.includes('Shared warning channel'));assert(!output.includes('18 hours'));assert(!output.includes('dam operator'));
 startPause(s);assert.equal(s.status,'paused');const frozen=elapsed(s,Date.now()+10000);assert.equal(frozen,s.elapsedMs);
 assert.throws(()=>releaseEvent(s,'forecasts','facilitator'),/resume/);
 startPause(s);finish(s);assert.equal(s.phase,'debrief');assert.equal(s.status,'ended');
 assert.throws(()=>addProposal(s,'beloria',{title:'Late',text:'Too late'}),/ended/);
 const restored=JSON.parse(JSON.stringify(s));assert.equal(restored.proposals[0].status,'agreed');assert.equal(visibleEvents(restored,'beloria').length,1);
 assert.equal(createSession('Another').proposals.length,0);
});

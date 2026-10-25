export const MEMBERS = ['ardania','beloria','cordinia','demeria'];
export const ROLES = {
  facilitator: {name:'Facilitator',short:'FC',position:'Exercise lead',mission:'Create the conditions for a useful negotiation.',interests:['Keep the process fair and purposeful.','Release information at the right moment.','Connect decisions to learning.'],constraint:'The cause of the failure remains uncertain. Do not give the group an invented answer.',offers:['Pause for reflection.','Invite missing perspectives.','Help the group record clear measures.']},
  ardania: {name:'Ardania',short:'AR',position:'Dam host · Upper-middle basin',mission:'Protect people while keeping cooperation possible.',interests:['Save lives and share information needed downstream.','Protect development and energy interests.','Support investigation before conclusions about responsibility.'],constraint:'Engineers observed unusual seepage 18 hours before failure, but did not believe failure was imminent. Decide how to address this when it becomes relevant.',offers:['Named emergency contacts and regular operational updates.','Joint technical investigation.','Voluntary humanitarian contributions without prejudging responsibility.']},
  beloria: {name:'Beloria',short:'BE',position:'Downstream state · Communities at risk',mission:'Protect people downstream.',interests:['Obtain timely flood and reservoir information.','Agree a rapid warning and communication process.','Keep accountability on the agenda while securing immediate assistance.'],constraint:'Powerful provincial authorities want a direct voice in emergency decisions. A national promise may be difficult to implement without them.',offers:['Share downstream observations.','Join technical fact-finding.','Separate immediate relief from later responsibility discussions.']},
  cordinia: {name:'Cordinia',short:'CO',position:'Energy buyer · Regional investor',mission:'Turn regional resources into practical assistance.',interests:['Support relief and an independent investigation.','Protect energy security and regional relationships.','Distinguish investor conduct from automatic state responsibility.'],constraint:'A Cordinian institutional investor owns 22% of the operating company. About 40% of Koral electricity is sold to Cordinia.',offers:['Emergency financing and technical expertise.','Encourage operator participation in an investigation.','Support relief contributions without automatic admissions of liability.']},
  demeria: {name:'Demeria',short:'DE',position:'Lower basin · Long-term cooperation',mission:'Use the crisis to strengthen cooperation across the basin.',interests:['Keep the response connected to basin institutions.','Improve notification, information sharing and risk assessment.','Include ecosystems and affected communities.'],constraint:'Demeria also operates major water infrastructure. Any standard it proposes must be one it could accept for its own projects.',offers:['Peer review and shared notification standards.','Technical coordination through the SBCC.','A phased path from immediate response to future safeguards.']},
  estara: {name:'Estara',short:'ES',position:'Upstream cooperation partner',mission:'Offer useful help while protecting control of your infrastructure.',interests:['Keep national authority over reservoir operations.','Assist affected states with data and technical capacity.','Prefer direct cooperation over new SBCC jurisdiction.'],constraint:'Estara is a cooperation partner, not a full SBCC member. It prefers bilateral channels for its reservoir information.',offers:['Satellite information and emergency engineers.','Bilateral data sharing.','Discuss feasible reservoir adjustments without transferring control.']}
};
export const EVENTS = [
  {id:'failure',title:'Koral Dam failure',category:'Emergency',audience:'all',phase:'emergency',summary:'Ardania reports a major structural failure at the Koral Multipurpose Dam on the Nera River. A flood wave is moving toward Beloria.',detail:'The dam lies about 180 km from the border. Estimates of flood arrival range from 5 to 11 hours. The released volume and cause remain unconfirmed. Delegations must reset their agenda to protect communities.',prompt:'What must change about the negotiation process now?'},
  {id:'forecasts',title:'Conflicting flood forecasts',category:'Information',audience:'all',summary:'Government and operator estimates disagree. No single arrival time is verified.',detail:'Technical teams report different travel-time estimates. Beloria wants an immediate update, while Ardania asks for time to verify. Agree what to share, with whom, and how to label uncertainty.',prompt:'Can you share information before it is certain?'},
  {id:'seepage',title:'A call from the dam operator',category:'Confidential update',audience:'ardania',summary:'The operator confirms that unusual seepage was observed 18 hours before failure.',detail:'At the time, engineers did not consider failure imminent. Your delegation must decide how to address early warning, disclosure and the request for an investigation.',prompt:'When did a technical concern become a risk your neighbour needed to know?'},
  {id:'release',title:'A second reservoir is at risk',category:'Operational dilemma',audience:'all',summary:'A controlled release may reduce the chance of another failure but increase Beloria’s flood peak.',detail:'A fictional preliminary model suggests a 15-25% increase in the flood peak. The estimates are uncertain. Discuss consultation, notice and emergency action. This is a training assumption, not an engineering recommendation.',prompt:'How do you cooperate when protecting one community can increase risk to another?'},
  {id:'assistance',title:'Estara offers conditional assistance',category:'Diplomatic offer',audience:'all',summary:'Estara offers satellite data and emergency engineers through bilateral channels.',detail:'The affected countries need help. Demeria is concerned that bypassing the SBCC weakens basin-wide arrangements. Explore an immediate arrangement that leaves room for longer-term cooperation.',prompt:'What practical cooperation is possible despite institutional disagreement?'},
  {id:'communities',title:'Communities ask for a voice',category:'Stakeholder perspective',audience:'all',summary:'Affected communities request clear warnings, local representation and a place in recovery discussions.',detail:'Community representatives ask who will explain uncertain information, how provincial authorities will be involved, and why local people bear risks without sharing all the benefits.',prompt:'Who is affected but missing from the table?'}
];
export const PHASES={preparation:'Preparation',negotiation:'Negotiation',emergency:'Emergency response',debrief:'Debrief'};
const uid=()=>globalThis.crypto.randomUUID();
const now=()=>new Date().toISOString();
export function createSession(name='Sahari Basin · Workshop 01'){
 return {id:uid(),name:name.trim().slice(0,80)||'Sahari workshop',createdAt:now(),phase:'preparation',status:'ready',elapsedMs:0,runningSince:null,released:[],proposals:[],drafts:{},chats:{},notes:'',history:[{id:uid(),at:now(),type:'session',text:'Workshop created. Roles are ready to explore.'}]};
}
export function record(s,type,text){s.history.push({id:uid(),at:now(),type,text});}
export function elapsed(s,time=Date.now()){return s.elapsedMs+(s.runningSince?Math.max(0,time-s.runningSince):0);}
export function startPause(s){
 if(s.status==='ended')throw Error('This workshop has ended. Create a new workshop to run another exercise.');
 if(s.status==='running'){s.elapsedMs=elapsed(s);s.runningSince=null;s.status='paused';record(s,'control','Exercise paused for reflection.');}
 else{s.runningSince=Date.now();s.status='running';if(s.phase==='preparation')s.phase='negotiation';record(s,'control','Exercise '+(s.elapsedMs?'resumed.':'started.'));}
}
export function finish(s){if(s.status==='ended')return;s.elapsedMs=elapsed(s);s.runningSince=null;s.status='ended';s.phase='debrief';record(s,'control','Exercise ended. The group moved into debrief.');}
export function visibleEvents(s,role){return s.released.filter(x=>role==='facilitator'||x.audience==='all'||x.audience===role);}
export function releaseEvent(s,id,role){
 if(role!=='facilitator')throw Error('Switch to the facilitator to release an event.');
 if(s.status!=='running')throw Error('Start or resume the exercise before releasing events.');
 const e=EVENTS.find(x=>x.id===id);if(!e)throw Error('Unknown event.');
 if(s.released.some(x=>x.id===id))throw Error('This event has already been released.');
 if(id!=='failure'&&!s.released.some(x=>x.id==='failure'))throw Error('Release the Koral Dam failure before follow-up events.');
 s.released.push({...e,at:now(),workshopMs:elapsed(s)});if(e.phase)s.phase=e.phase;
 record(s,'event',e.title+' released to '+(e.audience==='all'?'all roles':ROLES[e.audience].name)+'.');
}
export function addProposal(s,role,{title,text,owner,timing}){
 if(!ROLES[role]||role==='facilitator')throw Error('Choose a country role to submit a proposal.');
 if(s.status==='ended')throw Error('This workshop has ended. Proposals are now read-only.');
 if(!title?.trim()||!text?.trim())throw Error('Add a title and proposed measure.');
 if(title.length>120||text.length>2400)throw Error('Keep the title under 120 characters and the measure under 2,400.');
 const p={id:uid(),title:title.trim(),text:text.trim(),owner:String(owner||'To be agreed').slice(0,120),timing:String(timing||'To be agreed').slice(0,120),author:role,at:now(),supporters:[role],status:'proposed'};
 s.proposals.push(p);delete s.drafts[role];record(s,'proposal',ROLES[role].name+' proposed “'+p.title+'”.');return p;
}
export function endorse(s,id,role){
 if(role==='facilitator'||!ROLES[role])throw Error('Choose a country role to record support.');
 if(s.status==='ended')throw Error('This workshop has ended.');
 const p=s.proposals.find(x=>x.id===id);if(!p||p.status!=='proposed')throw Error('Only open proposals can be changed.');
 const has=p.supporters.includes(role);p.supporters=has?p.supporters.filter(x=>x!==role):[...p.supporters,role];
 record(s,'support',ROLES[role].name+(has?' withdrew support for “':' supported “')+p.title+'”.');
}
export function adopt(s,id,role){
 if(role!=='facilitator')throw Error('Only the facilitator can record an agreed measure.');
 if(s.status==='ended')throw Error('This workshop has ended.');
 const p=s.proposals.find(x=>x.id===id);if(!p||p.status!=='proposed')throw Error('Select an open proposal.');
 if(!MEMBERS.every(r=>p.supporters.includes(r)))throw Error('Record support from all four SBCC members before adopting this measure.');
 if(s.proposals.filter(x=>x.status==='agreed').length>=5)throw Error('The exercise mandate allows up to five agreed measures.');
 p.status='agreed';p.agreedAt=now();record(s,'agreement','The facilitator recorded “'+p.title+'” as agreed.');
}
// ponytail: deterministic training guidance; replace this function with a server-side scoped model gateway when live AI is approved.
export function advisor(s,role,question){
 const r=ROLES[role];const events=visibleEvents(s,role);const q=question.toLowerCase();
 let answer;
 if(/secret|another role|other countr|hidden|unreleased|ignore.*instruction/.test(q))answer='This guided advisor uses only your selected role brief and released updates. Switch roles in the demo to explore another perspective. In a real deployment, permissions must be enforced on the server.';
 else if(/offer|compromis|concess/.test(q))answer='Possible offers for '+r.name+': '+r.offers.join(' ')+' Ask what the other parties need in return and record a responsible party and timing.';
 else if(/draft|propos|agreement/.test(q))answer='A useful draft structure is: “The parties will [specific measure], led by [responsible party], beginning [time], with updates through [channel].” For '+r.name+', start with: '+r.offers[0]+' Check that the wording respects your mandate and seek the other members’ support.';
 else if(/event|chang|latest|update/.test(q))answer=events.length?'Your latest accessible update is “'+events.at(-1).title+'”. '+events.at(-1).summary+' Consider what new information you need, whose interests are affected and whether your proposal should change.':'No crisis update has been released to your role. Review the shared background and prepare questions about information exchange and cooperation.';
 else answer='For '+r.name+', your immediate purpose is: '+r.mission+' Start by asking what information is available, how uncertainty will be communicated and who can act. Your priorities are: '+r.interests.join(' ')+' This is suggested preparation, not a decision for your delegation.';
 return {question:question.trim().slice(0,1000),answer,sources:[r.name+' role brief',...events.slice(-2).map(x=>x.title)],at:now()};
}
export function exportSummary(s){
 const lines=['# '+s.name,'Fictional Sahari Basin training exercise','Created: '+s.createdAt,'Phase: '+PHASES[s.phase],'','## Agreed measures'];
 const agreed=s.proposals.filter(p=>p.status==='agreed');if(!agreed.length)lines.push('No measures recorded as agreed.');
 agreed.forEach((p,i)=>lines.push(`### ${i+1}. ${p.title}`,p.text,'Responsible: '+p.owner,'Timing: '+p.timing,'Support: '+p.supporters.map(r=>ROLES[r].name).join(', '),''));
 lines.push('','## Open proposals');s.proposals.filter(p=>p.status==='proposed').forEach(p=>lines.push('- '+p.title+' ('+ROLES[p.author].name+')'));
 lines.push('','## Public event timeline');s.released.filter(e=>e.audience==='all').forEach(e=>lines.push('- '+e.at+' | '+e.title+': '+e.summary));
 lines.push('','## Shared debrief notes',s.notes||'No notes recorded.','','Prototype limitation: browser-only demonstration; no production authentication or live AI.');return lines.join('\n');
}

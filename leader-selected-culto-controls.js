(()=>{
if(window.__ieadjoLeaderSelectedControls)return;window.__ieadjoLeaderSelectedControls=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
let activeScheduleId='',working=false;
function session(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function headers(){const s=session();return {apikey:SB_KEY,Authorization:'Bearer '+s.access_token,'Content-Type':'application/json'}}
async function api(path,opt={}){const r=await fetch(SB_URL+path,{cache:'no-store',...opt,headers:{...headers(),...(opt.headers||{})}});let body=null;try{body=await r.json()}catch{}if(!r.ok)throw new Error(body?.message||body?.hint||'Não foi possível concluir.');return body}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
async function rowsForSchedule(scheduleId){return api('/rest/v1/ieadjo_songs?select=id,title,artist,song_key,sort_order&schedule_id=eq.'+encodeURIComponent(scheduleId)+'&order=sort_order.asc,id.asc')}
async function saveOrder(rows){for(let i=0;i<rows.length;i++){await api('/rest/v1/ieadjo_songs?id=eq.'+encodeURIComponent(rows[i].id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({sort_order:(i+1)*10})})}}
async function render(scheduleId,anchor){
 if(!scheduleId||!anchor)return;activeScheduleId=String(scheduleId);
 let box=document.getElementById('leaderSelectedCultoSongs');
 if(!box){box=document.createElement('section');box.id='leaderSelectedCultoSongs';box.style.cssText='margin:12px 0 16px';anchor.insertAdjacentElement('afterend',box)}
 const songs=await rowsForSchedule(activeScheduleId);
 box.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 8px"><div style="font-size:11px;font-weight:900;letter-spacing:.8px;color:#6b7885">HINOS SELECIONADOS</div><small style="color:#6c7a89">${songs.length} hino${songs.length===1?'':'s'}</small></div>${songs.length?songs.map((s,i)=>`<div class="card" style="padding:12px;margin-bottom:8px"><div style="display:flex;align-items:flex-start;gap:10px"><div style="width:30px;height:30px;border-radius:9px;background:#174f7c;color:#fff;display:grid;place-items:center;font-weight:900;flex:none">${i+1}</div><div class="grow"><b>${esc(s.title)}</b>${s.artist?`<span>${esc(s.artist)}</span>`:''}<span>Tom: ${esc(s.song_key||'-')}</span><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:9px"><button type="button" data-selected-up="${s.id}" ${i===0?'disabled':''} style="border:0;border-radius:8px;background:#eef4f9;color:#0e2a47;padding:8px 10px;font-size:10px;font-weight:900;${i===0?'opacity:.4;':''}">↑ Subir</button><button type="button" data-selected-down="${s.id}" ${i===songs.length-1?'disabled':''} style="border:0;border-radius:8px;background:#eef4f9;color:#0e2a47;padding:8px 10px;font-size:10px;font-weight:900;${i===songs.length-1?'opacity:.4;':''}">↓ Descer</button><button type="button" data-selected-remove="${s.id}" style="border:0;border-radius:8px;background:#fff0f0;color:#a83232;padding:8px 10px;font-size:10px;font-weight:900">✕ Remover do culto</button></div></div></div></div>`).join(''):'<div class="card"><div class="grow"><b>Nenhum hino selecionado.</b></div></div>'}`;
 box.onclick=async e=>{
   const up=e.target.closest?.('[data-selected-up]'),down=e.target.closest?.('[data-selected-down]'),remove=e.target.closest?.('[data-selected-remove]');
   if(working||(!up&&!down&&!remove))return;
   working=true;
   try{
     if(remove){if(!confirm('Remover este hino deste culto? A música continuará salva na biblioteca.'))return;await api('/rest/v1/ieadjo_songs?id=eq.'+encodeURIComponent(remove.dataset.selectedRemove),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({schedule_id:null})})}
     else{const id=up?.dataset.selectedUp||down?.dataset.selectedDown;const dir=up?-1:1;const rows=await rowsForSchedule(activeScheduleId);const i=rows.findIndex(x=>String(x.id)===String(id));const j=i+dir;if(i<0||j<0||j>=rows.length)return;[rows[i],rows[j]]=[rows[j],rows[i]];await saveOrder(rows)}
     await render(activeScheduleId,document.querySelector('[data-rep-search]')||document.getElementById('leaderCultosFirst'));
   }catch(err){alert(err.message)}finally{working=false}
 };
}
function hook(){const view=document.getElementById('view');if(!view?.querySelector('#weeklyRepManager'))return;view.querySelectorAll('[data-leader-culto]').forEach(btn=>{if(btn.dataset.selectedControlsBound)return;btn.dataset.selectedControlsBound='1';btn.addEventListener('click',()=>setTimeout(()=>render(btn.dataset.leaderCulto,document.querySelector('[data-rep-search]')||document.getElementById('leaderCultosFirst')),80))})}
setInterval(hook,400);hook();
})();
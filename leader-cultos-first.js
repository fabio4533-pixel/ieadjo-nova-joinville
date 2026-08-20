(()=>{
if(window.__ieadjoLeaderCultosFirst)return;window.__ieadjoLeaderCultosFirst=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
let currentCulto='';
function session(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#039;'}[m]))}
async function api(path){const s=session();if(!s?.access_token)return[];const r=await fetch(SB_URL+path,{cache:'no-store',headers:{apikey:SB_KEY,Authorization:'Bearer '+s.access_token}});if(!r.ok)return[];return r.json()}
function fmt(iso){if(!iso)return'';const [y,m,d]=iso.split('-').map(Number);return new Date(y,m-1,d,12).toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit'})}
function pinTop(view,box){const pagehead=view.querySelector('.pagehead');if(!pagehead)return;const parent=pagehead.parentNode;if(parent.firstElementChild!==box)parent.insertBefore(box,parent.firstElementChild);const search=view.querySelector('[data-rep-search]');if(search&&box.nextElementSibling!==search)box.insertAdjacentElement('afterend',search);if(search&&search.nextElementSibling!==pagehead)search.insertAdjacentElement('afterend',pagehead)}
async function arrange(){
 const view=document.getElementById('view');const pagehead=view?.querySelector('.pagehead');const title=pagehead?.querySelector('h1');const manager=view?.querySelector('#weeklyRepManager');
 if(!view||title?.textContent.trim()!=='Repertório'||!manager)return;
 let box=view.querySelector('#leaderCultosFirst');let songMap=[];
 if(!box){
   const [songs,schedules]=await Promise.all([api('/rest/v1/ieadjo_songs?select=id,schedule_id&schedule_id=not.is.null'),api('/rest/v1/ieadjo_schedules?select=id,event_date,title,time_text&order=event_date.asc,id.asc')]);
   songMap=songs||[];const countBy={};songMap.forEach(s=>{const k=String(s.schedule_id);countBy[k]=(countBy[k]||0)+1});const used=(schedules||[]).filter(s=>countBy[String(s.id)]>0);
   box=document.createElement('section');box.id='leaderCultosFirst';box.style.cssText='margin:0 0 10px;padding:14px;border:2px solid #174f7c;border-radius:20px;background:linear-gradient(145deg,#eaf5ff,#ffffff);box-shadow:0 10px 28px #0e2a4720';
   box.innerHTML=`<div style="display:flex;align-items:center;gap:8px;margin:0 0 10px"><span style="width:34px;height:34px;border-radius:10px;background:#174f7c;color:#fff;display:grid;place-items:center;font-size:18px">⛪</span><div><div style="font-size:12px;font-weight:900;letter-spacing:.9px;color:#174f7c">CULTOS</div><div style="font-size:12px;color:#6b7885">Selecione o culto para ver os hinos</div></div></div>${used.length?used.map(g=>`<button type="button" data-leader-culto="${g.id}" style="width:100%;border:1px solid #d3e1ec;background:#fff;border-radius:15px;padding:13px 14px;margin:0 0 8px;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:10px"><span><b style="display:block;color:#0e2a47;font-size:15px">${esc(g.title)}</b><small style="color:#687887">${esc(fmt(g.event_date))}${g.time_text?' • '+esc(g.time_text):''} • ${countBy[String(g.id)]} hino${countBy[String(g.id)]===1?'':'s'}</small></span><span style="font-size:20px;color:#174f7c">›</span></button>`).join(''):'<div class="card"><div class="grow"><b>Nenhum culto com hinos selecionados.</b></div></div>'}`;
   view.insertBefore(box,view.firstChild);
   box.querySelectorAll('[data-leader-culto]').forEach(b=>b.onclick=async()=>{currentCulto=String(b.dataset.leaderCulto);box.querySelectorAll('[data-leader-culto]').forEach(x=>{const on=String(x.dataset.leaderCulto)===currentCulto;x.style.borderColor=on?'#174f7c':'#d3e1ec';x.style.background=on?'#eaf4fc':'#fff'});if(!songMap.length)songMap=await api('/rest/v1/ieadjo_songs?select=id,schedule_id&schedule_id=not.is.null');filterSongs(songMap)});
 }
 pinTop(view,box);
}
function filterSongs(songMap){const view=document.getElementById('view');if(!view)return;const byId={};(songMap||[]).forEach(s=>byId[String(s.id)]=String(s.schedule_id||''));view.querySelectorAll('.dynamic-song').forEach(card=>{const id=card.querySelector('[data-rep-edit]')?.dataset.repEdit||card.querySelector('[data-rep-del]')?.dataset.repDel;card.style.display=!currentCulto||byId[String(id)]===currentCulto?'flex':'none'})}
setInterval(()=>arrange().catch(()=>{}),400);arrange().catch(()=>{});
})();
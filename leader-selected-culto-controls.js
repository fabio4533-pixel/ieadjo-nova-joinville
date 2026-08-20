(()=>{
if(window.__ieadjoLeaderSelectedControls)return;window.__ieadjoLeaderSelectedControls=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
function session(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function headers(){const s=session();return {apikey:SB_KEY,Authorization:'Bearer '+s.access_token,'Content-Type':'application/json'}}
async function api(path,opt={}){const r=await fetch(SB_URL+path,{cache:'no-store',...opt,headers:{...headers(),...(opt.headers||{})}});let body=null;try{body=await r.json()}catch{}if(!r.ok)throw new Error(body?.message||body?.hint||'Não foi possível concluir.');return body}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
async function render(scheduleId,anchor){
 if(!scheduleId||!anchor)return;
 let box=document.getElementById('leaderSelectedCultoSongs');
 if(!box){box=document.createElement('section');box.id='leaderSelectedCultoSongs';box.style.cssText='margin:12px 0 16px';anchor.insertAdjacentElement('afterend',box)}
 const songs=await api('/rest/v1/ieadjo_songs?select=id,title,artist,song_key,sort_order&schedule_id=eq.'+encodeURIComponent(scheduleId)+'&order=sort_order.asc,id.asc');
 box.innerHTML=`<div style="font-size:11px;font-weight:900;letter-spacing:.8px;color:#6b7885;margin:0 0 8px">HINOS SELECIONADOS</div>${songs.length?songs.map((s,i)=>`<div class="card" style="padding:12px;margin-bottom:8px"><div style="display:flex;align-items:flex-start;gap:10px"><div style="width:28px;height:28px;border-radius:9px;background:#eef4f9;color:#174f7c;display:grid;place-items:center;font-weight:900">${i+1}</div><div class="grow"><b>${esc(s.title)}</b>${s.artist?`<span>${esc(s.artist)}</span>`:''}<span>Tom: ${esc(s.song_key||'-')}</span><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button type="button" data-move-up="${s.id}" style="border:0;border-radius:8px;background:#eef4f9;color:#0e2a47;padding:7px 9px;font-size:10px;font-weight:900">↑ Subir</button><button type="button" data-move-down="${s.id}" style="border:0;border-radius:8px;background:#eef4f9;color:#0e2a47;padding:7px 9px;font-size:10px;font-weight:900">↓ Descer</button><button type="button" data-remove-culto="${s.id}" style="border:0;border-radius:8px;background:#fff4df;color:#8a5c09;padding:7px 9px;font-size:10px;font-weight:900">✕ Remover do culto</button></div></div></div></div>`).join(''):'<div class="card"><div class="grow"><b>Nenhum hino selecionado.</b></div></div>'}`;
}
function hook(){const view=document.getElementById('view');if(!view?.querySelector('#weeklyRepManager'))return;view.querySelectorAll('[data-leader-culto]').forEach(btn=>{if(btn.dataset.selectedControlsBound)return;btn.dataset.selectedControlsBound='1';btn.addEventListener('click',()=>setTimeout(()=>render(btn.dataset.leaderCulto,document.querySelector('[data-rep-search]')||document.getElementById('leaderCultosFirst')),80))})}
setInterval(hook,400);hook();
})();
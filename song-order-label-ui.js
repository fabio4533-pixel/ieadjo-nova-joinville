(()=>{
if(window.__ieadjoSongOrderLabelUI)return;window.__ieadjoSongOrderLabelUI=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
let working=false;
function session(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function headers(){const s=session();return {apikey:SB_KEY,Authorization:'Bearer '+s.access_token,'Content-Type':'application/json'}}
async function api(path,opt={}){const r=await fetch(SB_URL+path,{cache:'no-store',...opt,headers:{...headers(),...(opt.headers||{})}});let body=null;try{body=await r.json()}catch{}if(!r.ok)throw new Error(body?.message||body?.hint||'Não foi possível concluir.');return body}
const labels=['','1º Hino','2º Hino','3º Hino','4º Hino','Hino de Saudação','Hino de Oferta','Hino Final','Outro'];
function options(selected){return labels.map(x=>`<option value="${x}" ${String(selected||'')===x?'selected':''}>${x||'Definir posição...'}</option>`).join('')}
async function saveLabel(id,value){await api('/rest/v1/ieadjo_songs?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({position_label:value||null})})}
async function songsForSchedule(scheduleId){return api('/rest/v1/ieadjo_songs?select=id,sort_order&schedule_id=eq.'+encodeURIComponent(scheduleId)+'&order=sort_order.asc,id.asc')}
async function normalize(rows){for(let i=0;i<rows.length;i++)await api('/rest/v1/ieadjo_songs?id=eq.'+encodeURIComponent(rows[i].id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({sort_order:(i+1)*10})})}
async function move(id,dir){if(working)return;working=true;try{const row=(await api('/rest/v1/ieadjo_songs?select=id,schedule_id&id=eq.'+encodeURIComponent(id)+'&limit=1'))?.[0];if(!row?.schedule_id)return;const rows=await songsForSchedule(row.schedule_id);const i=rows.findIndex(x=>String(x.id)===String(id)),j=i+dir;if(i<0||j<0||j>=rows.length)return;[rows[i],rows[j]]=[rows[j],rows[i]];await normalize(rows);location.reload()}catch(e){alert(e.message)}finally{working=false}}
async function enhance(){
 const leaderBox=document.getElementById('leaderSelectedCultoSongs');
 const adminBox=document.getElementById('items');
 if(!leaderBox&&!adminBox)return;
 let data=[];try{data=await api('/rest/v1/ieadjo_songs?select=id,position_label,schedule_id,sort_order')}catch{return}
 const map={};data.forEach(x=>map[String(x.id)]=x);
 if(leaderBox){leaderBox.querySelectorAll('.card').forEach(card=>{const ref=card.querySelector('[data-selected-up],[data-selected-down],[data-selected-remove],[data-selected-delete]');const id=ref?.dataset.selectedUp||ref?.dataset.selectedDown||ref?.dataset.selectedRemove||ref?.dataset.selectedDelete;if(!id||card.querySelector('[data-position-control]'))return;const grow=card.querySelector('.grow');if(!grow)return;const wrap=document.createElement('div');wrap.dataset.positionControl='1';wrap.style.cssText='margin-top:8px;display:flex;gap:6px;align-items:center;flex-wrap:wrap';wrap.innerHTML=`<select data-position-song="${id}" style="border:1px solid #d7e0e8;border-radius:9px;padding:8px 9px;background:#fff;color:#0e2a47;font-weight:800;font-size:11px">${options(map[String(id)]?.position_label)}</select>`;grow.insertBefore(wrap,grow.querySelector('div[style*="margin-top:9px"]')||null)})}
 if(adminBox){adminBox.querySelectorAll('.item').forEach(item=>{const ref=item.querySelector('[data-assign],[data-song],[data-edit-song]');const id=ref?.dataset.assign||ref?.dataset.song||ref?.dataset.editSong;if(!id||item.querySelector('[data-position-control]'))return;const main=item.querySelector('div[style*="flex:1"]');if(!main)return;const row=map[String(id)];const wrap=document.createElement('div');wrap.dataset.positionControl='1';wrap.style.cssText='margin-top:8px;display:flex;gap:6px;align-items:center;flex-wrap:wrap';wrap.innerHTML=`<select data-position-song="${id}" style="min-width:160px;border:1px solid #dfe6ec;border-radius:9px;padding:8px">${options(row?.position_label)}</select>${row?.schedule_id?`<button type="button" class="btn ghost" data-admin-up="${id}">↑ Subir</button><button type="button" class="btn ghost" data-admin-down="${id}">↓ Descer</button>`:''}`;main.appendChild(wrap)})}
 document.querySelectorAll('[data-position-song]').forEach(s=>{if(s.dataset.bound)return;s.dataset.bound='1';s.onchange=async()=>{try{s.disabled=true;await saveLabel(s.dataset.positionSong,s.value)}catch(e){alert(e.message)}finally{s.disabled=false}}});
 document.querySelectorAll('[data-admin-up]').forEach(b=>b.onclick=()=>move(b.dataset.adminUp,-1));document.querySelectorAll('[data-admin-down]').forEach(b=>b.onclick=()=>move(b.dataset.adminDown,1));
}
setInterval(()=>enhance().catch(()=>{}),700);enhance().catch(()=>{});
})();
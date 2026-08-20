(()=>{
if(window.__ieadjoMemberRepCultos)return;window.__ieadjoMemberRepCultos=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
let busy=false,lastKey='';
function session(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function norm(v){return String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
async function api(path){const s=session();if(!s?.access_token)return[];const r=await fetch(SB_URL+path,{cache:'no-store',headers:{apikey:SB_KEY,Authorization:'Bearer '+s.access_token}});if(!r.ok)return[];return r.json()}
function fmtDate(iso){if(!iso)return'';const [y,m,d]=iso.split('-').map(Number);return new Date(y,m-1,d,12).toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit'})}
function btn(label,url,bg){if(!url)return'';return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer external" style="text-decoration:none;text-align:center;border-radius:9px;background:${bg};color:#fff;padding:8px 9px;font-size:10px;font-weight:800;white-space:nowrap">${label}</a>`}
function songCard(s){return `<div class="card member-culto-song" data-searchtext="${esc(norm([s.title,s.artist,s.song_key].filter(Boolean).join(' ')))}" style="display:flex;gap:11px;align-items:center"><div style="width:40px;height:40px;border-radius:11px;background:#eef4f9;display:grid;place-items:center;font-size:21px;color:#174f7c;flex:none">♫</div><div class="grow"><b>${esc(s.title)}</b>${s.artist?`<span>${esc(s.artist)}</span>`:''}<span>Tom: ${esc(s.song_key||'-')}</span></div><div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end">${btn('▶ YouTube',s.youtube_url,'#d21f26')}${btn('🎸 Cifra',s.cifra_url,'#0e2a47')}${btn('📄 Letra',s.letra_url,'#174f7c')}</div></div>`}
function searchBox(){return `<div id="memberCultoSearch" style="margin:0 0 12px;position:relative"><span style="position:absolute;left:12px;top:21px;transform:translateY(-50%);font-size:16px">🔎</span><input id="memberCultoSearchInput" type="search" placeholder="Pesquisar hino neste culto..." style="width:100%;border:1px solid #d9e2ea;border-radius:13px;padding:12px 14px 12px 38px;background:#fff;color:#152433;font:inherit;outline:none"><div id="memberCultoSearchCount" style="font-size:11px;color:#6c7a89;margin:6px 2px 0"></div></div>`}
function bindSearch(){const input=document.getElementById('memberCultoSearchInput'),count=document.getElementById('memberCultoSearchCount');if(!input)return;input.oninput=()=>{const q=norm(input.value);let n=0;document.querySelectorAll('.member-culto-song').forEach(x=>{const hit=!q||x.dataset.searchtext.includes(q);x.style.display=hit?'flex':'none';if(hit)n++});count.textContent=q?`${n} resultado${n===1?'':'s'}`:''}}
async function render(){if(busy)return;const view=document.getElementById('view');const h=view?.querySelector('.pagehead h1');if(!view||h?.textContent.trim()!=='Repertório')return;
if(view.querySelector('#weeklyRepManager'))return;
busy=true;try{
const [songs,schedules]=await Promise.all([
api('/rest/v1/ieadjo_songs?select=id,title,artist,song_key,schedule_id,cifra_url,letra_url,youtube_url,sort_order&schedule_id=not.is.null&order=sort_order.asc,id.asc'),
api('/rest/v1/ieadjo_schedules?select=id,event_date,title,time_text&event_date=gte.'+today()+'&order=event_date.asc,id.asc')
]);
const futureIds=new Set((schedules||[]).map(x=>String(x.id)));const selected=(songs||[]).filter(x=>futureIds.has(String(x.schedule_id)));
const key=JSON.stringify([selected,schedules]);if(key===lastKey&&view.querySelector('#memberCultoMenu'))return;lastKey=key;
view.querySelectorAll('.dynamic-song,.song,.dynamic-empty,#memberCultoMenu,[data-rep-search]').forEach(x=>x.remove());
const grouped=(schedules||[]).map(sc=>({...sc,songs:selected.filter(x=>String(x.schedule_id)===String(sc.id))})).filter(x=>x.songs.length);
const head=view.querySelector('.pagehead');
if(!grouped.length){head.insertAdjacentHTML('afterend','<div id="memberCultoMenu" class="card"><div class="grow"><b>Nenhum repertório liberado ainda.</b><span>Quando a líder da semana selecionar os hinos para um culto, eles aparecerão aqui.</span></div></div>');return}
const menu=`<section id="memberCultoMenu"><div style="font-size:12px;color:#6c7a89;margin:0 0 10px">Escolha o culto para ver somente os hinos que serão ministrados.</div>${grouped.map(g=>`<button type="button" data-open-culto="${g.id}" style="width:100%;border:1px solid #dbe4ec;background:#fff;border-radius:16px;padding:14px;margin:0 0 10px;text-align:left;box-shadow:0 6px 18px #0e2a470d;display:flex;align-items:center;justify-content:space-between;gap:10px"><span><b style="display:block;color:#0e2a47;font-size:15px">${esc(g.title)}</b><small style="color:#687887">${esc(fmtDate(g.event_date))}${g.time_text?' • '+esc(g.time_text):''} • ${g.songs.length} hino${g.songs.length===1?'':'s'}</small></span><span style="font-size:22px;color:#174f7c">›</span></button>`).join('')}</section>`;
head.insertAdjacentHTML('afterend',menu);
view.querySelectorAll('[data-open-culto]').forEach(b=>b.onclick=()=>{const g=grouped.find(x=>String(x.id)===String(b.dataset.openCulto));if(!g)return;const box=document.getElementById('memberCultoMenu');box.innerHTML=`<button id="backCultos" type="button" style="border:0;background:#eef4f9;color:#0e2a47;border-radius:10px;padding:9px 11px;font-weight:800;margin-bottom:10px">← Voltar aos cultos</button><div style="margin-bottom:12px"><b style="font-size:18px;color:#0e2a47">${esc(g.title)}</b><div style="font-size:11px;color:#687887;margin-top:3px">${esc(fmtDate(g.event_date))}${g.time_text?' • '+esc(g.time_text):''}</div></div>${searchBox()}${g.songs.map(songCard).join('')}`;document.getElementById('backCultos').onclick=()=>{lastKey='';render()};bindSearch()});
}finally{busy=false}}
function tick(){render();setTimeout(tick,700)}
tick();
})();
(()=>{
if(window.__ieadjoDynamicRepertorio)return;window.__ieadjoDynamicRepertorio=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
let songs=[],loading=false;
function getSession(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
async function fetchSongs(){if(loading)return;const s=getSession();if(!s?.access_token)return;loading=true;try{const r=await fetch(SB_URL+'/rest/v1/ieadjo_songs?select=id,title,song_key,notes,service_day,schedule_id,created_at&order=created_at.desc',{cache:'no-store',headers:{apikey:SB_KEY,Authorization:'Bearer '+s.access_token}});if(!r.ok)throw new Error('Falha ao carregar repertório');songs=await r.json();renderIfOpen(true)}catch(e){console.warn('Repertório:',e)}finally{loading=false}}
function spotifyUrl(t){return 'https://open.spotify.com/search/'+encodeURIComponent(t)}
function cifraUrl(t,letter=false){return 'https://www.cifraclub.com.br/search/?q='+encodeURIComponent(t+(letter?' letra':''))}
function button(label,url,bg){return `<a href="${url}" target="_blank" rel="noopener noreferrer external" style="display:block;text-decoration:none;text-align:center;border-radius:10px;background:${bg};color:#fff;padding:9px 10px;font-size:11px;font-weight:800;white-space:nowrap">${label}</a>`}
function renderIfOpen(force=false){const view=document.getElementById('view');if(!view)return;const h=view.querySelector('.pagehead h1');if(!h||h.textContent.trim()!=='Repertório')return;if(!force&&view.querySelector('.song[data-dynamic-repertorio="1"]'))return;view.querySelectorAll('.song,.dynamic-empty').forEach(x=>x.remove());const head=view.querySelector('.pagehead');if(!songs.length){head.insertAdjacentHTML('afterend','<div class="card dynamic-empty"><div class="grow"><b>Nenhuma música cadastrada.</b><span>Quando a liderança adicionar no painel, ela aparecerá aqui automaticamente.</span></div></div>');return}
const html=songs.map(s=>`<div class="song" data-dynamic-repertorio="1"><div class="icon">♫</div><div class="grow"><b>${esc(s.title)}</b><span>Tom: ${esc(s.song_key||'-')} • ${esc(s.service_day||'Culto')}</span>${s.notes?`<span>${esc(s.notes)}</span>`:''}</div><div style="display:flex;flex-direction:column;gap:6px;flex:none">${button('▶ Spotify',spotifyUrl(s.title),'#1db954')}${button('🎸 Cifra',cifraUrl(s.title,false),'#0e2a47')}${button('📄 Letra',cifraUrl(s.title,true),'#174f7c')}</div></div>`).join('');
head.insertAdjacentHTML('afterend',html)}
function watch(){const view=document.getElementById('view');if(!view){setTimeout(watch,100);return}new MutationObserver(()=>{const h=view.querySelector('.pagehead h1');if(h?.textContent.trim()==='Repertório'&&!view.querySelector('.song[data-dynamic-repertorio="1"]'))setTimeout(()=>renderIfOpen(false),20)}).observe(view,{childList:true,subtree:true});renderIfOpen(false)}
watch();fetchSongs();setInterval(fetchSongs,10000);
})();
(()=>{
if(window.__ieadjoSongPositionControls)return;window.__ieadjoSongPositionControls=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
function session(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function headers(){const s=session();return {apikey:SB_KEY,Authorization:'Bearer '+s.access_token,'Content-Type':'application/json'}}
async function api(path,opt={}){const r=await fetch(SB_URL+path,{cache:'no-store',...opt,headers:{...headers(),...(opt.headers||{})}});if(!r.ok)throw new Error('Não foi possível salvar a posição do hino.');try{return await r.json()}catch{return null}}
window.ieadjoSaveSongPosition=async function(id,label){await api('/rest/v1/ieadjo_songs?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({position_label:label||null})})};
})();
(()=>{
if(window.__ieadjoRepertorioSearch)return;window.__ieadjoRepertorioSearch=true;
function norm(v){return String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
function ensureSearch(){
  const view=document.getElementById('view');
  if(!view)return;
  const title=view.querySelector('.pagehead h1');
  if(title?.textContent.trim()!=='Repertório')return;
  const cultos=view.querySelector('#leaderCultosFirst')||view.querySelector('#memberCultoMenu');
  if(!cultos)return;
  let wrap=view.querySelector('[data-rep-search]');
  if(!wrap){
    wrap=document.createElement('section');
    wrap.setAttribute('data-rep-search','1');
    wrap.style.cssText='display:block!important;margin:0 0 14px;padding:13px 14px;border:1px solid #dbe4ec;border-radius:17px;background:#fff;box-shadow:0 7px 20px #0e2a470d;visibility:visible!important;opacity:1!important';
    wrap.innerHTML='<div style="font-size:11px;font-weight:900;letter-spacing:.7px;color:#6b7885;margin:0 0 8px">PESQUISAR MÚSICAS</div><div style="position:relative"><span style="position:absolute;left:12px;top:21px;transform:translateY(-50%);font-size:16px;pointer-events:none">🔎</span><input type="search" placeholder="Digite o nome da música, cantor/ministério ou tom..." autocomplete="off" style="width:100%;border:1px solid #cfdbe5;border-radius:13px;padding:12px 14px 12px 38px;background:#fdfefe;color:#152433;font:inherit;outline:none"></div><div data-rep-search-count style="font-size:11px;color:#6c7a89;margin:6px 2px 0"></div>';
    const input=wrap.querySelector('input'),count=wrap.querySelector('[data-rep-search-count]');
    const apply=()=>{const q=norm(input.value);const rows=[...view.querySelectorAll('.dynamic-song,.song,.member-culto-song')];let visible=0;rows.forEach(row=>{const hit=!q||norm(row.textContent).includes(q);row.style.display=hit?'':'none';if(hit)visible++});count.textContent=q?`${visible} resultado${visible===1?'':'s'} encontrado${visible===1?'':'s'}`:''};
    input.addEventListener('input',apply);input.addEventListener('search',apply);wrap._apply=apply;
  }
  if(wrap.previousElementSibling!==cultos)cultos.insertAdjacentElement('afterend',wrap);
  wrap.style.display='block';wrap.style.visibility='visible';wrap.style.opacity='1';
  wrap._apply?.();
}
function ensureAdminSearch(){
  const work=document.getElementById('work');if(!work)return;
  const h=work.querySelector('h3');if(!h||!/biblioteca de músicas|repertório/i.test(h.textContent))return;
  let wrap=work.querySelector('[data-rep-search]');
  if(!wrap){wrap=document.createElement('div');wrap.setAttribute('data-rep-search','1');wrap.style.cssText='margin:10px 0 14px;position:relative';wrap.innerHTML='<span style="position:absolute;left:12px;top:21px;transform:translateY(-50%);font-size:16px;pointer-events:none">🔎</span><input type="search" placeholder="Pesquisar música, cantor/ministério ou tom..." autocomplete="off" style="width:100%;border:1px solid #d9e2ea;border-radius:13px;padding:12px 14px 12px 38px;background:#fff;color:#152433;font:inherit;outline:none"><div data-rep-search-count style="font-size:11px;color:#6c7a89;margin:6px 2px 0"></div>';const input=wrap.querySelector('input'),count=wrap.querySelector('[data-rep-search-count]');const apply=()=>{const q=norm(input.value);const rows=[...work.querySelectorAll('#items > .item')];let visible=0;rows.forEach(row=>{const hit=!q||norm(row.textContent).includes(q);row.style.display=hit?'':'none';if(hit)visible++});count.textContent=q?`${visible} resultado${visible===1?'':'s'} encontrado${visible===1?'':'s'}`:''};input.addEventListener('input',apply);input.addEventListener('search',apply);wrap._apply=apply;}
  if(wrap.previousElementSibling!==h)h.insertAdjacentElement('afterend',wrap);wrap._apply?.();
}
setInterval(()=>{ensureSearch();ensureAdminSearch()},300);
ensureSearch();ensureAdminSearch();
})();
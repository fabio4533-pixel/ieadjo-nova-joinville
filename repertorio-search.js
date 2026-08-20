(()=>{
if(window.__ieadjoRepertorioSearch)return;window.__ieadjoRepertorioSearch=true;
function norm(v){return String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
function makeSearch(container,mode){
  let wrap=container.querySelector('[data-rep-search]');
  if(!wrap){
    wrap=document.createElement('div');
    wrap.setAttribute('data-rep-search','1');
    wrap.style.cssText='margin:10px 0 14px;position:relative';
    wrap.innerHTML='<span style="position:absolute;left:12px;top:21px;transform:translateY(-50%);font-size:16px;pointer-events:none">🔎</span><input type="search" placeholder="Pesquisar música, cantor/ministério ou tom..." autocomplete="off" style="width:100%;border:1px solid #d9e2ea;border-radius:13px;padding:12px 14px 12px 38px;background:#fff;color:#152433;font:inherit;outline:none"><div data-rep-search-count style="font-size:11px;color:#6c7a89;margin:6px 2px 0"></div>';
    const input=wrap.querySelector('input'),count=wrap.querySelector('[data-rep-search-count]');
    const apply=()=>{const q=norm(input.value);let rows=[];if(mode==='app')rows=[...container.querySelectorAll('.dynamic-song,.song')];else rows=[...container.querySelectorAll('#items > .item')];let visible=0;rows.forEach(row=>{const hit=!q||norm(row.textContent).includes(q);row.style.display=hit?'':'none';if(hit)visible++});count.textContent=q?`${visible} resultado${visible===1?'':'s'} encontrado${visible===1?'':'s'}`:''};
    input.addEventListener('input',apply);input.addEventListener('search',apply);wrap._apply=apply;
  }
  if(mode==='app'){
    const head=container.querySelector('.pagehead');
    const cultos=container.querySelector('#leaderCultosFirst')||container.querySelector('#memberCultoMenu');
    const anchor=cultos||head;
    if(anchor&&wrap.previousElementSibling!==anchor)anchor.insertAdjacentElement('afterend',wrap);
  }else{
    const h=container.querySelector('h3');
    if(h&&wrap.previousElementSibling!==h)h.insertAdjacentElement('afterend',wrap);
  }
  wrap._apply?.();
}
function scanApp(){const view=document.getElementById('view');if(!view)return;const title=view.querySelector('.pagehead h1');if(title?.textContent.trim()==='Repertório')makeSearch(view,'app')}
function scanAdmin(){const work=document.getElementById('work');if(!work)return;const h=work.querySelector('h3');if(h&&/biblioteca de músicas|repertório/i.test(h.textContent))makeSearch(work,'admin')}
function observe(){scanApp();scanAdmin();const targets=[document.getElementById('view'),document.getElementById('work')].filter(Boolean);targets.forEach(t=>new MutationObserver(()=>{scanApp();scanAdmin()}).observe(t,{childList:true,subtree:false}));if(!targets.length)setTimeout(observe,150)}
observe();
})();
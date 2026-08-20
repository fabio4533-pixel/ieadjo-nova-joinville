(()=>{
if(window.__ieadjoRepLayoutLock)return;window.__ieadjoRepLayoutLock=true;
function apply(){
 const view=document.getElementById('view');
 const title=view?.querySelector('.pagehead h1');
 if(!view||title?.textContent.trim()!=='Repertório')return;
 view.style.display='flex';
 view.style.flexDirection='column';
 const cultos=view.querySelector('#leaderCultosFirst')||view.querySelector('#memberCultoMenu');
 const search=view.querySelector('[data-rep-search]');
 const head=view.querySelector('.pagehead');
 const manager=view.querySelector('#weeklyRepManager');
 if(cultos){cultos.style.order='-400';cultos.style.width='100%';cultos.style.marginTop='0'}
 if(search){search.style.order='-300';search.style.width='100%'}
 if(head){head.style.order='-200';head.style.width='100%'}
 if(manager){manager.style.order='-100';manager.style.width='100%'}
 [...view.children].forEach(el=>{if(el!==cultos&&el!==search&&el!==head&&el!==manager&&el.style.order==='')el.style.order='0'});
}
new MutationObserver(apply).observe(document.getElementById('view')||document.body,{childList:true,subtree:true});
setInterval(apply,250);
apply();
})();
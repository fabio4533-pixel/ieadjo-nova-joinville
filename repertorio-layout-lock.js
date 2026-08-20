(()=>{
if(window.__ieadjoRepLayoutLock)return;window.__ieadjoRepLayoutLock=true;
function ensureStyle(){let st=document.getElementById('repOnlySelectedStyle');if(!st){st=document.createElement('style');st.id='repOnlySelectedStyle';st.textContent='#view[data-repertorio-only-selected="1"] .dynamic-song,#view[data-repertorio-only-selected="1"] > .song,#view[data-repertorio-only-selected="1"] .dynamic-empty,#view[data-repertorio-only-selected="1"] #leaderHinosLabel{display:none!important}';document.head.appendChild(st)}}
function apply(){
 const view=document.getElementById('view');const title=view?.querySelector('.pagehead h1');
 if(!view||title?.textContent.trim()!=='Repertório'){if(view)view.removeAttribute('data-repertorio-only-selected');return}
 ensureStyle();view.setAttribute('data-repertorio-only-selected','1');view.style.display='flex';view.style.flexDirection='column';
 const cultos=view.querySelector('#leaderCultosFirst')||view.querySelector('#memberCultoMenu');const search=view.querySelector('[data-rep-search]');const head=view.querySelector('.pagehead');const manager=view.querySelector('#weeklyRepManager');const selected=view.querySelector('#leaderSelectedCultoSongs');
 if(cultos){cultos.style.order='-400';cultos.style.width='100%';cultos.style.marginTop='0'}
 if(search){search.style.order='-300';search.style.width='100%'}
 if(head){head.style.order='-200';head.style.width='100%'}
 if(manager){manager.style.order='-100';manager.style.width='100%'}
 if(selected){selected.style.order='-50';selected.style.width='100%'}
 view.querySelectorAll('.dynamic-song,.dynamic-empty,#leaderHinosLabel').forEach(el=>{el.hidden=true;el.style.setProperty('display','none','important')});
 [...view.children].forEach(el=>{if(![cultos,search,head,manager,selected].includes(el)&&el.style.order==='')el.style.order='0'});
}
new MutationObserver(apply).observe(document.getElementById('view')||document.body,{childList:true,subtree:true});setInterval(apply,250);apply();
})();
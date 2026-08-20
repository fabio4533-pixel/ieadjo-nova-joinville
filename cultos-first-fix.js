(()=>{
if(window.__ieadjoCultosFirstFix)return;window.__ieadjoCultosFirstFix=true;

function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

function install(){
  const view=document.getElementById('view');
  if(!view){setTimeout(install,200);return}

  view.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-open-culto]');
    if(!btn)return;
    const box=document.getElementById('memberCultoMenu');
    if(!box)return;

    // Guarda a lista original de cultos antes do script antigo substituir o conteúdo.
    if(!box.dataset.cultosOriginal){
      box.dataset.cultosOriginal=box.innerHTML;
    }
    const original=box.dataset.cultosOriginal;

    // Deixa o clique original montar os hinos e logo depois recoloca os cultos acima.
    setTimeout(()=>{
      const current=document.getElementById('memberCultoMenu');
      if(!current)return;
      const result=current.innerHTML;
      if(result.includes('data-cultos-top="1"'))return;

      current.innerHTML=`<div data-cultos-top="1">${original}</div><section id="cultoHinosAbaixo" style="margin-top:18px;padding-top:14px;border-top:1px solid #e3e9ef">${result}</section>`;

      const back=current.querySelector('#backCultos');
      if(back)back.style.display='none';

      const title=current.querySelector('#cultoHinosAbaixo b[style*="font-size:18px"]');
      if(title){
        const label=document.createElement('div');
        label.textContent='HINOS SELECIONADOS';
        label.style.cssText='font-size:10px;font-weight:900;letter-spacing:.9px;color:#6b7885;margin:0 0 5px';
        title.parentElement?.insertBefore(label,title);
      }

      const selectedId=String(btn.dataset.openCulto||'');
      current.querySelectorAll('[data-open-culto]').forEach(b=>{
        const active=String(b.dataset.openCulto||'')===selectedId;
        b.style.borderColor=active?'#174f7c':'#dbe4ec';
        b.style.background=active?'#eef6fc':'#fff';
      });

      document.getElementById('cultoHinosAbaixo')?.scrollIntoView({behavior:'smooth',block:'nearest'});
    },0);
  },true);
}
install();
})();
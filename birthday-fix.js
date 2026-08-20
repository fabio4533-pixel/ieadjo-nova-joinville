(()=>{
  function birthdayEmptyMarkup(){
    const monthName=new Date().toLocaleDateString('pt-BR',{month:'long'});
    return `<section id="birthdayHighlight" style="margin:14px 0 16px;padding:16px;border-radius:20px;background:linear-gradient(135deg,#fff0ae,#ffd86a);border:2px solid #d5ad58;box-shadow:0 10px 28px #d5ad5840"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px"><div><span style="display:block;font-size:10px;font-weight:900;letter-spacing:1px;color:#8a5c00">✨ DESTAQUE DO MÊS</span><b style="font-size:17px;color:#3e2b00">🎉 ANIVERSARIANTE DO MÊS</b></div><span style="font-size:30px">🎂</span></div><div style="font-size:13px;font-weight:650;color:#674b0c;line-height:1.5">Nenhum aniversariante com data cadastrada em ${monthName}.</div></section>`;
  }

  function emphasizeBirthday(){
    try{
      const doc=site?.contentDocument||document;
      const view=doc.getElementById('view')||doc;
      const card=view.querySelector('#birthdayHighlight');
      const hello=view.querySelector('.hello');
      if(!card)return;
      if(hello&&card.previousElementSibling!==hello)hello.insertAdjacentElement('afterend',card);
      card.style.cssText='margin:14px 0 16px;padding:16px;border-radius:20px;background:linear-gradient(135deg,#fff0ae,#ffd86a);border:2px solid #d5ad58;box-shadow:0 10px 28px #d5ad5840;position:relative;overflow:hidden';
      const title=[...card.querySelectorAll('b,strong,h2,h3')].find(x=>/aniversariante/i.test(x.textContent||''));
      if(title){title.style.fontSize='17px';title.style.fontWeight='900';title.style.color='#3e2b00'}
      card.querySelectorAll('span,p,small,div').forEach(el=>{if(el!==title&&!el.style.color&&el.textContent?.trim())el.style.color='#674b0c'});
      if(!card.querySelector('[data-birthday-badge]')){
        const badge=doc.createElement('div');
        badge.setAttribute('data-birthday-badge','1');
        badge.textContent='🎂';
        badge.style.cssText='position:absolute;right:14px;top:12px;font-size:30px;line-height:1;pointer-events:none';
        card.appendChild(badge);
      }
    }catch{}
  }

  try{
    if(typeof birthdayMarkup==='function'){
      const originalBirthdayMarkup=birthdayMarkup;
      birthdayMarkup=function(){
        const html=originalBirthdayMarkup();
        return html||birthdayEmptyMarkup();
      };
    }

    if(typeof patchIframe==='function'){
      const src=patchIframe.toString();
      const old="const oldBirthday=view.querySelector('#birthdayHighlight');if(oldBirthday)oldBirthday.remove();if(view.querySelector('.hello')){const b=birthdayMarkup();if(b)view.querySelector('.hello').insertAdjacentHTML('afterend',b)}";
      const fixed="const helloBox=view.querySelector('.hello'),oldBirthday=view.querySelector('#birthdayHighlight'),b=helloBox?birthdayMarkup():'';if(!helloBox){if(oldBirthday)oldBirthday.remove()}else if(b){if(!oldBirthday)helloBox.insertAdjacentHTML('afterend',b);else if(oldBirthday.outerHTML!==b)oldBirthday.outerHTML=b}";
      if(src.includes(old)){
        const rebuilt='('+src.replace(old,fixed)+')';
        patchIframe=(0,eval)(rebuilt);
      }
    }

    const refresh=()=>{try{fetchBirthdays();patchIframe();setTimeout(emphasizeBirthday,80)}catch{setTimeout(emphasizeBirthday,80)}};
    setTimeout(refresh,250);
    setTimeout(refresh,1200);
    setTimeout(emphasizeBirthday,2200);
  }catch(e){console.warn('Birthday fix:',e)}
})();

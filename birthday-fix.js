(()=>{
  function birthdayEmptyMarkup(){
    const monthName=new Date().toLocaleDateString('pt-BR',{month:'long'});
    return `<section id="birthdayHighlight" style="margin:12px 0 14px;padding:14px;border-radius:18px;background:linear-gradient(135deg,#fff4c8,#ffe39a);border:1px solid #e4c16b;box-shadow:0 8px 22px #00000012"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px"><div><span style="display:block;font-size:10px;font-weight:900;letter-spacing:.7px;color:#9a6a00">DESTAQUE</span><b style="font-size:15px;color:#4c3400">🎉 ANIVERSARIANTE DO MÊS</b></div><span style="font-size:22px">🎂</span></div><div style="font-size:12px;color:#765e27;line-height:1.45">Nenhum aniversariante com data cadastrada em ${monthName}.</div></section>`;
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

    setTimeout(()=>{try{fetchBirthdays();patchIframe()}catch{}},250);
    setTimeout(()=>{try{fetchBirthdays();patchIframe()}catch{}},1200);
  }catch(e){console.warn('Birthday fix:',e)}
})();

(()=>{
  if(window.__ieadjoLoginFix)return;
  window.__ieadjoLoginFix=true;

  const forceOpen=()=>{
    try{
      if(typeof authscreen!=='undefined'){
        authscreen.classList.add('hidden');
        authscreen.style.setProperty('display','none','important');
      }
      if(typeof site!=='undefined'){
        site.classList.remove('hidden');
        site.style.setProperty('display','block','important');
      }
      if(typeof logoutBtn!=='undefined')logoutBtn.classList.remove('hidden');
      if(typeof floatBox!=='undefined'&&!window.matchMedia('(display-mode: standalone)').matches&&!navigator.standalone)floatBox.classList.remove('hidden');
    }catch(e){console.error('IEADJO forceOpen',e)}
  };

  async function loginFixed(){
    const email=memberEmail.value.trim().toLowerCase();
    const password=memberPassword.value;
    try{
      if(!email||password.length<6)throw new Error('Informe um e-mail válido e uma senha com pelo menos 6 caracteres.');
      authAction.disabled=true;
      setMsg('Entrando...',true);
      const d=await sb('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});
      saveSession(d);
      const p=await loadMemberProfile();
      if(!p)throw new Error('Login aceito, mas não foi possível carregar seu cadastro. Tente novamente.');
      if(p.approved===true&&p.access_status==='approved'){
        forceOpen();
        try{fetchSchedules();fetchBirthdays();setTimeout(patchIframe,100)}catch{}
        return;
      }
      clearSession();
      pendingInfo.classList.remove('hidden','rejected');
      if(p.access_status==='rejected'){
        pendingInfo.classList.add('rejected');
        pendingInfo.textContent='❌ Seu acesso está bloqueado. Procure a liderança.';
        setMsg('Acesso não autorizado.');
      }else{
        pendingInfo.textContent='⏳ Seu acesso ainda aguarda aprovação da liderança.';
        setMsg('Aguardando aprovação da liderança.',true);
      }
    }catch(e){
      setMsg(e?.message||'Não foi possível entrar.');
    }finally{
      authAction.disabled=false;
    }
  }

  function install(){
    if(typeof authAction==='undefined'||typeof sb==='undefined'){setTimeout(install,100);return;}
    const original=authAction.onclick;
    authAction.onclick=async()=>{
      if(typeof mode!=='undefined'&&mode==='signup')return original?.();
      return loginFixed();
    };

    try{
      const s=stored?.();
      if(s?.access_token){
        saveSession(s);
        loadMemberProfile().then(p=>{if(p?.approved===true&&p?.access_status==='approved')forceOpen()}).catch(()=>{});
      }
    }catch{}
  }
  install();
})();

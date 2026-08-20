(()=>{
if(window.__ieadjoCommunity)return;window.__ieadjoCommunity=true;
const SB_URL='https://fzpffyouubmbxfwycywg.supabase.co';
const SB_KEY='sb_publishable_fqG3I5cRWBXjn-EP0FoATA_0-SWvfsR';
const view=document.getElementById('view');
if(!view)return;
const devotionals=[
 {title:'Confie o caminho a Deus',ref:'Provérbios 3:5-6',text:'Nem sempre enxergamos o próximo passo, mas podemos entregar a direção a Deus. Hoje, escolha obedecer no que já está claro e confiar a Ele aquilo que ainda não está.',prayer:'Senhor, guia minhas decisões e ensina-me a confiar em Ti acima da minha própria compreensão.'},
 {title:'Força para o dia de hoje',ref:'Isaías 40:31',text:'A renovação não vem apenas de descansar o corpo, mas de recolocar a esperança no lugar certo. Deus pode renovar coragem, paciência e disposição para servir.',prayer:'Deus, renova minhas forças e dá-me constância para viver este dia com fé.'},
 {title:'Uma paz que guarda o coração',ref:'Filipenses 4:6-7',text:'A ansiedade tenta ocupar todo o espaço da mente. A oração abre esse espaço para a presença de Deus. Transforme hoje cada preocupação em uma conversa sincera com Ele.',prayer:'Pai, receba minhas preocupações e guarda meu coração com a Tua paz.'},
 {title:'Sirva com alegria',ref:'Colossenses 3:23',text:'O serviço ganha outro sentido quando lembramos para quem estamos fazendo. Mesmo tarefas simples podem se tornar expressão de adoração quando feitas com dedicação e amor.',prayer:'Senhor, que tudo o que eu fizer hoje seja feito com alegria e excelência para Ti.'},
 {title:'Graça suficiente',ref:'2 Coríntios 12:9',text:'Nem toda fraqueza precisa desaparecer para que Deus trabalhe. Muitas vezes, é justamente nela que aprendemos dependência, humildade e perseverança.',prayer:'Jesus, sustenta-me nas minhas limitações e manifesta Tua força em minha vida.'},
 {title:'Comece pela gratidão',ref:'Salmo 103:1-5',text:'A gratidão reorganiza nossa atenção. Antes de olhar para o que falta, lembre-se do cuidado de Deus já presente em sua história e agradeça de forma específica.',prayer:'Deus, abre meus olhos para reconhecer Teu cuidado e cultivar um coração agradecido.'},
 {title:'Amor que se transforma em atitude',ref:'1 João 3:18',text:'Amar vai além de boas intenções. Hoje existe alguém que pode ser alcançado por uma mensagem, uma ajuda prática, uma escuta atenta ou uma oração.',prayer:'Senhor, mostra-me uma maneira concreta de amar alguém hoje.'},
 {title:'Sabedoria antes de falar',ref:'Tiago 1:19',text:'Ouvir com atenção é uma forma de cuidado. Antes de responder rapidamente, procure compreender. Palavras guiadas por sabedoria podem restaurar relacionamentos.',prayer:'Pai, dá-me ouvidos atentos e palavras que tragam vida e reconciliação.'},
 {title:'Deus está presente',ref:'Salmo 46:1',text:'Em dias tranquilos ou difíceis, a presença de Deus não depende das circunstâncias. Ele continua sendo refúgio, auxílio e segurança para quem O busca.',prayer:'Senhor, ajuda-me a perceber Tua presença em cada momento deste dia.'},
 {title:'Persevere no bem',ref:'Gálatas 6:9',text:'Nem todo fruto aparece rapidamente. Continue fazendo o que é certo, mesmo quando os resultados parecem pequenos. Fidelidade também é permanecer quando ninguém aplaude.',prayer:'Deus, dá-me perseverança para continuar fazendo o bem sem desanimar.'},
 {title:'Um coração ensinável',ref:'Salmo 139:23-24',text:'Crescer espiritualmente também significa permitir que Deus revele atitudes que precisam mudar. Faça hoje uma oração aberta, sem tentar justificar tudo.',prayer:'Senhor, examina meu coração, corrige meus caminhos e conduz-me para mais perto de Ti.'},
 {title:'Escolha perdoar',ref:'Efésios 4:31-32',text:'Perdoar não chama o erro de certo; significa não permitir que a ofensa governe o coração. É um processo que muitas vezes começa com uma decisão diante de Deus.',prayer:'Pai, ajuda-me a liberar perdão e a caminhar com um coração livre de amargura.'},
 {title:'Fé nas pequenas coisas',ref:'Lucas 16:10',text:'Grandes responsabilidades são construídas sobre pequenas fidelidades. Cuide bem do que Deus colocou em suas mãos hoje, mesmo que pareça simples.',prayer:'Senhor, torna-me fiel nas pequenas coisas e responsável com aquilo que me confiaste.'},
 {title:'Esperança que permanece',ref:'Romanos 15:13',text:'Esperança cristã não é fingir que tudo está bem; é lembrar que Deus continua agindo mesmo quando ainda não vemos a resposta. Caminhe hoje alimentando essa confiança.',prayer:'Deus de esperança, enche meu coração de fé, paz e confiança no Teu agir.'}
];
function getSession(){try{return JSON.parse(localStorage.getItem('ieadjo_member_session')||'null')}catch{return null}}
function profile(){try{return JSON.parse(localStorage.getItem('ieadjo_member_profile')||'null')||{}}catch{return {}}}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function devOfDay(){const now=new Date(),start=new Date(now.getFullYear(),0,0),day=Math.floor((now-start)/86400000);return devotionals[(day-1)%devotionals.length]}
function injectHome(){
 if(!view.querySelector('.hello'))return;
 const hero=view.querySelector('.hero'),section=view.querySelector('.section-title'),grid=view.querySelector('.grid');
 if(hero&&!view.querySelector('[data-daily-devotional]')){
  const d=devOfDay();const card=document.createElement('section');card.setAttribute('data-daily-devotional','1');card.style.cssText='margin-top:16px;background:linear-gradient(145deg,#fff8e8,#fff);border:1px solid #ead8ae;border-radius:18px;padding:16px;box-shadow:0 5px 18px #0e2a4710';
  card.innerHTML=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><span style="font-size:24px">📖</span><div><b style="font-size:15px">Devocional do dia</b><div style="font-size:11px;color:#8a6c2d">${esc(d.ref)}</div></div></div><h3 style="margin:8px 0 6px;font-size:17px">${esc(d.title)}</h3><p style="font-size:13px;line-height:1.55;color:#566675;margin:0 0 10px">${esc(d.text)}</p><div style="font-size:12px;line-height:1.5;color:#174f7c;background:#eef4f9;border-radius:12px;padding:10px"><b>🙏 Oração:</b> ${esc(d.prayer)}</div>`;
  hero.insertAdjacentElement('afterend',card);
 }
 if(grid&&!grid.querySelector('[data-community-go="oracao"]')){
  const b=document.createElement('button');b.type='button';b.setAttribute('data-community-go','oracao');b.innerHTML='<span class="ico">🙏</span><b>Pedidos de oração</b><small>Compartilhar e interceder</small>';grid.appendChild(b);
 }
}
async function api(path,opts={}){const s=getSession();if(!s?.access_token)throw new Error('Sessão expirada. Entre novamente.');const headers={apikey:SB_KEY,Authorization:'Bearer '+s.access_token,'Content-Type':'application/json',...(opts.headers||{})};const r=await fetch(SB_URL+path,{...opts,headers,cache:'no-store'});let d=null;try{d=await r.json()}catch{}if(!r.ok)throw new Error(d?.message||d?.error||'Não foi possível concluir.');return d}
async function loadPrayers(){
 const box=view.querySelector('#prayerList');if(!box)return;
 try{const rows=await api('/rest/v1/ieadjo_prayer_requests?select=id,member_name,request_text,is_anonymous,created_at&order=created_at.desc&limit=30');
  if(!view.querySelector('#prayerList'))return;
  box.innerHTML=rows.length?rows.map(r=>`<article style="background:#fff;border:1px solid #e5eaf0;border-radius:16px;padding:14px;margin-top:10px"><div style="display:flex;justify-content:space-between;gap:10px"><b style="font-size:13px;color:#174f7c">${r.is_anonymous?'Pedido anônimo':esc(r.member_name)}</b><small style="font-size:10px;color:#8b98a5">${new Date(r.created_at).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}</small></div><p style="font-size:13px;line-height:1.5;color:#566675;margin:8px 0 0">${esc(r.request_text)}</p></article>`).join(''):'<div style="background:#fff;border:1px solid #e5eaf0;border-radius:16px;padding:16px;color:#6c7a89;font-size:13px">Ainda não há pedidos. Seja o primeiro a compartilhar.</div>';
 }catch(e){if(view.querySelector('#prayerList'))box.innerHTML=`<div style="color:#9b3838;font-size:12px;padding:10px">${esc(e.message)}</div>`}
}
function renderPrayerPage(){
 view.innerHTML=`<div class="pagehead"><h1>Pedidos de oração</h1><p>Compartilhe um pedido e interceda pelos irmãos.</p></div><div style="background:#fff7e8;border:1px solid #ead8ae;border-radius:18px;padding:15px"><label style="font-size:12px;font-weight:800;display:block;margin-bottom:7px">Seu pedido</label><textarea id="prayerText" maxlength="1000" placeholder="Escreva aqui o motivo de oração..." style="width:100%;min-height:100px;border:1px solid #dfe6ec;border-radius:12px;padding:12px;font:inherit;resize:vertical"></textarea><label style="display:flex;align-items:center;gap:8px;font-size:12px;margin:10px 0"><input id="prayerAnon" type="checkbox"> Publicar como pedido anônimo</label><button id="sendPrayer" style="width:100%;border:0;border-radius:12px;background:#0e2a47;color:#fff;padding:12px;font-weight:800">🙏 Enviar pedido de oração</button><div id="prayerMsg" style="min-height:18px;font-size:12px;margin-top:8px"></div></div><div style="display:flex;align-items:center;justify-content:space-between;margin:20px 2px 8px"><h3 style="margin:0">Pedidos da comunidade</h3><button id="refreshPrayers" style="border:0;background:#eef4f9;color:#0e2a47;border-radius:10px;padding:8px 10px;font-weight:800">Atualizar</button></div><div id="prayerList"><div style="font-size:12px;color:#6c7a89;padding:10px">Carregando pedidos...</div></div>`;
 document.getElementById('refreshPrayers').onclick=loadPrayers;
 document.getElementById('sendPrayer').onclick=async()=>{const btn=document.getElementById('sendPrayer'),txt=document.getElementById('prayerText').value.trim(),anon=document.getElementById('prayerAnon').checked,msg=document.getElementById('prayerMsg');if(txt.length<3){msg.textContent='Escreva um pedido com pelo menos 3 caracteres.';msg.style.color='#9b3838';return}try{btn.disabled=true;msg.textContent='Enviando...';msg.style.color='#6c7a89';const p=profile();const s=getSession();await api('/rest/v1/ieadjo_prayer_requests',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify({user_id:s.user.id,member_name:p.name||s.user.user_metadata?.full_name||'Integrante',request_text:txt,is_anonymous:anon})});document.getElementById('prayerText').value='';document.getElementById('prayerAnon').checked=false;msg.textContent='✓ Pedido enviado. Vamos orar juntos.';msg.style.color='#238b57';await loadPrayers()}catch(e){msg.textContent=e.message;msg.style.color='#9b3838'}finally{btn.disabled=false}};
 loadPrayers();
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-community-go="oracao"]');if(!b)return;e.preventDefault();e.stopPropagation();renderPrayerPage()},true);
const obs=new MutationObserver(()=>{if(view.querySelector('.hello'))injectHome()});obs.observe(view,{childList:true,subtree:false});
injectHome();
setInterval(()=>{if(view.querySelector('#prayerList'))loadPrayers()},15000);
})();
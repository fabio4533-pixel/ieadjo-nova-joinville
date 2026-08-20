(()=>{
if(window.__ieadjoBible)return;window.__ieadjoBible=true;

function ensureStyles(){
  if(document.getElementById('ieadjoBibleStyles'))return;
  const s=document.createElement('style');
  s.id='ieadjoBibleStyles';
  s.textContent=`
    .nav{grid-template-columns:repeat(6,1fr)!important}
    .bibleHero{background:linear-gradient(145deg,#0e2a47,#174f7c);color:#fff;border-radius:22px;padding:20px;box-shadow:0 12px 30px #0e2a4722;margin-top:10px}
    .bibleHero .book{font-size:42px;margin-bottom:10px}.bibleHero h2{margin:0 0 8px}.bibleHero p{font-size:13px;line-height:1.5;color:#ffffffc9}
    .bibleOpen{display:block;text-align:center;text-decoration:none;margin-top:16px;background:#d5ad58;color:#0e2a47;border-radius:12px;padding:13px;font-weight:900}
    .bibleNote{background:#fff;border:1px solid #e5eaf0;border-radius:16px;padding:14px;margin-top:12px;color:#566675;font-size:12px;line-height:1.5}
    @media(max-width:420px){.nav button small{font-size:9px}.nav button span{font-size:19px}}
  `;
  document.head.appendChild(s);
}

function ensureNavButton(){
  const nav=document.querySelector('.nav');
  if(!nav||nav.querySelector('[data-bible-go]'))return;
  const b=document.createElement('button');
  b.type='button';
  b.setAttribute('data-bible-go','1');
  b.innerHTML='<span>📖</span><small>Bíblia</small>';
  nav.insertBefore(b,nav.querySelector('[data-go="perfil"]')||null);
}

function ensureHomeButton(){
  const view=document.getElementById('view');
  const grid=view?.querySelector('.grid');
  if(!grid||grid.querySelector('[data-bible-go]'))return;
  const b=document.createElement('button');
  b.type='button';
  b.setAttribute('data-bible-go','1');
  b.innerHTML='<span class="ico">📖</span><b>Bíblia</b><small>Leia a Palavra</small>';
  grid.appendChild(b);
}

function renderBible(){
  const view=document.getElementById('view');
  if(!view)return;
  document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
  document.querySelector('.nav [data-bible-go]')?.classList.add('active');
  view.innerHTML=`
    <div class="pagehead"><h1>📖 Bíblia</h1><p>A Palavra de Deus junto com o ministério.</p></div>
    <div class="bibleHero">
      <div class="book">📖</div>
      <h2>Bíblia Sagrada</h2>
      <p>Tenha acesso rápido à Bíblia para leitura, estudo e preparação dos cultos e ensaios.</p>
      <a class="bibleOpen" href="https://www.bible.com/pt" target="_blank" rel="noopener noreferrer external">Abrir Bíblia Online</a>
    </div>
    <div class="bibleNote"><b>💡 Dica:</b> ao abrir a Bíblia, você pode escolher o livro, capítulo e versão que preferir e depois voltar ao aplicativo normalmente.</div>`;
}

document.addEventListener('click',e=>{
  const b=e.target.closest('[data-bible-go]');
  if(!b)return;
  e.preventDefault();e.stopPropagation();renderBible();
},true);

function watch(){
  ensureStyles();ensureNavButton();ensureHomeButton();
  const view=document.getElementById('view');
  if(!view){setTimeout(watch,100);return}
  new MutationObserver(()=>{ensureHomeButton();ensureNavButton()}).observe(view,{childList:true,subtree:false});
}
watch();
})();

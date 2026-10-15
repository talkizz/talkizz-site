/* TALKIZZ accessibility toolbar — self-contained, no external requests */
(function(){
if(window.__tkA11y)return;window.__tkA11y=1;
var he=(document.documentElement.lang||'he').slice(0,2)==='he';
var T=he?{btn:'פתיחת תפריט נגישות',title:'נגישות',close:'סגירה',inc:'הגדלת טקסט',dec:'הקטנת טקסט',hc:'ניגודיות גבוהה',ul:'הדגשת קישורים',font:'גופן קריא',stop:'עצירת תנועה',cur:'סמן גדול',reset:'איפוס הגדרות',stmt:'הצהרת נגישות',stmtHref:'accessibility.html',size:'גודל טקסט'}
:{btn:'Open accessibility menu',title:'Accessibility',close:'Close',inc:'Increase text size',dec:'Decrease text size',hc:'High contrast',ul:'Underline links',font:'Readable font',stop:'Stop motion',cur:'Large cursor',reset:'Reset settings',stmt:'Accessibility statement',stmtHref:'accessibility.html',size:'Text size'};
var root=document.documentElement,KEY='tkA11y',S={z:0,hc:0,ul:0,font:0,stop:0,cur:0};
try{var sv=JSON.parse(localStorage.getItem(KEY)||'null');if(sv)for(var k in S)if(k in sv)S[k]=sv[k]}catch(e){}
var css='html.tk-hc body,html.tk-hc body *:not(img):not(video):not(iframe):not(svg):not(path){background-color:#000!important;color:#fff!important;border-color:#fff!important;box-shadow:none!important;text-shadow:none!important}'
+'html.tk-hc a,html.tk-hc a *{color:#ffe14d!important}html.tk-hc img,html.tk-hc video{filter:contrast(1.1)}html.tk-hc .tk-panel button.on{outline:2px solid #ffe14d}'
+'html.tk-ul a{text-decoration:underline!important;text-underline-offset:3px}'
+'html.tk-font body,html.tk-font body *{font-family:Arial,Helvetica,sans-serif!important;letter-spacing:.01em!important}'
+'html.tk-stop *,html.tk-stop *::before,html.tk-stop *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}'
+'html.tk-cur,html.tk-cur *{cursor:url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><path d=\'M4 2l26 14-11 3 7 14-5 2-7-14-8 8z\' fill=\'black\' stroke=\'white\' stroke-width=\'2\'/></svg>") 4 2,auto!important}'
+'.tk-fab{position:fixed;right:14px;bottom:14px;z-index:9000;width:48px;height:48px;border-radius:50%;border:2px solid #fff4ef;background:#000015;color:#fff4ef;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;box-shadow:0 6px 18px rgba(0,0,21,.35)}'
+'.tk-fab:focus-visible,.tk-panel button:focus-visible,.tk-panel a:focus-visible{outline:3px solid #f69dad;outline-offset:2px}'
+'.tk-panel{position:fixed;right:14px;bottom:72px;z-index:9001;width:min(300px,calc(100vw - 28px));background:#000015;color:#fff4ef;border-radius:16px;padding:16px;box-shadow:0 18px 40px rgba(0,0,21,.5);font:16px/1.4 Arial,Helvetica,sans-serif}'
+'.tk-panel[hidden]{display:none}.tk-panel h2{margin:0 0 10px;font-size:18px;color:#f69dad}'
+'.tk-panel .g{display:grid;grid-template-columns:1fr 1fr;gap:8px}.tk-panel button.o{min-height:44px;padding:8px 10px;border-radius:10px;border:2px solid #fff4ef;background:transparent;color:#fff4ef;font:inherit;cursor:pointer}'
+'.tk-panel button.o[aria-pressed=true]{background:#f69dad;color:#000015;border-color:#f69dad}.tk-panel .x{position:absolute;inset-block-start:8px;inset-inline-end:8px;min-width:44px;min-height:44px;background:none;border:0;color:#fff4ef;font-size:20px;cursor:pointer}'
+'.tk-panel a.s{display:inline-block;margin-top:12px;color:#fff4ef;text-decoration:underline}.tk-panel .r{margin-top:8px;width:100%}'
+'html.tk-hc .tk-fab,html.tk-hc .tk-panel,html.tk-hc .tk-panel button.o{background-color:#000!important}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function apply(){
 root.classList.toggle('tk-hc',!!S.hc);root.classList.toggle('tk-ul',!!S.ul);root.classList.toggle('tk-font',!!S.font);root.classList.toggle('tk-stop',!!S.stop);root.classList.toggle('tk-cur',!!S.cur);
 var z=[1,1.1,1.2,1.3][S.z]||1;document.body.style.zoom=z===1?'':z;
 try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
 if(S.stop){document.querySelectorAll('video').forEach(function(v){try{v.pause()}catch(e){}})}
 pressed()}
var fab=document.createElement('button');fab.type='button';fab.className='tk-fab';fab.setAttribute('aria-label',T.btn);fab.setAttribute('aria-expanded','false');fab.setAttribute('aria-controls','tk-panel');
fab.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><circle cx="12" cy="4.6" r="2.1" fill="currentColor"/><path d="M5 8.3c4.7 1.3 9.3 1.3 14 0M12 8.5v5.3m0 0l-3.4 6.2m3.4-6.2l3.4 6.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var fl=document.querySelector('footer .copy a');if(fl)T.stmtHref=fl.getAttribute('href');
var pn=document.createElement('div');pn.className='tk-panel';pn.id='tk-panel';pn.hidden=true;pn.setAttribute('role','dialog');pn.setAttribute('aria-label',T.title);
var items=[['inc',T.inc],['dec',T.dec],['hc',T.hc],['ul',T.ul],['font',T.font],['stop',T.stop],['cur',T.cur]];
pn.innerHTML='<button type="button" class="x" aria-label="'+T.close+'">✕</button><h2>'+T.title+'</h2><div class="g">'+items.map(function(i){return '<button type="button" class="o" data-k="'+i[0]+'"'+(i[0]==='inc'||i[0]==='dec'?'':' aria-pressed="false"')+'>'+i[1]+'</button>'}).join('')+'</div><button type="button" class="o r" data-k="reset">'+T.reset+'</button><a class="s" href="'+T.stmtHref+'">'+T.stmt+'</a>';
function pressed(){['hc','ul','font','stop','cur'].forEach(function(k){var b=pn.querySelector('[data-k='+k+']');if(b)b.setAttribute('aria-pressed',S[k]?'true':'false')})}
pn.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
 if(b.classList.contains('x')){close();return}
 var k=b.getAttribute('data-k');if(!k)return;
 if(k==='inc')S.z=Math.min(3,S.z+1);else if(k==='dec')S.z=Math.max(0,S.z-1);else if(k==='reset'){S={z:0,hc:0,ul:0,font:0,stop:0,cur:0}}else S[k]=S[k]?0:1;apply()});
function open(){pn.hidden=false;fab.setAttribute('aria-expanded','true');var f=pn.querySelector('button.o');f&&f.focus()}
function close(){pn.hidden=true;fab.setAttribute('aria-expanded','false');fab.focus()}
fab.addEventListener('click',function(){pn.hidden?open():close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pn.hidden)close()});
function init(){document.body.appendChild(fab);document.body.appendChild(pn);apply()}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();

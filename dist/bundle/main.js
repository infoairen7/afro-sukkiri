var lm=Object.defineProperty;var uc=(s,e,t)=>()=>{if(t)throw t[0];try{return s&&(e=s(s=0)),e}catch(n){throw t=[n],n}};var Xu=(s,e)=>{for(var t in e)lm(s,t,{get:e[t],enumerable:!0})};function qn(s){return new URL(s,document.baseURI).href}async function Qu(){try{let s=await fetch(qn("config.json"),{cache:"no-cache"});if(!s.ok)return{publicUrl:""};let e=await s.json();return{publicUrl:typeof e.publicUrl=="string"?e.publicUrl.trim():""}}catch{return{publicUrl:""}}}var dc,fc,pc,pr,qu,Yu,$u,Ku,mc,Zu,Ju,ju,Pn=uc(()=>{"use strict";dc=8.333333333333334,fc=2e3,pc=.002,pr=.03,qu=1.35,Yu=-.2,$u=.08,Ku=2,mc=3e3,Zu=1e3,Ju=2,ju=32});var Gp={};Xu(Gp,{$:()=>ne,$btn:()=>Ze,$img:()=>Bi,closeDialog:()=>ya,closeSheet:()=>hs,confetti:()=>Nu,dialog:()=>hi,dialogOpen:()=>cs,esc:()=>qt,openSheet:()=>ui,sheetOpen:()=>ba,toast:()=>ki});function ne(s){let e=document.getElementById(s);if(!e)throw new Error(`#${s} missing`);return e}function qt(s){return s.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function ki(s,e=2200){let t=ne("toast");t.textContent=s,t.classList.add("show"),clearTimeout(Hp),Hp=window.setTimeout(()=>t.classList.remove("show"),e)}function hi(s,e,t){ya("");let n=ne("dialog-backdrop");ne("dialog-title").textContent=s,ne("dialog-text").textContent=e;let i=ne("dialog-actions");i.innerHTML="";for(let r of t){let a=document.createElement("button");a.type="button",a.textContent=r.label,r.kind&&r.kind!=="plain"&&a.classList.add(r.kind),a.addEventListener("click",()=>ya(r.value)),i.appendChild(a)}return sc=document.activeElement,n.hidden=!1,i.firstElementChild?.focus(),new Promise(r=>{Pu=r})}function ya(s){let e=document.getElementById("dialog-backdrop");e&&(e.hidden=!0);let t=Pu;Pu=null,t&&(t(s),sc?.focus?.())}function cs(){return!ne("dialog-backdrop").hidden}function ui(s,e,t){let n=ne("sheet");ne("sheet-title").textContent=s;let i=ne("sheet-body");return i.innerHTML="",typeof e=="string"?i.innerHTML=e:i.appendChild(e),i.scrollTop=0,n.hidden=!1,ne("sheet-backdrop").hidden=!1,Lu=t??null,sc=document.activeElement,ne("sheet-close").focus(),i}function hs(){let s=ne("sheet");if(s.hidden)return;s.hidden=!0,ne("sheet-backdrop").hidden=!0;let e=Lu;Lu=null,e?.(),sc?.focus?.()}function ba(){return!ne("sheet").hidden}function Nu(s=46){let e=ne("confetti");e.innerHTML="";let t=["#FFD15C","#FF855E","#65D6E8","#93D8C6","#B6A0E8","#ffffff"];for(let n=0;n<s;n++){let i=document.createElement("i");n%2===0&&(i.className="star"),i.style.left=`${Math.random()*100}%`,i.style.background=t[n%t.length],i.style.animationDelay=`${Math.random()*.6}s`,i.style.animationDuration=`${1.8+Math.random()*1.2}s`;let r=8+Math.random()*12;i.style.width=i.style.height=`${r}px`,e.appendChild(i)}window.setTimeout(()=>{e.innerHTML=""},3600)}var Bi,Ze,Hp,Pu,sc,Lu,Ma=uc(()=>{"use strict";Bi=s=>ne(s),Ze=s=>ne(s);Hp=0;Pu=null,sc=null;Lu=null});var Wp={};Xu(Wp,{FONT_FAMILY:()=>Sa,FONT_STACK:()=>zt,loadFonts:()=>Du});async function Du(){if(typeof FontFace>"u"||!document.fonts)return!1;try{let s=[new FontFace(Sa,`url(${qn("fonts/afro-rounded-500.woff")}) format("woff")`,{weight:"400 600",display:"swap"}),new FontFace(Sa,`url(${qn("fonts/afro-rounded-800.woff")}) format("woff")`,{weight:"700 800",display:"swap"}),new FontFace(Sa,`url(${qn("fonts/afro-rounded-900.woff")}) format("woff")`,{weight:"900",display:"swap"})];return(await Promise.all(s.map(t=>t.load()))).forEach(t=>document.fonts.add(t)),!0}catch{return!1}}var Sa,zt,ac=uc(()=>{"use strict";Pn();Sa="AfroRounded",zt=`"${Sa}", "Hiragino Maru Gothic ProN", "Hiragino Sans", "BIZ UDPGothic", "Noto Sans JP", system-ui, sans-serif`});Pn();var Aa=class{available;mem=new Map;constructor(){this.available=!1;try{let e="__afro_probe__";window.localStorage.setItem(e,"1"),window.localStorage.removeItem(e),this.available=!0}catch{this.available=!1}}get(e){if(this.available)try{return window.localStorage.getItem(e)}catch{this.available=!1}return this.mem.get(e)??null}set(e,t){if(this.mem.set(e,t),!this.available)return!1;try{return window.localStorage.setItem(e,t),!0}catch{return this.available=!1,!1}}};Pn();var ed="afro-sukkiri/settings";function cm(){let s=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;return{bladeOffsetPx:ju,leftHanded:!1,assist:!0,sfxVolume:.8,bgmVolume:.5,bgmOn:!1,muted:!1,vibration:!1,lowStimulus:s,quality:"auto",showTime:!0,guideSeen:!1}}function td(s){let e=cm();try{let t=s.get(ed);if(!t)return e;let n=JSON.parse(t),i=(a,o,l,c)=>typeof a=="number"&&Number.isFinite(a)?Math.min(l,Math.max(o,a)):c,r=(a,o)=>typeof a=="boolean"?a:o;return{bladeOffsetPx:i(n.bladeOffsetPx,0,48,e.bladeOffsetPx),leftHanded:r(n.leftHanded,e.leftHanded),assist:r(n.assist,e.assist),sfxVolume:i(n.sfxVolume,0,1,e.sfxVolume),bgmVolume:i(n.bgmVolume,0,1,e.bgmVolume),bgmOn:r(n.bgmOn,e.bgmOn),muted:r(n.muted,e.muted),vibration:r(n.vibration,e.vibration),lowStimulus:r(n.lowStimulus,e.lowStimulus),quality:n.quality==="low"||n.quality==="standard"?n.quality:"auto",showTime:r(n.showTime,e.showTime),guideSeen:r(n.guideSeen,e.guideSeen)}}catch{return e}}function gc(s,e){return s.set(ed,JSON.stringify(e))}var Xd=0,oh=1,qd=2;var na=1,Yd=2,Ks=3,Sn=0,kt=1,Ot=2,zn=0,Yi=1,is=2,lh=3,ch=4,$d=5;var bi=100,Kd=101,Zd=102,Jd=103,jd=104,Qd=200,ef=201,tf=202,nf=203,io=204,so=205,sf=206,rf=207,af=208,of=209,lf=210,cf=211,hf=212,uf=213,df=214,ro=0,ao=1,oo=2,$i=3,lo=4,co=5,ho=6,uo=7,zo=0,ff=1,pf=2,wn=0,hh=1,uh=2,dh=3,fh=4,ph=5,mh=6,ia=7,Yc="attached",mf="detached",gh=300,Li=301,ss=302,Vo=303,Ho=304,sa=306,Mi=1e3,pn=1001,Ds=1002,St=1003,Go=1004;var rs=1005;var wt=1006,Zs=1007;var Tn=1008;var tn=1009,xh=1010,vh=1011,Js=1012,Wo=1013,An=1014,cn=1015,Vn=1016,Xo=1017,qo=1018,js=1020,_h=35902,yh=35899,bh=1021,Mh=1022,hn=1023,Dn=1026,Ni=1027,Yo=1028,$o=1029,Di=1030,Ko=1031;var Zo=1033,ra=33776,aa=33777,oa=33778,la=33779,Jo=35840,jo=35841,Qo=35842,el=35843,tl=36196,nl=37492,il=37496,sl=37488,rl=37489,ca=37490,al=37491,ol=37808,ll=37809,cl=37810,hl=37811,ul=37812,dl=37813,fl=37814,pl=37815,ml=37816,gl=37817,xl=37818,vl=37819,_l=37820,yl=37821,bl=36492,Ml=36494,Sl=36495,wl=36283,Tl=36284,ha=36285,Al=36286;var Ki=2300,Zi=2301,no=2302,$c=2303,Kc=2400,Zc=2401,Jc=2402,gf=2500;var Sh=0,ua=1,Qs=2,xf=3200;var da=0,vf=1,li="",Mt="srgb",$t="srgb-linear",Ir="linear",Je="srgb";var Xi=7680;var jc=519,_f=512,yf=513,bf=514,El=515,Mf=516,Sf=517,Rl=518,wf=519,fo=35044,ci=35048;var wh="300 es",bn=2e3,Us=2001;function hm(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function um(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Fs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Tf(){let s=Fs("canvas");return s.style.display="block",s}var nd={},Os=null;function Pr(...s){let e="THREE."+s.shift();Os?Os("log",e,...s):console.log(e,...s)}function Af(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Se(...s){s=Af(s);let e="THREE."+s.shift();if(Os)Os("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ie(...s){s=Af(s);let e="THREE."+s.shift();if(Os)Os("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function qi(...s){let e=s.join(" ");e in nd||(nd[e]=!0,Se(...s))}function Ef(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Rf={[ro]:ao,[oo]:ho,[lo]:uo,[$i]:co,[ao]:ro,[ho]:oo,[uo]:lo,[co]:$i},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],id=1234567,Ar=Math.PI/180,Ji=180/Math.PI;function Mn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[s&255]+Ht[s>>8&255]+Ht[s>>16&255]+Ht[s>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Ve(s,e,t){return Math.max(e,Math.min(t,s))}function Th(s,e){return(s%e+e)%e}function dm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function fm(s,e,t){return s!==e?(t-s)/(e-s):0}function Er(s,e,t){return(1-t)*s+t*e}function pm(s,e,t,n){return Er(s,e,1-Math.exp(-t*n))}function mm(s,e=1){return e-Math.abs(Th(s,e*2)-e)}function gm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function xm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function vm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function _m(s,e){return s+Math.random()*(e-s)}function ym(s){return s*(.5-Math.random())}function bm(s){s!==void 0&&(id=s);let e=id+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Mm(s){return s*Ar}function Sm(s){return s*Ji}function wm(s){return(s&s-1)===0&&s!==0}function Tm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Am(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Em(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:Se("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Qe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ah={DEG2RAD:Ar,RAD2DEG:Ji,generateUUID:Mn,clamp:Ve,euclideanModulo:Th,mapLinear:dm,inverseLerp:fm,lerp:Er,damp:pm,pingpong:mm,smoothstep:gm,smootherstep:xm,randInt:vm,randFloat:_m,randFloatSpread:ym,seededRandom:bm,degToRad:Mm,radToDeg:Sm,isPowerOfTwo:wm,ceilPowerOfTwo:Tm,floorPowerOfTwo:Am,setQuaternionFromProperEuler:Em,normalize:Qe,denormalize:yn},xe=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},It=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(u!==x||l!==d||c!==f||h!==g){let p=l*d+c*f+h*g+u*x;p<0&&(d=-d,f=-f,g=-g,x=-x,p=-p);let m=1-o;if(p<.9995){let b=Math.acos(p),M=Math.sin(b);m=Math.sin(m*b)/M,o=Math.sin(o*b)/M,l=l*m+d*o,c=c*m+f*o,h=h*m+g*o,u=u*m+x*o}else{l=l*m+d*o,c=c*m+f*o,h=h*m+g*o,u=u*m+x*o;let b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:Se("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ve(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xc.copy(this).projectOnVector(e),this.sub(xc)}reflect(e){return this.sub(xc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ve(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xc=new C,sd=new It,De=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],p=i[3],m=i[6],b=i[1],M=i[4],y=i[7],w=i[2],T=i[5],E=i[8];return r[0]=a*x+o*b+l*w,r[3]=a*p+o*M+l*T,r[6]=a*m+o*y+l*E,r[1]=c*x+h*b+u*w,r[4]=c*p+h*M+u*T,r[7]=c*m+h*y+u*E,r[2]=d*x+f*b+g*w,r[5]=d*p+f*M+g*T,r[8]=d*m+f*y+g*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(vc.makeScale(e,t)),this}rotate(e){return qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(vc.makeRotation(-e)),this}translate(e,t){return qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(vc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},vc=new De,rd=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ad=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rm(){let s={enabled:!0,workingColorSpace:$t,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Je&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(i.r=Ns(i.r),i.g=Ns(i.g),i.b=Ns(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===li?Ir:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[$t]:{primaries:e,whitePoint:n,transfer:Ir,toXYZ:rd,fromXYZ:ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mt},outputColorSpaceConfig:{drawingBufferColorSpace:Mt}},[Mt]:{primaries:e,whitePoint:n,transfer:Je,toXYZ:rd,fromXYZ:ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mt}}}),s}var ze=Rm();function ei(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ns(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ms,po=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ms===void 0&&(ms=Fs("canvas")),ms.width=e.width,ms.height=e.height;let i=ms.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Fs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return Se("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cm=0,Bs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=Mn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(_c(i[a].image)):r.push(_c(i[a]))}else r=_c(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function _c(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?po.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Se("Texture: Unable to serialize Texture."),{})}var Im=0,yc=new C,Pt=class s extends Un{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=pn,i=pn,r=wt,a=Tn,o=hn,l=tn,c=s.DEFAULT_ANISOTROPY,h=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=Mn(),this.name="",this.source=new Bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yc).x}get height(){return this.source.getSize(yc).y}get depth(){return this.source.getSize(yc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Se(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Se(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mi:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case Ds:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mi:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case Ds:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=gh;Pt.DEFAULT_ANISOTROPY=1;var et=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,y=(f+1)/2,w=(m+1)/2,T=(h+d)/4,E=(u+x)/4,v=(g+p)/4;return M>y&&M>w?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=T/n,r=E/n):y>w?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=v/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=E/r,i=v/r),this.set(n,i,r,t),this}let b=Math.sqrt((p-g)*(p-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-x)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ve(this.x,e.x,t.x),this.y=Ve(this.y,e.y,t.y),this.z=Ve(this.z,e.z,t.z),this.w=Ve(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ve(this.x,e,t),this.y=Ve(this.y,e,t),this.z=Ve(this.z,e,t),this.w=Ve(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ve(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},mo=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new Pt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Bs(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},an=class extends mo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Lr=class extends Pt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var go=class extends Pt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ee=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,g,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,x,p)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,x,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/gs.setFromMatrixColumn(e,0).length(),r=1/gs.setFromMatrixColumn(e,1).length(),a=1/gs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,x=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pm,e,Lm)}lookAt(e,t,n){let i=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),mi.crossVectors(n,sn),mi.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),mi.crossVectors(n,sn)),mi.normalize(),Ea.crossVectors(sn,mi),i[0]=mi.x,i[4]=Ea.x,i[8]=sn.x,i[1]=mi.y,i[5]=Ea.y,i[9]=sn.y,i[2]=mi.z,i[6]=Ea.z,i[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],p=n[10],m=n[14],b=n[3],M=n[7],y=n[11],w=n[15],T=i[0],E=i[4],v=i[8],A=i[12],I=i[1],P=i[5],F=i[9],q=i[13],Y=i[2],k=i[6],G=i[10],H=i[14],J=i[3],Q=i[7],de=i[11],ge=i[15];return r[0]=a*T+o*I+l*Y+c*J,r[4]=a*E+o*P+l*k+c*Q,r[8]=a*v+o*F+l*G+c*de,r[12]=a*A+o*q+l*H+c*ge,r[1]=h*T+u*I+d*Y+f*J,r[5]=h*E+u*P+d*k+f*Q,r[9]=h*v+u*F+d*G+f*de,r[13]=h*A+u*q+d*H+f*ge,r[2]=g*T+x*I+p*Y+m*J,r[6]=g*E+x*P+p*k+m*Q,r[10]=g*v+x*F+p*G+m*de,r[14]=g*A+x*q+p*H+m*ge,r[3]=b*T+M*I+y*Y+w*J,r[7]=b*E+M*P+y*k+w*Q,r[11]=b*v+M*F+y*G+w*de,r[15]=b*A+M*q+y*H+w*ge,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],p=e[11],m=e[15],b=l*f-c*d,M=o*f-c*u,y=o*d-l*u,w=a*f-c*h,T=a*d-l*h,E=a*u-o*h;return t*(x*b-p*M+m*y)-n*(g*b-p*w+m*T)+i*(g*M-x*w+m*E)-r*(g*y-x*T+p*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],p=e[14],m=e[15],b=t*o-n*a,M=t*l-i*a,y=t*c-r*a,w=n*l-i*o,T=n*c-r*o,E=i*c-r*l,v=h*x-u*g,A=h*p-d*g,I=h*m-f*g,P=u*p-d*x,F=u*m-f*x,q=d*m-f*p,Y=b*q-M*F+y*P+w*I-T*A+E*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/Y;return e[0]=(o*q-l*F+c*P)*k,e[1]=(i*F-n*q-r*P)*k,e[2]=(x*E-p*T+m*w)*k,e[3]=(d*T-u*E-f*w)*k,e[4]=(l*I-a*q-c*A)*k,e[5]=(t*q-i*I+r*A)*k,e[6]=(p*y-g*E-m*M)*k,e[7]=(h*E-d*y+f*M)*k,e[8]=(a*F-o*I+c*v)*k,e[9]=(n*I-t*F-r*v)*k,e[10]=(g*T-x*y+m*b)*k,e[11]=(u*y-h*T-f*b)*k,e[12]=(o*A-a*P-l*v)*k,e[13]=(t*P-n*A+i*v)*k,e[14]=(x*M-g*w-p*b)*k,e[15]=(h*w-u*M+d*b)*k,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,x=a*h,p=a*u,m=o*u,b=l*c,M=l*h,y=l*u,w=n.x,T=n.y,E=n.z;return i[0]=(1-(x+m))*w,i[1]=(f+y)*w,i[2]=(g-M)*w,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(d+m))*T,i[6]=(p+b)*T,i[7]=0,i[8]=(g+M)*E,i[9]=(p-b)*E,i[10]=(1-(d+x))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=gs.set(i[0],i[1],i[2]).length(),o=gs.set(i[4],i[5],i[6]).length(),l=gs.set(i[8],i[9],i[10]).length();r<0&&(a=-a),xn.copy(this);let c=1/a,h=1/o,u=1/l;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=bn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===bn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Us)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=bn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===bn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Us)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},gs=new C,xn=new Ee,Pm=new C(0,0,0),Lm=new C(1,1,1),mi=new C,Ea=new C,sn=new C,od=new Ee,ld=new It,Fn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Se("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(od,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ld.setFromEuler(this),this.setFromQuaternion(ld,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fn.DEFAULT_ORDER="XYZ";var ks=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Nm=0,cd=new C,xs=new It,Yn=new Ee,Ra=new C,mr=new C,Dm=new C,Um=new It,hd=new C(1,0,0),ud=new C(0,1,0),dd=new C(0,0,1),fd={type:"added"},Fm={type:"removed"},vs={type:"childadded",child:null},bc={type:"childremoved",child:null},tt=class s extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new C,t=new Fn,n=new It,i=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ee},normalMatrix:{value:new De}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ks,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(hd,e)}rotateY(e){return this.rotateOnAxis(ud,e)}rotateZ(e){return this.rotateOnAxis(dd,e)}translateOnAxis(e,t){return cd.copy(e).applyQuaternion(this.quaternion),this.position.add(cd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hd,e)}translateY(e){return this.translateOnAxis(ud,e)}translateZ(e){return this.translateOnAxis(dd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ra.copy(e):Ra.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(mr,Ra,this.up):Yn.lookAt(Ra,mr,this.up),this.quaternion.setFromRotationMatrix(Yn),i&&(Yn.extractRotation(i.matrixWorld),xs.setFromRotationMatrix(Yn),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ie("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fd),vs.child=e,this.dispatchEvent(vs),vs.child=null):Ie("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fm),bc.child=e,this.dispatchEvent(bc),bc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fd),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,e,Dm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,Um,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};tt.DEFAULT_UP=new C(0,1,0);tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ot=class extends tt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Om={type:"move"},zs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Om)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ot;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Ca={h:0,s:0,l:0};function Mc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var te=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,ze.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ze.workingColorSpace){if(e=Th(e,1),t=Ve(t,0,1),n=Ve(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Mc(a,r,e+1/3),this.g=Mc(a,r,e),this.b=Mc(a,r,e-1/3)}return ze.colorSpaceToWorking(this,i),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&Se("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Se("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Se("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){let n=Cf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Se("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return ze.workingToColorSpace(Gt.copy(this),e),Math.round(Ve(Gt.r*255,0,255))*65536+Math.round(Ve(Gt.g*255,0,255))*256+Math.round(Ve(Gt.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.workingToColorSpace(Gt.copy(this),t);let n=Gt.r,i=Gt.g,r=Gt.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ze.workingColorSpace){return ze.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Mt){ze.workingToColorSpace(Gt.copy(this),e);let t=Gt.r,n=Gt.g,i=Gt.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Ca);let n=Er(gi.h,Ca.h,t),i=Er(gi.s,Ca.s,t),r=Er(gi.l,Ca.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Gt=new te;te.NAMES=Cf;var On=class extends tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},vn=new C,$n=new C,Sc=new C,Kn=new C,_s=new C,ys=new C,pd=new C,wc=new C,Tc=new C,Ac=new C,Ec=new et,Rc=new et,Cc=new et,Qn=class s{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),vn.subVectors(e,t),i.cross(vn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){vn.subVectors(i,t),$n.subVectors(n,t),Sc.subVectors(e,t);let a=vn.dot(vn),o=vn.dot($n),l=vn.dot(Sc),c=$n.dot($n),h=$n.dot(Sc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Kn.x),l.addScaledVector(a,Kn.y),l.addScaledVector(o,Kn.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return Ec.setScalar(0),Rc.setScalar(0),Cc.setScalar(0),Ec.fromBufferAttribute(e,t),Rc.fromBufferAttribute(e,n),Cc.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Ec,r.x),a.addScaledVector(Rc,r.y),a.addScaledVector(Cc,r.z),a}static isFrontFacing(e,t,n,i){return vn.subVectors(n,t),$n.subVectors(e,t),vn.cross($n).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),vn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;_s.subVectors(i,n),ys.subVectors(r,n),wc.subVectors(e,n);let l=_s.dot(wc),c=ys.dot(wc);if(l<=0&&c<=0)return t.copy(n);Tc.subVectors(e,i);let h=_s.dot(Tc),u=ys.dot(Tc);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(_s,a);Ac.subVectors(e,r);let f=_s.dot(Ac),g=ys.dot(Ac);if(g>=0&&f<=g)return t.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ys,o);let p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return pd.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(pd,o);let m=1/(p+x+d);return a=x*m,o=d*m,t.copy(n).addScaledVector(_s,a).addScaledVector(ys,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},on=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ia.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ia.copy(n.boundingBox)),Ia.applyMatrix4(e.matrixWorld),this.union(Ia)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gr),Pa.subVectors(this.max,gr),bs.subVectors(e.a,gr),Ms.subVectors(e.b,gr),Ss.subVectors(e.c,gr),xi.subVectors(Ms,bs),vi.subVectors(Ss,Ms),Vi.subVectors(bs,Ss);let t=[0,-xi.z,xi.y,0,-vi.z,vi.y,0,-Vi.z,Vi.y,xi.z,0,-xi.x,vi.z,0,-vi.x,Vi.z,0,-Vi.x,-xi.y,xi.x,0,-vi.y,vi.x,0,-Vi.y,Vi.x,0];return!Ic(t,bs,Ms,Ss,Pa)||(t=[1,0,0,0,1,0,0,0,1],!Ic(t,bs,Ms,Ss,Pa))?!1:(La.crossVectors(xi,vi),t=[La.x,La.y,La.z],Ic(t,bs,Ms,Ss,Pa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zn=[new C,new C,new C,new C,new C,new C,new C,new C],_n=new C,Ia=new on,bs=new C,Ms=new C,Ss=new C,xi=new C,vi=new C,Vi=new C,gr=new C,Pa=new C,La=new C,Hi=new C;function Ic(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Hi.fromArray(s,r);let o=i.x*Math.abs(Hi.x)+i.y*Math.abs(Hi.y)+i.z*Math.abs(Hi.z),l=e.dot(Hi),c=t.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Rt=new C,Na=new xe,Bm=0,ut=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fo,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Na.fromBufferAttribute(this,t),Na.applyMatrix3(e),this.setXY(t,Na.x,Na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Nr=class extends ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Dr=class extends ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var lt=class extends ut{constructor(e,t,n){super(new Float32Array(e),t,n)}},km=new on,xr=new C,Pc=new C,jt=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):km.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xr.subVectors(e,this.center);let t=xr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(xr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xr.copy(e.center).add(Pc)),this.expandByPoint(xr.copy(e.center).sub(Pc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},zm=0,dn=new Ee,Lc=new tt,ws=new C,rn=new on,vr=new on,Ut=new C,ft=class s extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hm(e)?Dr:Nr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new De().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return Lc.lookAt(e),Lc.updateMatrix(),this.applyMatrix4(Lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new lt(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Se("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ie('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ie("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];vr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(rn.min,vr.min),rn.expandByPoint(Ut),Ut.addVectors(rn.max,vr.max),rn.expandByPoint(Ut)):(rn.expandByPoint(vr.min),rn.expandByPoint(vr.max))}rn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ut.fromBufferAttribute(o,c),l&&(ws.fromBufferAttribute(e,c),Ut.add(ws)),i=Math.max(i,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ie('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ie("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ut(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new C,l[v]=new C;let c=new C,h=new C,u=new C,d=new xe,f=new xe,g=new xe,x=new C,p=new C;function m(v,A,I){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,I),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),g.fromBufferAttribute(r,I),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[v].add(x),o[A].add(x),o[I].add(x),l[v].add(p),l[A].add(p),l[I].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let v=0,A=b.length;v<A;++v){let I=b[v],P=I.start,F=I.count;for(let q=P,Y=P+F;q<Y;q+=3)m(e.getX(q+0),e.getX(q+1),e.getX(q+2))}let M=new C,y=new C,w=new C,T=new C;function E(v){w.fromBufferAttribute(i,v),T.copy(w);let A=o[v];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),y.crossVectors(T,A);let P=y.dot(l[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,P)}for(let v=0,A=b.length;v<A;++v){let I=b[v],P=I.start,F=I.count;for(let q=P,Y=P+F;q<Y;q+=3)E(e.getX(q+0)),E(e.getX(q+1)),E(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new ut(d,h,u)}if(this.index===null)return Se("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ji=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fo,this.updateRanges=[],this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Yt=new C,Si=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Vm=0,Wt=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vm++}),this.uuid=Mn(),this.name="",this.type="Material",this.blending=Yi,this.side=Sn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=io,this.blendDst=so,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Se(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Se(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==Sn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==io&&(n.blendSrc=this.blendSrc),this.blendDst!==so&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new te().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new xe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Vs=class extends Wt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ts,_r=new C,As=new C,Es=new C,Rs=new xe,yr=new xe,If=new Ee,Da=new C,br=new C,Ua=new C,md=new xe,Nc=new xe,gd=new xe,Ur=class extends tt{constructor(e=new Vs){if(super(),this.isSprite=!0,this.type="Sprite",Ts===void 0){Ts=new ft;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ji(t,5);Ts.setIndex([0,1,2,0,2,3]),Ts.setAttribute("position",new Si(n,3,0,!1)),Ts.setAttribute("uv",new Si(n,2,3,!1))}this.geometry=Ts,this.material=e,this.center=new xe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ie('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),As.setFromMatrixScale(this.matrixWorld),If.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Es.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&As.multiplyScalar(-Es.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Fa(Da.set(-.5,-.5,0),Es,a,As,i,r),Fa(br.set(.5,-.5,0),Es,a,As,i,r),Fa(Ua.set(.5,.5,0),Es,a,As,i,r),md.set(0,0),Nc.set(1,0),gd.set(1,1);let o=e.ray.intersectTriangle(Da,br,Ua,!1,_r);if(o===null&&(Fa(br.set(-.5,.5,0),Es,a,As,i,r),Nc.set(0,1),o=e.ray.intersectTriangle(Da,Ua,br,!1,_r),o===null))return;let l=e.ray.origin.distanceTo(_r);l<e.near||l>e.far||t.push({distance:l,point:_r.clone(),uv:Qn.getInterpolation(_r,Da,br,Ua,md,Nc,gd,new xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Fa(s,e,t,n,i,r){Rs.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(yr.x=r*Rs.x-i*Rs.y,yr.y=i*Rs.x+r*Rs.y):yr.copy(Rs),s.copy(e),s.x+=yr.x,s.y+=yr.y,s.applyMatrix4(If)}var Jn=new C,Dc=new C,Oa=new C,_i=new C,Uc=new C,Ba=new C,Fc=new C,wi=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Dc.copy(e).add(t).multiplyScalar(.5),Oa.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(Dc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Oa),o=_i.dot(this.direction),l=-_i.dot(Oa),c=_i.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Dc).addScaledVector(Oa,d),f}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);let n=Jn.dot(this.direction),i=Jn.dot(Jn)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,n,i,r){Uc.subVectors(t,e),Ba.subVectors(n,e),Fc.crossVectors(Uc,Ba);let a=this.direction.dot(Fc),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,e);let l=o*this.direction.dot(Ba.crossVectors(_i,Ba));if(l<0)return null;let c=o*this.direction.dot(Uc.cross(_i));if(c<0||l+c>a)return null;let h=-o*_i.dot(Fc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Kt=class extends Wt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xd=new Ee,Gi=new wi,ka=new jt,vd=new C,za=new C,Va=new C,Ha=new C,Oc=new C,Ga=new C,_d=new C,Wa=new C,qe=class extends tt{constructor(e=new ft,t=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Oc.fromBufferAttribute(u,e),a?Ga.addScaledVector(Oc,h):Ga.addScaledVector(Oc.sub(t),h))}t.add(Ga)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),Gi.copy(e.ray).recast(e.near),!(ka.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(ka,vd)===null||Gi.origin.distanceToSquared(vd)>(e.far-e.near)**2))&&(xd.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(xd),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=a[p.materialIndex],b=Math.max(p.start,f.start),M=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=b,w=M;y<w;y+=3){let T=o.getX(y),E=o.getX(y+1),v=o.getX(y+2);i=Xa(this,m,e,n,c,h,u,T,E,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let b=o.getX(p),M=o.getX(p+1),y=o.getX(p+2);i=Xa(this,a,e,n,c,h,u,b,M,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let p=d[g],m=a[p.materialIndex],b=Math.max(p.start,f.start),M=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=b,w=M;y<w;y+=3){let T=y,E=y+1,v=y+2;i=Xa(this,m,e,n,c,h,u,T,E,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let b=p,M=p+1,y=p+2;i=Xa(this,a,e,n,c,h,u,b,M,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function Hm(s,e,t,n,i,r,a,o){let l;if(e.side===kt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Sn,o),l===null)return null;Wa.copy(o),Wa.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Wa);return c<t.near||c>t.far?null:{distance:c,point:Wa.clone(),object:s}}function Xa(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,za),s.getVertexPosition(l,Va),s.getVertexPosition(c,Ha);let h=Hm(s,e,t,n,za,Va,Ha,_d);if(h){let u=new C;Qn.getBarycoord(_d,za,Va,Ha,u),i&&(h.uv=Qn.getInterpolatedAttribute(i,o,l,c,u,new xe)),r&&(h.uv1=Qn.getInterpolatedAttribute(r,o,l,c,u,new xe)),a&&(h.normal=Qn.getInterpolatedAttribute(a,o,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new C,materialIndex:0};Qn.getNormal(za,Va,Ha,d.normal),h.face=d,h.barycoord=u}return h}var Mr=new et,yd=new et,bd=new et,Gm=new et,Md=new Ee,qa=new C,Bc=new jt,Sd=new Ee,kc=new wi,Fr=class extends qe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yc,this.bindMatrix=new Ee,this.bindMatrixInverse=new Ee,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qa),this.boundingBox.expandByPoint(qa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qa),this.boundingSphere.expandByPoint(qa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bc.copy(this.boundingSphere),Bc.applyMatrix4(i),e.ray.intersectsSphere(Bc)!==!1&&(Sd.copy(i).invert(),kc.copy(e.ray).applyMatrix4(Sd),!(this.boundingBox!==null&&kc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,kc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Se("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;yd.fromBufferAttribute(i.attributes.skinIndex,e),bd.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Mr.copy(t),t.set(0,0,0,0)):(Mr.set(...t,1),t.set(0,0,0)),Mr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=bd.getComponent(r);if(a!==0){let o=yd.getComponent(r);Md.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Gm.copy(Mr).applyMatrix4(Md),a)}}return t.isVector4&&(t.w=Mr.w),t.applyMatrix4(this.bindMatrixInverse)}},Hs=class extends tt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Gs=class extends Pt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=St,h=St,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},wd=new Ee,Wm=new Ee,Or=class s{constructor(e=[],t=[]){this.uuid=Mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Se("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ee)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ee;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Wm;wd.multiplyMatrices(o,t[r]),wd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Gs(t,e,e,hn,cn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Se("Skeleton: No bone found with UUID:",r),a=new Hs),this.bones.push(a),this.boneInverses.push(new Ee().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Ti=class extends ut{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Cs=new Ee,Td=new Ee,Ya=[],Ad=new on,Xm=new Ee,Sr=new qe,wr=new jt,Qt=class extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ti(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Xm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cs),Ad.copy(e.boundingBox).applyMatrix4(Cs),this.boundingBox.union(Ad)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Cs),wr.copy(e.boundingSphere).applyMatrix4(Cs),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Sr.geometry=this.geometry,Sr.material=this.material,Sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(n),e.ray.intersectsSphere(wr)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Cs),Td.multiplyMatrices(n,Cs),Sr.matrixWorld=Td,Sr.raycast(e,Ya);for(let a=0,o=Ya.length;a<o;a++){let l=Ya[a];l.instanceId=r,l.object=this,t.push(l)}Ya.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ti(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gs(new Float32Array(i*this.count),i,this.count,Yo,cn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},zc=new C,qm=new C,Ym=new De,fn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=zc.subVectors(n,t).cross(qm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(zc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ym.getNormalMatrix(e),i=this.coplanarPoint(zc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Wi=new jt,$m=new xe(.5,.5),$a=new C,Ws=class{constructor(e=new fn,t=new fn,n=new fn,i=new fn,r=new fn,a=new fn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],x=r[9],p=r[10],m=r[11],b=r[12],M=r[13],y=r[14],w=r[15];if(i[0].setComponents(c-a,f-h,m-g,w-b).normalize(),i[1].setComponents(c+a,f+h,m+g,w+b).normalize(),i[2].setComponents(c+o,f+u,m+x,w+M).normalize(),i[3].setComponents(c-o,f-u,m-x,w-M).normalize(),n)i[4].setComponents(l,d,p,y).normalize(),i[5].setComponents(c-l,f-d,m-p,w-y).normalize();else if(i[4].setComponents(c-l,f-d,m-p,w-y).normalize(),t===bn)i[5].setComponents(c+l,f+d,m+p,w+y).normalize();else if(t===Us)i[5].setComponents(l,d,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);let t=$m.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if($a.x=i.normal.x>0?e.max.x:e.min.x,$a.y=i.normal.y>0?e.max.y:e.min.y,$a.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($a)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Xs=class extends Wt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},xo=new C,vo=new C,Ed=new Ee,Tr=new wi,Ka=new jt,Vc=new C,Rd=new C,Qi=class extends tt{constructor(e=new ft,t=new Xs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)xo.fromBufferAttribute(t,i-1),vo.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=xo.distanceTo(vo);e.setAttribute("lineDistance",new lt(n,1))}else Se("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(i),Ka.radius+=r,e.ray.intersectsSphere(Ka)===!1)return;Ed.copy(i).invert(),Tr.copy(e.ray).applyMatrix4(Ed);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=f,p=g-1;x<p;x+=c){let m=h.getX(x),b=h.getX(x+1),M=Za(this,e,Tr,l,m,b,x);M&&t.push(M)}if(this.isLineLoop){let x=h.getX(g-1),p=h.getX(f),m=Za(this,e,Tr,l,x,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=f,p=g-1;x<p;x+=c){let m=Za(this,e,Tr,l,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=Za(this,e,Tr,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Za(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(xo.fromBufferAttribute(o,i),vo.fromBufferAttribute(o,r),t.distanceSqToSegment(xo,vo,Vc,Rd)>n)return;Vc.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Vc);if(!(c<e.near||c>e.far))return{distance:c,point:Rd.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Cd=new C,Id=new C,Br=class extends Qi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Cd.fromBufferAttribute(t,i),Id.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Cd.distanceTo(Id);e.setAttribute("lineDistance",new lt(n,1))}else Se("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},kr=class extends Qi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},qs=class extends Wt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Pd=new Ee,Qc=new wi,Ja=new jt,ja=new C,zr=class extends tt{constructor(e=new ft,t=new qs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(i),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;Pd.copy(i).invert(),Qc.copy(e.ray).applyMatrix4(Pd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,x=f;g<x;g++){let p=c.getX(g);ja.fromBufferAttribute(u,p),Ld(ja,p,l,i,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,x=f;g<x;g++)ja.fromBufferAttribute(u,g),Ld(ja,g,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ld(s,e,t,n,i,r,a){let o=Qc.distanceSqToPoint(s);if(o<t){let l=new C;Qc.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Vr=class extends Pt{constructor(e=[],t=Li,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Hr=class extends Pt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ti=class extends Pt{constructor(e,t,n=An,i,r,a,o=St,l=St,c,h=Dn,u=1){if(h!==Dn&&h!==Ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},_o=class extends ti{constructor(e,t=An,n=Li,i,r,a=St,o=St,l,c=Dn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Gr=class extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ai=class s extends ft{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(u,2));function g(x,p,m,b,M,y,w,T,E,v,A){let I=y/E,P=w/v,F=y/2,q=w/2,Y=T/2,k=E+1,G=v+1,H=0,J=0,Q=new C;for(let de=0;de<G;de++){let ge=de*P-q;for(let ye=0;ye<k;ye++){let Ye=ye*I-F;Q[x]=Ye*b,Q[p]=ge*M,Q[m]=Y,c.push(Q.x,Q.y,Q.z),Q[x]=0,Q[p]=0,Q[m]=T>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(ye/E),u.push(1-de/v),H+=1}}for(let de=0;de<v;de++)for(let ge=0;ge<E;ge++){let ye=d+ge+k*de,Ye=d+ge+k*(de+1),pt=d+(ge+1)+k*(de+1),$e=d+(ge+1)+k*de;l.push(ye,Ye,$e),l.push(Ye,pt,$e),J+=6}o.addGroup(f,J,A),f+=J,d+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var yo=class s extends ft{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new lt(r,3)),this.setAttribute("normal",new lt(r.slice(),3)),this.setAttribute("uv",new lt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let M=new C,y=new C,w=new C;for(let T=0;T<t.length;T+=3)f(t[T+0],M),f(t[T+1],y),f(t[T+2],w),l(M,y,w,b)}function l(b,M,y,w){let T=w+1,E=[];for(let v=0;v<=T;v++){E[v]=[];let A=b.clone().lerp(y,v/T),I=M.clone().lerp(y,v/T),P=T-v;for(let F=0;F<=P;F++)F===0&&v===T?E[v][F]=A:E[v][F]=A.clone().lerp(I,F/P)}for(let v=0;v<T;v++)for(let A=0;A<2*(T-v)-1;A++){let I=Math.floor(A/2);A%2===0?(d(E[v][I+1]),d(E[v+1][I]),d(E[v][I])):(d(E[v][I+1]),d(E[v+1][I+1]),d(E[v+1][I]))}}function c(b){let M=new C;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(b),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function h(){let b=new C;for(let M=0;M<r.length;M+=3){b.x=r[M+0],b.y=r[M+1],b.z=r[M+2];let y=p(b)/2/Math.PI+.5,w=m(b)/Math.PI+.5;a.push(y,1-w)}g(),u()}function u(){for(let b=0;b<a.length;b+=6){let M=a[b+0],y=a[b+2],w=a[b+4],T=Math.max(M,y,w),E=Math.min(M,y,w);T>.9&&E<.1&&(M<.2&&(a[b+0]+=1),y<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function f(b,M){let y=b*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function g(){let b=new C,M=new C,y=new C,w=new C,T=new xe,E=new xe,v=new xe;for(let A=0,I=0;A<r.length;A+=9,I+=6){b.set(r[A+0],r[A+1],r[A+2]),M.set(r[A+3],r[A+4],r[A+5]),y.set(r[A+6],r[A+7],r[A+8]),T.set(a[I+0],a[I+1]),E.set(a[I+2],a[I+3]),v.set(a[I+4],a[I+5]),w.copy(b).add(M).add(y).divideScalar(3);let P=p(w);x(T,I+0,b,P),x(E,I+2,M,P),x(v,I+4,y,P)}}function x(b,M,y,w){w<0&&b.x===1&&(a[M]=b.x-1),y.x===0&&y.z===0&&(a[M]=w/2/Math.PI+.5)}function p(b){return Math.atan2(b.z,-b.x)}function m(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}};var mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Se("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new xe:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,i=[],r=[],a=[],o=new C,l=new Ee;for(let f=0;f<=e;f++){let g=f/e;i[f]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Ve(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Ve(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Wr=class extends mn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new xe){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},bo=class extends Wr{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Eh(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var Nd=new C,Dd=new C,Hc=new Eh,Gc=new Eh,Wc=new Eh,Mo=class extends mn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Dd.subVectors(i[0],i[1]).add(i[0]),c=Dd);let u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Nd.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Nd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),Hc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,p),Gc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,p),Wc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,p)}else this.curveType==="catmullrom"&&(Hc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Gc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Wc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Hc.calc(l),Gc.calc(l),Wc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ud(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function Km(s,e){let t=1-s;return t*t*e}function Zm(s,e){return 2*(1-s)*s*e}function Jm(s,e){return s*s*e}function Rr(s,e,t,n){return Km(s,e)+Zm(s,t)+Jm(s,n)}function jm(s,e){let t=1-s;return t*t*t*e}function Qm(s,e){let t=1-s;return 3*t*t*s*e}function eg(s,e){return 3*(1-s)*s*s*e}function tg(s,e){return s*s*s*e}function Cr(s,e,t,n,i){return jm(s,e)+Qm(s,t)+eg(s,n)+tg(s,i)}var So=class extends mn{constructor(e=new xe,t=new xe,n=new xe,i=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new xe){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cr(e,i.x,r.x,a.x,o.x),Cr(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},wo=class extends mn{constructor(e=new C,t=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new C){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cr(e,i.x,r.x,a.x,o.x),Cr(e,i.y,r.y,a.y,o.y),Cr(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},To=class extends mn{constructor(e=new xe,t=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new xe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new xe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ao=class extends mn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Eo=class extends mn{constructor(e=new xe,t=new xe,n=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new xe){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Rr(e,i.x,r.x,a.x),Rr(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},es=class extends mn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(Rr(e,i.x,r.x,a.x),Rr(e,i.y,r.y,a.y),Rr(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ro=class extends mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new xe){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Ud(o,l.x,c.x,h.x,u.x),Ud(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new xe().fromArray(i))}return this}},ng=Object.freeze({__proto__:null,ArcCurve:bo,CatmullRomCurve3:Mo,CubicBezierCurve:So,CubicBezierCurve3:wo,EllipseCurve:Wr,LineCurve:To,LineCurve3:Ao,QuadraticBezierCurve:Eo,QuadraticBezierCurve3:es,SplineCurve:Ro});var Xr=class s extends yo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}};var qr=class s extends ft{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],x=[],p=[];for(let m=0;m<h;m++){let b=m*d-a;for(let M=0;M<c;M++){let y=M*u-r;g.push(y,-b,0),x.push(0,0,1),p.push(M/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<o;b++){let M=b+c*m,y=b+c*(m+1),w=b+1+c*(m+1),T=b+1+c*m;f.push(M,y,T),f.push(y,w,T)}this.setIndex(f),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Ei=class s extends ft{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new C,g=new xe;for(let x=0;x<=i;x++){for(let p=0;p<=n;p++){let m=r+p/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){let p=x*(n+1);for(let m=0;m<n;m++){let b=m+p,M=b,y=b+n+1,w=b+n+2,T=b+1;o.push(M,y,T),o.push(y,w,T)}}this.setIndex(o),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var ni=class s extends ft{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new C,d=new C,f=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){let b=[],M=m/n,y=a+M*o,w=e*Math.cos(y),T=Math.sqrt(e*e-w*w),E=0;m===0&&a===0?E=.5/t:m===n&&l===Math.PI&&(E=-.5/t);for(let v=0;v<=t;v++){let A=v/t,I=i+A*r;u.x=-T*Math.cos(I),u.y=w,u.z=T*Math.sin(I),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),p.push(A+E,1-M),b.push(c++)}h.push(b)}for(let m=0;m<n;m++)for(let b=0;b<t;b++){let M=h[m][b+1],y=h[m][b],w=h[m+1][b],T=h[m+1][b+1];(m!==0||a>0)&&f.push(M,y,T),(m!==n-1||l<Math.PI)&&f.push(y,w,T)}this.setIndex(f),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Yr=class s extends ft{constructor(e=new es(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,l=new C,c=new xe,h=new C,u=[],d=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new lt(u,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(f,2));function x(){for(let M=0;M<t;M++)p(M);p(r===!1?t:0),b(),m()}function p(M){h=e.getPointAt(M/t,h);let y=a.normals[M],w=a.binormals[M];for(let T=0;T<=i;T++){let E=T/i*Math.PI*2,v=Math.sin(E),A=-Math.cos(E);l.x=A*y.x+v*w.x,l.y=A*y.y+v*w.y,l.z=A*y.z+v*w.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let M=1;M<=t;M++)for(let y=1;y<=i;y++){let w=(i+1)*(M-1)+(y-1),T=(i+1)*M+(y-1),E=(i+1)*M+y,v=(i+1)*(M-1)+y;g.push(w,T,v),g.push(T,E,v)}}function b(){for(let M=0;M<=t;M++)for(let y=0;y<=i;y++)c.x=M/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new ng[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function as(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(Fd(i))i.isRenderTargetTexture?(Se("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Fd(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Xt(s){let e={};for(let t=0;t<s.length;t++){let n=as(s[t]);for(let i in n)e[i]=n[i]}return e}function Fd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function ig(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Rh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}var Pf={clone:as,merge:Xt},sg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ln=class extends Wt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sg,this.fragmentShader=rg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=as(e.uniforms),this.uniformsGroups=ig(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new te().setHex(i.value);break;case"v2":this.uniforms[n].value=new xe().fromArray(i.value);break;case"v3":this.uniforms[n].value=new C().fromArray(i.value);break;case"v4":this.uniforms[n].value=new et().fromArray(i.value);break;case"m3":this.uniforms[n].value=new De().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Ee().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Co=class extends ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ft=class extends Wt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=da,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dt=class extends Ft{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ri=class extends Wt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=da,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=zo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Io=class extends Wt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Po=class extends Wt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Qa(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ag(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Od(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function og(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}var Bn=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Lo=class extends Bn{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kc,endingEnd:Kc}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zc:r=e,o=2*t-n;break;case Jc:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zc:a=e,l=2*n-t;break;case Jc:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,p=x*g,m=-d*p+2*d*x-d*g,b=(1+d)*p+(-1.5-2*d)*x+(-.5+d)*g+1,M=(-1-f)*p+(1.5+f)*x+.5*g,y=f*p-f*x;for(let w=0;w!==o;++w)r[w]=m*a[h+w]+b*a[c+w]+M*a[l+w]+y*a[u+w];return r}},No=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},Do=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Uo=class extends Bn{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(i-t),x=1-g;for(let p=0;p!==o;++p)r[p]=a[c+p]*x+a[l+p]*g;return r}let d=o*2,f=e-1;for(let g=0;g!==o;++g){let x=a[c+g],p=a[l+g],m=f*d+g*2,b=u[m],M=u[m+1],y=e*d+g*2,w=h[y],T=h[y+1],E=(n-t)/(i-t),v,A,I,P,F;for(let q=0;q<8;q++){v=E*E,A=v*E,I=1-E,P=I*I,F=P*I;let k=F*t+3*P*E*b+3*I*v*w+A*i-n;if(Math.abs(k)<1e-10)break;let G=3*P*(b-t)+6*I*E*(w-b)+3*v*(i-w);if(Math.abs(G)<1e-10)break;E=E-k/G,E=Math.max(0,Math.min(1,E))}r[g]=F*x+3*P*E*M+3*I*v*T+A*p}return r}},en=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qa(t,this.TimeBufferType),this.values=Qa(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qa(e.times,Array),values:Qa(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Do(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Uo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ki:t=this.InterpolantFactoryMethodDiscrete;break;case Zi:t=this.InterpolantFactoryMethodLinear;break;case no:t=this.InterpolantFactoryMethodSmooth;break;case $c:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Se("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ki;case this.InterpolantFactoryMethodLinear:return Zi;case this.InterpolantFactoryMethodSmooth:return no;case this.InterpolantFactoryMethodBezier:return $c}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ie("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Ie("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ie("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ie("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&um(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Ie("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===no,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};en.prototype.ValueTypeName="";en.prototype.TimeBufferType=Float32Array;en.prototype.ValueBufferType=Float32Array;en.prototype.DefaultInterpolation=Zi;var ii=class extends en{constructor(e,t,n){super(e,t,n)}};ii.prototype.ValueTypeName="bool";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=Ki;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var $r=class extends en{constructor(e,t,n,i){super(e,t,n,i)}};$r.prototype.ValueTypeName="color";var si=class extends en{constructor(e,t,n,i){super(e,t,n,i)}};si.prototype.ValueTypeName="number";var Fo=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)It.slerpFlat(r,0,a,c-o,a,c,l);return r}},ri=class extends en{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Fo(this.times,this.values,this.getValueSize(),e)}};ri.prototype.ValueTypeName="quaternion";ri.prototype.InterpolantFactoryMethodSmooth=void 0;var ai=class extends en{constructor(e,t,n){super(e,t,n)}};ai.prototype.ValueTypeName="string";ai.prototype.ValueBufferType=Array;ai.prototype.DefaultInterpolation=Ki;ai.prototype.InterpolantFactoryMethodLinear=void 0;ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends en{constructor(e,t,n,i){super(e,t,n,i)}};Ci.prototype.ValueTypeName="vector";var Kr=class{constructor(e="",t=-1,n=[],i=gf){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Mn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(cg(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(en.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=ag(l);l=Od(l,1,h),c=Od(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new si(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function lg(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return si;case"vector":case"vector2":case"vector3":case"vector4":return Ci;case"color":return $r;case"quaternion":return ri;case"bool":case"boolean":return ii;case"string":return ai}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function cg(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=lg(s.type);if(s.times===void 0){let t=[],n=[];og(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Nn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Bd(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Bd(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Bd(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Ys=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Lf=new Ys,kn=class{constructor(e){this.manager=e!==void 0?e:Lf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};kn.DEFAULT_MATERIAL_NAME="__DEFAULT";var jn={},eh=class extends Error{constructor(e,t){super(e),this.response=t}},$s=class extends kn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Nn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(jn[e]!==void 0){jn[e].push({onLoad:t,onProgress:n,onError:i});return}jn[e]=[],jn[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Se("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=jn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,p=new ReadableStream({start(m){b();function b(){u.read().then(({done:M,value:y})=>{if(M)m.close();else{x+=y.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let T=0,E=h.length;T<E;T++){let v=h[T];v.onProgress&&v.onProgress(w)}m.enqueue(y),b()}},M=>{m.error(M)})}}});return new Response(p)}else throw new eh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Nn.add(`file:${e}`,c);let h=jn[e];delete jn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=jn[e];if(h===void 0)throw this.manager.itemError(e),c;delete jn[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Is=new WeakMap,Oo=class extends kn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Nn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=Is.get(a);u===void 0&&(u=[],Is.set(a,u)),u.push({onLoad:t,onError:i})}return a}let o=Fs("img");function l(){h(),t&&t(this);let u=Is.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}Is.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),Nn.remove(`image:${e}`);let d=Is.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}Is.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Nn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}};var Zr=class extends kn{constructor(e){super(e)}load(e,t,n,i){let r=new Pt,a=new Oo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},ts=class extends tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new te(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ii=class extends ts{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xc=new Ee,kd=new C,zd=new C,Jr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.mapType=tn,this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ws,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;kd.setFromMatrixPosition(e.matrixWorld),t.position.copy(kd),zd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zd),t.updateMatrixWorld(),Xc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Us||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},eo=new C,to=new It,Ln=new C,jr=class extends tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=bn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(eo,to,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,Ln.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(eo,to,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new C,Vd=new xe,Hd=new xe,vt=class extends jr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,Vd,Hd),t.subVectors(Hd,Vd)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ar*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},th=class extends Jr{constructor(){super(new vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ji*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Qr=class extends ts{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.target=new tt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new th}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},nh=class extends Jr{constructor(){super(new vt(90,1,.5,500)),this.isPointLightShadow=!0}},ns=class extends ts{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new nh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Pi=class extends jr{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ih=class extends Jr{constructor(){super(new Pi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Zt=class extends ts{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tt.DEFAULT_UP),this.updateMatrix(),this.target=new tt,this.shadow=new ih}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var oi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var qc=new WeakMap,ea=class extends kn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Se("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Se("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Nn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{qc.has(a)===!0?(i&&i(qc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){Nn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),qc.set(l,c),Nn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Nn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ps=-90,Ls=1,Bo=class extends tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new vt(Ps,Ls,e,t);i.layers=this.layers,this.add(i);let r=new vt(Ps,Ls,e,t);r.layers=this.layers,this.add(r);let a=new vt(Ps,Ls,e,t);a.layers=this.layers,this.add(a);let o=new vt(Ps,Ls,e,t);o.layers=this.layers,this.add(o);let l=new vt(Ps,Ls,e,t);l.layers=this.layers,this.add(l);let c=new vt(Ps,Ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Us)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ko=class extends vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ch="\\[\\]\\.:\\/",hg=new RegExp("["+Ch+"]","g"),Ih="[^"+Ch+"]",ug="[^"+Ch.replace("\\.","")+"]",dg=/((?:WC+[\/:])*)/.source.replace("WC",Ih),fg=/(WCOD+)?/.source.replace("WCOD",ug),pg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ih),mg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ih),gg=new RegExp("^"+dg+fg+pg+mg+"$"),xg=["material","materials","bones","map"],sh=class{constructor(e,t,n){let i=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},at=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(hg,"")}static parseTrackName(e){let t=gg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);xg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Se("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ie("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ie("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ie("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ie("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ie("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ie("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;Ie("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ie("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};at.Composite=sh;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Xy=new Float32Array(1);var Gd=new Ee,ta=class{constructor(e,t,n=0,i=1/0){this.ray=new wi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new ks,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ie("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gd),this}intersectObject(e,t=!0,n=[]){return rh(e,this,n,t),n.sort(Wd),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)rh(e[i],this,n,t);return n.sort(Wd),n}};function Wd(s,e){return s.distance-e.distance}function rh(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)rh(r[a],e,t,!0)}}var ah=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};function Ph(s,e,t,n){let i=vg(n);switch(t){case bh:return s*e;case Yo:return s*e/i.components*i.byteLength;case $o:return s*e/i.components*i.byteLength;case Di:return s*e*2/i.components*i.byteLength;case Ko:return s*e*2/i.components*i.byteLength;case Mh:return s*e*3/i.components*i.byteLength;case hn:return s*e*4/i.components*i.byteLength;case Zo:return s*e*4/i.components*i.byteLength;case ra:case aa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case oa:case la:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case jo:case el:return Math.max(s,16)*Math.max(e,8)/4;case Jo:case Qo:return Math.max(s,8)*Math.max(e,8)/2;case tl:case nl:case sl:case rl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case il:case ca:case al:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ol:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case cl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case hl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ul:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case dl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case fl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case pl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ml:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case gl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case xl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case vl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case _l:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case yl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case bl:case Ml:case Sl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case wl:case Tl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ha:case Al:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function vg(s){switch(s){case tn:case xh:return{byteLength:1,components:1};case Js:case vh:case Vn:return{byteLength:2,components:1};case Xo:case qo:return{byteLength:2,components:4};case An:case Wo:case cn:return{byteLength:4,components:1};case _h:case yh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?Se("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function tp(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function yg(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];s.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var bg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ag=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ig=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ng=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ug=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Wg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,qg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Yg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$g=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jg="gl_FragColor = linearToOutputTexel( gl_FragColor );",jg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,e0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,t0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,n0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,i0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,s0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,r0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,a0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,o0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,l0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,c0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,h0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,u0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,d0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,f0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,p0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,m0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,g0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,x0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,v0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,y0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,b0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,M0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,S0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,w0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,T0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,R0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,C0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,P0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,L0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,N0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,D0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,U0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,F0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,B0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,z0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,V0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,W0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,X0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,q0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Y0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,K0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Z0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,J0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,j0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ex=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ix=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ax=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ox=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ux=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,px=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ax=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ex=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ix=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ux=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ox=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$x=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ev=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:bg,alphahash_pars_fragment:Mg,alphamap_fragment:Sg,alphamap_pars_fragment:wg,alphatest_fragment:Tg,alphatest_pars_fragment:Ag,aomap_fragment:Eg,aomap_pars_fragment:Rg,batching_pars_vertex:Cg,batching_vertex:Ig,begin_vertex:Pg,beginnormal_vertex:Lg,bsdfs:Ng,iridescence_fragment:Dg,bumpmap_pars_fragment:Ug,clipping_planes_fragment:Fg,clipping_planes_pars_fragment:Og,clipping_planes_pars_vertex:Bg,clipping_planes_vertex:kg,color_fragment:zg,color_pars_fragment:Vg,color_pars_vertex:Hg,color_vertex:Gg,common:Wg,cube_uv_reflection_fragment:Xg,defaultnormal_vertex:qg,displacementmap_pars_vertex:Yg,displacementmap_vertex:$g,emissivemap_fragment:Kg,emissivemap_pars_fragment:Zg,colorspace_fragment:Jg,colorspace_pars_fragment:jg,envmap_fragment:Qg,envmap_common_pars_fragment:e0,envmap_pars_fragment:t0,envmap_pars_vertex:n0,envmap_physical_pars_fragment:f0,envmap_vertex:i0,fog_vertex:s0,fog_pars_vertex:r0,fog_fragment:a0,fog_pars_fragment:o0,gradientmap_pars_fragment:l0,lightmap_pars_fragment:c0,lights_lambert_fragment:h0,lights_lambert_pars_fragment:u0,lights_pars_begin:d0,lights_toon_fragment:p0,lights_toon_pars_fragment:m0,lights_phong_fragment:g0,lights_phong_pars_fragment:x0,lights_physical_fragment:v0,lights_physical_pars_fragment:_0,lights_fragment_begin:y0,lights_fragment_maps:b0,lights_fragment_end:M0,lightprobes_pars_fragment:S0,logdepthbuf_fragment:w0,logdepthbuf_pars_fragment:T0,logdepthbuf_pars_vertex:A0,logdepthbuf_vertex:E0,map_fragment:R0,map_pars_fragment:C0,map_particle_fragment:I0,map_particle_pars_fragment:P0,metalnessmap_fragment:L0,metalnessmap_pars_fragment:N0,morphinstance_vertex:D0,morphcolor_vertex:U0,morphnormal_vertex:F0,morphtarget_pars_vertex:O0,morphtarget_vertex:B0,normal_fragment_begin:k0,normal_fragment_maps:z0,normal_pars_fragment:V0,normal_pars_vertex:H0,normal_vertex:G0,normalmap_pars_fragment:W0,clearcoat_normal_fragment_begin:X0,clearcoat_normal_fragment_maps:q0,clearcoat_pars_fragment:Y0,iridescence_pars_fragment:$0,opaque_fragment:K0,packing:Z0,premultiplied_alpha_fragment:J0,project_vertex:j0,dithering_fragment:Q0,dithering_pars_fragment:ex,roughnessmap_fragment:tx,roughnessmap_pars_fragment:nx,shadowmap_pars_fragment:ix,shadowmap_pars_vertex:sx,shadowmap_vertex:rx,shadowmask_pars_fragment:ax,skinbase_vertex:ox,skinning_pars_vertex:lx,skinning_vertex:cx,skinnormal_vertex:hx,specularmap_fragment:ux,specularmap_pars_fragment:dx,tonemapping_fragment:fx,tonemapping_pars_fragment:px,transmission_fragment:mx,transmission_pars_fragment:gx,uv_pars_fragment:xx,uv_pars_vertex:vx,uv_vertex:_x,worldpos_vertex:yx,background_vert:bx,background_frag:Mx,backgroundCube_vert:Sx,backgroundCube_frag:wx,cube_vert:Tx,cube_frag:Ax,depth_vert:Ex,depth_frag:Rx,distance_vert:Cx,distance_frag:Ix,equirect_vert:Px,equirect_frag:Lx,linedashed_vert:Nx,linedashed_frag:Dx,meshbasic_vert:Ux,meshbasic_frag:Fx,meshlambert_vert:Ox,meshlambert_frag:Bx,meshmatcap_vert:kx,meshmatcap_frag:zx,meshnormal_vert:Vx,meshnormal_frag:Hx,meshphong_vert:Gx,meshphong_frag:Wx,meshphysical_vert:Xx,meshphysical_frag:qx,meshtoon_vert:Yx,meshtoon_frag:$x,points_vert:Kx,points_frag:Zx,shadow_vert:Jx,shadow_frag:jx,sprite_vert:Qx,sprite_frag:ev},ue={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},Gn={basic:{uniforms:Xt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Xt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new te(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Xt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Xt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Xt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new te(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Xt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Xt([ue.points,ue.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Xt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Xt([ue.common,ue.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Xt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Xt([ue.sprite,ue.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Xt([ue.common,ue.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Xt([ue.lights,ue.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};Gn.physical={uniforms:Xt([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};var Cl={r:0,b:0,g:0},tv=new Ee,np=new De;np.set(-1,0,0,0,1,0,0,0,1);function nv(s,e,t,n,i,r){let a=new te(0),o=i===!0?0:1,l,c,h=null,u=0,d=null;function f(b){let M=b.isScene===!0?b.background:null;if(M&&M.isTexture){let y=b.backgroundBlurriness>0;M=e.get(M,y)}return M}function g(b){let M=!1,y=f(b);y===null?p(a,o):y&&y.isColor&&(p(y,1),M=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(b,M){let y=f(M);y&&(y.isCubeTexture||y.mapping===sa)?(c===void 0&&(c=new qe(new Ai(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:as(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(tv.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(np),c.material.toneMapped=ze.getTransfer(y.colorSpace)!==Je,(h!==y||u!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new qe(new qr(2,2),new ln({name:"BackgroundMaterial",uniforms:as(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ze.getTransfer(y.colorSpace)!==Je,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,M){b.getRGB(Cl,Rh(s)),t.buffers.color.setClear(Cl.r,Cl.g,Cl.b,M,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),o=M,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,p(a,o)},render:g,addToRenderList:x,dispose:m}}function iv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,a=!1;function o(P,F,q,Y,k){let G=!1,H=u(P,Y,q,F);r!==H&&(r=H,c(r.object)),G=f(P,Y,q,k),G&&g(P,Y,q,k),k!==null&&e.update(k,s.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(P,F,q,Y),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return s.createVertexArray()}function c(P){return s.bindVertexArray(P)}function h(P){return s.deleteVertexArray(P)}function u(P,F,q,Y){let k=Y.wireframe===!0,G=n[F.id];G===void 0&&(G={},n[F.id]=G);let H=P.isInstancedMesh===!0?P.id:0,J=G[H];J===void 0&&(J={},G[H]=J);let Q=J[q.id];Q===void 0&&(Q={},J[q.id]=Q);let de=Q[k];return de===void 0&&(de=d(l()),Q[k]=de),de}function d(P){let F=[],q=[],Y=[];for(let k=0;k<t;k++)F[k]=0,q[k]=0,Y[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:q,attributeDivisors:Y,object:P,attributes:{},index:null}}function f(P,F,q,Y){let k=r.attributes,G=F.attributes,H=0,J=q.getAttributes();for(let Q in J)if(J[Q].location>=0){let ge=k[Q],ye=G[Q];if(ye===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(ye=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(ye=P.instanceColor)),ge===void 0||ge.attribute!==ye||ye&&ge.data!==ye.data)return!0;H++}return r.attributesNum!==H||r.index!==Y}function g(P,F,q,Y){let k={},G=F.attributes,H=0,J=q.getAttributes();for(let Q in J)if(J[Q].location>=0){let ge=G[Q];ge===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(ge=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(ge=P.instanceColor));let ye={};ye.attribute=ge,ge&&ge.data&&(ye.data=ge.data),k[Q]=ye,H++}r.attributes=k,r.attributesNum=H,r.index=Y}function x(){let P=r.newAttributes;for(let F=0,q=P.length;F<q;F++)P[F]=0}function p(P){m(P,0)}function m(P,F){let q=r.newAttributes,Y=r.enabledAttributes,k=r.attributeDivisors;q[P]=1,Y[P]===0&&(s.enableVertexAttribArray(P),Y[P]=1),k[P]!==F&&(s.vertexAttribDivisor(P,F),k[P]=F)}function b(){let P=r.newAttributes,F=r.enabledAttributes;for(let q=0,Y=F.length;q<Y;q++)F[q]!==P[q]&&(s.disableVertexAttribArray(q),F[q]=0)}function M(P,F,q,Y,k,G,H){H===!0?s.vertexAttribIPointer(P,F,q,k,G):s.vertexAttribPointer(P,F,q,Y,k,G)}function y(P,F,q,Y){x();let k=Y.attributes,G=q.getAttributes(),H=F.defaultAttributeValues;for(let J in G){let Q=G[J];if(Q.location>=0){let de=k[J];if(de===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),de!==void 0){let ge=de.normalized,ye=de.itemSize,Ye=e.get(de);if(Ye===void 0)continue;let pt=Ye.buffer,$e=Ye.type,Z=Ye.bytesPerElement,re=$e===s.INT||$e===s.UNSIGNED_INT||de.gpuType===Wo;if(de.isInterleavedBufferAttribute){let ee=de.data,Ne=ee.stride,Ue=de.offset;if(ee.isInstancedInterleavedBuffer){for(let Pe=0;Pe<Q.locationSize;Pe++)m(Q.location+Pe,ee.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Pe=0;Pe<Q.locationSize;Pe++)p(Q.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,pt);for(let Pe=0;Pe<Q.locationSize;Pe++)M(Q.location+Pe,ye/Q.locationSize,$e,ge,Ne*Z,(Ue+ye/Q.locationSize*Pe)*Z,re)}else{if(de.isInstancedBufferAttribute){for(let ee=0;ee<Q.locationSize;ee++)m(Q.location+ee,de.meshPerAttribute);P.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ee=0;ee<Q.locationSize;ee++)p(Q.location+ee);s.bindBuffer(s.ARRAY_BUFFER,pt);for(let ee=0;ee<Q.locationSize;ee++)M(Q.location+ee,ye/Q.locationSize,$e,ge,ye*Z,ye/Q.locationSize*ee*Z,re)}}else if(H!==void 0){let ge=H[J];if(ge!==void 0)switch(ge.length){case 2:s.vertexAttrib2fv(Q.location,ge);break;case 3:s.vertexAttrib3fv(Q.location,ge);break;case 4:s.vertexAttrib4fv(Q.location,ge);break;default:s.vertexAttrib1fv(Q.location,ge)}}}}b()}function w(){A();for(let P in n){let F=n[P];for(let q in F){let Y=F[q];for(let k in Y){let G=Y[k];for(let H in G)h(G[H].object),delete G[H];delete Y[k]}}delete n[P]}}function T(P){if(n[P.id]===void 0)return;let F=n[P.id];for(let q in F){let Y=F[q];for(let k in Y){let G=Y[k];for(let H in G)h(G[H].object),delete G[H];delete Y[k]}}delete n[P.id]}function E(P){for(let F in n){let q=n[F];for(let Y in q){let k=q[Y];if(k[P.id]===void 0)continue;let G=k[P.id];for(let H in G)h(G[H].object),delete G[H];delete k[P.id]}}}function v(P){for(let F in n){let q=n[F],Y=P.isInstancedMesh===!0?P.id:0,k=q[Y];if(k!==void 0){for(let G in k){let H=k[G];for(let J in H)h(H[J].object),delete H[J];delete k[G]}delete q[Y],Object.keys(q).length===0&&delete n[F]}}}function A(){I(),a=!0,r!==i&&(r=i,c(r.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:A,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:p,disableUnusedAttributes:b}}function sv(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function rv(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==hn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let v=E===Vn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==tn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==cn&&!v)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Se("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Se("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:y,maxSamples:w,samples:T}}function av(s){let e=this,t=null,n=0,i=!1,r=!1,a=new fn,o=new De,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{let b=r?0:n,M=b*4,y=m.clippingState||null;l.value=y,y=h(g,d,M,f);for(let w=0;w!==M;++w)y[w]=t[w];m.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,y=f;M!==x;++M,y+=4)a.copy(u[M]).applyMatrix4(b,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}var Ui=4,Nf=[.125,.215,.35,.446,.526,.582],os=20,ov=256,fa=new Pi,Df=new te,Lh=null,Nh=0,Dh=0,Uh=!1,lv=new C,nr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=lv}=r;Lh=this._renderer.getRenderTarget(),Nh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Of(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ff(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lh,Nh,Dh),this._renderer.xr.enabled=Uh,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lh=this._renderer.getRenderTarget(),Nh=this._renderer.getActiveCubeFace(),Dh=this._renderer.getActiveMipmapLevel(),Uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wt,minFilter:wt,generateMipmaps:!1,type:Vn,format:hn,colorSpace:$t,depthBuffer:!1},i=Uf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cv(r)),this._blurMaterial=uv(r,e,t),this._ggxMaterial=hv(r,e,t)}return i}_compileMaterial(e){let t=new qe(new ft,e);this._renderer.compile(t,fa)}_sceneToCubeUV(e,t,n,i,r){let l=new vt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Df),u.toneMapping=wn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qe(new Ai,new Kt({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,p=x.material,m=!1,b=e.background;b?b.isColor&&(p.color.copy(b),e.background=null,m=!0):(p.color.copy(Df),m=!0);for(let M=0;M<6;M++){let y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));let w=this._cubeSize;er(i,y*w,M>2?w:0,w,w),u.setRenderTarget(i),m&&u.render(x,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Li||e.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Of()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ff());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;er(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,fa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=0+c*1.25,f=u*d,{_lodMax:g}=this,x=this._sizeLods[n],p=3*x*(n>g-Ui?n-g+Ui:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,er(r,p,m,3*x,2*x),i.setRenderTarget(r),i.render(o,fa),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,er(e,p,m,3*x,2*x),i.setRenderTarget(e),i.render(o,fa)}_blur(e,t,n,i,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ie("blur direction must be either latitudinal or longitudinal!");let h=3,u=this._lodMeshes[i];u.material=c;let d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*os-1),x=r/g,p=isFinite(r)?1+Math.floor(h*x):os;p>os&&Se(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${os}`);let m=[],b=0;for(let E=0;E<os;++E){let v=E/x,A=Math.exp(-v*v/2);m.push(A),E===0?b+=A:E<p&&(b+=2*A)}for(let E=0;E<m.length;E++)m[E]=m[E]/b;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;let y=this._sizeLods[i],w=3*y*(i>M-Ui?i-M+Ui:0),T=4*(this._cubeSize-y);er(t,w,T,3*y,2*y),l.setRenderTarget(t),l.render(u,fa)}};function cv(s){let e=[],t=[],n=[],i=s,r=s-Ui+1+Nf.length;for(let a=0;a<r;a++){let o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Ui?l=Nf[a-s+Ui-1]:a===0&&(l=0),t.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,p=2,m=1,b=new Float32Array(x*g*f),M=new Float32Array(p*g*f),y=new Float32Array(m*g*f);for(let T=0;T<f;T++){let E=T%3*2/3-1,v=T>2?0:-1,A=[E,v,0,E+2/3,v,0,E+2/3,v+1,0,E,v,0,E+2/3,v+1,0,E,v+1,0];b.set(A,x*g*T),M.set(d,p*g*T);let I=[T,T,T,T,T,T];y.set(I,m*g*T)}let w=new ft;w.setAttribute("position",new ut(b,x)),w.setAttribute("uv",new ut(M,p)),w.setAttribute("faceIndex",new ut(y,m)),n.push(new qe(w,null)),i>Ui&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Uf(s,e,t){let n=new an(s,e,t);return n.texture.mapping=sa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function hv(s,e,t){return new ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ov,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function uv(s,e,t){let n=new Float32Array(os),i=new C(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:os,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Ff(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Of(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Nl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Pl=class extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Vr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ai(5,5,5),r=new ln({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:zn});r.uniforms.tEquirect.value=t;let a=new qe(i,r),o=t.minFilter;return t.minFilter===Tn&&(t.minFilter=wt),new Bo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function dv(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Vo||f===Ho)if(e.has(d)){let g=e.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new Pl(g.height);return x.fromEquirectangularTexture(s,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,g=f===Vo||f===Ho,x=f===Li||f===ss;if(g||x){let p=t.get(d),m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new nr(s)),p=g?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{let b=d.image;return g&&b&&b.height>0||x&&b&&l(b)?(n===null&&(n=new nr(s)),p=g?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function o(d,f){return f===Vo?d.mapping=Li:f===Ho&&(d.mapping=ss),d}function l(d){let f=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&f++;return f===g}function c(d){let f=d.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function fv(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&qi("WebGLRenderer: "+n+" extension not supported."),i}}}function pv(s,e,t,n){let i={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(g===void 0)return;if(f!==null){let b=f.array;x=f.version;for(let M=0,y=b.length;M<y;M+=3){let w=b[M+0],T=b[M+1],E=b[M+2];d.push(w,T,T,E,E,w)}}else{let b=g.array;x=g.version;for(let M=0,y=b.length/3-1;M<y;M+=3){let w=M+0,T=M+1,E=M+2;d.push(w,T,T,E,E,w)}}let p=new(g.count>=65535?Dr:Nr)(d,1);p.version=x;let m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function mv(s,e,t){let n;function i(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*a),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let x=0;for(let p=0;p<f;p++)x+=d[p];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function gv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Ie("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function xv(s,e,t){let n=new WeakMap,i=new et;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let A=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],M=0;f===!0&&(M=1),g===!0&&(M=2),x===!0&&(M=3);let y=o.attributes.position.count*M,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*w*4*u),E=new Lr(T,y,w,u);E.type=cn,E.needsUpdate=!0;let v=M*4;for(let I=0;I<u;I++){let P=p[I],F=m[I],q=b[I],Y=y*w*4*I;for(let k=0;k<P.count;k++){let G=k*v;f===!0&&(i.fromBufferAttribute(P,k),T[Y+G+0]=i.x,T[Y+G+1]=i.y,T[Y+G+2]=i.z,T[Y+G+3]=0),g===!0&&(i.fromBufferAttribute(F,k),T[Y+G+4]=i.x,T[Y+G+5]=i.y,T[Y+G+6]=i.z,T[Y+G+7]=0),x===!0&&(i.fromBufferAttribute(q,k),T[Y+G+8]=i.x,T[Y+G+9]=i.y,T[Y+G+10]=i.z,T[Y+G+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:E,size:new xe(y,w)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function vv(s,e,t,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var _v={[hh]:"LINEAR_TONE_MAPPING",[uh]:"REINHARD_TONE_MAPPING",[dh]:"CINEON_TONE_MAPPING",[fh]:"ACES_FILMIC_TONE_MAPPING",[mh]:"AGX_TONE_MAPPING",[ia]:"NEUTRAL_TONE_MAPPING",[ph]:"CUSTOM_TONE_MAPPING"};function yv(s,e,t,n,i,r){let a=new an(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new ti(e,t):void 0}),o=new an(e,t,{type:Vn,depthBuffer:!1,stencilBuffer:!1}),l=new ft;l.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new lt([0,2,0,0,2,0],2));let c=new Co({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new qe(l,c),u=new Pi(-1,1,1,-1,0,1),d=null,f=null,g=!1,x,p=null,m=[],b=!1;this.setSize=function(M,y){a.setSize(M,y),o.setSize(M,y);for(let w=0;w<m.length;w++){let T=m[w];T.setSize&&T.setSize(M,y)}},this.setEffects=function(M){m=M,b=m.length>0&&m[0].isRenderPass===!0;let y=a.width,w=a.height;for(let T=0;T<m.length;T++){let E=m[T];E.setSize&&E.setSize(y,w)}},this.begin=function(M,y){if(g||M.toneMapping===wn&&m.length===0)return!1;if(p=y,y!==null){let w=y.width,T=y.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return b===!1&&M.setRenderTarget(a),x=M.toneMapping,M.toneMapping=wn,!0},this.hasRenderPass=function(){return b},this.end=function(M,y){M.toneMapping=x,g=!0;let w=a,T=o;for(let E=0;E<m.length;E++){let v=m[E];if(v.enabled!==!1&&(v.render(M,T,w,y),v.needsSwap!==!1)){let A=w;w=T,T=A}}if(d!==M.outputColorSpace||f!==M.toneMapping){d=M.outputColorSpace,f=M.toneMapping,c.defines={},ze.getTransfer(d)===Je&&(c.defines.SRGB_TRANSFER="");let E=_v[f];E&&(c.defines[E]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(p),M.render(h,u),p=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var ip=new Pt,Bh=new ti(1,1),sp=new Lr,rp=new go,ap=new Vr,Bf=[],kf=[],zf=new Float32Array(16),Vf=new Float32Array(9),Hf=new Float32Array(4);function ir(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Bf[i];if(r===void 0&&(r=new Float32Array(i),Bf[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Lt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Nt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Dl(s,e){let t=kf[e];t===void 0&&(t=new Int32Array(e),kf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function bv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Mv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;s.uniform2fv(this.addr,e),Nt(t,e)}}function Sv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;s.uniform3fv(this.addr,e),Nt(t,e)}}function wv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;s.uniform4fv(this.addr,e),Nt(t,e)}}function Tv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Hf.set(n),s.uniformMatrix2fv(this.addr,!1,Hf),Nt(t,n)}}function Av(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Vf.set(n),s.uniformMatrix3fv(this.addr,!1,Vf),Nt(t,n)}}function Ev(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;zf.set(n),s.uniformMatrix4fv(this.addr,!1,zf),Nt(t,n)}}function Rv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Cv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;s.uniform2iv(this.addr,e),Nt(t,e)}}function Iv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;s.uniform3iv(this.addr,e),Nt(t,e)}}function Pv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;s.uniform4iv(this.addr,e),Nt(t,e)}}function Lv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Nv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;s.uniform2uiv(this.addr,e),Nt(t,e)}}function Dv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;s.uniform3uiv(this.addr,e),Nt(t,e)}}function Uv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;s.uniform4uiv(this.addr,e),Nt(t,e)}}function Fv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Bh.compareFunction=t.isReversedDepthBuffer()?Rl:El,r=Bh):r=ip,t.setTexture2D(e||r,i)}function Ov(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||rp,i)}function Bv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ap,i)}function kv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||sp,i)}function zv(s){switch(s){case 5126:return bv;case 35664:return Mv;case 35665:return Sv;case 35666:return wv;case 35674:return Tv;case 35675:return Av;case 35676:return Ev;case 5124:case 35670:return Rv;case 35667:case 35671:return Cv;case 35668:case 35672:return Iv;case 35669:case 35673:return Pv;case 5125:return Lv;case 36294:return Nv;case 36295:return Dv;case 36296:return Uv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return kv}}function Vv(s,e){s.uniform1fv(this.addr,e)}function Hv(s,e){let t=ir(e,this.size,2);s.uniform2fv(this.addr,t)}function Gv(s,e){let t=ir(e,this.size,3);s.uniform3fv(this.addr,t)}function Wv(s,e){let t=ir(e,this.size,4);s.uniform4fv(this.addr,t)}function Xv(s,e){let t=ir(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function qv(s,e){let t=ir(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Yv(s,e){let t=ir(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function $v(s,e){s.uniform1iv(this.addr,e)}function Kv(s,e){s.uniform2iv(this.addr,e)}function Zv(s,e){s.uniform3iv(this.addr,e)}function Jv(s,e){s.uniform4iv(this.addr,e)}function jv(s,e){s.uniform1uiv(this.addr,e)}function Qv(s,e){s.uniform2uiv(this.addr,e)}function e_(s,e){s.uniform3uiv(this.addr,e)}function t_(s,e){s.uniform4uiv(this.addr,e)}function n_(s,e,t){let n=this.cache,i=e.length,r=Dl(t,i);Lt(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Bh:a=ip;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function i_(s,e,t){let n=this.cache,i=e.length,r=Dl(t,i);Lt(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||rp,r[a])}function s_(s,e,t){let n=this.cache,i=e.length,r=Dl(t,i);Lt(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||ap,r[a])}function r_(s,e,t){let n=this.cache,i=e.length,r=Dl(t,i);Lt(n,r)||(s.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||sp,r[a])}function a_(s){switch(s){case 5126:return Vv;case 35664:return Hv;case 35665:return Gv;case 35666:return Wv;case 35674:return Xv;case 35675:return qv;case 35676:return Yv;case 5124:case 35670:return $v;case 35667:case 35671:return Kv;case 35668:case 35672:return Zv;case 35669:case 35673:return Jv;case 5125:return jv;case 36294:return Qv;case 36295:return e_;case 36296:return t_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}var kh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zv(t.type)}},zh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=a_(t.type)}},Vh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Fh=/(\w+)(\])?(\[|\.)?/g;function Gf(s,e){s.seq.push(e),s.map[e.id]=e}function o_(s,e,t){let n=s.name,i=n.length;for(Fh.lastIndex=0;;){let r=Fh.exec(n),a=Fh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Gf(t,c===void 0?new kh(o,s,e):new zh(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Vh(o),Gf(t,u)),t=u}}}var tr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);o_(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Wf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var l_=37297,c_=0;function h_(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Xf=new De;function u_(s){ze._getMatrix(Xf,ze.workingColorSpace,s);let e=`mat3( ${Xf.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(s)){case Ir:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Se("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function qf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+h_(s.getShaderSource(e),o)}else return r}function d_(s,e){let t=u_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var f_={[hh]:"Linear",[uh]:"Reinhard",[dh]:"Cineon",[fh]:"ACESFilmic",[mh]:"AgX",[ia]:"Neutral",[ph]:"Custom"};function p_(s,e){let t=f_[e];return t===void 0?(Se("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Il=new C;function m_(){ze.getLuminanceCoefficients(Il);let s=Il.x.toFixed(4),e=Il.y.toFixed(4),t=Il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function x_(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function v_(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function ma(s){return s!==""}function Yf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $f(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var __=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hh(s){return s.replace(__,b_)}var y_=new Map;function b_(s,e){let t=Be[e];if(t===void 0){let n=y_.get(e);if(n!==void 0)t=Be[n],Se('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Hh(t)}var M_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kf(s){return s.replace(M_,S_)}function S_(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Zf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var w_={[na]:"SHADOWMAP_TYPE_PCF",[Ks]:"SHADOWMAP_TYPE_VSM"};function T_(s){return w_[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var A_={[Li]:"ENVMAP_TYPE_CUBE",[ss]:"ENVMAP_TYPE_CUBE",[sa]:"ENVMAP_TYPE_CUBE_UV"};function E_(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":A_[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var R_={[ss]:"ENVMAP_MODE_REFRACTION"};function C_(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":R_[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var I_={[zo]:"ENVMAP_BLENDING_MULTIPLY",[ff]:"ENVMAP_BLENDING_MIX",[pf]:"ENVMAP_BLENDING_ADD"};function P_(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":I_[s.combine]||"ENVMAP_BLENDING_NONE"}function L_(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function N_(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=T_(t),c=E_(t),h=C_(t),u=P_(t),d=L_(t),f=g_(t),g=x_(r),x=i.createProgram(),p,m,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ma).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ma).join(`
`),m.length>0&&(m+=`
`)):(p=[Zf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),m=[Zf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?Be.tonemapping_pars_fragment:"",t.toneMapping!==wn?p_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,d_("linearToOutputTexel",t.outputColorSpace),m_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ma).join(`
`)),a=Hh(a),a=Yf(a,t),a=$f(a,t),o=Hh(o),o=Yf(o,t),o=$f(o,t),a=Kf(a),o=Kf(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let M=b+p+a,y=b+m+o,w=Wf(i,i.VERTEX_SHADER,M),T=Wf(i,i.FRAGMENT_SHADER,y);i.attachShader(x,w),i.attachShader(x,T),t.index0AttributeName!==void 0?i.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function E(P){if(s.debug.checkShaderErrors){let F=i.getProgramInfoLog(x)||"",q=i.getShaderInfoLog(w)||"",Y=i.getShaderInfoLog(T)||"",k=F.trim(),G=q.trim(),H=Y.trim(),J=!0,Q=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,w,T);else{let de=qf(i,w,"vertex"),ge=qf(i,T,"fragment");Ie("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+de+`
`+ge)}else k!==""?Se("WebGLProgram: Program Info Log:",k):(G===""||H==="")&&(Q=!1);Q&&(P.diagnostics={runnable:J,programLog:k,vertexShader:{log:G,prefix:p},fragmentShader:{log:H,prefix:m}})}i.deleteShader(w),i.deleteShader(T),v=new tr(i,x),A=v_(i,x)}let v;this.getUniforms=function(){return v===void 0&&E(this),v};let A;this.getAttributes=function(){return A===void 0&&E(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(x,l_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=c_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}var D_=0,Gh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Wh(e),t.set(e,n)),n}},Wh=class{constructor(e){this.id=D_++,this.code=e,this.usedTimes=0}};function U_(s){return s===Di||s===ca||s===ha}function F_(s,e,t,n,i,r){let a=new ks,o=new Gh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,A,I,P,F,q){let Y=P.fog,k=F.geometry,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,J=e.get(v.envMap||G,H),Q=J&&J.mapping===sa?J.image.height:null,de=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Se("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let ge=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ye=ge!==void 0?ge.length:0,Ye=0;k.morphAttributes.position!==void 0&&(Ye=1),k.morphAttributes.normal!==void 0&&(Ye=2),k.morphAttributes.color!==void 0&&(Ye=3);let pt,$e,Z,re;if(de){let be=Gn[de];pt=be.vertexShader,$e=be.fragmentShader}else{pt=v.vertexShader,$e=v.fragmentShader;let be=o.getVertexShaderStage(v),gt=o.getFragmentShaderStage(v);o.update(v,be,gt),Z=be.id,re=gt.id}let ee=s.getRenderTarget(),Ne=s.state.buffers.depth.getReversed(),Ue=F.isInstancedMesh===!0,Pe=F.isBatchedMesh===!0,_t=!!v.map,Ge=!!v.matcap,it=!!J,Ke=!!v.aoMap,We=!!v.lightMap,At=!!v.bumpMap&&v.wireframe===!1,Ct=!!v.normalMap,Dt=!!v.displacementMap,Bt=!!v.emissiveMap,mt=!!v.metalnessMap,Et=!!v.roughnessMap,N=v.anisotropy>0,Jt=v.clearcoat>0,je=v.dispersion>0,R=v.iridescence>0,_=v.sheen>0,U=v.transmission>0,z=N&&!!v.anisotropyMap,W=Jt&&!!v.clearcoatMap,ie=Jt&&!!v.clearcoatNormalMap,ae=Jt&&!!v.clearcoatRoughnessMap,X=R&&!!v.iridescenceMap,K=R&&!!v.iridescenceThicknessMap,oe=_&&!!v.sheenColorMap,Te=_&&!!v.sheenRoughnessMap,he=!!v.specularMap,le=!!v.specularColorMap,Ce=!!v.specularIntensityMap,Le=U&&!!v.transmissionMap,Fe=U&&!!v.thicknessMap,L=!!v.gradientMap,se=!!v.alphaMap,$=v.alphaTest>0,ce=!!v.alphaHash,me=!!v.extensions,j=wn;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(j=s.toneMapping);let we={shaderID:de,shaderType:v.type,shaderName:v.name,vertexShader:pt,fragmentShader:$e,defines:v.defines,customVertexShaderID:Z,customFragmentShaderID:re,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Pe,batchingColor:Pe&&F._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&F.instanceColor!==null,instancingMorph:Ue&&F.morphTexture!==null,outputColorSpace:ee===null?s.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ze.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:_t,matcap:Ge,envMap:it,envMapMode:it&&J.mapping,envMapCubeUVHeight:Q,aoMap:Ke,lightMap:We,bumpMap:At,normalMap:Ct,displacementMap:Dt,emissiveMap:Bt,normalMapObjectSpace:Ct&&v.normalMapType===vf,normalMapTangentSpace:Ct&&v.normalMapType===da,packedNormalMap:Ct&&v.normalMapType===da&&U_(v.normalMap.format),metalnessMap:mt,roughnessMap:Et,anisotropy:N,anisotropyMap:z,clearcoat:Jt,clearcoatMap:W,clearcoatNormalMap:ie,clearcoatRoughnessMap:ae,dispersion:je,iridescence:R,iridescenceMap:X,iridescenceThicknessMap:K,sheen:_,sheenColorMap:oe,sheenRoughnessMap:Te,specularMap:he,specularColorMap:le,specularIntensityMap:Ce,transmission:U,transmissionMap:Le,thicknessMap:Fe,gradientMap:L,opaque:v.transparent===!1&&v.blending===Yi&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:$,alphaHash:ce,combine:v.combine,mapUv:_t&&g(v.map.channel),aoMapUv:Ke&&g(v.aoMap.channel),lightMapUv:We&&g(v.lightMap.channel),bumpMapUv:At&&g(v.bumpMap.channel),normalMapUv:Ct&&g(v.normalMap.channel),displacementMapUv:Dt&&g(v.displacementMap.channel),emissiveMapUv:Bt&&g(v.emissiveMap.channel),metalnessMapUv:mt&&g(v.metalnessMap.channel),roughnessMapUv:Et&&g(v.roughnessMap.channel),anisotropyMapUv:z&&g(v.anisotropyMap.channel),clearcoatMapUv:W&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Te&&g(v.sheenRoughnessMap.channel),specularMapUv:he&&g(v.specularMap.channel),specularColorMapUv:le&&g(v.specularColorMap.channel),specularIntensityMapUv:Ce&&g(v.specularIntensityMap.channel),transmissionMapUv:Le&&g(v.transmissionMap.channel),thicknessMapUv:Fe&&g(v.thicknessMap.channel),alphaMapUv:se&&g(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ct||N),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!k.attributes.uv&&(_t||se),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&Ct===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ne,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ye,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:j,decodeVideoTexture:_t&&v.map.isVideoTexture===!0&&ze.getTransfer(v.map.colorSpace)===Je,decodeVideoTextureEmissive:Bt&&v.emissiveMap.isVideoTexture===!0&&ze.getTransfer(v.emissiveMap.colorSpace)===Je,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ot,flipSided:v.side===kt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:me&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&v.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return we.vertexUv1s=l.has(1),we.vertexUv2s=l.has(2),we.vertexUv3s=l.has(3),l.clear(),we}function p(v){let A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)A.push(I),A.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(m(A,v),b(A,v),A.push(s.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function m(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function b(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){let A=f[v.type],I;if(A){let P=Gn[A];I=Pf.clone(P.uniforms)}else I=v.uniforms;return I}function y(v,A){let I=h.get(A);return I!==void 0?++I.usedTimes:(I=new N_(s,A,v,i),c.push(I),h.set(A,I)),I}function w(v){if(--v.usedTimes===0){let A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function E(){o.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:M,acquireProgram:y,releaseProgram:w,releaseShaderCache:T,programs:c,dispose:E}}function O_(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function B_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Jf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function jf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,x,p,m){let b=s[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:p,group:m},s[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=g,b.materialVariant=a(d),b.groupOrder=x,b.renderOrder=d.renderOrder,b.z=p,b.group=m),e++,b}function l(d,f,g,x,p,m){let b=o(d,f,g,x,p,m);g.transmission>0?n.push(b):g.transparent===!0?i.push(b):t.push(b)}function c(d,f,g,x,p,m){let b=o(d,f,g,x,p,m);g.transmission>0?n.unshift(b):g.transparent===!0?i.unshift(b):t.unshift(b)}function h(d,f,g){t.length>1&&t.sort(d||B_),n.length>1&&n.sort(f||Jf),i.length>1&&i.sort(f||Jf),g&&(t.reverse(),n.reverse(),i.reverse())}function u(){for(let d=e,f=s.length;d<f;d++){let g=s[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function k_(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new jf,s.set(n,[a])):i>=r.length?(a=new jf,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function z_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new te};break;case"SpotLight":t={position:new C,direction:new C,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new te,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new te,groundColor:new te};break;case"RectAreaLight":t={color:new te,position:new C,halfWidth:new C,halfHeight:new C};break}return s[e.id]=t,t}}}function V_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var H_=0;function G_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function W_(s){let e=new z_,t=V_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let i=new C,r=new Ee,a=new Ee;function o(c){let h=0,u=0,d=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let f=0,g=0,x=0,p=0,m=0,b=0,M=0,y=0,w=0,T=0,E=0;c.sort(G_);for(let A=0,I=c.length;A<I;A++){let P=c[A],F=P.color,q=P.intensity,Y=P.distance,k=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Di?k=P.shadow.map.texture:k=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*q,u+=F.g*q,d+=F.b*q;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],q);E++}else if(P.isDirectionalLight){let G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let H=P.shadow,J=t.get(P);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize=H.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=k,n.directionalShadowMatrix[f]=P.shadow.matrix,b++}n.directional[f]=G,f++}else if(P.isSpotLight){let G=e.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(F).multiplyScalar(q),G.distance=Y,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[x]=G;let H=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,H.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[x]=H.matrix,P.castShadow){let J=t.get(P);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize=H.mapSize,n.spotShadow[x]=J,n.spotShadowMap[x]=k,y++}x++}else if(P.isRectAreaLight){let G=e.get(P);G.color.copy(F).multiplyScalar(q),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=G,p++}else if(P.isPointLight){let G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){let H=P.shadow,J=t.get(P);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize=H.mapSize,J.shadowCameraNear=H.camera.near,J.shadowCameraFar=H.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=G,g++}else if(P.isHemisphereLight){let G=e.get(P);G.skyColor.copy(P.color).multiplyScalar(q),G.groundColor.copy(P.groundColor).multiplyScalar(q),n.hemi[m]=G,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let v=n.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==p||v.hemiLength!==m||v.numDirectionalShadows!==b||v.numPointShadows!==M||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+w-T,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,v.directionalLength=f,v.pointLength=g,v.spotLength=x,v.rectAreaLength=p,v.hemiLength=m,v.numDirectionalShadows=b,v.numPointShadows=M,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=E,n.version=H_++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,p=h.matrixWorldInverse;for(let m=0,b=c.length;m<b;m++){let M=c[m];if(M.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),u++}else if(M.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(M.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){let y=n.hemi[x];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),x++}}}return{setup:o,setupView:l,state:n}}function Qf(s){let e=new W_(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function X_(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Qf(s),e.set(i,[o])):r>=a.length?(o=new Qf(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var q_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,$_=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],K_=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],ep=new Ee,pa=new C,Oh=new C;function Z_(s,e,t){let n=new Ws,i=new xe,r=new xe,a=new et,o=new Io,l=new Po,c={},h=t.maxTextureSize,u={[Sn]:kt,[kt]:Sn,[Ot]:Ot},d=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:q_,fragmentShader:Y_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new ft;g.setAttribute("position",new ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new qe(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=na;let m=this.type;this.render=function(T,E,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Yd&&(Se("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=na);let A=s.getRenderTarget(),I=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),F=s.state;F.setBlending(zn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let q=m!==this.type;q&&E.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(k=>k.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,k=T.length;Y<k;Y++){let G=T[Y],H=G.shadow;if(H===void 0){Se("WebGLShadowMap:",G,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);let J=H.getFrameExtents();i.multiply(J),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,H.mapSize.y=r.y));let Q=s.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Q,H.map===null||q===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ks){if(G.isPointLight){Se("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new an(i.x,i.y,{format:Di,type:Vn,minFilter:wt,magFilter:wt,generateMipmaps:!1}),H.map.texture.name=G.name+".shadowMap",H.map.depthTexture=new ti(i.x,i.y,cn),H.map.depthTexture.name=G.name+".shadowMapDepth",H.map.depthTexture.format=Dn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=St,H.map.depthTexture.magFilter=St}else G.isPointLight?(H.map=new Pl(i.x),H.map.depthTexture=new _o(i.x,An)):(H.map=new an(i.x,i.y),H.map.depthTexture=new ti(i.x,i.y,An)),H.map.depthTexture.name=G.name+".shadowMap",H.map.depthTexture.format=Dn,this.type===na?(H.map.depthTexture.compareFunction=Q?Rl:El,H.map.depthTexture.minFilter=wt,H.map.depthTexture.magFilter=wt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=St,H.map.depthTexture.magFilter=St);H.camera.updateProjectionMatrix()}let de=H.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<de;ge++){if(H.map.isWebGLCubeRenderTarget)s.setRenderTarget(H.map,ge),s.clear();else{ge===0&&(s.setRenderTarget(H.map),s.clear());let ye=H.getViewport(ge);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),F.viewport(a)}if(G.isPointLight){let ye=H.camera,Ye=H.matrix,pt=G.distance||ye.far;pt!==ye.far&&(ye.far=pt,ye.updateProjectionMatrix()),pa.setFromMatrixPosition(G.matrixWorld),ye.position.copy(pa),Oh.copy(ye.position),Oh.add($_[ge]),ye.up.copy(K_[ge]),ye.lookAt(Oh),ye.updateMatrixWorld(),Ye.makeTranslation(-pa.x,-pa.y,-pa.z),ep.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),H._frustum.setFromProjectionMatrix(ep,ye.coordinateSystem,ye.reversedDepth)}else H.updateMatrices(G);n=H.getFrustum(),y(E,v,H.camera,G,this.type)}H.isPointLightShadow!==!0&&this.type===Ks&&b(H,v),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(A,I,P)};function b(T,E){let v=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new an(i.x,i.y,{format:Di,type:Vn})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(E,null,v,d,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(E,null,v,f,x,null)}function M(T,E,v,A){let I=null,P=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)I=P;else if(I=v.isPointLight===!0?l:o,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let F=I.uuid,q=E.uuid,Y=c[F];Y===void 0&&(Y={},c[F]=Y);let k=Y[q];k===void 0&&(k=I.clone(),Y[q]=k,E.addEventListener("dispose",w)),I=k}if(I.visible=E.visible,I.wireframe=E.wireframe,A===Ks?I.side=E.shadowSide!==null?E.shadowSide:E.side:I.side=E.shadowSide!==null?E.shadowSide:u[E.side],I.alphaMap=E.alphaMap,I.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,I.map=E.map,I.clipShadows=E.clipShadows,I.clippingPlanes=E.clippingPlanes,I.clipIntersection=E.clipIntersection,I.displacementMap=E.displacementMap,I.displacementScale=E.displacementScale,I.displacementBias=E.displacementBias,I.wireframeLinewidth=E.wireframeLinewidth,I.linewidth=E.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let F=s.properties.get(I);F.light=v}return I}function y(T,E,v,A,I){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===Ks)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let q=e.update(T),Y=T.material;if(Array.isArray(Y)){let k=q.groups;for(let G=0,H=k.length;G<H;G++){let J=k[G],Q=Y[J.materialIndex];if(Q&&Q.visible){let de=M(T,Q,A,I);T.onBeforeShadow(s,T,E,v,q,de,J),s.renderBufferDirect(v,null,q,de,T,J),T.onAfterShadow(s,T,E,v,q,de,J)}}}else if(Y.visible){let k=M(T,Y,A,I);T.onBeforeShadow(s,T,E,v,q,k,null),s.renderBufferDirect(v,null,q,k,T,null),T.onAfterShadow(s,T,E,v,q,k,null)}}let F=T.children;for(let q=0,Y=F.length;q<Y;q++)y(F[q],E,v,A,I)}function w(T){T.target.removeEventListener("dispose",w);for(let v in c){let A=c[v],I=T.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function J_(s,e){function t(){let L=!1,se=new et,$=null,ce=new et(0,0,0,0);return{setMask:function(me){$!==me&&!L&&(s.colorMask(me,me,me,me),$=me)},setLocked:function(me){L=me},setClear:function(me,j,we,be,gt){gt===!0&&(me*=be,j*=be,we*=be),se.set(me,j,we,be),ce.equals(se)===!1&&(s.clearColor(me,j,we,be),ce.copy(se))},reset:function(){L=!1,$=null,ce.set(-1,0,0,0)}}}function n(){let L=!1,se=!1,$=null,ce=null,me=null;return{setReversed:function(j){if(se!==j){let we=e.get("EXT_clip_control");j?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),se=j;let be=me;me=null,this.setClear(be)}},getReversed:function(){return se},setTest:function(j){j?ee(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(j){$!==j&&!L&&(s.depthMask(j),$=j)},setFunc:function(j){if(se&&(j=Rf[j]),ce!==j){switch(j){case ro:s.depthFunc(s.NEVER);break;case ao:s.depthFunc(s.ALWAYS);break;case oo:s.depthFunc(s.LESS);break;case $i:s.depthFunc(s.LEQUAL);break;case lo:s.depthFunc(s.EQUAL);break;case co:s.depthFunc(s.GEQUAL);break;case ho:s.depthFunc(s.GREATER);break;case uo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ce=j}},setLocked:function(j){L=j},setClear:function(j){me!==j&&(me=j,se&&(j=1-j),s.clearDepth(j))},reset:function(){L=!1,$=null,ce=null,me=null,se=!1}}}function i(){let L=!1,se=null,$=null,ce=null,me=null,j=null,we=null,be=null,gt=null;return{setTest:function(ct){L||(ct?ee(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(ct){se!==ct&&!L&&(s.stencilMask(ct),se=ct)},setFunc:function(ct,Rn,Cn){($!==ct||ce!==Rn||me!==Cn)&&(s.stencilFunc(ct,Rn,Cn),$=ct,ce=Rn,me=Cn)},setOp:function(ct,Rn,Cn){(j!==ct||we!==Rn||be!==Cn)&&(s.stencilOp(ct,Rn,Cn),j=ct,we=Rn,be=Cn)},setLocked:function(ct){L=ct},setClear:function(ct){gt!==ct&&(s.clearStencil(ct),gt=ct)},reset:function(){L=!1,se=null,$=null,ce=null,me=null,j=null,we=null,be=null,gt=null}}}let r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],x=null,p=!1,m=null,b=null,M=null,y=null,w=null,T=null,E=null,v=new te(0,0,0),A=0,I=!1,P=null,F=null,q=null,Y=null,k=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,J=0,Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=J>=1):Q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=J>=2);let de=null,ge={},ye=s.getParameter(s.SCISSOR_BOX),Ye=s.getParameter(s.VIEWPORT),pt=new et().fromArray(ye),$e=new et().fromArray(Ye);function Z(L,se,$,ce){let me=new Uint8Array(4),j=s.createTexture();s.bindTexture(L,j),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let we=0;we<$;we++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(se,0,s.RGBA,1,1,ce,0,s.RGBA,s.UNSIGNED_BYTE,me):s.texImage2D(se+we,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,me);return j}let re={};re[s.TEXTURE_2D]=Z(s.TEXTURE_2D,s.TEXTURE_2D,1),re[s.TEXTURE_CUBE_MAP]=Z(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[s.TEXTURE_2D_ARRAY]=Z(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),re[s.TEXTURE_3D]=Z(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(s.DEPTH_TEST),a.setFunc($i),At(!1),Ct(oh),ee(s.CULL_FACE),Ke(zn);function ee(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function Ne(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Ue(L,se){return d[L]!==se?(s.bindFramebuffer(L,se),d[L]=se,L===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=se),L===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=se),!0):!1}function Pe(L,se){let $=g,ce=!1;if(L){$=f.get(se),$===void 0&&($=[],f.set(se,$));let me=L.textures;if($.length!==me.length||$[0]!==s.COLOR_ATTACHMENT0){for(let j=0,we=me.length;j<we;j++)$[j]=s.COLOR_ATTACHMENT0+j;$.length=me.length,ce=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,ce=!0);ce&&s.drawBuffers($)}function _t(L){return x!==L?(s.useProgram(L),x=L,!0):!1}let Ge={[bi]:s.FUNC_ADD,[Kd]:s.FUNC_SUBTRACT,[Zd]:s.FUNC_REVERSE_SUBTRACT};Ge[Jd]=s.MIN,Ge[jd]=s.MAX;let it={[Qd]:s.ZERO,[ef]:s.ONE,[tf]:s.SRC_COLOR,[io]:s.SRC_ALPHA,[lf]:s.SRC_ALPHA_SATURATE,[af]:s.DST_COLOR,[sf]:s.DST_ALPHA,[nf]:s.ONE_MINUS_SRC_COLOR,[so]:s.ONE_MINUS_SRC_ALPHA,[of]:s.ONE_MINUS_DST_COLOR,[rf]:s.ONE_MINUS_DST_ALPHA,[cf]:s.CONSTANT_COLOR,[hf]:s.ONE_MINUS_CONSTANT_COLOR,[uf]:s.CONSTANT_ALPHA,[df]:s.ONE_MINUS_CONSTANT_ALPHA};function Ke(L,se,$,ce,me,j,we,be,gt,ct){if(L===zn){p===!0&&(Ne(s.BLEND),p=!1);return}if(p===!1&&(ee(s.BLEND),p=!0),L!==$d){if(L!==m||ct!==I){if((b!==bi||w!==bi)&&(s.blendEquation(s.FUNC_ADD),b=bi,w=bi),ct)switch(L){case Yi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case is:s.blendFunc(s.ONE,s.ONE);break;case lh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ch:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ie("WebGLState: Invalid blending: ",L);break}else switch(L){case Yi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case is:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case lh:Ie("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ch:Ie("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ie("WebGLState: Invalid blending: ",L);break}M=null,y=null,T=null,E=null,v.set(0,0,0),A=0,m=L,I=ct}return}me=me||se,j=j||$,we=we||ce,(se!==b||me!==w)&&(s.blendEquationSeparate(Ge[se],Ge[me]),b=se,w=me),($!==M||ce!==y||j!==T||we!==E)&&(s.blendFuncSeparate(it[$],it[ce],it[j],it[we]),M=$,y=ce,T=j,E=we),(be.equals(v)===!1||gt!==A)&&(s.blendColor(be.r,be.g,be.b,gt),v.copy(be),A=gt),m=L,I=!1}function We(L,se){L.side===Ot?Ne(s.CULL_FACE):ee(s.CULL_FACE);let $=L.side===kt;se&&($=!$),At($),L.blending===Yi&&L.transparent===!1?Ke(zn):Ke(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let ce=L.stencilWrite;o.setTest(ce),ce&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Bt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ee(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function At(L){P!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),P=L)}function Ct(L){L!==Xd?(ee(s.CULL_FACE),L!==F&&(L===oh?s.cullFace(s.BACK):L===qd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),F=L}function Dt(L){L!==q&&(H&&s.lineWidth(L),q=L)}function Bt(L,se,$){L?(ee(s.POLYGON_OFFSET_FILL),(Y!==se||k!==$)&&(Y=se,k=$,a.getReversed()&&(se=-se),s.polygonOffset(se,$))):Ne(s.POLYGON_OFFSET_FILL)}function mt(L){L?ee(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function Et(L){L===void 0&&(L=s.TEXTURE0+G-1),de!==L&&(s.activeTexture(L),de=L)}function N(L,se,$){$===void 0&&(de===null?$=s.TEXTURE0+G-1:$=de);let ce=ge[$];ce===void 0&&(ce={type:void 0,texture:void 0},ge[$]=ce),(ce.type!==L||ce.texture!==se)&&(de!==$&&(s.activeTexture($),de=$),s.bindTexture(L,se||re[L]),ce.type=L,ce.texture=se)}function Jt(){let L=ge[de];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function je(){try{s.compressedTexImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function _(){try{s.texSubImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function U(){try{s.texSubImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function z(){try{s.compressedTexSubImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function W(){try{s.compressedTexSubImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function ie(){try{s.texStorage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function ae(){try{s.texStorage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function X(){try{s.texImage2D(...arguments)}catch(L){Ie("WebGLState:",L)}}function K(){try{s.texImage3D(...arguments)}catch(L){Ie("WebGLState:",L)}}function oe(L){return u[L]!==void 0?u[L]:s.getParameter(L)}function Te(L,se){u[L]!==se&&(s.pixelStorei(L,se),u[L]=se)}function he(L){pt.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),pt.copy(L))}function le(L){$e.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),$e.copy(L))}function Ce(L,se){let $=c.get(se);$===void 0&&($=new WeakMap,c.set(se,$));let ce=$.get(L);ce===void 0&&(ce=s.getUniformBlockIndex(se,L.name),$.set(L,ce))}function Le(L,se){let ce=c.get(se).get(L);l.get(se)!==ce&&(s.uniformBlockBinding(se,ce,L.__bindingPointIndex),l.set(se,ce))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},de=null,ge={},d={},f=new WeakMap,g=[],x=null,p=!1,m=null,b=null,M=null,y=null,w=null,T=null,E=null,v=new te(0,0,0),A=0,I=!1,P=null,F=null,q=null,Y=null,k=null,pt.set(0,0,s.canvas.width,s.canvas.height),$e.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ne,bindFramebuffer:Ue,drawBuffers:Pe,useProgram:_t,setBlending:Ke,setMaterial:We,setFlipSided:At,setCullFace:Ct,setLineWidth:Dt,setPolygonOffset:Bt,setScissorTest:mt,activeTexture:Et,bindTexture:N,unbindTexture:Jt,compressedTexImage2D:je,compressedTexImage3D:R,texImage2D:X,texImage3D:K,pixelStorei:Te,getParameter:oe,updateUBOMapping:Ce,uniformBlockBinding:Le,texStorage2D:ie,texStorage3D:ae,texSubImage2D:_,texSubImage3D:U,compressedTexSubImage2D:z,compressedTexSubImage3D:W,scissor:he,viewport:le,reset:Fe}}function j_(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xe,h=new WeakMap,u=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,_){return g?new OffscreenCanvas(R,_):Fs("canvas")}function p(R,_,U){let z=1,W=je(R);if((W.width>U||W.height>U)&&(z=U/Math.max(W.width,W.height)),z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let ie=Math.floor(z*W.width),ae=Math.floor(z*W.height);d===void 0&&(d=x(ie,ae));let X=_?x(ie,ae):d;return X.width=ie,X.height=ae,X.getContext("2d").drawImage(R,0,0,ie,ae),Se("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+ie+"x"+ae+")."),X}else return"data"in R&&Se("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),R;return R}function m(R){return R.generateMipmaps}function b(R){s.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(R,_,U,z,W,ie=!1){if(R!==null){if(s[R]!==void 0)return s[R];Se("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ae;z&&(ae=e.get("EXT_texture_norm16"),ae||Se("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=_;if(_===s.RED&&(U===s.FLOAT&&(X=s.R32F),U===s.HALF_FLOAT&&(X=s.R16F),U===s.UNSIGNED_BYTE&&(X=s.R8),U===s.UNSIGNED_SHORT&&ae&&(X=ae.R16_EXT),U===s.SHORT&&ae&&(X=ae.R16_SNORM_EXT)),_===s.RED_INTEGER&&(U===s.UNSIGNED_BYTE&&(X=s.R8UI),U===s.UNSIGNED_SHORT&&(X=s.R16UI),U===s.UNSIGNED_INT&&(X=s.R32UI),U===s.BYTE&&(X=s.R8I),U===s.SHORT&&(X=s.R16I),U===s.INT&&(X=s.R32I)),_===s.RG&&(U===s.FLOAT&&(X=s.RG32F),U===s.HALF_FLOAT&&(X=s.RG16F),U===s.UNSIGNED_BYTE&&(X=s.RG8),U===s.UNSIGNED_SHORT&&ae&&(X=ae.RG16_EXT),U===s.SHORT&&ae&&(X=ae.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(U===s.UNSIGNED_BYTE&&(X=s.RG8UI),U===s.UNSIGNED_SHORT&&(X=s.RG16UI),U===s.UNSIGNED_INT&&(X=s.RG32UI),U===s.BYTE&&(X=s.RG8I),U===s.SHORT&&(X=s.RG16I),U===s.INT&&(X=s.RG32I)),_===s.RGB_INTEGER&&(U===s.UNSIGNED_BYTE&&(X=s.RGB8UI),U===s.UNSIGNED_SHORT&&(X=s.RGB16UI),U===s.UNSIGNED_INT&&(X=s.RGB32UI),U===s.BYTE&&(X=s.RGB8I),U===s.SHORT&&(X=s.RGB16I),U===s.INT&&(X=s.RGB32I)),_===s.RGBA_INTEGER&&(U===s.UNSIGNED_BYTE&&(X=s.RGBA8UI),U===s.UNSIGNED_SHORT&&(X=s.RGBA16UI),U===s.UNSIGNED_INT&&(X=s.RGBA32UI),U===s.BYTE&&(X=s.RGBA8I),U===s.SHORT&&(X=s.RGBA16I),U===s.INT&&(X=s.RGBA32I)),_===s.RGB&&(U===s.UNSIGNED_SHORT&&ae&&(X=ae.RGB16_EXT),U===s.SHORT&&ae&&(X=ae.RGB16_SNORM_EXT),U===s.UNSIGNED_INT_5_9_9_9_REV&&(X=s.RGB9_E5),U===s.UNSIGNED_INT_10F_11F_11F_REV&&(X=s.R11F_G11F_B10F)),_===s.RGBA){let K=ie?Ir:ze.getTransfer(W);U===s.FLOAT&&(X=s.RGBA32F),U===s.HALF_FLOAT&&(X=s.RGBA16F),U===s.UNSIGNED_BYTE&&(X=K===Je?s.SRGB8_ALPHA8:s.RGBA8),U===s.UNSIGNED_SHORT&&ae&&(X=ae.RGBA16_EXT),U===s.SHORT&&ae&&(X=ae.RGBA16_SNORM_EXT),U===s.UNSIGNED_SHORT_4_4_4_4&&(X=s.RGBA4),U===s.UNSIGNED_SHORT_5_5_5_1&&(X=s.RGB5_A1)}return(X===s.R16F||X===s.R32F||X===s.RG16F||X===s.RG32F||X===s.RGBA16F||X===s.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function w(R,_){let U;return R?_===null||_===An||_===js?U=s.DEPTH24_STENCIL8:_===cn?U=s.DEPTH32F_STENCIL8:_===Js&&(U=s.DEPTH24_STENCIL8,Se("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===An||_===js?U=s.DEPTH_COMPONENT24:_===cn?U=s.DEPTH_COMPONENT32F:_===Js&&(U=s.DEPTH_COMPONENT16),U}function T(R,_){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==St&&R.minFilter!==wt?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function E(R){let _=R.target;_.removeEventListener("dispose",E),A(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&u.delete(_)}function v(R){let _=R.target;_.removeEventListener("dispose",v),P(_)}function A(R){let _=n.get(R);if(_.__webglInit===void 0)return;let U=R.source,z=f.get(U);if(z){let W=z[_.__cacheKey];W.usedTimes--,W.usedTimes===0&&I(R),Object.keys(z).length===0&&f.delete(U)}n.remove(R)}function I(R){let _=n.get(R);s.deleteTexture(_.__webglTexture);let U=R.source,z=f.get(U);delete z[_.__cacheKey],a.memory.textures--}function P(R){let _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(_.__webglFramebuffer[z]))for(let W=0;W<_.__webglFramebuffer[z].length;W++)s.deleteFramebuffer(_.__webglFramebuffer[z][W]);else s.deleteFramebuffer(_.__webglFramebuffer[z]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[z])}else{if(Array.isArray(_.__webglFramebuffer))for(let z=0;z<_.__webglFramebuffer.length;z++)s.deleteFramebuffer(_.__webglFramebuffer[z]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let z=0;z<_.__webglColorRenderbuffer.length;z++)_.__webglColorRenderbuffer[z]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[z]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let U=R.textures;for(let z=0,W=U.length;z<W;z++){let ie=n.get(U[z]);ie.__webglTexture&&(s.deleteTexture(ie.__webglTexture),a.memory.textures--),n.remove(U[z])}n.remove(R)}let F=0;function q(){F=0}function Y(){return F}function k(R){F=R}function G(){let R=F;return R>=i.maxTextures&&Se("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),F+=1,R}function H(R){let _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function J(R,_){let U=n.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&U.__version!==R.version){let z=R.image;if(z===null)Se("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Se("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(U,R,_);return}}else R.isExternalTexture&&(U.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,U.__webglTexture,s.TEXTURE0+_)}function Q(R,_){let U=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){Ne(U,R,_);return}else R.isExternalTexture&&(U.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,U.__webglTexture,s.TEXTURE0+_)}function de(R,_){let U=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&U.__version!==R.version){Ne(U,R,_);return}t.bindTexture(s.TEXTURE_3D,U.__webglTexture,s.TEXTURE0+_)}function ge(R,_){let U=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&U.__version!==R.version){Ue(U,R,_);return}t.bindTexture(s.TEXTURE_CUBE_MAP,U.__webglTexture,s.TEXTURE0+_)}let ye={[Mi]:s.REPEAT,[pn]:s.CLAMP_TO_EDGE,[Ds]:s.MIRRORED_REPEAT},Ye={[St]:s.NEAREST,[Go]:s.NEAREST_MIPMAP_NEAREST,[rs]:s.NEAREST_MIPMAP_LINEAR,[wt]:s.LINEAR,[Zs]:s.LINEAR_MIPMAP_NEAREST,[Tn]:s.LINEAR_MIPMAP_LINEAR},pt={[_f]:s.NEVER,[wf]:s.ALWAYS,[yf]:s.LESS,[El]:s.LEQUAL,[bf]:s.EQUAL,[Rl]:s.GEQUAL,[Mf]:s.GREATER,[Sf]:s.NOTEQUAL};function $e(R,_){if(_.type===cn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===wt||_.magFilter===Zs||_.magFilter===rs||_.magFilter===Tn||_.minFilter===wt||_.minFilter===Zs||_.minFilter===rs||_.minFilter===Tn)&&Se("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,ye[_.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,ye[_.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,ye[_.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Ye[_.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Ye[_.minFilter]),_.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,pt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===St||_.minFilter!==rs&&_.minFilter!==Tn||_.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Z(R,_){let U=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",E));let z=_.source,W=f.get(z);W===void 0&&(W={},f.set(z,W));let ie=H(_);if(ie!==R.__cacheKey){W[ie]===void 0&&(W[ie]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,U=!0),W[ie].usedTimes++;let ae=W[R.__cacheKey];ae!==void 0&&(W[R.__cacheKey].usedTimes--,ae.usedTimes===0&&I(_)),R.__cacheKey=ie,R.__webglTexture=W[ie].texture}return U}function re(R,_,U){return Math.floor(Math.floor(R/U)/_)}function ee(R,_,U,z){let ie=R.updateRanges;if(ie.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,U,z,_.data);else{ie.sort((Te,he)=>Te.start-he.start);let ae=0;for(let Te=1;Te<ie.length;Te++){let he=ie[ae],le=ie[Te],Ce=he.start+he.count,Le=re(le.start,_.width,4),Fe=re(he.start,_.width,4);le.start<=Ce+1&&Le===Fe&&re(le.start+le.count-1,_.width,4)===Le?he.count=Math.max(he.count,le.start+le.count-he.start):(++ae,ie[ae]=le)}ie.length=ae+1;let X=t.getParameter(s.UNPACK_ROW_LENGTH),K=t.getParameter(s.UNPACK_SKIP_PIXELS),oe=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let Te=0,he=ie.length;Te<he;Te++){let le=ie[Te],Ce=Math.floor(le.start/4),Le=Math.ceil(le.count/4),Fe=Ce%_.width,L=Math.floor(Ce/_.width),se=Le,$=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(s.UNPACK_SKIP_ROWS,L),t.texSubImage2D(s.TEXTURE_2D,0,Fe,L,se,$,U,z,_.data)}R.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,X),t.pixelStorei(s.UNPACK_SKIP_PIXELS,K),t.pixelStorei(s.UNPACK_SKIP_ROWS,oe)}}function Ne(R,_,U){let z=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(z=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(z=s.TEXTURE_3D);let W=Z(R,_),ie=_.source;t.bindTexture(z,R.__webglTexture,s.TEXTURE0+U);let ae=n.get(ie);if(ie.version!==ae.__version||W===!0){if(t.activeTexture(s.TEXTURE0+U),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let $=ze.getPrimaries(ze.workingColorSpace),ce=_.colorSpace===li?null:ze.getPrimaries(_.colorSpace),me=_.colorSpace===li||$===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}t.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let K=p(_.image,!1,i.maxTextureSize);K=Jt(_,K);let oe=r.convert(_.format,_.colorSpace),Te=r.convert(_.type),he=y(_.internalFormat,oe,Te,_.normalized,_.colorSpace,_.isVideoTexture);$e(z,_);let le,Ce=_.mipmaps,Le=_.isVideoTexture!==!0,Fe=ae.__version===void 0||W===!0,L=ie.dataReady,se=T(_,K);if(_.isDepthTexture)he=w(_.format===Ni,_.type),Fe&&(Le?t.texStorage2D(s.TEXTURE_2D,1,he,K.width,K.height):t.texImage2D(s.TEXTURE_2D,0,he,K.width,K.height,0,oe,Te,null));else if(_.isDataTexture)if(Ce.length>0){Le&&Fe&&t.texStorage2D(s.TEXTURE_2D,se,he,Ce[0].width,Ce[0].height);for(let $=0,ce=Ce.length;$<ce;$++)le=Ce[$],Le?L&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,le.width,le.height,oe,Te,le.data):t.texImage2D(s.TEXTURE_2D,$,he,le.width,le.height,0,oe,Te,le.data);_.generateMipmaps=!1}else Le?(Fe&&t.texStorage2D(s.TEXTURE_2D,se,he,K.width,K.height),L&&ee(_,K,oe,Te)):t.texImage2D(s.TEXTURE_2D,0,he,K.width,K.height,0,oe,Te,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Le&&Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,se,he,Ce[0].width,Ce[0].height,K.depth);for(let $=0,ce=Ce.length;$<ce;$++)if(le=Ce[$],_.format!==hn)if(oe!==null)if(Le){if(L)if(_.layerUpdates.size>0){let me=Ph(le.width,le.height,_.format,_.type);for(let j of _.layerUpdates){let we=le.data.subarray(j*me/le.data.BYTES_PER_ELEMENT,(j+1)*me/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,j,le.width,le.height,1,oe,we)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,K.depth,oe,le.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,he,le.width,le.height,K.depth,0,le.data,0,0);else Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?L&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,K.depth,oe,Te,le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,$,he,le.width,le.height,K.depth,0,oe,Te,le.data)}else{Le&&Fe&&t.texStorage2D(s.TEXTURE_2D,se,he,Ce[0].width,Ce[0].height);for(let $=0,ce=Ce.length;$<ce;$++)le=Ce[$],_.format!==hn?oe!==null?Le?L&&t.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(s.TEXTURE_2D,$,he,le.width,le.height,0,le.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?L&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,le.width,le.height,oe,Te,le.data):t.texImage2D(s.TEXTURE_2D,$,he,le.width,le.height,0,oe,Te,le.data)}else if(_.isDataArrayTexture)if(Le){if(Fe&&t.texStorage3D(s.TEXTURE_2D_ARRAY,se,he,K.width,K.height,K.depth),L)if(_.layerUpdates.size>0){let $=Ph(K.width,K.height,_.format,_.type);for(let ce of _.layerUpdates){let me=K.data.subarray(ce*$/K.data.BYTES_PER_ELEMENT,(ce+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ce,K.width,K.height,1,oe,Te,me)}_.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,oe,Te,K.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,he,K.width,K.height,K.depth,0,oe,Te,K.data);else if(_.isData3DTexture)Le?(Fe&&t.texStorage3D(s.TEXTURE_3D,se,he,K.width,K.height,K.depth),L&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,oe,Te,K.data)):t.texImage3D(s.TEXTURE_3D,0,he,K.width,K.height,K.depth,0,oe,Te,K.data);else if(_.isFramebufferTexture){if(Fe)if(Le)t.texStorage2D(s.TEXTURE_2D,se,he,K.width,K.height);else{let $=K.width,ce=K.height;for(let me=0;me<se;me++)t.texImage2D(s.TEXTURE_2D,me,he,$,ce,0,oe,Te,null),$>>=1,ce>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){let $=s.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),u.add(_),$.onpaint=ce=>{let me=ce.changedElements;for(let j of u)me.includes(j.image)&&(j.needsUpdate=!0)},$.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,K);else{let me=s.RGBA,j=s.RGBA,we=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,me,j,we,K)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Le&&Fe){let $=je(Ce[0]);t.texStorage2D(s.TEXTURE_2D,se,he,$.width,$.height)}for(let $=0,ce=Ce.length;$<ce;$++)le=Ce[$],Le?L&&t.texSubImage2D(s.TEXTURE_2D,$,0,0,oe,Te,le):t.texImage2D(s.TEXTURE_2D,$,he,oe,Te,le);_.generateMipmaps=!1}else if(Le){if(Fe){let $=je(K);t.texStorage2D(s.TEXTURE_2D,se,he,$.width,$.height)}L&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,oe,Te,K)}else t.texImage2D(s.TEXTURE_2D,0,he,oe,Te,K);m(_)&&b(z),ae.__version=ie.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Ue(R,_,U){if(_.image.length!==6)return;let z=Z(R,_),W=_.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+U);let ie=n.get(W);if(W.version!==ie.__version||z===!0){t.activeTexture(s.TEXTURE0+U);let ae=ze.getPrimaries(ze.workingColorSpace),X=_.colorSpace===li?null:ze.getPrimaries(_.colorSpace),K=_.colorSpace===li||ae===X?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let oe=_.isCompressedTexture||_.image[0].isCompressedTexture,Te=_.image[0]&&_.image[0].isDataTexture,he=[];for(let j=0;j<6;j++)!oe&&!Te?he[j]=p(_.image[j],!0,i.maxCubemapSize):he[j]=Te?_.image[j].image:_.image[j],he[j]=Jt(_,he[j]);let le=he[0],Ce=r.convert(_.format,_.colorSpace),Le=r.convert(_.type),Fe=y(_.internalFormat,Ce,Le,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,se=ie.__version===void 0||z===!0,$=W.dataReady,ce=T(_,le);$e(s.TEXTURE_CUBE_MAP,_);let me;if(oe){L&&se&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ce,Fe,le.width,le.height);for(let j=0;j<6;j++){me=he[j].mipmaps;for(let we=0;we<me.length;we++){let be=me[we];_.format!==hn?Ce!==null?L?$&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,be.width,be.height,Ce,be.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,Fe,be.width,be.height,0,be.data):Se("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,be.width,be.height,Ce,Le,be.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,Fe,be.width,be.height,0,Ce,Le,be.data)}}}else{if(me=_.mipmaps,L&&se){me.length>0&&ce++;let j=je(he[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ce,Fe,j.width,j.height)}for(let j=0;j<6;j++)if(Te){L?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,he[j].width,he[j].height,Ce,Le,he[j].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,he[j].width,he[j].height,0,Ce,Le,he[j].data);for(let we=0;we<me.length;we++){let gt=me[we].image[j].image;L?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,gt.width,gt.height,Ce,Le,gt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,Fe,gt.width,gt.height,0,Ce,Le,gt.data)}}else{L?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ce,Le,he[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Fe,Ce,Le,he[j]);for(let we=0;we<me.length;we++){let be=me[we];L?$&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,Ce,Le,be.image[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,Fe,Ce,Le,be.image[j])}}}m(_)&&b(s.TEXTURE_CUBE_MAP),ie.__version=W.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Pe(R,_,U,z,W,ie){let ae=r.convert(U.format,U.colorSpace),X=r.convert(U.type),K=y(U.internalFormat,ae,X,U.normalized,U.colorSpace),oe=n.get(_),Te=n.get(U);if(Te.__renderTarget=_,!oe.__hasExternalTextures){let he=Math.max(1,_.width>>ie),le=Math.max(1,_.height>>ie);W===s.TEXTURE_3D||W===s.TEXTURE_2D_ARRAY?t.texImage3D(W,ie,K,he,le,_.depth,0,ae,X,null):t.texImage2D(W,ie,K,he,le,0,ae,X,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),Et(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,z,W,Te.__webglTexture,0,mt(_)):(W===s.TEXTURE_2D||W>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,z,W,Te.__webglTexture,ie),t.bindFramebuffer(s.FRAMEBUFFER,null)}function _t(R,_,U){if(s.bindRenderbuffer(s.RENDERBUFFER,R),_.depthBuffer){let z=_.depthTexture,W=z&&z.isDepthTexture?z.type:null,ie=w(_.stencilBuffer,W),ae=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Et(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,mt(_),ie,_.width,_.height):U?s.renderbufferStorageMultisample(s.RENDERBUFFER,mt(_),ie,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,ie,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ae,s.RENDERBUFFER,R)}else{let z=_.textures;for(let W=0;W<z.length;W++){let ie=z[W],ae=r.convert(ie.format,ie.colorSpace),X=r.convert(ie.type),K=y(ie.internalFormat,ae,X,ie.normalized,ie.colorSpace);Et(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,mt(_),K,_.width,_.height):U?s.renderbufferStorageMultisample(s.RENDERBUFFER,mt(_),K,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,K,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ge(R,_,U){let z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W=n.get(_.depthTexture);if(W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),z){if(W.__webglInit===void 0&&(W.__webglInit=!0,_.depthTexture.addEventListener("dispose",E)),W.__webglTexture===void 0){W.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture),$e(s.TEXTURE_CUBE_MAP,_.depthTexture);let oe=r.convert(_.depthTexture.format),Te=r.convert(_.depthTexture.type),he;_.depthTexture.format===Dn?he=s.DEPTH_COMPONENT24:_.depthTexture.format===Ni&&(he=s.DEPTH24_STENCIL8);for(let le=0;le<6;le++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,he,_.width,_.height,0,oe,Te,null)}}else J(_.depthTexture,0);let ie=W.__webglTexture,ae=mt(_),X=z?s.TEXTURE_CUBE_MAP_POSITIVE_X+U:s.TEXTURE_2D,K=_.depthTexture.format===Ni?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===Dn)Et(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,X,ie,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,K,X,ie,0);else if(_.depthTexture.format===Ni)Et(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,X,ie,0,ae):s.framebufferTexture2D(s.FRAMEBUFFER,K,X,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(R){let _=n.get(R),U=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){let z=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),z){let W=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,z.removeEventListener("dispose",W)};z.addEventListener("dispose",W),_.__depthDisposeCallback=W}_.__boundDepthTexture=z}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(U)for(let z=0;z<6;z++)Ge(_.__webglFramebuffer[z],R,z);else{let z=R.texture.mipmaps;z&&z.length>0?Ge(_.__webglFramebuffer[0],R,0):Ge(_.__webglFramebuffer,R,0)}else if(U){_.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[z]),_.__webglDepthbuffer[z]===void 0)_.__webglDepthbuffer[z]=s.createRenderbuffer(),_t(_.__webglDepthbuffer[z],R,!1);else{let W=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer[z];s.bindRenderbuffer(s.RENDERBUFFER,ie),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,ie)}}else{let z=R.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),_t(_.__webglDepthbuffer,R,!1);else{let W=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ie=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ie),s.framebufferRenderbuffer(s.FRAMEBUFFER,W,s.RENDERBUFFER,ie)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ke(R,_,U){let z=n.get(R);_!==void 0&&Pe(z.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),U!==void 0&&it(R)}function We(R){let _=R.texture,U=n.get(R),z=n.get(_);R.addEventListener("dispose",v);let W=R.textures,ie=R.isWebGLCubeRenderTarget===!0,ae=W.length>1;if(ae||(z.__webglTexture===void 0&&(z.__webglTexture=s.createTexture()),z.__version=_.version,a.memory.textures++),ie){U.__webglFramebuffer=[];for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[X]=[];for(let K=0;K<_.mipmaps.length;K++)U.__webglFramebuffer[X][K]=s.createFramebuffer()}else U.__webglFramebuffer[X]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let X=0;X<_.mipmaps.length;X++)U.__webglFramebuffer[X]=s.createFramebuffer()}else U.__webglFramebuffer=s.createFramebuffer();if(ae)for(let X=0,K=W.length;X<K;X++){let oe=n.get(W[X]);oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&Et(R)===!1){U.__webglMultisampledFramebuffer=s.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let X=0;X<W.length;X++){let K=W[X];U.__webglColorRenderbuffer[X]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,U.__webglColorRenderbuffer[X]);let oe=r.convert(K.format,K.colorSpace),Te=r.convert(K.type),he=y(K.internalFormat,oe,Te,K.normalized,K.colorSpace,R.isXRRenderTarget===!0),le=mt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,le,he,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+X,s.RENDERBUFFER,U.__webglColorRenderbuffer[X])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(U.__webglDepthRenderbuffer=s.createRenderbuffer(),_t(U.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture),$e(s.TEXTURE_CUBE_MAP,_);for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Pe(U.__webglFramebuffer[X][K],R,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+X,K);else Pe(U.__webglFramebuffer[X],R,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);m(_)&&b(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let X=0,K=W.length;X<K;X++){let oe=W[X],Te=n.get(oe),he=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(he=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,Te.__webglTexture),$e(he,oe),Pe(U.__webglFramebuffer,R,oe,s.COLOR_ATTACHMENT0+X,he,0),m(oe)&&b(he)}t.unbindTexture()}else{let X=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(X=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(X,z.__webglTexture),$e(X,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Pe(U.__webglFramebuffer[K],R,_,s.COLOR_ATTACHMENT0,X,K);else Pe(U.__webglFramebuffer,R,_,s.COLOR_ATTACHMENT0,X,0);m(_)&&b(X),t.unbindTexture()}R.depthBuffer&&it(R)}function At(R){let _=R.textures;for(let U=0,z=_.length;U<z;U++){let W=_[U];if(m(W)){let ie=M(R),ae=n.get(W).__webglTexture;t.bindTexture(ie,ae),b(ie),t.unbindTexture()}}}let Ct=[],Dt=[];function Bt(R){if(R.samples>0){if(Et(R)===!1){let _=R.textures,U=R.width,z=R.height,W=s.COLOR_BUFFER_BIT,ie=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ae=n.get(R),X=_.length>1;if(X)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+oe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+oe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);let K=R.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(W|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(W|=s.STENCIL_BUFFER_BIT)),X){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);let Te=n.get(_[oe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Te,0)}s.blitFramebuffer(0,0,U,z,0,0,U,z,W,s.NEAREST),l===!0&&(Ct.length=0,Dt.length=0,Ct.push(s.COLOR_ATTACHMENT0+oe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ct.push(ie),Dt.push(ie),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Dt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ct))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),X)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+oe,s.RENDERBUFFER,ae.__webglColorRenderbuffer[oe]);let Te=n.get(_[oe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+oe,s.TEXTURE_2D,Te,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let _=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function mt(R){return Math.min(i.maxSamples,R.samples)}function Et(R){let _=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(R){let _=a.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function Jt(R,_){let U=R.colorSpace,z=R.format,W=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||U!==$t&&U!==li&&(ze.getTransfer(U)===Je?(z!==hn||W!==tn)&&Se("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ie("WebGLTextures: Unsupported texture color space:",U)),_}function je(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=q,this.getTextureUnits=Y,this.setTextureUnits=k,this.setTexture2D=J,this.setTexture2DArray=Q,this.setTexture3D=de,this.setTextureCube=ge,this.rebindTextures=Ke,this.setupRenderTarget=We,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Q_(s,e){function t(n,i=li){let r,a=ze.getTransfer(i);if(n===tn)return s.UNSIGNED_BYTE;if(n===Xo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===qo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===_h)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===yh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===xh)return s.BYTE;if(n===vh)return s.SHORT;if(n===Js)return s.UNSIGNED_SHORT;if(n===Wo)return s.INT;if(n===An)return s.UNSIGNED_INT;if(n===cn)return s.FLOAT;if(n===Vn)return s.HALF_FLOAT;if(n===bh)return s.ALPHA;if(n===Mh)return s.RGB;if(n===hn)return s.RGBA;if(n===Dn)return s.DEPTH_COMPONENT;if(n===Ni)return s.DEPTH_STENCIL;if(n===Yo)return s.RED;if(n===$o)return s.RED_INTEGER;if(n===Di)return s.RG;if(n===Ko)return s.RG_INTEGER;if(n===Zo)return s.RGBA_INTEGER;if(n===ra||n===aa||n===oa||n===la)if(a===Je)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jo||n===jo||n===Qo||n===el)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tl||n===nl||n===il||n===sl||n===rl||n===ca||n===al)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===tl||n===nl)return a===Je?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===il)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===sl)return r.COMPRESSED_R11_EAC;if(n===rl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ca)return r.COMPRESSED_RG11_EAC;if(n===al)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===xl||n===vl||n===_l||n===yl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ol)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ll)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ul)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ml)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_l)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yl)return a===Je?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bl||n===Ml||n===Sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===bl)return a===Je?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wl||n===Tl||n===ha||n===Al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===wl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===js?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var ey=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ty=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Gr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ln({vertexShader:ey,fragmentShader:ty,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qe(new qr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qh=class extends Un{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",p=new Xh,m={},b=t.getContextAttributes(),M=null,y=null,w=[],T=[],E=new xe,v=null,A=new vt;A.viewport=new et;let I=new vt;I.viewport=new et;let P=[A,I],F=new ko,q=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let re=w[Z];return re===void 0&&(re=new zs,w[Z]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Z){let re=w[Z];return re===void 0&&(re=new zs,w[Z]=re),re.getGripSpace()},this.getHand=function(Z){let re=w[Z];return re===void 0&&(re=new zs,w[Z]=re),re.getHandSpace()};function k(Z){let re=T.indexOf(Z.inputSource);if(re===-1)return;let ee=w[re];ee!==void 0&&(ee.update(Z.inputSource,Z.frame,c||a),ee.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",H);for(let Z=0;Z<w.length;Z++){let re=T[Z];re!==null&&(T[Z]=null,w[Z].disconnect(re))}q=null,Y=null,p.reset();for(let Z in m)delete m[Z];e.setRenderTarget(M),f=null,d=null,u=null,i=null,y=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Se("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Se("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",G),i.addEventListener("inputsourceschange",H),b.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ne=null,Ue=null;b.depth&&(Ue=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=b.stencil?Ni:Dn,Ne=b.stencil?js:An);let Pe={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Pe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new an(d.textureWidth,d.textureHeight,{format:hn,type:tn,depthTexture:new ti(d.textureWidth,d.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ee={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new an(f.framebufferWidth,f.framebufferHeight,{format:hn,type:tn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),$e.setContext(i),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function H(Z){for(let re=0;re<Z.removed.length;re++){let ee=Z.removed[re],Ne=T.indexOf(ee);Ne>=0&&(T[Ne]=null,w[Ne].disconnect(ee))}for(let re=0;re<Z.added.length;re++){let ee=Z.added[re],Ne=T.indexOf(ee);if(Ne===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=T.length){T.push(ee),Ne=Pe;break}else if(T[Pe]===null){T[Pe]=ee,Ne=Pe;break}if(Ne===-1)break}let Ue=w[Ne];Ue&&Ue.connect(ee)}}let J=new C,Q=new C;function de(Z,re,ee){J.setFromMatrixPosition(re.matrixWorld),Q.setFromMatrixPosition(ee.matrixWorld);let Ne=J.distanceTo(Q),Ue=re.projectionMatrix.elements,Pe=ee.projectionMatrix.elements,_t=Ue[14]/(Ue[10]-1),Ge=Ue[14]/(Ue[10]+1),it=(Ue[9]+1)/Ue[5],Ke=(Ue[9]-1)/Ue[5],We=(Ue[8]-1)/Ue[0],At=(Pe[8]+1)/Pe[0],Ct=_t*We,Dt=_t*At,Bt=Ne/(-We+At),mt=Bt*-We;if(re.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(mt),Z.translateZ(Bt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ue[10]===-1)Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let Et=_t+Bt,N=Ge+Bt,Jt=Ct-mt,je=Dt+(Ne-mt),R=it*Ge/N*Et,_=Ke*Ge/N*Et;Z.projectionMatrix.makePerspective(Jt,je,R,_,Et,N),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ge(Z,re){re===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(re.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let re=Z.near,ee=Z.far;p.texture!==null&&(p.depthNear>0&&(re=p.depthNear),p.depthFar>0&&(ee=p.depthFar)),F.near=I.near=A.near=re,F.far=I.far=A.far=ee,(q!==F.near||Y!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),q=F.near,Y=F.far),F.layers.mask=Z.layers.mask|6,A.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;let Ne=Z.parent,Ue=F.cameras;ge(F,Ne);for(let Pe=0;Pe<Ue.length;Pe++)ge(Ue[Pe],Ne);Ue.length===2?de(F,A,I):F.projectionMatrix.copy(A.projectionMatrix),ye(Z,F,Ne)};function ye(Z,re,ee){ee===null?Z.matrix.copy(re.matrixWorld):(Z.matrix.copy(ee.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(re.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ji*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Z){return m[Z]};let Ye=null;function pt(Z,re){if(h=re.getViewerPose(c||a),g=re,h!==null){let ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ne=!1;ee.length!==F.cameras.length&&(F.cameras.length=0,Ne=!0);for(let Ge=0;Ge<ee.length;Ge++){let it=ee[Ge],Ke=null;if(f!==null)Ke=f.getViewport(it);else{let At=u.getViewSubImage(d,it);Ke=At.viewport,Ge===0&&(e.setRenderTargetTextures(y,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(y))}let We=P[Ge];We===void 0&&(We=new vt,We.layers.enable(Ge),We.viewport=new et,P[Ge]=We),We.matrix.fromArray(it.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(it.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Ge===0&&(F.matrix.copy(We.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ne===!0&&F.cameras.push(We)}let Ue=i.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let Ge=u.getDepthInformation(ee[0]);Ge&&Ge.isValid&&Ge.texture&&p.init(Ge,i.renderState)}if(Ue&&Ue.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let Ge=0;Ge<ee.length;Ge++){let it=ee[Ge].camera;if(it){let Ke=m[it];Ke||(Ke=new Gr,m[it]=Ke);let We=u.getCameraImage(it);Ke.sourceTexture=We}}}}for(let ee=0;ee<w.length;ee++){let Ne=T[ee],Ue=w[ee];Ne!==null&&Ue!==void 0&&Ue.update(Ne,re,c||a)}Ye&&Ye(Z,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}let $e=new tp;$e.setAnimationLoop(pt),this.setAnimationLoop=function(Z){Ye=Z},this.dispose=function(){}}},ny=new Ee,op=new De;op.set(-1,0,0,0,1,0,0,0,1);function iy(s,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Rh(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,b,M,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,b,M):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===kt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===kt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let b=e.get(m),M=b.envMap,y=b.envMapRotation;M&&(p.envMap.value=M,p.envMapRotation.value.setFromMatrix4(ny.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(op),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,b,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*b,p.scale.value=M*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,b){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===kt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let b=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sy(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){let T=w.program;n.uniformBlockBinding(y,T)}function c(y,w){let T=i[y.id];T===void 0&&(p(y),T=h(y),i[y.id]=T,y.addEventListener("dispose",b));let E=w.program;n.updateUBOMapping(y,E);let v=e.render.frame;r[y.id]!==v&&(d(y),r[y.id]=v)}function h(y){let w=u();y.__bindingPointIndex=w;let T=s.createBuffer(),E=y.__size,v=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,E,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,w,T),T}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ie("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let w=i[y.id],T=y.uniforms,E=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,w);for(let v=0,A=T.length;v<A;v++){let I=T[v];if(Array.isArray(I))for(let P=0,F=I.length;P<F;P++)f(I[P],v,P,E);else f(I,v,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,w,T,E){if(x(y,w,T,E)===!0){let v=y.__offset,A=y.value;if(Array.isArray(A)){let I=0;for(let P=0;P<A.length;P++){let F=A[P],q=m(F);g(F,y.__data,I),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(I+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,y.__data)}}function g(y,w,T){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,T)}function x(y,w,T,E){let v=y.value,A=w+"_"+T;if(E[A]===void 0)return typeof v=="number"||typeof v=="boolean"?E[A]=v:ArrayBuffer.isView(v)?E[A]=v.slice():E[A]=v.clone(),!0;{let I=E[A];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return E[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function p(y){let w=y.uniforms,T=0,E=16;for(let A=0,I=w.length;A<I;A++){let P=Array.isArray(w[A])?w[A]:[w[A]];for(let F=0,q=P.length;F<q;F++){let Y=P[F],k=Array.isArray(Y.value)?Y.value:[Y.value];for(let G=0,H=k.length;G<H;G++){let J=k[G],Q=m(J),de=T%E,ge=de%Q.boundary,ye=de+ge;T+=ge,ye!==0&&E-ye<Q.storage&&(T+=E-ye),Y.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=T,T+=Q.storage}}}let v=T%E;return v>0&&(T+=E-v),y.__size=T,y.__cache={},this}function m(y){let w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Se("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Se("WebGLRenderer: Unsupported uniform value type.",y),w}function b(y){let w=y.target;w.removeEventListener("dispose",b);let T=a.indexOf(w.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function M(){for(let y in i)s.deleteBuffer(i[y]);a=[],i={},r={}}return{bind:l,update:c,dispose:M}}var ry=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function ay(){return Hn===null&&(Hn=new Gs(ry,16,16,Di,Vn),Hn.name="DFG_LUT",Hn.minFilter=wt,Hn.magFilter=wt,Hn.wrapS=pn,Hn.wrapT=pn,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var Ll=class{constructor(e={}){let{canvas:t=Tf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=tn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let x=f,p=new Set([Zo,Ko,$o]),m=new Set([tn,An,Js,js,Xo,qo]),b=new Uint32Array(4),M=new Int32Array(4),y=new C,w=null,T=null,E=[],v=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,P=!1,F=null,q=null,Y=null,k=null;this._outputColorSpace=Mt;let G=0,H=0,J=null,Q=-1,de=null,ge=new et,ye=new et,Ye=null,pt=new te(0),$e=0,Z=t.width,re=t.height,ee=1,Ne=null,Ue=null,Pe=new et(0,0,Z,re),_t=new et(0,0,Z,re),Ge=!1,it=new Ws,Ke=!1,We=!1,At=new Ee,Ct=new C,Dt=new et,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},mt=!1;function Et(){return J===null?ee:1}let N=n;function Jt(S,D){return t.getContext(S,D)}try{let S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",Rn,!1),N===null){let D="webgl2";if(N=Jt(D,S),N===null)throw Jt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw Ie("WebGLRenderer: "+S.message),S}let je,R,_,U,z,W,ie,ae,X,K,oe,Te,he,le,Ce,Le,Fe,L,se,$,ce,me,j;function we(){je=new fv(N),je.init(),ce=new Q_(N,je),R=new rv(N,je,e,ce),_=new J_(N,je),R.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),q=N.createFramebuffer(),Y=N.createFramebuffer(),k=N.createFramebuffer(),U=new gv(N),z=new O_,W=new j_(N,je,_,z,R,ce,U),ie=new dv(I),ae=new yg(N),me=new iv(N,ae),X=new pv(N,ae,U,me),K=new vv(N,X,ae,me,U),L=new xv(N,R,W),Ce=new av(z),oe=new F_(I,ie,je,R,me,Ce),Te=new iy(I,z),he=new k_,le=new X_(je),Fe=new nv(I,ie,_,K,g,l),Le=new Z_(I,K,R),j=new sy(N,U,R,_),se=new sv(N,je,U),$=new mv(N,je,U),U.programs=oe.programs,I.capabilities=R,I.extensions=je,I.properties=z,I.renderLists=he,I.shadowMap=Le,I.state=_,I.info=U}we(),x!==tn&&(A=new yv(x,t.width,t.height,o,i,r));let be=new qh(I,N);this.xr=be,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let S=je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(S){S!==void 0&&(ee=S,this.setSize(Z,re,!1))},this.getSize=function(S){return S.set(Z,re)},this.setSize=function(S,D,V=!0){if(be.isPresenting){Se("WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,re=D,t.width=Math.floor(S*ee),t.height=Math.floor(D*ee),V===!0&&(t.style.width=S+"px",t.style.height=D+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(Z*ee,re*ee).floor()},this.setDrawingBufferSize=function(S,D,V){Z=S,re=D,ee=V,t.width=Math.floor(S*V),t.height=Math.floor(D*V),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(x===tn){Ie("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Se("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ge)},this.getViewport=function(S){return S.copy(Pe)},this.setViewport=function(S,D,V,O){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,D,V,O),_.viewport(ge.copy(Pe).multiplyScalar(ee).round())},this.getScissor=function(S){return S.copy(_t)},this.setScissor=function(S,D,V,O){S.isVector4?_t.set(S.x,S.y,S.z,S.w):_t.set(S,D,V,O),_.scissor(ye.copy(_t).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(S){_.setScissorTest(Ge=S)},this.setOpaqueSort=function(S){Ne=S},this.setTransparentSort=function(S){Ue=S},this.getClearColor=function(S){return S.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,V=!0){let O=0;if(S){let B=!1;if(J!==null){let pe=J.texture.format;B=p.has(pe)}if(B){let pe=J.texture.type,_e=m.has(pe),fe=Fe.getClearColor(),Me=Fe.getClearAlpha(),Ae=fe.r,Oe=fe.g,ke=fe.b;_e?(b[0]=Ae,b[1]=Oe,b[2]=ke,b[3]=Me,N.clearBufferuiv(N.COLOR,0,b)):(M[0]=Ae,M[1]=Oe,M[2]=ke,M[3]=Me,N.clearBufferiv(N.COLOR,0,M))}else O|=N.COLOR_BUFFER_BIT}D&&(O|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(O|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&N.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),F=S},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",Rn,!1),Fe.dispose(),he.dispose(),le.dispose(),z.dispose(),ie.dispose(),K.dispose(),me.dispose(),j.dispose(),oe.dispose(),be.dispose(),be.removeEventListener("sessionstart",Ou),be.removeEventListener("sessionend",Bu),zi.stop()};function gt(S){S.preventDefault(),Pr("WebGLRenderer: Context Lost."),P=!0}function ct(){Pr("WebGLRenderer: Context Restored."),P=!1;let S=U.autoReset,D=Le.enabled,V=Le.autoUpdate,O=Le.needsUpdate,B=Le.type;we(),U.autoReset=S,Le.enabled=D,Le.autoUpdate=V,Le.needsUpdate=O,Le.type=B}function Rn(S){Ie("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Cn(S){let D=S.target;D.removeEventListener("dispose",Cn),tm(D)}function tm(S){nm(S),z.remove(S)}function nm(S){let D=z.get(S).programs;D!==void 0&&(D.forEach(function(V){oe.releaseProgram(V)}),S.isShaderMaterial&&oe.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,V,O,B,pe){D===null&&(D=Bt);let _e=B.isMesh&&B.matrixWorld.determinantAffine()<0,fe=rm(S,D,V,O,B);_.setMaterial(O,_e);let Me=V.index,Ae=1;if(O.wireframe===!0){if(Me=X.getWireframeAttribute(V),Me===void 0)return;Ae=2}let Oe=V.drawRange,ke=V.attributes.position,Re=Oe.start*Ae,nt=(Oe.start+Oe.count)*Ae;pe!==null&&(Re=Math.max(Re,pe.start*Ae),nt=Math.min(nt,(pe.start+pe.count)*Ae)),Me!==null?(Re=Math.max(Re,0),nt=Math.min(nt,Me.count)):ke!=null&&(Re=Math.max(Re,0),nt=Math.min(nt,ke.count));let yt=nt-Re;if(yt<0||yt===1/0)return;me.setup(B,O,fe,V,Me);let xt,st=se;if(Me!==null&&(xt=ae.get(Me),st=$,st.setIndex(xt)),B.isMesh)O.wireframe===!0?(_.setLineWidth(O.wireframeLinewidth*Et()),st.setMode(N.LINES)):st.setMode(N.TRIANGLES);else if(B.isLine){let Vt=O.linewidth;Vt===void 0&&(Vt=1),_.setLineWidth(Vt*Et()),B.isLineSegments?st.setMode(N.LINES):B.isLineLoop?st.setMode(N.LINE_LOOP):st.setMode(N.LINE_STRIP)}else B.isPoints?st.setMode(N.POINTS):B.isSprite&&st.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(je.get("WEBGL_multi_draw"))st.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Vt=B._multiDrawStarts,ve=B._multiDrawCounts,nn=B._multiDrawCount,Xe=Me?ae.get(Me).bytesPerElement:1,un=z.get(O).currentProgram.getUniforms();for(let In=0;In<nn;In++)un.setValue(N,"_gl_DrawID",In),st.render(Vt[In]/Xe,ve[In])}else if(B.isInstancedMesh)st.renderInstances(Re,yt,B.count);else if(V.isInstancedBufferGeometry){let Vt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ve=Math.min(V.instanceCount,Vt);st.renderInstances(Re,yt,ve)}else st.render(Re,yt)};function Fu(S,D,V){S.transparent===!0&&S.side===Ot&&S.forceSinglePass===!1?(S.side=kt,S.needsUpdate=!0,Ta(S,D,V),S.side=Sn,S.needsUpdate=!0,Ta(S,D,V),S.side=Ot):Ta(S,D,V)}this.compile=function(S,D,V=null){V===null&&(V=S),T=le.get(V),T.init(D),v.push(T),V.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),S!==V&&S.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),T.setupLights();let O=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let pe=B.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){let fe=pe[_e];Fu(fe,V,B),O.add(fe)}else Fu(pe,V,B),O.add(pe)}),T=v.pop(),O},this.compileAsync=function(S,D,V=null){let O=this.compile(S,D,V);return new Promise(B=>{function pe(){if(O.forEach(function(_e){z.get(_e).currentProgram.isReady()&&O.delete(_e)}),O.size===0){B(S);return}setTimeout(pe,10)}je.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let cc=null;function im(S){cc&&cc(S)}function Ou(){zi.stop()}function Bu(){zi.start()}let zi=new tp;zi.setAnimationLoop(im),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(S){cc=S,be.setAnimationLoop(S),S===null?zi.stop():zi.start()},be.addEventListener("sessionstart",Ou),be.addEventListener("sessionend",Bu),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){Ie("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(S,D);let V=be.enabled===!0&&be.isPresenting===!0,O=A!==null&&(J===null||V)&&A.begin(I,J);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(be.cameraAutoUpdate===!0&&be.updateCamera(D),D=be.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,D,J),T=le.get(S,v.length),T.init(D),T.state.textureUnits=W.getTextureUnits(),v.push(T),At.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),it.setFromProjectionMatrix(At,bn,D.reversedDepth),We=this.localClippingEnabled,Ke=Ce.init(this.clippingPlanes,We),w=he.get(S,E.length),w.init(),E.push(w),be.enabled===!0&&be.isPresenting===!0){let _e=I.xr.getDepthSensingMesh();_e!==null&&hc(_e,D,-1/0,I.sortObjects)}hc(S,D,0,I.sortObjects),w.finish(),I.sortObjects===!0&&w.sort(Ne,Ue,D.reversedDepth),mt=be.enabled===!1||be.isPresenting===!1||be.hasDepthSensing()===!1,mt&&Fe.addToRenderList(w,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ke===!0&&Ce.beginShadows();let B=T.state.shadowsArray;if(Le.render(B,S,D),Ke===!0&&Ce.endShadows(),(O&&A.hasRenderPass())===!1){let _e=w.opaque,fe=w.transmissive;if(T.setupLights(),D.isArrayCamera){let Me=D.cameras;if(fe.length>0)for(let Ae=0,Oe=Me.length;Ae<Oe;Ae++){let ke=Me[Ae];zu(_e,fe,S,ke)}mt&&Fe.render(S);for(let Ae=0,Oe=Me.length;Ae<Oe;Ae++){let ke=Me[Ae];ku(w,S,ke,ke.viewport)}}else fe.length>0&&zu(_e,fe,S,D),mt&&Fe.render(S),ku(w,S,D)}J!==null&&H===0&&(W.updateMultisampleRenderTarget(J),W.updateRenderTargetMipmap(J)),O&&A.end(I),S.isScene===!0&&S.onAfterRender(I,S,D),me.resetDefaultState(),Q=-1,de=null,v.pop(),v.length>0?(T=v[v.length-1],W.setTextureUnits(T.state.textureUnits),Ke===!0&&Ce.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,E.pop(),E.length>0?w=E[E.length-1]:w=null,F!==null&&F.renderEnd()};function hc(S,D,V,O){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLightProbeGrid)T.pushLightProbeGrid(S);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||it.intersectsSprite(S)){O&&Dt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(At);let _e=K.update(S),fe=S.material;fe.visible&&w.push(S,_e,fe,V,Dt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||it.intersectsObject(S))){let _e=K.update(S),fe=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Dt.copy(S.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Dt.copy(_e.boundingSphere.center)),Dt.applyMatrix4(S.matrixWorld).applyMatrix4(At)),Array.isArray(fe)){let Me=_e.groups;for(let Ae=0,Oe=Me.length;Ae<Oe;Ae++){let ke=Me[Ae],Re=fe[ke.materialIndex];Re&&Re.visible&&w.push(S,_e,Re,V,Dt.z,ke)}}else fe.visible&&w.push(S,_e,fe,V,Dt.z,null)}}let pe=S.children;for(let _e=0,fe=pe.length;_e<fe;_e++)hc(pe[_e],D,V,O)}function ku(S,D,V,O){let{opaque:B,transmissive:pe,transparent:_e}=S;T.setupLightsView(V),Ke===!0&&Ce.setGlobalState(I.clippingPlanes,V),O&&_.viewport(ge.copy(O)),B.length>0&&wa(B,D,V),pe.length>0&&wa(pe,D,V),_e.length>0&&wa(_e,D,V),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function zu(S,D,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[O.id]===void 0){let Re=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[O.id]=new an(1,1,{generateMipmaps:!0,type:Re?Vn:tn,minFilter:Tn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace})}let pe=T.state.transmissionRenderTarget[O.id],_e=O.viewport||ge;pe.setSize(_e.z*I.transmissionResolutionScale,_e.w*I.transmissionResolutionScale);let fe=I.getRenderTarget(),Me=I.getActiveCubeFace(),Ae=I.getActiveMipmapLevel();I.setRenderTarget(pe),I.getClearColor(pt),$e=I.getClearAlpha(),$e<1&&I.setClearColor(16777215,.5),I.clear(),mt&&Fe.render(V);let Oe=I.toneMapping;I.toneMapping=wn;let ke=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),T.setupLightsView(O),Ke===!0&&Ce.setGlobalState(I.clippingPlanes,O),wa(S,V,O),W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe),je.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let nt=0,yt=D.length;nt<yt;nt++){let xt=D[nt],{object:st,geometry:Vt,material:ve,group:nn}=xt;if(ve.side===Ot&&st.layers.test(O.layers)){let Xe=ve.side;ve.side=kt,ve.needsUpdate=!0,Vu(st,V,O,Vt,ve,nn),ve.side=Xe,ve.needsUpdate=!0,Re=!0}}Re===!0&&(W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe))}I.setRenderTarget(fe,Me,Ae),I.setClearColor(pt,$e),ke!==void 0&&(O.viewport=ke),I.toneMapping=Oe}function wa(S,D,V){let O=D.isScene===!0?D.overrideMaterial:null;for(let B=0,pe=S.length;B<pe;B++){let _e=S[B],{object:fe,geometry:Me,group:Ae}=_e,Oe=_e.material;Oe.allowOverride===!0&&O!==null&&(Oe=O),fe.layers.test(V.layers)&&Vu(fe,D,V,Me,Oe,Ae)}}function Vu(S,D,V,O,B,pe){S.onBeforeRender(I,D,V,O,B,pe),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(I,D,V,O,S,pe),B.transparent===!0&&B.side===Ot&&B.forceSinglePass===!1?(B.side=kt,B.needsUpdate=!0,I.renderBufferDirect(V,D,O,B,S,pe),B.side=Sn,B.needsUpdate=!0,I.renderBufferDirect(V,D,O,B,S,pe),B.side=Ot):I.renderBufferDirect(V,D,O,B,S,pe),S.onAfterRender(I,D,V,O,B,pe)}function Ta(S,D,V){D.isScene!==!0&&(D=Bt);let O=z.get(S),B=T.state.lights,pe=T.state.shadowsArray,_e=B.state.version,fe=oe.getParameters(S,B.state,pe,D,V,T.state.lightProbeGridArray),Me=oe.getProgramCacheKey(fe),Ae=O.programs;O.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;let Oe=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;O.envMap=ie.get(S.envMap||O.environment,Oe),O.envMapRotation=O.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Ae===void 0&&(S.addEventListener("dispose",Cn),Ae=new Map,O.programs=Ae);let ke=Ae.get(Me);if(ke!==void 0){if(O.currentProgram===ke&&O.lightsStateVersion===_e)return Gu(S,fe),ke}else fe.uniforms=oe.getUniforms(S),F!==null&&S.isNodeMaterial&&F.build(S,V,fe),S.onBeforeCompile(fe,I),ke=oe.acquireProgram(fe,Me),Ae.set(Me,ke),O.uniforms=fe.uniforms;let Re=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=Ce.uniform),Gu(S,fe),O.needsLights=om(S),O.lightsStateVersion=_e,O.needsLights&&(Re.ambientLightColor.value=B.state.ambient,Re.lightProbe.value=B.state.probe,Re.directionalLights.value=B.state.directional,Re.directionalLightShadows.value=B.state.directionalShadow,Re.spotLights.value=B.state.spot,Re.spotLightShadows.value=B.state.spotShadow,Re.rectAreaLights.value=B.state.rectArea,Re.ltc_1.value=B.state.rectAreaLTC1,Re.ltc_2.value=B.state.rectAreaLTC2,Re.pointLights.value=B.state.point,Re.pointLightShadows.value=B.state.pointShadow,Re.hemisphereLights.value=B.state.hemi,Re.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Re.spotLightMatrix.value=B.state.spotLightMatrix,Re.spotLightMap.value=B.state.spotLightMap,Re.pointShadowMatrix.value=B.state.pointShadowMatrix),O.lightProbeGrid=T.state.lightProbeGridArray.length>0,O.currentProgram=ke,O.uniformsList=null,ke}function Hu(S){if(S.uniformsList===null){let D=S.currentProgram.getUniforms();S.uniformsList=tr.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Gu(S,D){let V=z.get(S);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function sm(S,D){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(D.matrixWorld);for(let V=0,O=S.length;V<O;V++){let B=S[V];if(B.texture!==null&&B.boundingBox.containsPoint(y))return B}return null}function rm(S,D,V,O,B){D.isScene!==!0&&(D=Bt),W.resetTextureUnits();let pe=D.fog,_e=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,fe=J===null?I.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ze.workingColorSpace,Me=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ae=ie.get(O.envMap||_e,Me),Oe=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ke=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Re=!!V.morphAttributes.position,nt=!!V.morphAttributes.normal,yt=!!V.morphAttributes.color,xt=wn;O.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(xt=I.toneMapping);let st=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Vt=st!==void 0?st.length:0,ve=z.get(O),nn=T.state.lights;if(Ke===!0&&(We===!0||S!==de)){let ht=S===de&&O.id===Q;Ce.setState(O,S,ht)}let Xe=!1;O.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==nn.state.version||ve.outputColorSpace!==fe||B.isBatchedMesh&&ve.batching===!1||!B.isBatchedMesh&&ve.batching===!0||B.isBatchedMesh&&ve.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ve.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ve.instancing===!1||!B.isInstancedMesh&&ve.instancing===!0||B.isSkinnedMesh&&ve.skinning===!1||!B.isSkinnedMesh&&ve.skinning===!0||B.isInstancedMesh&&ve.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ve.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ve.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ve.instancingMorph===!1&&B.morphTexture!==null||ve.envMap!==Ae||O.fog===!0&&ve.fog!==pe||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Ce.numPlanes||ve.numIntersection!==Ce.numIntersection)||ve.vertexAlphas!==Oe||ve.vertexTangents!==ke||ve.morphTargets!==Re||ve.morphNormals!==nt||ve.morphColors!==yt||ve.toneMapping!==xt||ve.morphTargetsCount!==Vt||!!ve.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Xe=!0):(Xe=!0,ve.__version=O.version);let un=ve.currentProgram;Xe===!0&&(un=Ta(O,D,B),F&&O.isNodeMaterial&&F.onUpdateProgram(O,un,ve));let In=!1,di=!1,fs=!1,rt=un.getUniforms(),bt=ve.uniforms;if(_.useProgram(un.program)&&(In=!0,di=!0,fs=!0),O.id!==Q&&(Q=O.id,di=!0),ve.needsLights){let ht=sm(T.state.lightProbeGridArray,B);ve.lightProbeGrid!==ht&&(ve.lightProbeGrid=ht,di=!0)}if(In||de!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),rt.setValue(N,"projectionMatrix",S.projectionMatrix),rt.setValue(N,"viewMatrix",S.matrixWorldInverse);let pi=rt.map.cameraPosition;pi!==void 0&&pi.setValue(N,Ct.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&rt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&rt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),de!==S&&(de=S,di=!0,fs=!0)}if(ve.needsLights&&(nn.state.directionalShadowMap.length>0&&rt.setValue(N,"directionalShadowMap",nn.state.directionalShadowMap,W),nn.state.spotShadowMap.length>0&&rt.setValue(N,"spotShadowMap",nn.state.spotShadowMap,W),nn.state.pointShadowMap.length>0&&rt.setValue(N,"pointShadowMap",nn.state.pointShadowMap,W)),B.isSkinnedMesh){rt.setOptional(N,B,"bindMatrix"),rt.setOptional(N,B,"bindMatrixInverse");let ht=B.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),rt.setValue(N,"boneTexture",ht.boneTexture,W))}B.isBatchedMesh&&(rt.setOptional(N,B,"batchingTexture"),rt.setValue(N,"batchingTexture",B._matricesTexture,W),rt.setOptional(N,B,"batchingIdTexture"),rt.setValue(N,"batchingIdTexture",B._indirectTexture,W),rt.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&rt.setValue(N,"batchingColorTexture",B._colorsTexture,W));let fi=V.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&L.update(B,V,un),(di||ve.receiveShadow!==B.receiveShadow)&&(ve.receiveShadow=B.receiveShadow,rt.setValue(N,"receiveShadow",B.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(bt.envMapIntensity.value=D.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=ay()),di){if(rt.setValue(N,"toneMappingExposure",I.toneMappingExposure),ve.needsLights&&am(bt,fs),pe&&O.fog===!0&&Te.refreshFogUniforms(bt,pe),Te.refreshMaterialUniforms(bt,O,ee,re,T.state.transmissionRenderTarget[S.id]),ve.needsLights&&ve.lightProbeGrid){let ht=ve.lightProbeGrid;bt.probesSH.value=ht.texture,bt.probesMin.value.copy(ht.boundingBox.min),bt.probesMax.value.copy(ht.boundingBox.max),bt.probesResolution.value.copy(ht.resolution)}tr.upload(N,Hu(ve),bt,W)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(tr.upload(N,Hu(ve),bt,W),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&rt.setValue(N,"center",B.center),rt.setValue(N,"modelViewMatrix",B.modelViewMatrix),rt.setValue(N,"normalMatrix",B.normalMatrix),rt.setValue(N,"modelMatrix",B.matrixWorld),O.uniformsGroups!==void 0){let ht=O.uniformsGroups;for(let pi=0,ps=ht.length;pi<ps;pi++){let Wu=ht[pi];j.update(Wu,un),j.bind(Wu,un)}}return un}function am(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function om(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(S,D,V){let O=z.get(S);O.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),z.get(S.texture).__webglTexture=D,z.get(S.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){let V=z.get(S);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,V=0){J=S,G=D,H=V;let O=null,B=!1,pe=!1;if(S){let fe=z.get(S);if(fe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,fe.__webglFramebuffer),ge.copy(S.viewport),ye.copy(S.scissor),Ye=S.scissorTest,_.viewport(ge),_.scissor(ye),_.setScissorTest(Ye),Q=-1;return}else if(fe.__webglFramebuffer===void 0)W.setupRenderTarget(S);else if(fe.__hasExternalTextures)W.rebindTextures(S,z.get(S.texture).__webglTexture,z.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Oe=S.depthTexture;if(fe.__boundDepthTexture!==Oe){if(Oe!==null&&z.has(Oe)&&(S.width!==Oe.image.width||S.height!==Oe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(S)}}let Me=S.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(pe=!0);let Ae=z.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ae[D])?O=Ae[D][V]:O=Ae[D],B=!0):S.samples>0&&W.useMultisampledRTT(S)===!1?O=z.get(S).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[V]:O=Ae,ge.copy(S.viewport),ye.copy(S.scissor),Ye=S.scissorTest}else ge.copy(Pe).multiplyScalar(ee).floor(),ye.copy(_t).multiplyScalar(ee).floor(),Ye=Ge;if(V!==0&&(O=q),_.bindFramebuffer(N.FRAMEBUFFER,O)&&_.drawBuffers(S,O),_.viewport(ge),_.scissor(ye),_.setScissorTest(Ye),B){let fe=z.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,fe.__webglTexture,V)}else if(pe){let fe=D;for(let Me=0;Me<S.textures.length;Me++){let Ae=z.get(S.textures[Me]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Me,Ae.__webglTexture,V,fe)}}else if(S!==null&&V!==0){let fe=z.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fe.__webglTexture,V)}Q=-1},this.readRenderTargetPixels=function(S,D,V,O,B,pe,_e,fe=0){if(!(S&&S.isWebGLRenderTarget)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me){_.bindFramebuffer(N.FRAMEBUFFER,Me);try{let Ae=S.textures[fe],Oe=Ae.format,ke=Ae.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!R.textureFormatReadable(Oe)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(ke)){Ie("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-O&&V>=0&&V<=S.height-B&&N.readPixels(D,V,O,B,ce.convert(Oe),ce.convert(ke),pe)}finally{let Ae=J!==null?z.get(J).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(S,D,V,O,B,pe,_e,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me)if(D>=0&&D<=S.width-O&&V>=0&&V<=S.height-B){_.bindFramebuffer(N.FRAMEBUFFER,Me);let Ae=S.textures[fe],Oe=Ae.format,ke=Ae.type;if(S.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+fe),!R.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Re=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Re),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),N.readPixels(D,V,O,B,ce.convert(Oe),ce.convert(ke),0);let nt=J!==null?z.get(J).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,nt);let yt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ef(N,yt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Re),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(Re),N.deleteSync(yt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,V=0){let O=Math.pow(2,-V),B=Math.floor(S.image.width*O),pe=Math.floor(S.image.height*O),_e=D!==null?D.x:0,fe=D!==null?D.y:0;W.setTexture2D(S,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,_e,fe,B,pe),_.unbindTexture()},this.copyTextureToTexture=function(S,D,V=null,O=null,B=0,pe=0){let _e,fe,Me,Ae,Oe,ke,Re,nt,yt,xt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(V!==null)_e=V.max.x-V.min.x,fe=V.max.y-V.min.y,Me=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,Oe=V.min.y,ke=V.isBox3?V.min.z:0;else{let bt=Math.pow(2,-B);_e=Math.floor(xt.width*bt),fe=Math.floor(xt.height*bt),S.isDataArrayTexture?Me=xt.depth:S.isData3DTexture?Me=Math.floor(xt.depth*bt):Me=1,Ae=0,Oe=0,ke=0}O!==null?(Re=O.x,nt=O.y,yt=O.z):(Re=0,nt=0,yt=0);let st=ce.convert(D.format),Vt=ce.convert(D.type),ve;D.isData3DTexture?(W.setTexture3D(D,0),ve=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(W.setTexture2DArray(D,0),ve=N.TEXTURE_2D_ARRAY):(W.setTexture2D(D,0),ve=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);let nn=_.getParameter(N.UNPACK_ROW_LENGTH),Xe=_.getParameter(N.UNPACK_IMAGE_HEIGHT),un=_.getParameter(N.UNPACK_SKIP_PIXELS),In=_.getParameter(N.UNPACK_SKIP_ROWS),di=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,xt.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xt.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Ae),_.pixelStorei(N.UNPACK_SKIP_ROWS,Oe),_.pixelStorei(N.UNPACK_SKIP_IMAGES,ke);let fs=S.isDataArrayTexture||S.isData3DTexture,rt=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){let bt=z.get(S),fi=z.get(D),ht=z.get(bt.__renderTarget),pi=z.get(fi.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,ht.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let ps=0;ps<Me;ps++)fs&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(S).__webglTexture,B,ke+ps),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,z.get(D).__webglTexture,pe,yt+ps)),N.blitFramebuffer(Ae,Oe,_e,fe,Re,nt,_e,fe,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||z.has(S)){let bt=z.get(S),fi=z.get(D);_.bindFramebuffer(N.READ_FRAMEBUFFER,Y),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,k);for(let ht=0;ht<Me;ht++)fs?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,bt.__webglTexture,B,ke+ht):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,bt.__webglTexture,B),rt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,fi.__webglTexture,pe,yt+ht):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,fi.__webglTexture,pe),B!==0?N.blitFramebuffer(Ae,Oe,_e,fe,Re,nt,_e,fe,N.COLOR_BUFFER_BIT,N.NEAREST):rt?N.copyTexSubImage3D(ve,pe,Re,nt,yt+ht,Ae,Oe,_e,fe):N.copyTexSubImage2D(ve,pe,Re,nt,Ae,Oe,_e,fe);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else rt?S.isDataTexture||S.isData3DTexture?N.texSubImage3D(ve,pe,Re,nt,yt,_e,fe,Me,st,Vt,xt.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(ve,pe,Re,nt,yt,_e,fe,Me,st,xt.data):N.texSubImage3D(ve,pe,Re,nt,yt,_e,fe,Me,st,Vt,xt):S.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,Re,nt,_e,fe,st,Vt,xt.data):S.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,Re,nt,xt.width,xt.height,st,xt.data):N.texSubImage2D(N.TEXTURE_2D,pe,Re,nt,_e,fe,st,Vt,xt);_.pixelStorei(N.UNPACK_ROW_LENGTH,nn),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Xe),_.pixelStorei(N.UNPACK_SKIP_PIXELS,un),_.pixelStorei(N.UNPACK_SKIP_ROWS,In),_.pixelStorei(N.UNPACK_SKIP_IMAGES,di),pe===0&&D.generateMipmaps&&N.generateMipmap(ve),_.unbindTexture()},this.initRenderTarget=function(S){z.get(S).__webglFramebuffer===void 0&&W.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?W.setTextureCube(S,0):S.isData3DTexture?W.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?W.setTexture2DArray(S,0):W.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){G=0,H=0,J=null,_.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}};Pn();var lp={classic:{desc:"\u9ED2\u3044\u4E38\u30A2\u30D5\u30ED\u3002\u6A19\u6E96\u306E\u6C17\u6301\u3061\u3088\u3055",color:"#28232A"},jumbo:{desc:"\u3072\u3068\u56DE\u308A\u5927\u304D\u3044\u8336\u8272\u3002\u5927\u304D\u306A\u6BDB\u675F\u304C\u843D\u3061\u308B",color:"#49302A"},tight:{desc:"\u5C0F\u3055\u304F\u5BC6\u306A\u30AB\u30FC\u30EB\u3002\u77ED\u6642\u9593\u5411\u3051",color:"#28232A"},mohawk:{desc:"\u4E2D\u592E\u306F\u30AA\u30EC\u30F3\u30B8\u3067\u9AD8\u304F\u3001\u5074\u9762\u306F\u77ED\u3044\u9ED2\u9AEA",color:"#EC773C"},twins:{desc:"\u9752\u3044\u5DE6\u53F3\u306E\u6BDB\u7389\u3002\u4E2D\u592E\u3068\u5F8C\u308D\u306B\u3082\u77ED\u3044\u6BDB",color:"#398CCE"},swirl:{desc:"\u8336\u8272\u306E\u6D41\u308C\u3002\u4ED5\u4E0A\u3052\u3067\u9577\u77ED\u304C\u6B8B\u308A\u3084\u3059\u3044",color:"#714532"},flat:{desc:"\u4E0A\u9762\u304C\u5E73\u305F\u3044\u9ED2\u9AEA\u3002\u9762\u3092\u524A\u308B\u723D\u5FEB\u611F",color:"#28232A"},rainbow:{desc:"\u30D1\u30B9\u30C6\u30EB\u306E\u8679\u8272\u3002\u5F62\u30FB\u96E3\u5EA6\u306F\u307E\u3093\u307E\u308B\u3068\u540C\u3058",color:"#F4A0CB"}},sr={standard:{feature:"\u5747\u4E00\u306B\u5208\u308C\u308B\u57FA\u672C\u6A5F",hint:"\u3053\u308C1\u672C\u3067\u5FC5\u305A\u4ED5\u4E0A\u304C\u308B",short:"\u6A19\u6E96"},wide:{feature:"\u6A2A\u306B\u5E83\u3044\u5203\u3067\u5E83\u7BC4\u56F2",hint:"\u7D30\u90E8\u306F\u5C0F\u3055\u3044\u9053\u5177\u304C\u5FEB\u9069",short:"\u30EF\u30A4\u30C9"},turbo:{feature:"3\u79D2\u3054\u3068\u306B1\u79D2\u30D6\u30FC\u30B9\u30C8",hint:"\u62BC\u3057\u3063\u3071\u306A\u3057\u3067\u52A0\u901F\u3002\u96E2\u3059\u3068\u5468\u671F\u30EA\u30BB\u30C3\u30C8",short:"\u30BF\u30FC\u30DC"},vacuum:{feature:"\u5208\u3063\u305F\u6BDB\u3092\u7A93\u3078\u5438\u5F15",hint:"\u8996\u754C\u3059\u3063\u304D\u308A\u3002\u6BDB\u306F\u5203\u306E\u7BC4\u56F2\u3060\u3051\u5208\u308C\u308B",short:"\u5438\u5F15"},detail:{feature:"\u7D30\u3044\u5203\uFF0B\u5208\u308A\u6B8B\u3057\u8868\u793A",hint:"\u8033\u307E\u308F\u308A\u3084\u5C0F\u3055\u3044\u6B8B\u308A\u306B",short:"\u30AD\u30EF\u5243\u308A"},polish:{feature:"\u77ED\u3044\u6BDB\u3092\u9AD8\u901F\u4ED5\u4E0A\u3052",hint:"\u9AD8\u30550.08\u4EE5\u4E0B\u3067\u4E00\u6C17\u306B\u52A0\u901F\uFF06\u5149\u308B",short:"\u3064\u308B\u30D4\u30AB"}},Fi={free:{name:"\u30B9\u30C3\u30AD\u30EA\u30D5\u30EA\u30FC",short:"\u30D5\u30EA\u30FC",desc:"\u9053\u5177\u3092\u81EA\u7531\u306B\u6301\u3061\u66FF\u3048\u3002\u6642\u9593\u5236\u9650\u306A\u3057\u30FB\u4E00\u6642\u505C\u6B62OK"},ta:{name:"\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF",short:"\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF",desc:"\u30B9\u30BF\u30F3\u30C0\u30FC\u30C91\u672C\u3067\u6700\u901F\u3092\u76EE\u6307\u3059\u3002\u4E2D\u65AD\u3059\u308B\u3068\u8A18\u9332\u5BFE\u8C61\u5916"}},cp={\u7A4F:"#65D6E8",\u559C:"#FFD15C",\u6012:"#FF855E",\u54C0:"#B6A0E8",\u697D:"#93D8C6"};Pn();var rr=class{kind;count;pos;normal;growth;dataGrowth;base;baseOffset;initH;h;radius;weight;colorHex;totalWeight;scalpRadii;shavedW=0;remainingN=0;dirtyFlag;dirty=[];constructor(e){if(!e||!Array.isArray(e.roots)||e.roots.length===0)throw new Error("hair data has no roots");let t=e.roots.length;this.kind=e.kind,this.count=t,this.scalpRadii=[...e.scalpRadii??[.78,1,.78]],this.pos=new Float32Array(t*3),this.normal=new Float32Array(t*3),this.growth=new Float32Array(t*3),this.dataGrowth=new Float32Array(t*3),this.base=new Float32Array(t*3),this.baseOffset=new Float32Array(t),this.initH=new Float32Array(t),this.h=new Float32Array(t),this.radius=new Float32Array(t),this.weight=new Float32Array(t),this.colorHex=new Uint32Array(t),this.dirtyFlag=new Uint8Array(t);let n=0;e.roots.forEach((i,r)=>{let a=hp(i.normal),o=hp(i.growthDirection??i.normal);for(let h=0;h<3;h++){let u=i.position[h];if(!Number.isFinite(u))throw new Error(`root ${r} has invalid position`);this.pos[r*3+h]=u,this.base[r*3+h]=u,this.normal[r*3+h]=a[h],this.growth[r*3+h]=o[h],this.dataGrowth[r*3+h]=o[h]}let l=Number(i.initialHeight);if(!Number.isFinite(l)||l<=0)throw new Error(`root ${r} has invalid height`);this.initH[r]=l,this.radius[r]=Number.isFinite(i.radius)&&i.radius>0?i.radius:.08;let c=Number.isFinite(i.weight)&&i.weight>0?i.weight:1;this.weight[r]=c,n+=c,this.colorHex[r]=parseInt(String(i.color??"#28232A").replace("#",""),16)||2630442}),this.totalWeight=n,this.reset()}setBaseOffsets(e){for(let t=0;t<this.count;t++){let n=e?e[t]:0;this.baseOffset[t]=n;for(let i=0;i<3;i++)this.base[t*3+i]=this.pos[t*3+i]+this.growth[t*3+i]*n;this.markDirty(t)}}reset(){this.h.set(this.initH),this.shavedW=0,this.remainingN=this.count;for(let e=0;e<this.count;e++)this.markDirty(e)}cut(e,t){let n=this.h[e];if(n<=0||!(t>0))return 0;let i=n-t;return i<=pc&&(i=0),this.h[e]=i,i===0&&(this.shavedW+=this.weight[e],this.remainingN--),this.markDirty(e),n-i}setHeight(e,t){let n=this.h[e],i=Math.max(0,Math.min(this.initH[e],t));i<=pc&&(i=0),n>0&&i===0&&(this.shavedW+=this.weight[e],this.remainingN--),n===0&&i>0&&(this.shavedW-=this.weight[e],this.remainingN++),this.h[e]=i,this.markDirty(e)}get remaining(){return this.remainingN}get complete(){return this.remainingN===0}get cleanRatio(){return this.remainingN===0?1:Math.min(this.shavedW/this.totalWeight,1)}totalLength(){let e=0;for(let t=0;t<this.count;t++)e+=this.h[t];return e}maxReach(){let e=0;for(let t=0;t<this.count;t++){let n=this.initH[t],i=this.base[t*3]+this.growth[t*3]*n,r=this.base[t*3+1]+this.growth[t*3+1]*n,a=this.base[t*3+2]+this.growth[t*3+2]*n;e=Math.max(e,Math.hypot(i,r,a)+this.radius[t])}return e}markDirty(e){this.dirtyFlag[e]||(this.dirtyFlag[e]=1,this.dirty.push(e))}consumeDirty(){let e=this.dirty;this.dirty=[];for(let t of e)this.dirtyFlag[t]=0;return e}};function hp(s){let e=Number(s[0]),t=Number(s[1]),n=Number(s[2]),i=Math.hypot(e,t,n);return!Number.isFinite(i)||i<1e-9?[0,1,0]:[e/i,t/i,n/i]}function xa(){return{t:1/0,x:0,y:0,z:0,kind:-1,rootId:-1,nx:0,ny:1,nz:0}}function ga(s,e,t,n,i){let r=s.ox-e,a=s.oy-t,o=s.oz-n,l=r*s.dx+a*s.dy+o*s.dz,c=r*r+a*a+o*o-i*i,h=l*l-c;if(h<0)return-1;let u=-l-Math.sqrt(h);return u>0?u:-1}function oy(s,e,t,n,i,r,a,o){let l=i-e,c=r-t,h=a-n,u=l*l+c*c+h*h;if(u<1e-12)return ga(s,e,t,n,o);let d=s.ox-e,f=s.oy-t,g=s.oz-n,x=l*s.dx+c*s.dy+h*s.dz,p=l*d+c*f+h*g,m=s.dx*d+s.dy*f+s.dz*g,b=d*d+f*f+g*g,M=u-x*x;if(M<1e-10){let A=ga(s,e,t,n,o),I=ga(s,i,r,a,o);return A<0?I:I<0?A:Math.min(A,I)}let y=u*m-p*x,w=u*b-p*p-o*o*u,T=y*y-M*w;if(T<0)return-1;let E=(-y-Math.sqrt(T))/M,v=p+E*x;return v>0&&v<u?E>0?E:-1:v<=0?ga(s,e,t,n,o):ga(s,i,r,a,o)}function ly(s,e,t,n){let i=s.ox/e,r=s.oy/t,a=s.oz/n,o=s.dx/e,l=s.dy/t,c=s.dz/n,h=o*o+l*l+c*c,u=i*o+r*l+a*c,d=i*i+r*r+a*a-1,f=u*u-h*d;if(f<0)return-1;let g=(-u-Math.sqrt(f))/h;return g>0?g:-1}function cy(s,e){let t=e[0]*s.ox+e[1]*s.oy+e[2]*s.oz+e[3],n=e[4]*s.ox+e[5]*s.oy+e[6]*s.oz+e[7],i=e[8]*s.ox+e[9]*s.oy+e[10]*s.oz+e[11],r=e[0]*s.dx+e[1]*s.dy+e[2]*s.dz,a=e[4]*s.dx+e[5]*s.dy+e[6]*s.dz,o=e[8]*s.dx+e[9]*s.dy+e[10]*s.dz,l=r*r+a*a+o*o,c=t*r+n*a+i*o,h=t*t+n*n+i*i-1,u=c*c-l*h;if(u<0)return-1;let d=(-c-Math.sqrt(u))/l;return d>0?d:-1}function up(s,e,t,n){let i=s[0]*e+s[1]*t+s[2]*n+s[3],r=s[4]*e+s[5]*t+s[6]*n+s[7],a=s[8]*e+s[9]*t+s[10]*n+s[11];return i*i+r*r+a*a<1}function dp(s,e,t,n,i,r,a){let o=s[0]*e+s[1]*t+s[2]*n+s[3],l=s[4]*e+s[5]*t+s[6]*n+s[7],c=s[8]*e+s[9]*t+s[10]*n+s[11],h=s[0]*i+s[1]*r+s[2]*a,u=s[4]*i+s[5]*r+s[6]*a,d=s[8]*i+s[9]*r+s[10]*a,f=h*h+u*u+d*d,g=o*h+l*u+c*d,x=o*o+l*l+c*c-1,p=g*g-f*x;return p<0?0:Math.max(0,(-g+Math.sqrt(p))/f)}function Ul(s,e,t,n,i){i.t=1/0,i.kind=-1,i.rootId=-1;let{base:r,growth:a,h:o,radius:l}=s,c=s.count;for(let g=0;g<c;g++){let x=o[g];if(x<=0)continue;let p=g*3,m=r[p],b=r[p+1],M=r[p+2],y=l[g]*n,w=m-e.ox,T=b-e.oy,E=M-e.oz,v=w*e.dx+T*e.dy+E*e.dz,A=x+y;if(v<-A||v-A>i.t||w*w+T*T+E*E-v*v>A*A)continue;let P=oy(e,m,b,M,m+a[p]*x,b+a[p+1]*x,M+a[p+2]*x,y);P>0&&P<i.t&&(i.t=P,i.kind=0,i.rootId=g)}let[h,u,d]=s.scalpRadii,f=ly(e,h,u,d);f>0&&f<i.t&&(i.t=f,i.kind=1,i.rootId=-1);for(let g of t){let x=cy(e,g.m);x>0&&x<i.t&&(i.t=x,i.kind=2,i.rootId=-1)}if(i.kind<0)return!1;if(i.x=e.ox+e.dx*i.t,i.y=e.oy+e.dy*i.t,i.z=e.oz+e.dz*i.t,i.kind===1){let g=i.x/(h*h),x=i.y/(u*u),p=i.z/(d*d),m=Math.hypot(g,x,p)||1;g/=m,x/=m,p/=m,i.nx=g,i.ny=x,i.nz=p}else if(i.kind===0){let g=i.rootId*3;i.nx=s.normal[g],i.ny=s.normal[g+1],i.nz=s.normal[g+2]}else{let g=Math.hypot(i.x,i.y,i.z)||1;i.nx=i.x/g,i.ny=i.y/g,i.nz=i.z/g}return!0}function fp(){return{cutAny:!1,removed:0,cleared:0}}function pp(s,e,t,n,i,r,a,o,l,c,h,u,d){if(!(r>0))return;let{h:f,normal:g,pos:x}=s,p=i*i;for(let m=0;m<s.count;m++){let b=f[m];if(b<=0)continue;let M=m*3;if(m!==u){let w=x[M]-e,T=x[M+1]-t,E=x[M+2]-n;if(w*w+T*T+E*E>p)continue;let v=o-x[M],A=l-x[M+1],I=c-x[M+2],P=Math.hypot(v,A,I)||1;if((g[M]*v+g[M+1]*A+g[M+2]*I)/P<h)continue}let y=s.cut(m,a(b)*r);y>0&&(d.cutAny=!0,d.removed+=y,f[m]===0&&d.cleared++)}}function mp(s,e,t,n,i,r,a){if(e===0&&t>=0){a.x=s.pos[t*3],a.y=s.pos[t*3+1],a.z=s.pos[t*3+2];return}if(e===1){a.x=n,a.y=i,a.z=r;return}let[o,l,c]=s.scalpRadii,h=Math.hypot(n/o,i/l,r/c)||1;a.x=n/h,a.y=i/h,a.z=r/h}Pn();var Fl=class{simTime=0;started=!1;startTime=0;cuttingMs=0;productiveMs=0;completeAt=-1;armed=!1;stroke=null;runStart=0;ray={ox:0,oy:0,oz:0,dx:0,dy:0,dz:1};cam={x:0,y:0,z:5};hit=xa();lastHit=xa();stats=fp();pts=[];q={x:0,y:0,z:0};state;tool;env;constructor(e,t,n){this.state=e,this.env=t,this.tool=n}resetRun(e){this.started=!1,this.startTime=0,this.cuttingMs=0,this.productiveMs=0,this.completeAt=-1,this.stroke=null,this.simTime=e}get pressing(){return!!this.stroke&&this.stroke.tUp===1/0}runMs(e){return this.pressing?Math.max(0,e-this.runStart):0}pointerDown(e,t,n){this.stroke&&this.stroke.tUp===1/0||(e=Math.max(e,this.simTime),this.stroke={tDown:e,tUp:1/0,samples:[{t:e,x:t,y:n}]},this.runStart=e)}pointerMove(e,t,n){let i=this.stroke;if(!i||i.tUp!==1/0)return;let r=i.samples[i.samples.length-1];e=Math.max(e,r.t),e-r.t>40&&i.samples.push({t:e-16,x:r.x,y:r.y}),i.samples.push({t:e,x:t,y:n})}pointerUp(e){let t=this.stroke;!t||t.tUp!==1/0||(t.tUp=Math.max(e,t.tDown))}cancel(e){this.stroke&&this.stroke.tUp===1/0&&(this.stroke.tUp=Math.max(e,this.stroke.tDown))}posAt(e,t,n){let i=e.samples;if(t<=i[0].t){n.x=i[0].x,n.y=i[0].y;return}let r=i[i.length-1];if(t>=r.t){n.x=r.x,n.y=r.y;return}let a=0,o=i.length-1;for(;o-a>1;){let u=a+o>>1;i[u].t<=t?a=u:o=u}let l=i[a],c=i[o],h=c.t>l.t?(t-l.t)/(c.t-l.t):1;n.x=l.x+(c.x-l.x)*h,n.y=l.y+(c.y-l.y)*h}advance(e){let t={contact:!1,started:!1,startAt:0,pressing:!1,removed:0,cleared:0,completeAt:-1,boosting:!1,lastHit:null};for(e-this.simTime>fc&&(this.simTime=e-fc);this.simTime+dc<=e;){let i=this.simTime,r=i+dc;if(this.step(i,r,t),this.simTime=r,this.completeAt>=0)break}let n=this.stroke;if(n){if(n.tUp!==1/0&&this.simTime>=n.tUp)this.stroke=null;else if(n.samples.length>2){let i=0;for(;i+1<n.samples.length-1&&n.samples[i+1].t<=this.simTime;)i++;i>0&&n.samples.splice(0,i)}}return t.lastHit&&(t.lastHit={...this.lastHit}),t}step(e,t,n){let i=this.stroke;if(!i||!this.armed||this.completeAt>=0)return;let r=Math.max(e,i.tDown),a=Math.min(t,i.tUp);if(a<=r)return;n.pressing=!0;let o=a-r,l=r-this.runStart;this.tool.boosting(l)&&(n.boosting=!0);let c=this.pts;c.length=0;let h={x:0,y:0};this.posAt(i,r,h),c.push(h.x,h.y);for(let w of i.samples)w.t>r&&w.t<a&&c.push(w.x,w.y);this.posAt(i,a,h),c.push(h.x,h.y);let u=0;for(let w=2;w<c.length;w+=2)u+=Math.hypot(c[w]-c[w-2],c[w+1]-c[w-1]);let d=Math.max(2,this.env.brushRadiusPx()*.5),f=Math.max(1,Math.ceil(u/d)),g=o/1e3/f,x=this.env.brushRadius(),p=this.env.parts(),m=this.tool,b=w=>m.rate(w,l),M=this.stats;M.cutAny=!1,M.removed=0,M.cleared=0;let y=!1;for(let w=0;w<f;w++){let T=u===0?0:(w+.5)/f*u,E=0,v=c[0],A=c[1];for(let I=2;I<c.length;I+=2){let P=Math.hypot(c[I]-c[I-2],c[I+1]-c[I-1]);if(E+P>=T&&P>0){let F=(T-E)/P;v=c[I-2]+(c[I]-c[I-2])*F,A=c[I-1]+(c[I+1]-c[I-1])*F;break}E+=P,v=c[I],A=c[I+1]}this.env.rayAt(v,A,this.ray,this.cam)&&Ul(this.state,this.ray,p,.9,this.hit)&&(y=!0,Object.assign(this.lastHit,this.hit),n.lastHit=this.lastHit,this.started||(this.started=!0,this.startTime=r,n.started=!0,n.startAt=r),mp(this.state,this.hit.kind,this.hit.rootId,this.hit.x,this.hit.y,this.hit.z,this.q),pp(this.state,this.q.x,this.q.y,this.q.z,x,g,b,this.cam.x,this.cam.y,this.cam.z,Yu,this.hit.kind===0?this.hit.rootId:-1,M))}y&&(n.contact=!0),this.started&&(this.cuttingMs+=o,M.cutAny&&(this.productiveMs+=o),n.removed+=M.removed,n.cleared+=M.cleared,this.state.complete&&this.completeAt<0&&(this.completeAt=a,n.completeAt=a))}};Pn();function gp(s){return s<0?!1:s%mc>=mc-Zu}function Ol(s){let e=s.radius,t=s.cutRate;if(!(e>0)||!(t>0))throw new Error(`invalid clipper ${s.id}`);switch(s.id){case"turbo":return{id:s.id,radius:e,baseRate:t,rate:(n,i)=>gp(i)?Ju:t,boosting:gp};case"polish":return{id:s.id,radius:e,baseRate:t,rate:n=>n<=$u?Ku:t,boosting:()=>!1};default:return{id:s.id,radius:e,baseRate:t,rate:()=>t,boosting:()=>!1}}}var uy=/^(Head|Neck|Cape|Collar|Emotion_badge|Hair_)/;function xp(s){return!uy.test(s)}function vp(s,e){let t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=t*(o*d-l*u)-n*(a*d-l*h)+i*(a*u-o*h);if(!Number.isFinite(g)||Math.abs(g)<1e-12)return null;let x=1/g,p=new Float64Array(12);return p[0]=(o*d-l*u)*x,p[1]=(i*u-n*d)*x,p[2]=(n*l-i*o)*x,p[4]=(l*h-a*d)*x,p[5]=(t*d-i*h)*x,p[6]=(i*a-t*l)*x,p[8]=(a*u-o*h)*x,p[9]=(n*h-t*u)*x,p[10]=(t*o-n*a)*x,p[3]=-(p[0]*r+p[1]*c+p[2]*f),p[7]=-(p[4]*r+p[5]*c+p[6]*f),p[11]=-(p[8]*r+p[9]*c+p[10]*f),{name:s,m:p}}function Bl(s,e){let t=new Float32Array(s.count);for(let n=0;n<s.count;n++){let i=n*3,r=s.pos[i],a=s.pos[i+1],o=s.pos[i+2],l=s.growth[i],c=s.growth[i+1],h=s.growth[i+2],u=0;for(let d=0;d<3;d++){let f=!1;for(let g of e)if(up(g.m,r,a,o)){let x=dp(g.m,r,a,o,l,c,h)+.006;u+=x,r+=l*x,a+=c*x,o+=h*x,f=!0}if(!f)break}t[n]=u}return t}var dy={classic:1,rainbow:1,jumbo:1.1,tight:.8,swirl:1,twins:.9,mohawk:1.2,flat:0},Yh=(s,e,t)=>{let n=Math.min(1,Math.max(0,(t-s)/(e-s)));return n*n*(3-2*n)};function kl(s){let e=dy[s.kind]??1;if(e<=0)return;let t=s.growth,n=s.normal;for(let i=0;i<s.count;i++){let r=i*3,a=t[r],o=t[r+1],l=t[r+2];if(Math.abs(a-n[r])+Math.abs(o-n[r+1])+Math.abs(l-n[r+2])>.001)continue;let c=Yh(.1,.8,n[r+2])*Yh(-.5,.25,n[r+1]),h=Yh(0,.6,n[r+1]),u=0,d=(.95*c+.25*h)*e,f=-.22*c*e,g=a+u,x=o+d,p=l+f,m=Math.hypot(g,x,p)||1;g/=m,x/=m,p/=m,t[r]=g,t[r+1]=x,t[r+2]=p}}var Wn=Math.PI/180,ar=[{id:"front",label:"\u6B63\u9762",key:"1",az:0,el:15*Wn},{id:"right",label:"\u53F3",key:"2",az:-90*Wn,el:5*Wn},{id:"back",label:"\u5F8C\u308D",key:"3",az:180*Wn,el:0},{id:"left",label:"\u5DE6",key:"4",az:90*Wn,el:5*Wn},{id:"top",label:"\u4E0A",key:"5",az:0,el:70*Wn}],_p=-20*Wn,yp=75*Wn;function fy(s,e){return[Math.sin(s)*Math.cos(e),Math.sin(e),Math.cos(s)*Math.cos(e)]}function $h(s,e,t){let n=0,i=-1/0;return ar.forEach((r,a)=>{let[o,l,c]=fy(r.az,r.el),h=o*s+l*e+c*t;h>i&&(i=h,n=a)}),n}function bp(s,e,t){let n=e*Wn/2,i=Math.atan(Math.tan(n)*t);return s/Math.sin(Math.min(n,i))}var py=(s,e,t)=>Math.min(t,Math.max(e,s));function zl(s,e){if(!Number.isFinite(s)||s<0)throw new RangeError(`${e} must be finite and nonnegative`);return s}function En(s){zl(s,"elapsedMs");let e=Math.floor(s/10);return`${String(Math.floor(e/6e3)).padStart(2,"0")}:${String(Math.floor(e/100)%60).padStart(2,"0")}.${String(e%100).padStart(2,"0")}`}var va={SS:"\u3064\u308B\u30D4\u30AB\u540D\u4EBA",S:"\u30B9\u30C3\u30AD\u30EA\u9054\u4EBA",A:"\u30B9\u30C3\u30AD\u30EA\u9054\u6210",B:"\u3044\u3044\u5208\u308A\u3063\u3077\u308A",C:"\u30B9\u30C3\u30AD\u30EA\u5B8C\u4E86"};function my(s){return s>=98e3?"SS":s>=92e3?"S":s>=84e3?"A":s>=7e4?"B":"C"}function Mp({elapsedMs:s,parSeconds:e,productiveMs:t,cuttingMs:n,completed:i,interrupted:r=!1}){if(!i)throw new Error("Only a fully shaved head can produce a final result");if(zl(s,"elapsedMs"),zl(t,"productiveMs"),zl(n,"cuttingMs"),s===0||n===0)throw new RangeError("A completed run must have positive elapsed and cutting time");if(!Number.isFinite(e)||e<=0)throw new RangeError("parSeconds must be positive");if(t>n||n>s)throw new RangeError("Expected productiveMs <= cuttingMs <= elapsedMs");let a=n===0?0:py(t/n,0,1),o=3e4*Math.min(1,e/Math.max(s/1e3,.01)),l=Math.round(6e4+o+1e4*a),c=my(l);return Object.freeze({elapsedMs:s,time:En(s),score:l,rank:c,efficiency:a,completed:!0,interrupted:r})}function Sp(s,e){return{clean:6e4,speed:Math.round(3e4*Math.min(1,e/Math.max(s.elapsedMs/1e3,.01))),efficiency:Math.round(1e4*s.efficiency)}}function Kh({result:s,hairName:e,modeName:t,characterName:n=""}){return`\u30A2\u30D5\u30ED\u3001\u30B9\u30C3\u30AD\u30EA\u3002\u3067\u5168\u5243\u308A\u9054\u6210\uFF01
${(Math.floor(s.elapsedMs/10)/100).toFixed(2)}\u79D2 / ${s.score.toLocaleString("ja-JP")}\u70B9 / ${s.rank}
${n?`${n}\u30FB`:""}${e}\u30FB${t}${s.interrupted?"\uFF08\u4E2D\u65AD\u3042\u308A\uFF09":""}`}var gy="\u30A2\u30D5\u30ED\u30B9\u30C3\u30AD\u30EA,\u30D6\u30E9\u30A6\u30B6\u30B2\u30FC\u30E0";function Zh(s){let{result:e,canonicalUrl:t=""}=s;if(!e.completed)throw new Error("Result is incomplete");let n=Kh(s),i=new URLSearchParams({text:n,hashtags:gy,lang:"ja"});if(t){let r=new URL(t);if(r.protocol!=="https:")throw new Error("Set the actual public HTTPS game URL");if(["localhost","127.0.0.1","[::1]"].includes(r.hostname))throw new Error("Do not share localhost");i.set("url",r.href)}return`https://x.com/intent/tweet?${i.toString()}`}function Vl(s){if(!s)return"";try{let e=new URL(s);return e.protocol!=="https:"||["localhost","127.0.0.1","[::1]","0.0.0.0"].includes(e.hostname)?"":e.href}catch{return""}}function Jh(s){return typeof navigator<"u"&&typeof navigator.canShare=="function"&&navigator.canShare({files:[s]})}function wp(s,e){if(e)return"100";let t=Math.floor(Math.max(0,Math.min(1,s))*1e3)/10;return Math.min(t,99.9).toFixed(1)}var xy=new Set(["SS","S","A","B","C"]),Tp="afro-sukkiri/records",Ap=100;function Ep(s,e,t,n){return`${s}|${e}|${t}|${n}`}function Hl(s){return s?typeof s.version=="string"&&(s.mode==="free"||s.mode==="ta")&&typeof s.hairId=="string"&&s.hairId.length>0&&Number.isFinite(s.elapsedMs)&&s.elapsedMs>0&&Number.isInteger(s.score)&&s.score>=0&&s.score<=1e5&&xy.has(s.rank)&&s.completed===!0&&typeof s.interrupted=="boolean"&&Number.isFinite(s.seed):!1}function jh(s){return{...s,characterId:typeof s.characterId=="string"&&s.characterId?s.characterId:"base",toolIds:Array.isArray(s.toolIds)?s.toolIds:["standard"],assist:s.assist!==!1}}var Gl=class{data;kv;persistent=!0;constructor(e){this.kv=e,this.data={schema:1,runs:[],bests:{}};try{let t=e.get(Tp);if(t){let n=JSON.parse(t),i=(Array.isArray(n.runs)?n.runs:[]).map(jh).filter(Hl),r={};for(let[a,o]of Object.entries(n.bests??{})){let l=o?.time?jh(o.time):null,c=o?.score?jh(o.score):null;r[a]={time:Hl(l)?l:null,score:Hl(c)?c:null}}this.data={schema:1,runs:i,bests:r}}}catch{this.data={schema:1,runs:[],bests:{}}}}add(e){if(!Hl(e))return{saved:!1,newBestTime:!1,newBestScore:!1,persisted:!1};this.data.runs.unshift(e),this.data.runs.length>Ap&&(this.data.runs.length=Ap);let t=!1,n=!1;if(!(e.mode==="ta"&&e.interrupted)){let a=Ep(e.version,e.mode,e.hairId,e.seed),o=this.data.bests[a]??={time:null,score:null};(!o.time||e.elapsedMs<o.time.elapsedMs)&&(o.time=e,t=!0),(!o.score||e.score>o.score.score)&&(o.score=e,n=!0)}let r=this.kv.set(Tp,JSON.stringify(this.data));return this.persistent=r,{saved:!0,newBestTime:t,newBestScore:n,persisted:r}}best(e,t,n,i){return this.data.bests[Ep(e,t,n,i)]??{time:null,score:null}}get runs(){return this.data.runs}};function Rp(s,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=s.getIndex(),i=s.getAttribute("position"),r=n?n.count:i.count,a=0,o=Object.keys(s.attributes),l={},c={},h=[],u=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let b=0,M=o.length;b<M;b++){let y=o[b],w=s.attributes[y];l[y]=new w.constructor(new w.array.constructor(w.count*w.itemSize),w.itemSize,w.normalized);let T=s.morphAttributes[y];T&&(c[y]||(c[y]=[]),T.forEach((E,v)=>{let A=new E.array.constructor(E.count*E.itemSize);c[y][v]=new E.constructor(A,E.itemSize,E.normalized)}))}let f=e*.5,g=Math.log10(1/e),x=Math.pow(10,g),p=f*x;for(let b=0;b<r;b++){let M=n?n.getX(b):b,y="";for(let w=0,T=o.length;w<T;w++){let E=o[w],v=s.getAttribute(E),A=v.itemSize;for(let I=0;I<A;I++)y+=`${~~(v[u[I]](M)*x+p)},`}if(y in t)h.push(t[y]);else{for(let w=0,T=o.length;w<T;w++){let E=o[w],v=s.getAttribute(E),A=s.morphAttributes[E],I=v.itemSize,P=l[E],F=c[E];for(let q=0;q<I;q++){let Y=u[q],k=d[q];if(P[k](a,v[Y](M)),A)for(let G=0,H=A.length;G<H;G++)F[G][k](a,A[G][Y](M))}}t[y]=a,h.push(a),a++}}let m=s.clone();for(let b in s.attributes){let M=l[b];if(m.setAttribute(b,new M.constructor(M.array.slice(0,a*M.itemSize),M.itemSize,M.normalized)),b in c)for(let y=0;y<c[b].length;y++){let w=c[b][y];m.morphAttributes[b][y]=new w.constructor(w.array.slice(0,a*w.itemSize),w.itemSize,w.normalized)}}return m.setIndex(h),m}function Qh(s,e){if(e===Sh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Qs||e===ua){let t=s.getIndex();if(t===null){let a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Qs)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function Cp(s){let e=new Map,t=new Map,n=s.clone();return Ip(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Ip(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)Ip(s.children[n],e.children[n],t)}var Wl=class extends kn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new au(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new xu(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new iu(t)}),this.register(function(t){return new Xl(t,He.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Xl(t,He.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new _u(t)})}load(e,t,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=oi.extractUrlBase(e);a=oi.resolveURL(c,this.path)}else a=oi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new $s(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Up){try{a[He.KHR_BINARY_GLTF]=new yu(e)}catch(u){i&&i(u);return}r=JSON.parse(a[He.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Eu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case He.KHR_MATERIALS_UNLIT:a[u]=new su;break;case He.KHR_DRACO_MESH_COMPRESSION:a[u]=new bu(r,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:a[u]=new Mu;break;case He.KHR_MESH_QUANTIZATION:a[u]=new Su;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function vy(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Tt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},iu=class{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new te(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],$t);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Zt(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ns(h),c.distance=u;break;case"spot":c=new Qr(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Xn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},su=class{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return Kt}extendParams(e,t,n){let i=[];e.color=new te(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],$t),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Mt))}return Promise.all(i)}},ru=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},au=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new xe(r,r)}return Promise.all(i)}},ou=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},lu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},cu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new te(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],$t)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Mt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},hu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},uu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new te().setRGB(r[0],r[1],r[2],$t),Promise.all(i)}},du=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},fu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new te().setRGB(r[0],r[1],r[2],$t),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Mt)),Promise.all(i)}},pu=class{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},mu=class{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Tt(this.parser,e,this.name)!==null?dt:null}extendMaterialParams(e,t){let n=Tt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},gu=class{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},xu=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},vu=class{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return n.loadTextureImage(e,a.source,l)}},Xl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},_u=class{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==gn.TRIANGLES&&c.mode!==gn.TRIANGLE_STRIP&&c.mode!==gn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let g of u){let x=new Ee,p=new C,m=new It,b=new C(1,1,1),M=new Qt(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),M.setMatrixAt(y,x.compose(p,m,b));for(let y in l)if(y==="_COLOR_0"){let w=l[y];M.instanceColor=new Ti(w.array,w.itemSize,w.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);tt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Up="glTF",_a=12,Pp={JSON:1313821514,BIN:5130562},yu=class{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,_a),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Up)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-_a,r=new DataView(e,_a),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Pp.JSON){let c=new Uint8Array(e,_a+a,o);this.content=n.decode(c)}else if(l===Pp.BIN){let c=_a+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},bu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Tu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Tu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=or[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let g in f.attributes){let x=f.attributes[g],p=l[g];p!==void 0&&(x.normalized=p)}u(f)},o,c,$t,d)})})}},Mu=class{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Su=class{constructor(){this.name=He.KHR_MESH_QUANTIZATION}},ql=class extends Bn{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,x=g-c,p=-2*f+3*d,m=f-d,b=1-p,M=m-d+u;for(let y=0;y!==o;y++){let w=a[x+y+o],T=a[x+y+l]*h,E=a[g+y+o],v=a[g+y]*h;r[y]=b*w+M*T+p*E+m*v}return r}},_y=new It,wu=class extends ql{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return _y.fromArray(r).normalize().toArray(r),r}},gn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},or={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Lp={9728:St,9729:wt,9984:Go,9985:Zs,9986:rs,9987:Tn},Np={33071:pn,33648:Ds,10497:Mi},eu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Tu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},yy={CUBICSPLINE:void 0,LINEAR:Zi,STEP:Ki},tu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function by(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ft({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Sn})),s.DefaultMaterial}function ls(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Xn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function My(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Sy(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wy(s){let e,t=s.extensions&&s.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+nu(t.attributes):e=s.indices+":"+nu(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+nu(s.targets[n]);return e}function nu(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Au(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ty(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Ay=new Ee,Eu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new vy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Zr(this.options.manager):this.textureLoader=new ea(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new $s(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return ls(r,o,i),Xn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(oi.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=eu[i.type],o=or[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new ut(c,a,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=eu[i.type],c=or[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,x,p;if(f&&f!==u){let m=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,M=t.cache.get(b);M||(x=new c(o,m*f,i.count*f/h),M=new ji(x,f/h),t.cache.add(b,M)),p=new Si(M,l,d%f/h,g)}else o===null?x=new c(i.count*l):x=new c(o,d,i.count*l),p=new ut(x,l,g);if(i.sparse!==void 0){let m=eu.SCALAR,b=or[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,w=new b(a[1],M,i.sparse.count*m),T=new c(a[2],y,i.sparse.count*l);o!==null&&(p=new ut(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let E=0,v=w.length;E<v;E++){let A=w[E];if(p.setX(A,T[E*l]),l>=2&&p.setY(A,T[E*l+1]),l>=3&&p.setZ(A,T[E*l+2]),l>=4&&p.setW(A,T[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Lp[d.magFilter]||wt,h.minFilter=Lp[d.minFilter]||Tn,h.wrapS=Np[d.wrapS]||Mi,h.wrapT=Np[d.wrapT]||Mi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==St&&h.minFilter!==wt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let p=new Pt(x);p.needsUpdate=!0,d(p)}),t.load(oi.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Xn(u,a),u.userData.mimeType=a.mimeType||Ty(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[He.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new qs,Wt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Xs,Wt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ft}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[He.KHR_MATERIALS_UNLIT]){let u=i[He.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new te(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],$t),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,Mt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ot);let h=r.alphaMode||tu.OPAQUE;if(h===tu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===tu.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Kt&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new xe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Kt&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Kt){let u=r.emissiveFactor;o.emissive=new te().setRGB(u[0],u[1],u[2],$t)}return r.emissiveTexture!==void 0&&a!==Kt&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Mt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Xn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ls(i,u,r),u})}createUniqueName(e){let t=at.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Dp(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=wy(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[He.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Dp(new ft,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?by(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let x=h[f],p=a[f],m,b=c[f];if(p.mode===gn.TRIANGLES||p.mode===gn.TRIANGLE_STRIP||p.mode===gn.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new Fr(x,b):new qe(x,b),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===gn.TRIANGLE_STRIP?m.geometry=Qh(m.geometry,ua):p.mode===gn.TRIANGLE_FAN&&(m.geometry=Qh(m.geometry,Qs));else if(p.mode===gn.LINES)m=new Br(x,b);else if(p.mode===gn.LINE_STRIP)m=new Qi(x,b);else if(p.mode===gn.LINE_LOOP)m=new kr(x,b);else if(p.mode===gn.POINTS)m=new zr(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&Sy(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),Xn(m,r),p.extensions&&ls(i,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ls(i,u[0],r),u[0];let d=new ot;r.extensions&&ls(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new vt(Ah.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Pi(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Xn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Ee;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Or(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],g=i.samplers[f.sampler],x=f.target,p=x.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,b=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",b)),c.push(g),h.push(x))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],x=u[3],p=u[4],m=[];for(let M=0,y=d.length;M<y;M++){let w=d[M],T=f[M],E=g[M],v=x[M],A=p[M];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let I=n._createAnimationTracks(w,T,E,v,A);if(I)for(let P=0;P<I.length;P++)m.push(I[P])}let b=new Kr(r,void 0,m);return Xn(b,i),b})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Ay)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,g=u[0];h.pivot=new C().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Hs:c.length>1?h=new ot:c.length===1?h=c[0]:h=new tt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Xn(h,r),r.extensions&&ls(n,h,r),r.matrix!==void 0){let u=new Ee;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new ot;n.name&&(r.name=i.createUniqueName(n.name)),Xn(r,n),n.extensions&&ls(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++){let d=l[h];d.parent!==null?r.add(Cp(d)):r.add(d)}let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof Wt||d instanceof Pt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let a=[],o=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}Oi[r.path]===Oi.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(o);let h;switch(Oi[r.path]){case Oi.weights:h=si;break;case Oi.rotation:h=ri;break;case Oi.translation:case Oi.scale:h=Ci;break;default:n.itemSize===1?h=si:h=Ci;break}let u=i.interpolation!==void 0?yy[i.interpolation]:Zi,d=this._getArrayFromAccessor(n);for(let f=0,g=l.length;f<g;f++){let x=new h(l[f]+"."+Oi[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),a.push(x)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Au(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ri?wu:ql;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ey(s,e,t){let n=e.attributes,i=new on;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){let h=Au(or[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new C,l=new C;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=Au(or[d.componentType]);l.multiplyScalar(x)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;let a=new jt;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Dp(s,e,t){let n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(let a in n){let o=Tu[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){let a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return ze.workingColorSpace!==$t&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ze.workingColorSpace}" not supported.`),Xn(s,e),Ey(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?My(s,e.targets,t):s})}Pn();var Yl=class{manager=new Ys;gltfLoader=new Wl(this.manager);gltfCache=new Map;jsonCache=new Map;pending=0;done=0;onProgress=null;track(e){return this.pending++,this.onProgress?.(this.done,this.pending),e.then(t=>(this.done++,this.onProgress?.(this.done,this.pending),t),t=>{throw this.done++,this.onProgress?.(this.done,this.pending),t})}resetProgress(){this.pending=0,this.done=0}gltf(e){let t=this.gltfCache.get(e);return t||(t=this.track(e.endsWith(".glb.json")?fetch(qn(e)).then(n=>{if(!n.ok)throw new Error(`${e}: HTTP ${n.status}`);return n.json()}).then(n=>this.gltfLoader.parseAsync(Uint8Array.from(atob(n.glb),i=>i.charCodeAt(0)).buffer,"")):this.gltfLoader.loadAsync(qn(e))),t.catch(()=>this.gltfCache.delete(e)),this.gltfCache.set(e,t)),t}json(e){let t=this.jsonCache.get(e);return t||(t=this.track(fetch(qn(e)).then(n=>{if(!n.ok)throw new Error(`${e}: HTTP ${n.status}`);return n.json()})),t.catch(()=>this.jsonCache.delete(e)),this.jsonCache.set(e,t)),t}};var $l=class extends On{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Ai;e.deleteAttribute("uv");let t=new Ft({side:kt}),n=new Ft,i=new ns(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Qt(e,n,6),o=new tt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new qe(e,lr(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new qe(e,lr(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new qe(e,lr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new qe(e,lr(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new qe(e,lr(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new qe(e,lr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function lr(s){return new Ri({color:0,emissive:16777215,emissiveIntensity:s})}var Ry=s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,Kl=class{camera;target=new C(0,0,0);az=0;el=ar[0].el;dist=7;ty=0;zoom=1;viewIndex=0;fitR=1.6;fitTy=0;aspect=1;pxW=1;pxH=1;rect={x:0,y:0,w:1,h:1};tween=null;constructor(e=32){this.camera=new vt(e,1,.1,100)}get animating(){return this.tween!==null}setFraming(e,t,n,i=performance.now()){this.fitR=e,this.fitTy=t,this.goTo({az:this.az,el:this.el,dist:this.baseDist(),ty:t},n,i,420)}setVisibleRect(e,t=!1,n=performance.now()){let i=Math.min(1,Math.max(.2,e.w)),r=Math.min(1,Math.max(.2,e.h));this.rect={x:Math.min(1-i,Math.max(0,e.x)),y:Math.min(1-r,Math.max(0,e.y)),w:i,h:r},this.applyOffset(),this.goTo({az:this.tween?.to.az??this.az,el:this.tween?.to.el??this.el,dist:this.baseDist(),ty:this.fitTy},t,n,300)}applyOffset(){let e=this.rect,t=e.x+e.w/2,n=e.y+e.h/2;Math.abs(t-.5)<.001&&Math.abs(n-.5)<.001?this.camera.clearViewOffset():this.camera.setViewOffset(this.pxW,this.pxH,(.5-t)*this.pxW,(.5-n)*this.pxH,this.pxW,this.pxH)}resize(e,t=1,n=1){this.pxW=t,this.pxH=n,this.applyOffset(),this.aspect=e,this.camera.aspect=e,this.camera.updateProjectionMatrix(),this.tween?this.tween.to.dist=this.baseDist():(this.dist=this.baseDist(),this.apply())}baseDist(){let e=Math.tan(this.camera.fov*Math.PI/360)*this.rect.h,t=2*Math.atan(e)*180/Math.PI,n=this.aspect*this.rect.w/this.rect.h;return bp(this.fitR,t,n)*this.zoom}setView(e,t=!0,n=performance.now()){let i=ar[e];this.viewIndex=e,this.zoom=1;let r=i.az;for(;r-this.az>Math.PI;)r-=Math.PI*2;for(;r-this.az<-Math.PI;)r+=Math.PI*2;this.goTo({az:r,el:i.el,dist:this.baseDist(),ty:this.fitTy},t,n,360)}setPose(e,t,n,i=performance.now()){for(this.viewIndex=-1;e-this.az>Math.PI;)e-=Math.PI*2;for(;e-this.az<-Math.PI;)e+=Math.PI*2;this.goTo({az:e,el:t,dist:this.baseDist(),ty:this.fitTy},n,i,500)}goTo(e,t,n,i){if(!t){this.tween=null,Object.assign(this,e),this.apply();return}this.tween={from:{az:this.az,el:this.el,dist:this.dist,ty:this.ty},to:e,t0:n,dur:i}}orbit(e,t,n){this.tween=null,this.viewIndex=-1;let i=Math.PI*1.1/Math.max(200,n);this.az-=e*i,this.el=Math.min(yp,Math.max(_p,this.el+t*i)),this.apply()}zoomBy(e){this.zoom=Math.min(1.35,Math.max(.72,this.zoom*e)),this.tween=null,this.dist=this.baseDist(),this.apply()}update(e){let t=this.tween;if(t){let n=Math.min(1,(e-t.t0)/t.dur),i=Ry(n);return this.az=t.from.az+(t.to.az-t.from.az)*i,this.el=t.from.el+(t.to.el-t.from.el)*i,this.dist=t.from.dist+(t.to.dist-t.from.dist)*i,this.ty=t.from.ty+(t.to.ty-t.from.ty)*i,n>=1&&(this.tween=null),this.apply(),!0}return!1}apply(){this.target.set(0,this.ty,0);let e=Math.cos(this.el);this.camera.position.set(Math.sin(this.az)*e*this.dist,this.ty+Math.sin(this.el)*this.dist,Math.cos(this.az)*e*this.dist),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(!0)}pxPerUnit(e){return e/(2*this.dist*Math.tan(this.camera.fov*Math.PI/360))}};function Fp(){try{let s=document.createElement("canvas");return!!(s.getContext("webgl2")||s.getContext("webgl"))}catch{return!1}}var Zl=class{renderer;scene=new On;rig=new Kl(32);head=new ot;overlay=new ot;overlayScene=new On;ovKey;ovFill;rim;envTex=null;width=1;height=1;dprCap=2;pixelRatioOverride=null;contextLost=!1;onContextLost=null;constructor(e,t){this.renderer=new Ll({canvas:e,antialias:t==="standard",alpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1}),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=Mt,this.renderer.toneMapping=ia,this.renderer.toneMappingExposure=1,this.dprCap=t==="low"?1.25:2,e.addEventListener("webglcontextlost",c=>{c.preventDefault(),this.contextLost=!0,this.onContextLost?.()});let n=new nr(this.renderer),i=new $l;this.envTex=n.fromScene(i,.04).texture,i.traverse(c=>{let h=c;h.geometry?.dispose(),h.material?.dispose()}),n.dispose(),this.scene.environment=this.envTex,this.scene.environmentIntensity=.55;let r=this.rig.camera;this.scene.add(r),this.scene.add(new Ii(new te("#eaf8ff"),new te("#f1d6c2"),1));let a=new Zt(new te("#fff1e0"),2);a.position.set(3.5,4.5,2);let o=new Zt(new te("#dff4ff"),.7);o.position.set(-4,1,1),this.rim=new Zt(new te("#c9f3ff"),1.6),this.rim.position.set(1.5,3,-14);let l=new tt;this.scene.add(l);for(let c of[a,o,this.rim])c.target=l,r.add(c);this.scene.add(this.head),this.head.name="HeadLocal",this.overlayScene.environment=this.envTex,this.overlayScene.environmentIntensity=.7,this.overlayScene.add(new Ii(new te("#eaf8ff"),new te("#f1d6c2"),1.1)),this.ovKey=new Zt(new te("#fff1e0"),2.2),this.ovFill=new Zt(new te("#dff4ff"),.8),this.overlayScene.add(this.ovKey,this.ovFill,this.overlay),this.renderer.autoClear=!1}resize(e,t){this.width=Math.max(1,e),this.height=Math.max(1,t),this.renderer.setPixelRatio(this.pixelRatioOverride??Math.min(window.devicePixelRatio||1,this.dprCap)),this.renderer.setSize(this.width,this.height,!1),this.rig.resize(this.width/this.height,this.width,this.height)}setQuality(e){this.dprCap=e==="low"?1.25:2,this.resize(this.width,this.height)}render(){if(this.contextLost)return;let e=this.rig.camera;this.rim.position.set(1.5,3,-this.rig.dist*1.8);let t=this.renderer;t.clear(),t.render(this.scene,e),this.overlay.visible&&(this.ovKey.position.set(3.5,4.5,2).applyMatrix4(e.matrixWorld),this.ovFill.position.set(-4,1,1).applyMatrix4(e.matrixWorld),this.ovKey.target.position.copy(this.rig.target),this.ovKey.target.updateMatrixWorld(),this.ovFill.target.position.copy(this.rig.target),this.ovFill.target.updateMatrixWorld(),t.clearDepth(),t.render(this.overlayScene,e))}captureHidden=[];capture(e,t){let n=this.captureHidden.map(m=>m.visible);this.captureHidden.forEach(m=>{m.visible=!1});let i=this.renderer,r=i.getPixelRatio(),a=i.domElement,o=Math.max(64,Math.min(e,a.width,a.height)),l=o/r,c=this.rig.camera,h={pos:c.position.clone(),q:c.quaternion.clone(),aspect:c.aspect,view:c.view&&c.view.enabled?{...c.view}:null};c.clearViewOffset();let u=t.az??0,d=t.el??.12,f=t.radius/Math.sin(c.fov*Math.PI/360);c.aspect=1,c.updateProjectionMatrix(),c.position.set(Math.sin(u)*Math.cos(d)*f,t.ty+Math.sin(d)*f,Math.cos(u)*Math.cos(d)*f),c.lookAt(new C(0,t.ty,0)),c.updateMatrixWorld(!0);let g=this.overlay.visible;this.overlay.visible=!1,i.setScissorTest(!0),i.setViewport(0,0,l,l),i.setScissor(0,0,l,l),i.setClearColor(0,0),i.clear(),this.rim.position.set(1.5,3,-f*1.8),i.render(this.scene,c);let x=document.createElement("canvas");x.width=e,x.height=e;let p=x.getContext("2d");return p.imageSmoothingQuality="high",p.drawImage(a,0,a.height-o,o,o,0,0,e,e),i.setScissorTest(!1),i.setViewport(0,0,this.width,this.height),this.overlay.visible=g,this.captureHidden.forEach((m,b)=>{m.visible=n[b]}),c.position.copy(h.pos),c.quaternion.copy(h.q),c.aspect=h.aspect,h.view&&c.setViewOffset(h.view.fullWidth,h.view.fullHeight,h.view.offsetX,h.view.offsetY,h.view.width,h.view.height),c.updateProjectionMatrix(),c.updateMatrixWorld(!0),this.render(),x}renderRegion(e,t,n){let i=this.renderer,r=i.getPixelRatio(),a=i.domElement,o=Math.max(32,Math.min(n,a.width,a.height)),l=o/r;i.setScissorTest(!0),i.setViewport(0,0,l,l),i.setScissor(0,0,l,l),i.setClearColor(0,0),i.clear(),i.render(e,t);let c=document.createElement("canvas");return c.width=n,c.height=n,c.getContext("2d").drawImage(a,0,a.height-o,o,o,0,0,n,n),i.setScissorTest(!1),i.setViewport(0,0,this.width,this.height),this.render(),c.toDataURL("image/png")}dispose(){this.envTex?.dispose(),this.renderer.dispose()}};var cr={browY:0,browRot:0,eyeSY:1,eyeSX:1,mouthSX:1,mouthSY:1,cheekY:0,tear:1,mouthFlip:0,eyeClose:0},Op=new ni(1,40,28),Bp=new ni(1,18,12);function Cy(s){let e=[[.37,-.79],[.5,-.86],[.78,-.98],[1.02,-1.14],[1.16,-1.34],[1.22,-1.58],[1.24,-1.84]],t=Math.min(.9999,Math.max(0,s))*(e.length-1),n=Math.floor(t),i=t-n,r=e[Math.max(0,n-1)],a=e[n],o=e[n+1],l=e[Math.min(e.length-1,n+2)],c=(h,u,d,f)=>.5*(2*u+(-h+d)*i+(2*h-5*u+4*d-f)*i*i+(-h+3*u-3*d+f)*i*i*i);return{r:c(r[0],a[0],o[0],l[0]),y:c(r[1],a[1],o[1],l[1])}}var kp=.66;function zp(s,e,t){let{r:n,y:i}=Cy(e),r=1+(.012+.04*e)*Math.sin(s*16)+.015*e*Math.sin(s*7+1.3);return t.set(Math.sin(s)*n*r,i+.03*e*Math.sin(s*16+.6),Math.cos(s)*n*r*kp)}function Iy(){let s=new ot;s.name="CapeProcedural";let e=128,t=24,n=new Float32Array((e+1)*(t+1)*3),i=[],r=new C;for(let x=0;x<=t;x++)for(let p=0;p<=e;p++)zp(p/e*Math.PI*2,x/t,r),n.set([r.x,r.y,r.z],(x*(e+1)+p)*3);for(let x=0;x<t;x++)for(let p=0;p<e;p++){let m=x*(e+1)+p,b=m+1,M=m+e+1,y=M+1;i.push(m,M,b,b,M,y)}let a=new ft;a.setAttribute("position",new ut(n,3)),a.setIndex(i),a.computeVertexNormals();let o=new dt({color:"#5fd3e6",roughness:.42,sheen:.8,sheenColor:new te("#d8fbff"),sheenRoughness:.4,clearcoat:.35,clearcoatRoughness:.35,side:Ot}),l=new qe(a,o);l.name="CapeSurface",s.add(l);let c=new ft,h=160,u=10,d=new Float32Array((h+1)*(u+1)*3),f=[];for(let x=0;x<=u;x++)for(let p=0;p<=h;p++){let m=p/h*Math.PI*2,b=x/u*Math.PI*2,M=.4+.012*Math.sin(m*30),y=.05+.008*Math.sin(m*30),w=Math.sin(m)*(M+y*Math.cos(b)),T=Math.cos(m)*(M+y*Math.cos(b))*.9,E=-.8+y*Math.sin(b)*.9;d.set([w,E,T],(x*(h+1)+p)*3)}for(let x=0;x<u;x++)for(let p=0;p<h;p++){let m=x*(h+1)+p,b=m+1,M=m+h+1,y=M+1;f.push(m,b,M,b,y,M)}c.setAttribute("position",new ut(d,3)),c.setIndex(f),c.computeVertexNormals();let g=new qe(c,new dt({color:"#8fe4f0",roughness:.5,sheen:.6,sheenColor:new te("#ffffff")}));return g.name="CapeCollar",s.add(g),s}var hr=class{group=new ot;def;parts=[];scalp;skinColor=new te;pivots={brow:[],eye:[],mouth:[],cheek:[],tear:[],stache:[]};closedEyes=[];cur={...cr};target={...cr};exprUntil=0;exprKind="idle";nextBlink=0;blinkUntil=0;materials=new Set;geometries=new Set;nod=0;nodStart=-1;constructor(e,t){this.def=t;let n=e.scene.clone(!0);this.group.add(n),this.group.name=`Character_${t.id}`;let i=null;if(n.traverse(d=>{d.isMesh&&d.name==="Head"&&(i=d)}),!i)throw new Error(`character ${t.id} has no Head mesh`);let r=i;this.skinColor.copy(r.material.color);let a=this.skinColor.getHex(),o=new Map,l=(d,f)=>{let g=d.color.getHex(),x=g===a,p=`${g}|${x}|${f.startsWith("Eye_white")?"eye":""}|${f==="Tear"?"tear":""}`,m=o.get(p);if(m)return m;let b=d.color.clone();return x?m=new dt({color:b,roughness:.55,sheen:.22,sheenColor:new te("#ffb59a"),sheenRoughness:.6,clearcoat:.1,clearcoatRoughness:.5}):f.startsWith("Eye_white")?m=new dt({color:b,roughness:.18,clearcoat:1,clearcoatRoughness:.08}):f==="Tear"?m=new dt({color:b,roughness:.05,transmission:0,transparent:!0,opacity:.85,clearcoat:1}):d.color.getHSL({h:0,s:0,l:0}).l<.25?m=new Ri({color:new te("#100d10")}):/^(Cheek|Blush)/.test(f)?m=new dt({color:b.clone().lerp(new te("#f08a78"),.35),roughness:.55,sheen:.2,sheenColor:new te("#ffb59a")}):m=new dt({color:b,roughness:Math.max(.3,d.roughness),clearcoat:.2,clearcoatRoughness:.4}),o.set(p,m),this.materials.add(m),m},c=[];n.traverse(d=>{let f=d;if(!f.isMesh)return;let g=f.geometry.attributes.position.count,x=g===315||g===117;if(f.name==="Cape"||f.name==="Collar"){c.push(f);return}if(f.name==="Head"){let p=new ni(1,72,54);p.setAttribute("color",new ut(new Float32Array(p.attributes.position.count*3).fill(1),3)),this.geometries.add(p),f.geometry=p;let m=new dt({color:this.skinColor.clone(),roughness:.36,sheen:.2,sheenColor:new te("#ffcab3"),sheenRoughness:.5,clearcoat:.6,clearcoatRoughness:.2,vertexColors:!0});this.materials.add(m),f.material=m;return}x&&(f.geometry=/^(Neck|Ear_|Cheek|Nose|Chin|Jaw|Muzzle|Wide_chin|Long_chin|Mouth_rim|Mouth_open)/.test(f.name)?Op:Bp),f.material=l(f.material,f.name)}),c.forEach(d=>d.parent?.remove(d));let h=Iy();n.add(h),h.traverse(d=>{let f=d;f.isMesh&&(this.geometries.add(f.geometry),this.materials.add(f.material))});let u=n.getObjectByName("Emotion_badge");if(u){let d=Math.atan2(u.position.x,u.position.z/kp),f=new C;zp(d,.38,f),u.position.copy(f).multiplyScalar(1.01),u.lookAt(f.clone().multiplyScalar(2))}this.scalp=r,this.group.updateMatrixWorld(!0),n.traverse(d=>{let f=d;if(!f.isMesh||!xp(f.name)||f.parent!==n||f.geometry!==Op&&f.geometry!==Bp)return;let g=vp(f.name,f.matrixWorld.elements);g&&this.parts.push(g)}),this.buildRig(n),this.nextBlink=performance.now()+1500}buildRig(e){let t={},n=(i,r)=>{(t[i]??=[]).push(r)};for(let i of[...e.children]){let r=i.name,a=i.position.x<-.02?-1:i.position.x>.02?1:0;/^Brow/.test(r)?n(`brow${a}`,i):/^Eye_/.test(r)?n(`eye${a}`,i):/^(Smile|Lower_lip|Mouth|Tongue|Tooth)/.test(r)?n("mouth0",i):/^(Cheek|Blush)/.test(r)?n(`cheek${a}`,i):/^Tear/.test(r)?n("tear0",i):/^Moustache/.test(r)&&n("stache0",i)}for(let[i,r]of Object.entries(t)){let a=i.replace(/-?\d$/,""),o=Number(i.slice(a.length))||0,l=new C;r.forEach(u=>l.add(u.position)),l.multiplyScalar(1/r.length);let c=new ot;c.name=`Pivot_${i}`,c.position.copy(l),e.add(c);for(let u of r)u.position.sub(l),c.add(u);this.pivots[a]?.push({obj:c,side:o,base:l.clone(),baseRotZ:0});let h=r.find(u=>u.name.startsWith("Eye_white"));if(a==="eye"&&h){let u=h.scale.x*.95,d=h.scale.y*.75,f=new es(new C(-u,-d*.35,0),new C(0,d*1.25,0),new C(u,-d*.35,0)),g=new Yr(f,16,.019,6,!1),x=new Ri({color:"#1a1416"});this.geometries.add(g),this.materials.add(x);let p=new qe(g,x);p.name=`Eye_closed_${o}`,p.position.set(l.x,l.y,l.z+h.scale.z*.85),p.rotation.z=h.rotation.z,p.visible=!1,e.add(p),this.closedEyes.push(p)}}}setExpression(e,t,n=700){this.exprKind=e,this.exprUntil=e==="happy"?1/0:t+n;let i=this.def.id,r={...cr};e==="tickle"?(r.browY=.022,r.cheekY=i==="joy"?.035:.018,r.mouthSX=1.06,i==="base"||i==="laughter"?r.eyeClose=1:i==="sadness"?r.eyeSY=.78:i==="anger"?(r.eyeSY=.7,r.browRot=.08,r.browY=.012):r.eyeSY=.8):e==="surprise"?(r.eyeSY=1.22,r.eyeSX=1.12,r.browY=.05,r.mouthSY=1.35,r.mouthSX=.88):e==="happy"&&(r.eyeClose=1,r.eyeSY=.85,r.browY=.03,r.cheekY=.03,r.mouthSX=1.18,r.mouthSY=i==="laughter"?1.3:1.12,i==="anger"&&(r.browRot=-.22,r.mouthFlip=.6),i==="sadness"&&(r.browRot=.22,r.tear=0,r.mouthFlip=1),this.nodStart=t),this.target=r}update(e,t){this.exprKind!=="happy"&&e>this.exprUntil&&this.exprKind!=="idle"&&(this.exprKind="idle",this.target={...cr});let n=1;this.exprKind==="idle"&&(e>this.nextBlink&&(this.blinkUntil=e+130,this.nextBlink=e+2600+Math.random()*2600),e<this.blinkUntil&&(n=.12));let i=1-Math.exp(-t*14),r=this.cur,a=this.target;Object.keys(r).forEach(l=>{r[l]+=(a[l]-r[l])*i});for(let l of this.pivots.brow)l.obj.position.y=l.base.y+r.browY,l.obj.rotation.z=l.side*r.browRot;let o=this.closedEyes.length>0&&r.eyeClose>.5;for(let l of this.pivots.eye)l.obj.visible=!o,l.obj.scale.set(r.eyeSX,r.eyeSY*n,1);for(let l of this.closedEyes)l.visible=o,l.scale.setScalar(.9+.1*r.eyeClose);for(let l of this.pivots.mouth){let c=1-2*r.mouthFlip;l.obj.scale.set(r.mouthSX,r.mouthSY*(Math.abs(c)<.15?.15*Math.sign(c||1):c),1)}for(let l of this.pivots.cheek)l.obj.position.y=l.base.y+r.cheekY;for(let l of this.pivots.tear)l.obj.scale.setScalar(Math.max(.001,r.tear));for(let l of this.pivots.stache)l.obj.position.y=l.base.y+r.cheekY*.5;if(this.nodStart>=0){let l=(e-this.nodStart)/1e3;this.nod=l<1.3?Math.sin(l*Math.PI*2/.65)*.07*(1-l/1.3):0,l>=1.3&&(this.nodStart=-1)}else this.nod=0}openEyes(e,t=1500){this.nextBlink=e+t,this.blinkUntil=0,this.update(e,1)}resetExpression(){this.exprKind="idle",this.target={...cr},this.cur={...cr},this.nodStart=-1,this.nod=0,this.update(performance.now(),1)}dispose(){this.group.removeFromParent(),this.materials.forEach(e=>e.dispose()),this.geometries.forEach(e=>e.dispose())}};var Vp={classic:{spacing:1,jitter:.3,size:1.02,twist:1},rainbow:{spacing:1,jitter:.3,size:1.02,twist:1},jumbo:{spacing:1,jitter:.32,size:1,twist:1},tight:{spacing:.85,jitter:.22,size:1.08,twist:1},mohawk:{spacing:.95,jitter:.16,size:.98,twist:1},twins:{spacing:.95,jitter:.28,size:1.02,twist:1},swirl:{spacing:1,jitter:.3,size:1.02,twist:2.5},flat:{spacing:1.05,jitter:.05,size:.98,twist:0}};function Py(s){let e=s>>>0||1;return()=>(e^=e<<13,e>>>=0,e^=e>>>17,e^=e<<5,e>>>=0,e/4294967296)}function Ru(s){let e=new Xr(1,s);e.deleteAttribute("normal"),e.deleteAttribute("uv");let t=e.attributes.position;for(let i=0;i<t.count;i++){let r=t.getX(i),a=t.getY(i),o=t.getZ(i),l=Math.hypot(r,a,o)||1,c=r/l,h=a/l,u=o/l,f=1+.16*(Math.sin(5.1*c+1.3)*Math.sin(4.7*h+.4)*Math.sin(5.3*u+2.2)*.75+Math.sin(9.3*c+9.1*h+.5)*.25+Math.sin(8.7*u-7.9*c)*.2);t.setXYZ(i,c*f,h*f*.92,u*f)}let n=Rp(e);return n.computeVertexNormals(),e.dispose(),n}var ur=class{mesh;state;look;K;start;spacing;frames;jit;sizeJ;quats;prevH;blobColor;m=new Ee;q=new It;p=new C;s=new C;zero=new Ee().makeScale(0,0,0);totalBlobs;constructor(e,t,n,i){this.state=e,this.look=Vp[e.kind]??Vp.classic;let r=e.count;this.K=new Uint8Array(r),this.start=new Int32Array(r),this.spacing=new Float32Array(r),this.frames=new Float32Array(r*6),this.prevH=new Float32Array(r);let a=t==="low"?1.6:1,o=0;for(let u=0;u<r;u++){let d=e.radius[u],f=Math.max(1,Math.min(14,Math.round(e.initH[u]/(d*this.look.spacing*a))));this.K[u]=f,this.start[u]=o,this.spacing[u]=e.initH[u]/f,o+=f;let g=e.growth[u*3],x=e.growth[u*3+1],p=e.growth[u*3+2],m=Math.abs(x)<.9?0:1,b=Math.abs(x)<.9?1:0,M=0,y=b*p-M*x,w=M*g-m*p,T=m*x-b*g,E=Math.hypot(y,w,T)||1;y/=E,w/=E,T/=E;let v=x*T-p*w,A=p*y-g*T,I=g*w-x*y;this.frames.set([y,w,T,v,A,I],u*6),m=b=M=0}this.totalBlobs=o,this.jit=new Float32Array(o*2),this.sizeJ=new Float32Array(o),this.quats=new Float32Array(o*4),this.blobColor=new Uint32Array(o);let l=Py(24301+r),c=new te,h=new Qt(n,i,o);h.instanceMatrix.setUsage(ci),h.frustumCulled=!1,h.name="HairInstances";for(let u=0;u<r;u++){let d=this.K[u],f=Math.atan2(e.pos[u*3],e.pos[u*3+2]);for(let g=0;g<d;g++){let x=this.start[u]+g,p=l()*Math.PI*2+this.look.twist*(g/Math.max(1,d-1))*1.6+f*(this.look.twist>1?1:0),m=this.look.jitter*(.4+.6*l())*(g===0?.4:1);this.jit[x*2]=Math.cos(p)*m,this.jit[x*2+1]=Math.sin(p)*m,this.sizeJ[x]=this.look.size*(.86+l()*.24)*(g===0&&d>1?.78:1),this.q.set(l()-.5,l()-.5,l()-.5,l()-.5).normalize(),this.q.toArray(this.quats,x*4);let M=(d===1?.62:.45+.55*(g/(d-1)))*(.88+l()*.24);c.setHex(e.colorHex[u]),c.multiplyScalar(M),this.blobColor[x]=c.getHex(),h.setColorAt(x,c)}}h.instanceColor&&(h.instanceColor.needsUpdate=!0),this.mesh=h,this.prevH.fill(-1);for(let u=0;u<r;u++)this.writeRoot(u);this.prevH.set(e.h),h.instanceMatrix.needsUpdate=!0}sync(e,t){if(e.length===0)return;let n=this.state;for(let i of e){let r=this.prevH[i],a=n.h[i];if(t&&a<r){let o=this.spacing[i],l=Math.ceil(a/o-1e-6),c=Math.ceil(r/o-1e-6);for(let h=Math.max(l,0);h<c;h++)this.emitBlob(i,h,t);a===0&&c===l&&this.emitBlob(i,0,t)}this.writeRoot(i),this.prevH[i]=a}this.mesh.instanceMatrix.needsUpdate=!0}emitBlob(e,t,n){let i=this.state,r=this.spacing[e],a=this.start[e]+t,o=e*3,l=e*6,c=i.radius[e]*this.sizeJ[a],h=(t+.5)*r,u=this.jit[a*2]*i.radius[e],d=this.jit[a*2+1]*i.radius[e];n({x:i.base[o]+i.growth[o]*h+this.frames[l]*u+this.frames[l+3]*d,y:i.base[o+1]+i.growth[o+1]*h+this.frames[l+1]*u+this.frames[l+4]*d,z:i.base[o+2]+i.growth[o+2]*h+this.frames[l+2]*u+this.frames[l+5]*d,size:c,color:this.blobColor[a],rootId:e})}writeRoot(e){let t=this.state,n=t.h[e],i=this.K[e],r=this.spacing[e],a=e*3,o=e*6,l=this.mesh.instanceMatrix.array,c=t.radius[e];for(let h=0;h<i;h++){let u=this.start[e]+h,d=n<=0?0:Math.min(1,Math.max(0,(n-h*r)/r));if(d<=0){this.zero.toArray(l,u*16);continue}let f=h*r+.5*r*d,g=c*(.35+.65*d),x=this.jit[u*2]*g,p=this.jit[u*2+1]*g;this.p.set(t.base[a]+t.growth[a]*f+this.frames[o]*x+this.frames[o+3]*p,t.base[a+1]+t.growth[a+1]*f+this.frames[o+1]*x+this.frames[o+4]*p,t.base[a+2]+t.growth[a+2]*f+this.frames[o+2]*x+this.frames[o+5]*p);let m=c*this.sizeJ[u]*Math.sqrt(d);this.s.set(m,m,m),this.q.fromArray(this.quats,u*4),this.m.compose(this.p,this.q,this.s),this.m.toArray(l,u*16)}}syncAll(){for(let e=0;e<this.state.count;e++)this.writeRoot(e);this.prevH.set(this.state.h),this.mesh.instanceMatrix.needsUpdate=!0}dispose(){this.mesh.dispose()}},Jl=class{geo;colors;vStart;vRoot;vW;rStart;rVert;state;tint=[.5,.42,.44];constructor(e,t,n){this.state=e,this.geo=t.geometry;let i=this.geo.attributes.position,r=i.count;this.colors=new Float32Array(r*3).fill(1),this.geo.setAttribute("color",new ut(this.colors,3).setUsage(ci));let a=.16,o=Array.from({length:r},()=>[]),l=Array.from({length:r},()=>[]),c=Array.from({length:e.count},()=>[]);for(let d=0;d<r;d++){let f=i.getX(d)*n[0],g=i.getY(d)*n[1],x=i.getZ(d)*n[2];if(!(g<-.6))for(let p=0;p<e.count;p++){let m=e.pos[p*3]-f,b=e.pos[p*3+1]-g,M=e.pos[p*3+2]-x,y=m*m+b*b+M*M;if(y<a*a){let w=1-Math.sqrt(y)/a;o[d].push(p),l[d].push(w*w*(3-2*w)),c[p].push(d)}}}this.vStart=new Int32Array(r+1);let h=0;for(let d=0;d<r;d++)this.vStart[d]=h,h+=o[d].length;this.vStart[r]=h,this.vRoot=new Int32Array(h),this.vW=new Float32Array(h);for(let d=0;d<r;d++)this.vRoot.set(o[d],this.vStart[d]),this.vW.set(l[d],this.vStart[d]);this.rStart=new Int32Array(e.count+1);let u=0;for(let d=0;d<e.count;d++)this.rStart[d]=u,u+=c[d].length;this.rStart[e.count]=u,this.rVert=new Int32Array(u);for(let d=0;d<e.count;d++)this.rVert.set(c[d],this.rStart[d]);for(let d=0;d<r;d++)this.shadeVertex(d);this.geo.attributes.color.needsUpdate=!0}shadeVertex(e){let t=0,n=this.state.h;for(let r=this.vStart[e];r<this.vStart[e+1];r++){let a=n[this.vRoot[r]];a>0&&(t+=this.vW[r]*(.35+.65*Math.min(1,a/.08)))}t=Math.min(1,t*.8);let i=this.colors;i[e*3]=1+(this.tint[0]-1)*t,i[e*3+1]=1+(this.tint[1]-1)*t,i[e*3+2]=1+(this.tint[2]-1)*t}update(e){if(!e.length)return;let t=new Set;for(let n of e)for(let i=this.rStart[n];i<this.rStart[n+1];i++)t.add(this.rVert[i]);for(let n of t)this.shadeVertex(n);this.geo.attributes.color.needsUpdate=!0}refreshAll(){let e=this.vStart.length-1;for(let t=0;t<e;t++)this.shadeVertex(t);this.geo.attributes.color.needsUpdate=!0}};var Ly=new ni(1,28,20),Ny=new C(0,.3,0),jl=class{group=new ot;models=new Map;active=null;activeId="";mats=new Set;windowWorld=new C;scale=1.12;leftHanded=!1;collectedLevel=0;m=new Ee;x=new C;y=new C;z=new C;toCam=new C;right=new C;up=new C;constructor(){this.group.name="Clipper",this.group.visible=!1,this.group.renderOrder=5}add(e,t){let n=t.scene.clone(!0),i={root:n,indicator:[],glow:[],foils:[],collected:[]};n.traverse(r=>{let a=r;if(!a.isMesh)return;let o=a.material,l=a.geometry.attributes.position.count;(l===315||l===117)&&(a.geometry=Ly);let c;o.metalness>.5?c=new Ft({color:o.color,metalness:.95,roughness:.22}):a.name==="Collector_window"?c=new dt({color:"#e9fffb",roughness:.05,transparent:!0,opacity:.38,clearcoat:1,depthWrite:!1}):a.name==="Indicator"||a.name==="Power_button"?(c=new Ft({color:o.color,roughness:.3,emissive:new te(e==="detail"?"#3ee6ff":e==="turbo"?"#ff9d3c":"#7ff3ff"),emissiveIntensity:a.name==="Indicator"?.8:0}),a.name==="Indicator"&&i.glow.push(c)):a.name.startsWith("Grip")?c=new dt({color:o.color,roughness:.32,clearcoat:.8,clearcoatRoughness:.18,sheen:.2}):c=new Ft({color:o.color,roughness:Math.max(.45,o.roughness)}),this.mats.add(c),a.material=c,a.name.startsWith("Foil")&&i.foils.push(a),a.name.startsWith("Collected_hair")&&i.collected.push(a),a.name==="Indicator"&&i.indicator.push(a)}),n.visible=!1,this.group.add(n),this.models.set(e,i)}cloneModel(e){let t=this.models.get(e);if(!t)return null;let n=t.root.clone(!0);return n.visible=!0,n.traverse(i=>{i.visible=!i.name.startsWith("Collected_hair")}),n}setActive(e){this.activeId=e;for(let[t,n]of this.models)n.root.visible=t===e;this.active=this.models.get(e)??null,this.setCollected(0)}setCollected(e){this.collectedLevel=Math.max(0,Math.min(1,e));let t=this.active?.collected??[],n=Math.round(this.collectedLevel*t.length);t.forEach((i,r)=>{i.visible=r<n})}get collected(){return this.collectedLevel}pose(e,t,n,i,r){this.toCam.copy(t.position).sub(e).normalize(),this.right.setFromMatrixColumn(t.matrixWorld,0),this.up.setFromMatrixColumn(t.matrixWorld,1);let a=this.leftHanded?1:-1;this.y.copy(this.toCam).multiplyScalar(-.45).addScaledVector(this.up,.7).addScaledVector(this.right,a*.5).normalize(),this.z.copy(this.toCam).addScaledVector(this.y,-this.toCam.dot(this.y)).normalize(),this.x.crossVectors(this.y,this.z).normalize(),this.m.makeBasis(this.x,this.y,this.z),this.group.quaternion.setFromRotationMatrix(this.m),this.group.scale.setScalar(this.scale);let o=Ny.clone().multiplyScalar(this.scale).applyQuaternion(this.group.quaternion);if(this.group.position.copy(e).sub(o),n){let h=.004*this.scale;this.group.position.x+=(Math.random()-.5)*h,this.group.position.y+=(Math.random()-.5)*h}let l=this.active;if(l){for(let h of l.glow)h.emissiveIntensity=i?2.6+Math.sin(r*.04)*.6:n?1.2:.6,this.activeId==="turbo"&&h.emissive.set(i?"#ffd15c":"#ff9d3c");for(let h of l.foils)n&&(h.rotation.x+=.6)}this.group.updateMatrixWorld(!0);let c=l?.root.getObjectByName("Collector_window");c?c.getWorldPosition(this.windowWorld):this.windowWorld.copy(this.group.position)}dispose(){this.mats.forEach(e=>e.dispose()),this.group.removeFromParent()}};var Ql=class{mesh;pool=[];cursor=0;m=new Ee;q=new It;s=new C;c=new te;zero=new Ee().makeScale(0,0,0);suckTarget=null;limit=120;alive=0;enabled=!0;capacity;constructor(e,t,n){this.capacity=n,this.mesh=new Qt(e,t,n),this.mesh.instanceMatrix.setUsage(ci),this.mesh.frustumCulled=!1,this.mesh.name="FallingCurls";for(let i=0;i<n;i++)this.pool.push({alive:!1,pos:new C,vel:new C,axis:new C(0,1,0),ang:0,spin:0,size:0,life:1,age:0,suck:!1}),this.mesh.setMatrixAt(i,this.zero),this.mesh.setColorAt(i,this.c.set(2236962));this.mesh.count=0}spawn(e,t,n,i,r,a){if(!this.enabled||this.alive>=this.limit)return;let o=this.cursor,l=this.pool[o];this.cursor=(this.cursor+1)%this.capacity,l.alive||this.alive++,l.alive=!0,l.pos.set(e,t,n);let c=a?a.x:0,h=a?a.y:0,u=a?a.z:0;l.vel.set(c*.9+(Math.random()-.5)*.9,h*.6+.4+Math.random()*.6,u*.9+(Math.random()-.5)*.9),l.axis.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),l.ang=Math.random()*6,l.spin=(Math.random()-.5)*14,l.size=i*(.75+Math.random()*.25),l.life=.8+Math.random()*.35,l.age=0,l.suck=!!this.suckTarget,this.mesh.setColorAt(o,this.c.setHex(r)),this.mesh.count=Math.max(this.mesh.count,o+1),this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}update(e){let t=!1;for(let n=0;n<this.capacity;n++){let i=this.pool[n];if(!i.alive)continue;if(t=!0,i.age+=e,i.age>=i.life){i.alive=!1,this.alive--,this.mesh.setMatrixAt(n,this.zero);continue}if(i.suck&&this.suckTarget){let o=this.s.copy(this.suckTarget).sub(i.pos),l=o.length();if(l<.05){i.alive=!1,this.alive--,this.mesh.setMatrixAt(n,this.zero);continue}i.vel.lerp(o.multiplyScalar(9/Math.max(l,.2)),Math.min(1,e*10))}else i.vel.y-=7.5*e,i.vel.multiplyScalar(1-.6*e);i.pos.addScaledVector(i.vel,e),i.ang+=i.spin*e;let r=Math.min(1,(i.life-i.age)/(i.life*.35)),a=i.size*(i.suck?Math.max(.15,1-i.age/i.life):r);this.q.setFromAxisAngle(i.axis,i.ang),this.m.compose(i.pos,this.q,this.s.set(a,a,a)),this.mesh.setMatrixAt(n,this.m)}t?this.mesh.instanceMatrix.needsUpdate=!0:this.mesh.count&&(this.mesh.count=0)}clear(){for(let e=0;e<this.capacity;e++)this.pool[e].alive=!1,this.mesh.setMatrixAt(e,this.zero);this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.count=0,this.alive=0}get active(){return this.alive}dispose(){this.mesh.dispose()}};function Cu(s){let e=new Ft({color:16777215,roughness:.58,metalness:0,envMapIntensity:.35});return e.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vCurlPos;
varying float vCurlSeed;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vCurlPos = position;
        #ifdef USE_INSTANCING
          vCurlSeed = fract(dot(instanceMatrix[3].xyz, vec3(12.9898, 78.233, 37.719)));
        #else
          vCurlSeed = 0.37;
        #endif`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vCurlPos;
        varying float vCurlSeed;
        float curlHeight(vec3 p, float s) {
          vec3 q = normalize(p);
          float th = atan(q.z, q.x);
          float a = sin(th * 3.0 + q.y * 9.0 + s * 31.0);
          float b = sin(th * 5.0 - q.y * 6.5 + s * 17.0);
          return a * 0.65 + b * 0.35;
        }
        vec3 curlPerturb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDir) {
          vec3 sx = normalize(dFdx(surf_pos)), sy = normalize(dFdy(surf_pos));
          vec3 r1 = cross(sy, surf_norm), r2 = cross(surf_norm, sx);
          float det = dot(sx, r1) * faceDir;
          vec3 grad = sign(det) * (dHdxy.x * r1 + dHdxy.y * r2);
          return normalize(abs(det) * surf_norm - grad);
        }`).replace("#include <color_fragment>",`#include <color_fragment>
        float curlH = curlHeight(vCurlPos, vCurlSeed);
        diffuseColor.rgb *= 0.62 + 0.38 * smoothstep(-0.7, 0.8, curlH);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        ${s?"normal = curlPerturb(-vViewPosition, normal, vec2(dFdx(curlH), dFdy(curlH)) * 0.55, faceDirection);":""}`)},e.customProgramCacheKey=()=>`afro-curl-${s?1:0}`,e}var ec=class{brush;rings;fineRings;ringMat;fineMat;brushMat;m=new Ee;q=new It;p=new C;s=new C;n=new C;up=new C(0,0,1);camLocal=new C;cap=900;constructor(){this.brushMat=new Kt({color:"#ffffff",transparent:!0,opacity:.85,depthTest:!1,depthWrite:!1,side:Ot}),this.brush=new qe(new Ei(.93,1,64),this.brushMat),this.brush.renderOrder=20,this.brush.visible=!1,this.brush.name="BrushOutline";let e=new qe(new Ei(0,.07,20),this.brushMat);this.brush.add(e),this.ringMat=new Kt({color:"#ff855e",transparent:!0,opacity:.9,depthTest:!1,depthWrite:!1,side:Ot}),this.rings=new Qt(new Ei(.72,1,28),this.ringMat,this.cap),this.rings.instanceMatrix.setUsage(ci),this.rings.frustumCulled=!1,this.rings.renderOrder=18,this.rings.count=0,this.fineMat=new Kt({color:"#3ee6ff",transparent:!0,opacity:.6,depthTest:!1,depthWrite:!1,side:Ot,blending:is}),this.fineRings=new Qt(new Ei(.84,1,20),this.fineMat,this.cap),this.fineRings.instanceMatrix.setUsage(ci),this.fineRings.frustumCulled=!1,this.fineRings.renderOrder=19,this.fineRings.count=0}addTo(e,t){e.add(this.brush),t.add(this.rings,this.fineRings)}showBrush(e,t,n,i){if(!e){this.brush.visible=!1;return}this.brush.visible=!0,this.brush.position.copy(e),this.brush.quaternion.copy(t.quaternion),this.brush.scale.setScalar(n),this.brushMat.color.set(i)}updateRings(e,t,n,i,r,a){this.camLocal.copy(t).applyMatrix4(n);let o=0,l=0,c=1+.15*Math.sin(a*.008);if(i||r)for(let h=0;h<e.count;h++){let u=e.h[h];if(u<=0)continue;let d=h*3;if(this.n.set(e.normal[d],e.normal[d+1],e.normal[d+2]),this.p.set(e.pos[d],e.pos[d+1],e.pos[d+2]),this.s.copy(this.camLocal).sub(this.p).normalize().dot(this.n)<.05)continue;let g=e.baseOffset[h]+u+.012;if(this.p.set(e.base[d]+e.growth[d]*(u+.012),e.base[d+1]+e.growth[d+1]*(u+.012),e.base[d+2]+e.growth[d+2]*(u+.012)),this.q.setFromUnitVectors(this.up,this.n),i&&o<this.cap){let x=.06*c;this.m.compose(this.p,this.q,this.s.set(x,x,x)),this.rings.setMatrixAt(o++,this.m)}r&&u<.16&&l<this.cap&&(this.m.compose(this.p,this.q,this.s.set(.032,.032,.032)),this.fineRings.setMatrixAt(l++,this.m))}this.rings.count=o,this.fineRings.count=l,o&&(this.rings.instanceMatrix.needsUpdate=!0),l&&(this.fineRings.instanceMatrix.needsUpdate=!0),this.ringMat.opacity=.65+.3*Math.sin(a*.008)}hideRings(){this.rings.count=0,this.fineRings.count=0}setRingColor(e){this.ringMat.color=new te(e)}dispose(){this.brush.geometry.dispose(),this.brushMat.dispose(),this.rings.geometry.dispose(),this.ringMat.dispose(),this.rings.dispose(),this.fineRings.geometry.dispose(),this.fineMat.dispose(),this.fineRings.dispose()}};function Dy(){let s=document.createElement("canvas");s.width=s.height=64;let e=s.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,30);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,250,220,0.8)"),t.addColorStop(1,"rgba(255,240,200,0)"),e.fillStyle=t,e.beginPath();for(let i=0;i<8;i++){let r=i/8*Math.PI*2,a=i%2===0?31:7;e.lineTo(32+Math.cos(r)*a,32+Math.sin(r)*a)}return e.closePath(),e.fill(),new Hr(s)}var tc=class{group=new ot;pool=[];mat;cursor=0;constructor(e=28){this.mat=new Vs({map:Dy(),color:16777215,transparent:!0,blending:is,depthTest:!1,depthWrite:!1});for(let t=0;t<e;t++){let n=new Ur(this.mat.clone());n.visible=!1,n.renderOrder=25,this.group.add(n),this.pool.push({sprite:n,age:0,life:.5,size:.2,alive:!1})}}burst(e,t){for(let n=0;n<t;n++){let i=this.pool[this.cursor];this.cursor=(this.cursor+1)%this.pool.length,i.alive=!0,i.age=-n*.04,i.life=.45+Math.random()*.25,i.size=.12+Math.random()*.16,i.sprite.position.set(e.x+(Math.random()-.5)*.35,e.y+(Math.random()-.5)*.3,e.z+(Math.random()-.5)*.35),i.sprite.visible=!1}}update(e,t){for(let n of this.pool){if(!n.alive||(n.age+=e,n.age<0))continue;if(n.age>=n.life){n.alive=!1,n.sprite.visible=!1;continue}let i=n.age/n.life;n.sprite.visible=!0;let r=n.size*Math.sin(i*Math.PI);n.sprite.scale.set(r,r,1),n.sprite.material.opacity=1-i*.6,n.sprite.material.rotation=i*1.2}}};var nc=class{scene=new On;holder=new ot;cam=new vt(28,1,.1,100);stage;constructor(e,t){this.stage=e,this.scene.environment=t,this.scene.environmentIntensity=.55,this.scene.add(new Ii(new te("#eaf8ff"),new te("#f1d6c2"),1));let n=new Zt(new te("#fff1e0"),2);n.position.set(3,4.5,6);let i=new Zt(new te("#dff4ff"),.7);i.position.set(-5,1,3);let r=new Zt(new te("#c9f3ff"),1.4);r.position.set(1,3,-6),this.scene.add(n,i,r,this.holder)}render(e,t){this.holder.add(e);let n=t.az??.35,i=t.el??.12,r=t.radius/Math.sin(this.cam.fov*Math.PI/360);this.cam.position.set(t.target.x+Math.sin(n)*Math.cos(i)*r,t.target.y+Math.sin(i)*r,t.target.z+Math.cos(n)*Math.cos(i)*r),this.cam.lookAt(t.target),this.cam.updateMatrixWorld(!0),this.scene.updateMatrixWorld(!0);let a=this.stage.renderRegion(this.scene,this.cam,t.size);return this.holder.remove(e),a}};var Iu={standard:{f0:118,boost:118,lp:1500,hp:90,wave:"sawtooth",gain:.07,whoosh:0},wide:{f0:94,boost:94,lp:1150,hp:70,wave:"sawtooth",gain:.08,whoosh:0},turbo:{f0:150,boost:205,lp:2200,hp:110,wave:"sawtooth",gain:.07,whoosh:0},vacuum:{f0:110,boost:110,lp:1300,hp:90,wave:"sawtooth",gain:.055,whoosh:.06},detail:{f0:172,boost:172,lp:2800,hp:450,wave:"square",gain:.035,whoosh:0},polish:{f0:210,boost:210,lp:1200,hp:150,wave:"triangle",gain:.07,whoosh:0}},ic=class{ctx=null;failed=!1;master;sfx;bgm;noise;motor=null;crunch=null;voice=Iu.standard;motorRunning=!1;boosting=!1;lastDrop=0;settings={sfxVolume:.8,bgmVolume:.5,bgmOn:!1,muted:!1};bgmTimer=null;bgmNextTime=0;bgmStep=0;wasRunningBeforeHide=!1;ensure(){if(this.failed)return!1;try{if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return this.failed=!0,!1;let t=new e({latencyHint:"interactive"});this.ctx=t,this.master=t.createGain(),this.sfx=t.createGain(),this.bgm=t.createGain();let n=t.createDynamicsCompressor();n.threshold.value=-16,n.ratio.value=4,this.sfx.connect(this.master),this.bgm.connect(this.master),this.master.connect(n),n.connect(t.destination);let i=t.sampleRate*2;this.noise=t.createBuffer(1,i,t.sampleRate);let r=this.noise.getChannelData(0);for(let a=0;a<i;a++)r[a]=Math.random()*2-1;this.buildMotor(),this.applySettings(this.settings)}return this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),!0}catch{return this.failed=!0,!1}}buildMotor(){let e=this.ctx,t=e.createOscillator(),n=e.createOscillator(),i=e.createOscillator(),r=e.createGain(),a=e.createBiquadFilter(),o=e.createBiquadFilter(),l=e.createGain();a.type="lowpass",a.Q.value=2.2,o.type="highpass",i.type="square",r.gain.value=.45;let c=e.createGain();c.gain.value=.55,i.connect(r).connect(c.gain),t.connect(c),n.connect(c),c.connect(o).connect(a).connect(l).connect(this.sfx),l.gain.value=0;let h=e.createBufferSource();h.buffer=this.noise,h.loop=!0;let u=e.createBiquadFilter();u.type="lowpass",u.frequency.value=900;let d=e.createGain();d.gain.value=0,h.connect(u).connect(d).connect(this.sfx),t.start(),n.start(),i.start(),h.start(),this.motor={osc:t,osc2:n,rattle:i,rattleGain:r,lp:a,hp:o,gain:l,whoosh:d,whooshSrc:h};let f=e.createBufferSource();f.buffer=this.noise,f.loop=!0;let g=e.createBiquadFilter();g.type="bandpass",g.frequency.value=3400,g.Q.value=.9;let x=e.createGain();x.gain.value=.5;let p=e.createOscillator();p.type="square",p.frequency.value=41;let m=e.createGain();m.gain.value=.5,p.connect(m).connect(x.gain);let b=e.createGain();b.gain.value=0,f.connect(g).connect(x).connect(b).connect(this.sfx),f.start(),p.start(),this.crunch={gain:b,gate:p,src:f},this.setTool("standard")}applySettings(e){if(this.settings={...e},!this.ctx)return;let t=this.ctx.currentTime;this.master.gain.setTargetAtTime(e.muted?0:1,t,.02),this.sfx.gain.setTargetAtTime(e.sfxVolume,t,.02),this.bgm.gain.setTargetAtTime(e.bgmOn?e.bgmVolume*.55:0,t,.05),e.bgmOn&&!e.muted?this.startBgm():this.stopBgm()}setTool(e){this.voice=Iu[e]??Iu.standard;let t=this.motor;if(!t||!this.ctx)return;let n=this.ctx.currentTime,i=this.voice;t.osc.type=i.wave,t.osc2.type="square",t.osc.frequency.setTargetAtTime(i.f0,n,.03),t.osc2.frequency.setTargetAtTime(i.f0*2.01,n,.03),t.rattle.frequency.setTargetAtTime(i.f0/2,n,.03),t.lp.frequency.setTargetAtTime(i.lp,n,.03),t.hp.frequency.setTargetAtTime(i.hp,n,.03),this.motorRunning&&t.gain.gain.setTargetAtTime(i.gain,n,.03),t.whoosh.gain.setTargetAtTime(this.motorRunning?i.whoosh:0,n,.05)}motorOn(e){if(e===this.motorRunning||(this.motorRunning=e,!this.ctx||!this.motor))return;let t=this.ctx.currentTime,n=this.voice;this.motor.gain.gain.setTargetAtTime(e?n.gain:0,t,e?.015:.04),this.motor.whoosh.gain.setTargetAtTime(e?n.whoosh:0,t,.05),e||(this.setCut(0),this.setBoost(!1)),this.click(e?1:.6)}setBoost(e){if(e===this.boosting||!this.ctx||!this.motor){this.boosting=e;return}this.boosting=e;let t=this.ctx.currentTime,n=this.voice,i=e?n.boost:n.f0;this.motor.osc.frequency.setTargetAtTime(i,t,.06),this.motor.osc2.frequency.setTargetAtTime(i*2.01,t,.06),this.motor.rattle.frequency.setTargetAtTime(i/2,t,.06),e&&this.blip(880,1320,.12,.05,"triangle")}setCut(e){if(!this.ctx||!this.crunch)return;let t=this.ctx.currentTime,n=Math.max(0,Math.min(1,e));this.crunch.gain.gain.setTargetAtTime(n*.16,t,.03),this.crunch.gate.frequency.setTargetAtTime(30+n*30+Math.random()*8,t,.05),this.motor&&this.motor.lp.frequency.setTargetAtTime(this.voice.lp*(1-.25*n),t,.05)}env(e,t,n,i,r){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(Math.max(2e-4,n),t+i),e.gain.exponentialRampToValueAtTime(1e-4,t+i+r)}blip(e,t,n,i,r="sine",a=0){if(!this.ctx)return;let o=this.ctx,l=o.currentTime+a,c=o.createOscillator(),h=o.createGain();c.type=r,c.frequency.setValueAtTime(e,l),c.frequency.exponentialRampToValueAtTime(t,l+n),this.env(h,l,i,.005,n),c.connect(h).connect(this.sfx),c.start(l),c.stop(l+n+.05),c.onended=()=>{c.disconnect(),h.disconnect()}}noiseHit(e,t,n,i,r="lowpass"){if(!this.ctx)return;let a=this.ctx,o=a.currentTime,l=a.createBufferSource();l.buffer=this.noise;let c=a.createBiquadFilter();c.type=r,c.frequency.value=e,c.Q.value=t;let h=a.createGain();this.env(h,o,i,.003,n),l.connect(c).connect(h).connect(this.sfx),l.start(o,Math.random()*1.5,n+.05),l.onended=()=>{l.disconnect(),c.disconnect(),h.disconnect()}}click(e=1){this.blip(1500,700,.02,.06*e,"square"),this.noiseHit(400,1,.04,.05*e)}drop(){if(!this.ctx)return;let e=this.ctx.currentTime;e-this.lastDrop<.07||(this.lastDrop=e,this.noiseHit(700+Math.random()*500,.7,.07,.035))}sparkle(){this.blip(2600,3400,.18,.03,"sine"),this.blip(3900,5200,.14,.018,"sine",.05)}tap(){this.blip(660,520,.05,.03,"triangle")}whoosh(){this.noiseHit(1200,.6,.18,.03,"bandpass")}chime(){this.ctx&&[523.25,659.25,783.99,1046.5,1318.5].forEach((e,t)=>{this.blip(e,e,.9,.06,"triangle",t*.09),this.blip(e*2,e*2,.5,.015,"sine",t*.09)})}startBgm(){!this.ctx||this.bgmTimer!==null||(this.bgmNextTime=this.ctx.currentTime+.1,this.bgmStep=0,this.bgmTimer=window.setInterval(()=>this.scheduleBgm(),90))}stopBgm(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null)}scheduleBgm(){let e=this.ctx;if(!e)return;let t=60/104/2,n=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]],i=[72,74,76,79,81];for(;this.bgmNextTime<e.currentTime+.25;){let r=this.bgmNextTime,a=this.bgmStep,o=Math.floor(a/8)%4,l=a%8,c=n[o];l%2===0&&this.note(c[0]-24,r,t*1.6,.09,"triangle"),(l===2||l===6)&&c.forEach(h=>this.note(h,r,t*.9,.022,"sine")),((a*7+o)%5===0||l===0)&&this.note(i[(a*3+o*2)%i.length],r,t*1.2,.03,"triangle"),this.bgmNextTime+=t,this.bgmStep++}}note(e,t,n,i,r){let a=this.ctx,o=a.createOscillator(),l=a.createGain();o.type=r,o.frequency.value=440*Math.pow(2,(e-69)/12),this.env(l,t,i,.01,n),o.connect(l).connect(this.bgm),o.start(t),o.stop(t+n+.05),o.onended=()=>{o.disconnect(),l.disconnect()}}pauseAll(){this.motorOn(!1),this.ctx&&this.ctx.state==="running"&&(this.wasRunningBeforeHide=!0,this.ctx.suspend().catch(()=>{}))}resumeAll(){this.ctx&&this.wasRunningBeforeHide&&(this.wasRunningBeforeHide=!1,this.ctx.resume().catch(()=>{}))}};Ma();Pn();Ma();var rc=class{game;cache=new Map;queue=Promise.resolve();constructor(e){this.game=e;for(let t of e.catalog.clippers)this.renderToolThumb(t.id);this.refreshPillImages()}toolThumb(e){return this.cache.get(`tool:${e}`)}renderToolThumb(e){let t=`tool:${e}`;if(this.cache.has(t))return;let n=this.game;try{let i=n.clipper.cloneModel(e);if(!i)return;let r=new ot;r.add(i),r.rotation.set(.15,-.55,-.42);let a=n.thumbs.render(r,{size:144,radius:.62,target:new C(0,-.02,0),az:0,el:.05});this.cache.set(t,a)}catch(i){console.warn("tool thumb",i)}}async bustThumb(e,t,n=240){let i=`bust:${e}:${t}:${n}`,r=this.cache.get(i);if(r)return r;let a=this.game,[o,l]=await Promise.all([a.getCharacterGltf(e),a.getHairJson(t)]),c=async()=>{if(this.cache.has(i))return;let h=new hr(o,a.charDef(e)),u=new rr(l);kl(u),u.setBaseOffsets(Bl(u,h.parts));let d=new ur(u,"low",a.curlGeo,a.hairMat),f=new ot;f.add(h.group,d.mesh);let g=u.maxReach(),x=a.thumbs.render(f,{size:n,radius:Math.max(1.35,g*.92),target:new C(0,-.12,0),az:.28,el:.08});h.dispose(),d.dispose(),this.cache.set(i,x)};return this.queue=this.queue.then(c,c),await this.queue,this.cache.get(i)??""}async contactSheet(e=150){let t=this.game,n=t.catalog.hair.length,i=t.characters.length,r=document.createElement("canvas");r.width=n*e,r.height=i*e+28;let a=r.getContext("2d");a.fillStyle="#fff8ed",a.fillRect(0,0,r.width,r.height),a.font="700 14px sans-serif",a.fillStyle="#123b4a",t.catalog.hair.forEach((o,l)=>a.fillText(o.name,l*e+6,18));for(let o=0;o<i;o++)for(let l=0;l<n;l++){let c=await this.bustThumb(t.characters[o].id,t.catalog.hair[l].id,e),h=new Image;h.src=c,await h.decode(),a.drawImage(h,l*e,28+o*e,e,e)}return r.toDataURL("image/png")}refreshPillImages(){let e=this.game,t=this.toolThumb(e.mode==="ta"?"standard":e.freeToolId);t&&(Bi("pill-tool-img").src=t),this.bustThumb(e.characterId,e.hairId,120).then(n=>{Bi("pill-char-img").src=n,Bi("pill-hair-img").src=n}).catch(()=>{})}grid(){let e=document.createElement("div");return e.className="card-grid",e.setAttribute("role","radiogroup"),e}openCharacters(){let e=this.game,t=this.grid();t.setAttribute("aria-label","\u304A\u3058\u3055\u3093\u3092\u9078\u3076");let n=[];for(let a of e.characters){let o=document.createElement("button");o.type="button",o.className="pick-card",o.setAttribute("role","radio"),o.setAttribute("aria-checked",String(a.id===e.characterId));let l=a.accent??cp[a.emotion]??"#65D6E8";o.innerHTML=`<img class="pick-thumb" alt="${qt(a.name)}\u306E\u9854" /><span class="pick-name"><span class="emo" style="background:${l}">${qt(a.emotion)}</span>${qt(a.name)}</span><span class="pick-desc">${qt(a.description??"\u5143\u306E\u4E38\u9854\u30FB\u592A\u7709\u30FB\u5C0F\u3055\u3044\u53E3\u3072\u3052\u3002")}</span>`,o.addEventListener("click",async()=>{n.forEach(c=>c.setAttribute("aria-checked",String(c===o))),await e.selectCharacter(a.id)}),n.push(o),t.appendChild(o),this.bustThumb(a.id,e.hairId).then(c=>{o.querySelector("img").src=c}).catch(()=>{})}let i=document.createElement("p");i.className="note",i.textContent="\u80FD\u529B\u30FB\u5F97\u70B9\u306F\u307F\u3093\u306A\u540C\u3058\u3067\u3059\u3002\u7D50\u679C\u30AB\u30FC\u30C9\u3068X\u306E\u6587\u9762\u306B\u540D\u524D\u304C\u5165\u308A\u307E\u3059\u3002";let r=document.createElement("div");r.append(t,i),ui("\u304A\u3058\u3055\u3093\u3092\u9078\u3076",r,()=>this.refreshPillImages())}openHair(){let e=this.game,t=this.grid();t.setAttribute("aria-label","\u9AEA\u578B\u3092\u9078\u3076");let n=[];for(let i of e.catalog.hair){let r=document.createElement("button");r.type="button",r.className="pick-card",r.setAttribute("role","radio"),r.setAttribute("aria-checked",String(i.id===e.hairId));let a=e.records.best("1.1",e.mode,i.id,1);r.innerHTML=`<img class="pick-thumb" alt="${qt(i.name)}" /><span class="pick-name">${qt(i.name)}</span><span class="pick-desc">${qt(lp[i.id]?.desc??"")}</span><span class="pick-stats">\u57FA\u6E96 ${i.parSeconds}\u79D2${a.time?` \uFF0F \u30D9\u30B9\u30C8 ${En(a.time.elapsedMs)}`:""}</span>`,r.addEventListener("click",async()=>{n.forEach(o=>o.setAttribute("aria-checked",String(o===r))),await e.selectHair(i.id)}),n.push(r),t.appendChild(r),this.bustThumb(e.characterId,i.id).then(o=>{r.querySelector("img").src=o}).catch(()=>{})}ui("\u9AEA\u578B\u3092\u9078\u3076",t,()=>this.refreshPillImages())}openTools(){let e=this.game,t=document.createElement("div");if(e.mode==="ta"){let a=document.createElement("p");a.className="note",a.textContent="\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF\u306F\u30B9\u30BF\u30F3\u30C0\u30FC\u30C91\u672C\u3067\u6311\u6226\u3057\u307E\u3059\u3002\u3053\u3053\u3067\u9078\u3093\u3060\u9053\u5177\u306F\u30B9\u30C3\u30AD\u30EA\u30D5\u30EA\u30FC\u3067\u4F7F\u308F\u308C\u307E\u3059\u3002",t.appendChild(a)}let n=this.grid();n.setAttribute("aria-label","\u30D0\u30EA\u30AB\u30F3\u3092\u9078\u3076");let i=[];for(let a of e.catalog.clippers){let o=document.createElement("button");o.type="button",o.className="pick-card",o.setAttribute("role","radio"),o.setAttribute("aria-checked",String(a.id===e.freeToolId));let l=sr[a.id];o.innerHTML=`<img class="pick-thumb" alt="${qt(a.name)}" src="${this.toolThumb(a.id)??""}" style="object-fit:contain" /><span class="pick-name"><span class="emo" style="background:${a.color}"></span>${qt(a.name)}</span><span class="pick-desc"><b>${qt(l?.feature??"")}</b><br>${qt(l?.hint??"")}</span><span class="pick-stats">\u5203\u5E45 ${a.radius.toFixed(2)} \uFF0F \u901F\u3055 ${a.cutRate.toFixed(2)}</span>`,o.addEventListener("click",()=>{i.forEach(c=>c.setAttribute("aria-checked",String(c===o))),e.selectTool(a.id)}),i.push(o),n.appendChild(o)}t.appendChild(n);let r=document.createElement("p");r.className="note",r.textContent="\u3069\u306E\u30D0\u30EA\u30AB\u30F3\u3067\u3082\u6700\u5F8C\u307E\u3067\u5243\u308A\u5207\u308C\u307E\u3059\u3002\u5145\u96FB\u5207\u308C\u3084\u6545\u969C\u306F\u3042\u308A\u307E\u305B\u3093\u3002",t.appendChild(r),ui("\u30D0\u30EA\u30AB\u30F3\u3092\u9078\u3076",t,()=>this.refreshPillImages())}openRecords(){let e=this.game,t=e.catalog.hair.map(r=>{let a=e.records.best("1.1","free",r.id,1),o=e.records.best("1.1","ta",r.id,1),l=c=>c.time?`${En(c.time.elapsedMs)}<br><small>${(c.score?.score??0).toLocaleString("ja-JP")}\u70B9</small>`:"\u2014";return`<tr><td>${qt(r.name)}</td><td class="num">${l(a)}</td><td class="num">${l(o)}</td></tr>`}).join(""),n=e.records.runs.slice(0,8).map(r=>{let a=e.characters.find(l=>l.id===r.characterId)?.name??r.characterId,o=e.catalog.hair.find(l=>l.id===r.hairId)?.name??r.hairId;return`<tr><td>${qt(a)}\u30FB${qt(o)}<br><small>${Fi[r.mode].short}${r.interrupted?"\uFF08\u4E2D\u65AD\u3042\u308A\uFF09":""}</small></td><td class="num">${En(r.elapsedMs)}</td><td class="num">${r.score.toLocaleString("ja-JP")} ${r.rank}</td></tr>`}).join(""),i=`
      <table class="records-table"><thead><tr><th>\u9AEA\u578B</th><th>\u30D5\u30EA\u30FC \u6700\u77ED\uFF0F\u6700\u9AD8\u70B9</th><th>\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF \u6700\u77ED\uFF0F\u6700\u9AD8\u70B9</th></tr></thead><tbody>${t}</tbody></table>
      <h3>\u6700\u8FD1\u306E\u30D7\u30EC\u30A4</h3>
      ${n?`<table class="records-table"><tbody>${n}</tbody></table>`:'<p class="note">\u307E\u3060\u8A18\u9332\u304C\u3042\u308A\u307E\u305B\u3093\u3002</p>'}
      <p class="note">\u8A18\u9332\u306F\u3053\u306E\u7AEF\u672B\u306E\u30D6\u30E9\u30A6\u30B6\u3060\u3051\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\uFF08\u4ED6\u306E\u7AEF\u672B\u3068\u306F\u540C\u671F\u3057\u307E\u305B\u3093\uFF09\u3002\u30B5\u30FC\u30D0\u30FC\u3067\u691C\u8A3C\u3055\u308C\u305F\u7AF6\u6280\u8A18\u9332\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u4E2D\u65AD\u3042\u308A\u306E\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF\u306F\u81EA\u5DF1\u30D9\u30B9\u30C8\u306B\u5165\u308A\u307E\u305B\u3093\u3002${e.storage.available?"":"<br><b>\u3053\u306E\u74B0\u5883\u3067\u306F\u7AEF\u672B\u306B\u4FDD\u5B58\u3067\u304D\u306A\u3044\u305F\u3081\u3001\u30DA\u30FC\u30B8\u3092\u9589\u3058\u308B\u3068\u8A18\u9332\u304C\u6D88\u3048\u307E\u3059\u3002</b>"}</p>`;ui("\u8A18\u9332",i)}openSettings(e){let t=this.game,n=t.settings,i=document.createElement("div"),r=(h,u,d="",f=!1)=>`<div class="setting"><span>${u}${d?`<small>${d}</small>`:""}</span><button type="button" class="switch" role="switch" data-key="${h}" aria-checked="${n[h]?"true":"false"}" aria-label="${u}" ${f?"disabled":""}></button></div>`,a=typeof navigator.vibrate=="function";i.innerHTML=`
      <div class="setting"><span>\u5203\u5148\u306E\u4F4D\u7F6E\uFF08\u30BF\u30C3\u30C1\uFF09<small>\u6307\u306E\u5C11\u3057\u4E0A\u306B\u5203\u3092\u51FA\u3059\uFF1A<b id="offset-val">${n.bladeOffsetPx}</b>px\uFF08PC\u306F0\uFF09</small></span><input type="range" min="0" max="48" step="2" value="${n.bladeOffsetPx}" id="set-offset" aria-label="\u5203\u5148\u30AA\u30D5\u30BB\u30C3\u30C8"></div>
      ${r("leftHanded","\u5DE6\u5229\u304D","\u30D0\u30EA\u30AB\u30F3\u306E\u50BE\u304D\u3092\u5DE6\u53F3\u53CD\u8EE2")}
      ${r("assist","\u4ED5\u4E0A\u3052\u88DC\u52A9",t.mode==="ta"?"\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF\u3067\u306F\u5168\u54E1ON\u56FA\u5B9A":"\u6B8B\u308A3\uFF05\u4EE5\u4E0B\u3067\u30D6\u30E9\u30B71.35\u500D\uFF08\u81EA\u52D5\u3067\u306F\u6D88\u3048\u307E\u305B\u3093\uFF09",t.mode==="ta")}
      ${r("showTime","\u30BF\u30A4\u30E0\u3092\u8868\u793A","\u30D5\u30EA\u30FC\u3067\u6570\u5B57\u304C\u6C17\u306B\u306A\u308B\u4EBA\u306FOFF\uFF08\u8A18\u9332\u306F\u8A08\u6E2C\u3055\u308C\u307E\u3059\uFF09")}
      ${r("muted","\u30DF\u30E5\u30FC\u30C8")}
      <div class="setting"><span>\u52B9\u679C\u97F3\u306E\u97F3\u91CF</span><input type="range" min="0" max="1" step="0.05" value="${n.sfxVolume}" id="set-sfx" aria-label="\u52B9\u679C\u97F3\u306E\u97F3\u91CF"></div>
      ${r("bgmOn","BGM","\u521D\u671F\u306FOFF")}
      <div class="setting"><span>BGM\u306E\u97F3\u91CF</span><input type="range" min="0" max="1" step="0.05" value="${n.bgmVolume}" id="set-bgm" aria-label="BGM\u306E\u97F3\u91CF"></div>
      ${r("vibration","\u632F\u52D5",a?"\u5BFE\u5FDC\u7AEF\u672B\u306E\u307F":"\u3053\u306E\u7AEF\u672B\u306F\u975E\u5BFE\u5FDC",!a)}
      ${r("lowStimulus","\u4F4E\u523A\u6FC0\u30E2\u30FC\u30C9","\u7D19\u5439\u96EA\u30FB\u304D\u3089\u3081\u304D\u30FB\u52D5\u304F\u80CC\u666F\u3092OFF")}
      <div class="setting"><span>\u753B\u8CEA<small>\u8EFD\u91CF\u306F\u8868\u793A\u3060\u3051\u7C21\u7565\u5316\uFF08\u5224\u5B9A\u306E\u6BDB\u6839\u6570\u306F\u540C\u3058\uFF09</small></span><div class="seg" role="group" aria-label="\u753B\u8CEA"><button type="button" data-q="auto" aria-pressed="${n.quality==="auto"}">\u81EA\u52D5</button><button type="button" data-q="standard" aria-pressed="${n.quality==="standard"}">\u6A19\u6E96</button><button type="button" data-q="low" aria-pressed="${n.quality==="low"}">\u8EFD\u91CF</button></div></div>
      <div class="setting"><span>\u64CD\u4F5C\u30AC\u30A4\u30C9</span><button type="button" class="btn-ghost" id="set-guide">\u3082\u3046\u4E00\u5EA6\u898B\u308B</button></div>
      <p class="note">\u64CD\u4F5C\uFF1A1\u672C\u6307\u3067\u306A\u305E\u308B\uFF0F\u62BC\u3057\u305F\u307E\u307E\u3002\u8996\u70B9\u30DC\u30BF\u30F3\uFF08\u30AD\u30FC\u30DC\u30FC\u30C91\u301C5\uFF09\u3067\u5411\u304D\u3092\u5909\u3048\u3001\u300C\u56DE\u3059\u300DON\u4E2D\u3060\u3051\u30C9\u30E9\u30C3\u30B0\u3067\u81EA\u7531\u56DE\u8EE2\uFF08R\uFF09\u3002Esc\u3067\u4E00\u6642\u505C\u6B62\u3002<br>${t.storage.available?"\u8A2D\u5B9A\u3068\u8A18\u9332\u306F\u3053\u306E\u7AEF\u672B\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002":"\u3053\u306E\u74B0\u5883\u3067\u306F\u4FDD\u5B58\u9818\u57DF\u304C\u4F7F\u3048\u306A\u3044\u305F\u3081\u3001\u8A2D\u5B9A\u3068\u8A18\u9332\u306F\u30DA\u30FC\u30B8\u3092\u9589\u3058\u308B\u307E\u3067\u306E\u4E00\u6642\u4FDD\u5B58\u3067\u3059\u3002"}<br>${t.audio.failed?"<b>\u3053\u306E\u74B0\u5883\u3067\u306F\u97F3\u3092\u518D\u751F\u3067\u304D\u307E\u305B\u3093\u3002\u8868\u793A\u3060\u3051\u3067\u904A\u3079\u307E\u3059\u3002</b>":""}</p>`,i.querySelectorAll(".switch").forEach(h=>h.addEventListener("click",()=>{let u=h.dataset.key;n[u]=!n[u],h.setAttribute("aria-checked",String(n[u])),t.audio.ensure(),t.applySettings()}));let o=i.querySelector("#set-offset");o.addEventListener("input",()=>{n.bladeOffsetPx=Number(o.value),ne("offset-val").textContent=o.value,t.applySettings()});let l=i.querySelector("#set-sfx");l.addEventListener("input",()=>{n.sfxVolume=Number(l.value),t.audio.ensure(),t.applySettings()}),l.addEventListener("change",()=>t.audio.tap());let c=i.querySelector("#set-bgm");c.addEventListener("input",()=>{n.bgmVolume=Number(c.value),t.applySettings()}),i.querySelectorAll("[data-q]").forEach(h=>h.addEventListener("click",()=>{n.quality=h.dataset.q==="low"?"low":h.dataset.q==="standard"?"standard":"auto",i.querySelectorAll("[data-q]").forEach(u=>u.setAttribute("aria-pressed",String(u===h))),t.applySettings(),t.screen==="play"&&t.run!=="ready"&&hi("\u753B\u8CEA","\u753B\u8CEA\u306E\u5909\u66F4\u306F\u6B21\u306E\u30D7\u30EC\u30A4\u304B\u3089\u53CD\u6620\u3055\u308C\u307E\u3059\u3002",[{label:"OK",value:"ok",kind:"primary"}])})),i.querySelector("#set-guide").addEventListener("click",()=>{n.guideSeen=!1,t.applySettings(),hs()}),ui("\u8A2D\u5B9A",i,e)}};ac();var us="#123B4A",Uy="#65D6E8",Fy="#FFF8ED",Xp="#FF855E",qp="#FFD15C";function oc(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}function Yp(s,e,t,n,i=800){let r=n;for(s.font=`${i} ${r}px ${zt}`;s.measureText(e).width>t&&r>14;)r-=2,s.font=`${i} ${r}px ${zt}`}function $p(s,e,t,n,i,r,a){s.save(),oc(s,t,n,i,i,28);let o=s.createLinearGradient(0,n,0,n+i);o.addColorStop(0,"#dff6fb"),o.addColorStop(1,"#bfeaf3"),s.fillStyle=o,s.fill(),s.clip(),e&&s.drawImage(e,t-i*.04,n+i*.02,i*1.08,i*1.08),s.restore(),s.lineWidth=6,s.strokeStyle="#ffffff",oc(s,t,n,i,i,28),s.stroke(),s.font=`800 24px ${zt}`;let l=s.measureText(r).width+36;oc(s,t+18,n+18,l,40,20),s.fillStyle=a,s.fill(),s.fillStyle=us,s.textBaseline="middle",s.textAlign="left",s.fillText(r,t+36,n+39)}async function Kp(s){try{await document.fonts?.ready}catch{}let e=1200,t=630,n=48,i=document.createElement("canvas");i.width=e,i.height=t;let r=i.getContext("2d");if(!r)throw new Error("2D canvas unavailable");r.fillStyle=Fy,r.fillRect(0,0,e,t);let a=r.createLinearGradient(0,0,e,0);a.addColorStop(0,"#9fe6f1"),a.addColorStop(1,Uy),r.fillStyle=a,r.fillRect(0,0,e,112),r.fillStyle="rgba(255,255,255,0.35)";for(let m=0;m<26;m++)r.beginPath(),r.arc(60+m*46,104+m%2*6,10,0,Math.PI*2),r.fill();r.textBaseline="alphabetic",r.textAlign="left",r.fillStyle=us,r.font=`900 50px ${zt}`,r.fillText("\u30A2\u30D5\u30ED\u3001",n,76);let o=r.measureText("\u30A2\u30D5\u30ED\u3001").width;r.fillStyle=Xp,r.fillText("\u30B9\u30C3\u30AD\u30EA\u3002",n+o,76),r.textAlign="right",r.fillStyle="#ffffff",r.font=`900 44px ${zt}`,r.lineWidth=8,r.strokeStyle=us,r.lineJoin="round",r.strokeText("\u3064\u308B\u3063\u3068\u5B8C\u4E86\uFF01",e-n,74),r.fillText("\u3064\u308B\u3063\u3068\u5B8C\u4E86\uFF01",e-n,74);let l=300,c=140;$p(r,s.before,n,c,l,"BEFORE","#ffffff"),$p(r,s.after,e-n-l,c,l,"AFTER",qp);let h=e/2;r.textAlign="center",r.fillStyle=us,r.font=`700 26px ${zt}`,r.fillText("\u30AF\u30EA\u30A2\u30BF\u30A4\u30E0",h,166),r.font=`900 66px ${zt}`,r.fillText(En(s.result.elapsedMs),h,230),r.font=`700 26px ${zt}`,r.fillText("\u30B9\u30B3\u30A2",h,276);let u=s.result.score.toLocaleString("ja-JP");r.font=`900 76px ${zt}`;let d=r.measureText(u).width;r.fillStyle=Xp,r.fillText(u,h-16,346),r.font=`800 34px ${zt}`,r.fillStyle=us,r.textAlign="left",r.fillText("\u70B9",h-16+d/2+6,346),r.textAlign="center",r.beginPath(),r.arc(h,412,34,0,Math.PI*2),r.fillStyle=qp,r.fill(),r.lineWidth=5,r.strokeStyle="#e9a92b",r.stroke(),r.fillStyle=us,r.font=`900 ${s.result.rank.length>1?30:38}px ${zt}`,r.textBaseline="middle",r.fillText(s.result.rank,h,414),r.font=`800 20px ${zt}`,r.textAlign="right",r.fillText("\u30E9\u30F3\u30AF",h-44,414),r.textAlign="left",r.fillStyle="#b07d10",r.font=`900 22px ${zt}`,r.fillText(va[s.result.rank],h+44,414),r.textBaseline="alphabetic";let f=472;oc(r,n,f,e-n*2,110,24),r.fillStyle="#ffffff",r.fill(),r.lineWidth=3,r.strokeStyle="#d9eef2",r.stroke(),r.textAlign="left",r.fillStyle=us;let x=`${s.characterName}\u30FB${s.hairName}\u30FB${s.modeName}${s.result.interrupted?"\uFF08\u4E2D\u65AD\u3042\u308A\uFF09":""}`;Yp(r,x,e-n*2-330,36),r.fillText(x,n+28,f+50),r.textAlign="right",r.font=`900 34px ${zt}`,r.fillStyle="#1aa9c2",r.fillText("\u30B9\u30C3\u30AD\u30EA100%",e-n-28,f+50),r.textAlign="left",r.fillStyle="#4d6f7b";let p=`\u4F7F\u7528\uFF1A${s.toolNames.join("\u30FB")}`;return Yp(r,p,e-n*2-330,24,700),r.fillText(p,n+28,f+88),r.textAlign="right",r.font=`700 24px ${zt}`,r.fillText("#\u30A2\u30D5\u30ED\u30B9\u30C3\u30AD\u30EA",e-n-28,f+88),i}function Zp(s){return new Promise((e,t)=>{try{s.toBlob(n=>n?e(n):t(new Error("toBlob failed")),"image/png")}catch(n){t(n)}})}function Jp(s=new Date){let e=t=>String(t).padStart(2,"0");return`afro-sukkiri-${s.getFullYear()}${e(s.getMonth()+1)}${e(s.getDate())}-${e(s.getHours())}${e(s.getMinutes())}.png`}var jp="afro-sukkiri/last-result",Qp="afro-sukkiri/selection",lc=class{assets=new Yl;audio=new ic;stage;records;settings;storage;config;catalog;characters=[];sheets;thumbs;mode="free";characterId="base";hairId="classic";freeToolId="standard";state=null;hairView=null;scalpShade=null;character=null;clipper=new jl;guides=new ec;particles;sparkles;curlGeo;curlGeoLow;hairMat=Cu(!0);hairMatLow=Cu(!1);particleMat=new Ft({color:16777215,roughness:.8});shaver;toolDefs=new Map;hairJson=new Map;loadedKey="";screen="loading";run="idle";pausedAccum=0;pauseStart=0;interrupted=!1;toolsUsed=new Set;finalElapsed=0;before=null;last=null;cardPromise=null;cardFile=null;completeTimers=[];pointerId=null;rotateMode=!1;rotatePointers=new Map;pinchDist=0;pendingView=null;hover=null;cursorPx=null;raycaster=new ta;ndc=new xe;headInv=new Ee;tmpV=new C;tmpV2=new C;hoverHit=xa();hoverRay={ox:0,oy:0,oz:0,dx:0,dy:0,dz:1};hoverCam={x:0,y:0,z:0};plane=new fn;lastFrame=performance.now();cutLevel=0;lastReaction=0;lastSurprise=0;recentCleared=[];lastVibe=0;lastSparkle=0;viewsUsed=new Set;guideStep=0;titleT0=0;hudCache={time:"",clean:"",bar:-1};remainingMarksKey="";raf=0;assistActive=!1;constructor(e,t,n){this.storage=e,this.settings=t,this.config=n,this.records=new Gl(e)}async boot(e,t){this.assets.onProgress=t;let[n,i]=await Promise.all([this.assets.json("assets/data/catalog.json"),this.assets.json("assets/data/characters.json").catch(()=>null)]);this.catalog=n,this.characters=i?.characters??n.characters??[{id:"base",name:"\u3044\u3064\u3082\u306E\u304A\u3058\u3055\u3093",emotion:"\u7A4F",glb:n.character??"models/ojisan_base.glb",scalpRadii:[.78,1,.78],hairCompatibility:"all-v1",rigged:!1,scoreMultiplier:1}];for(let l of n.clippers)this.toolDefs.set(l.id,l);this.restoreSelection(i?.defaultCharacter??"base"),this.stage=new Zl(e,this.effQuality());let r=new URLSearchParams(location.search).get("px");r&&new URLSearchParams(location.search).has("debug")&&(this.stage.pixelRatioOverride=Math.min(2,Math.max(.25,Number(r)||1))),this.stage.onContextLost=()=>this.onContextLost(),this.thumbs=new nc(this.stage,this.stage.envTex),this.curlGeo=Ru(1),this.curlGeoLow=Ru(0),this.particles=new Ql(this.curlGeo,this.particleMat,120),this.particles.limit=this.effQuality()==="low"?40:120,this.sparkles=new tc,this.stage.head.add(this.particles.mesh),this.stage.captureHidden.push(this.particles.mesh),this.stage.overlay.add(this.clipper.group),this.guides.addTo(this.stage.overlay,this.stage.head),this.stage.overlay.add(this.sparkles.group);let a=n.clippers.map(async l=>this.clipper.add(l.id,await this.assets.gltf(`assets/${l.glb}`)));await Promise.all([this.loadScene(this.characterId,this.hairId),...a]),this.clipper.setActive(this.currentToolId()),this.clipper.leftHanded=this.settings.leftHanded;let o={rayAt:(l,c,h,u)=>this.rayAt(l,c,h,u),brushRadiusPx:()=>this.effectiveRadius()*this.stage.rig.pxPerUnit(this.stage.height),brushRadius:()=>this.effectiveRadius(),parts:()=>this.character?.parts??[]};this.shaver=new Fl(this.state,o,Ol(this.toolDefs.get(this.currentToolId()))),this.sheets=new rc(this),this.bindInput(e),this.bindUI(),this.observeResize(),this.lastFrame=performance.now(),this.raf=requestAnimationFrame(this.frame)}restoreSelection(e){this.characterId=e;try{let t=this.storage.get(Qp);if(t){let n=JSON.parse(t);(n.mode==="free"||n.mode==="ta")&&(this.mode=n.mode),n.characterId&&this.characters.some(i=>i.id===n.characterId)&&(this.characterId=n.characterId),n.hairId&&this.catalog.hair.some(i=>i.id===n.hairId)&&(this.hairId=n.hairId),n.toolId&&this.toolDefs.has(n.toolId)&&(this.freeToolId=n.toolId)}}catch{}}saveSelection(){this.storage.set(Qp,JSON.stringify({mode:this.mode,characterId:this.characterId,hairId:this.hairId,toolId:this.freeToolId}))}hairDef(e=this.hairId){return this.catalog.hair.find(t=>t.id===e)??this.catalog.hair[0]}charDef(e=this.characterId){return this.characters.find(t=>t.id===e)??this.characters[0]}toolDef(e){return this.toolDefs.get(e)??this.catalog.clippers[0]}currentToolId(){return this.mode==="ta"?"standard":this.freeToolId}async getHairJson(e){let t=this.hairJson.get(e);if(t)return t;let n=await this.assets.json(`assets/${this.hairDef(e).roots}`);return this.hairJson.set(e,n),n}async getCharacterGltf(e){return this.assets.gltf(`assets/${this.charDef(e).glb}`)}effQuality(){let e=this.settings.quality;return e==="low"?"low":e==="standard"?"standard":this.autoLow?"low":"standard"}autoLow=!1;frameSamples=[];makeHairView(e){let t=this.effQuality();return new ur(e,t,t==="low"?this.curlGeoLow:this.curlGeo,t==="low"?this.hairMatLow:this.hairMat)}rebuildHairView(){this.state&&(this.hairView&&(this.stage.head.remove(this.hairView.mesh),this.hairView.dispose()),this.hairView=this.makeHairView(this.state),this.stage.head.add(this.hairView.mesh),this.stage.setQuality(this.effQuality()),this.particles.limit=this.effQuality()==="low"?40:120,this.loadedKey=`${this.characterId}|${this.hairId}|${this.effQuality()}`)}autoQualityCheck(e){if(this.settings.quality!=="auto"||this.autoLow)return;if(!(this.screen==="title"||this.screen==="play"&&this.run==="ready")){this.frameSamples.length=0;return}if(this.frameSamples.push(e),this.frameSamples.length<50)return;let t=[...this.frameSamples.slice(10)].sort((i,r)=>i-r),n=t[Math.floor(t.length/2)];this.frameSamples.length=0,n>45&&(this.autoLow=!0,this.rebuildHairView(),ki("\u52D5\u4F5C\u3092\u8EFD\u304F\u3059\u308B\u305F\u3081\u3001\u8868\u793A\u3092\u300C\u8EFD\u91CF\u300D\u306B\u3057\u307E\u3057\u305F\uFF08\u5224\u5B9A\u306F\u540C\u3058\uFF09",3e3))}async loadScene(e,t){let n=`${e}|${t}|${this.effQuality()}`;if(n===this.loadedKey&&this.state)return;let[i,r]=await Promise.all([this.getCharacterGltf(e),this.getHairJson(t)]);this.character?.dispose(),this.hairView&&(this.stage.head.remove(this.hairView.mesh),this.hairView.dispose());let a=new hr(i,this.charDef(e));this.character=a,this.stage.head.add(a.group);let o=new rr(r);kl(o),o.setBaseOffsets(Bl(o,a.parts)),o.consumeDirty(),this.state=o,this.hairView=this.makeHairView(o),this.stage.head.add(this.hairView.mesh),this.scalpShade=new Jl(o,a.scalp,o.scalpRadii),this.shaver&&(this.shaver.state=o),this.loadedKey=n,this.characterId=e,this.hairId=t,this.frameForScreen(!1)}setScreen(e){this.screen=e,ne("app").dataset.screen=e,ne("screen-title").hidden=e!=="title",ne("screen-result").hidden=e!=="result",ne("screen-loading").hidden=e!=="loading",this.updateRotateUI(),e!=="play"&&(this.clipper.group.visible=!1,this.guides.showBrush(null,this.stage.rig.camera,1,"#fff"),this.guides.hideRings()),this.frameForScreen(!0),requestAnimationFrame(()=>this.onResize())}visibleRect(){let e={x:0,y:0,w:1,h:1};if(this.screen!=="title"&&this.screen!=="result")return e;let t=ne("stage").getBoundingClientRect();if(t.width<10||t.height<10)return e;let n=this.screen==="title"?ne("screen-title").querySelector(".title-head"):ne("result-title"),i=this.screen==="title"?ne("screen-title").querySelector(".title-panel"):ne("screen-result").querySelector(".result-panel");if(!n||!i)return e;let r=n.getBoundingClientRect(),a=i.getBoundingClientRect(),o=t.left,l=t.right,c=t.top,h=t.bottom;return a.left>t.left+t.width*.45?(l=Math.min(l,a.left-8),c=Math.max(c,r.bottom-10)):(c=Math.max(c,r.bottom),h=Math.min(h,a.top+10)),{x:(o-t.left)/t.width,y:(c-t.top)/t.height,w:Math.max(0,l-o)/t.width,h:Math.max(0,h-c)/t.height}}frameForScreen(e){if(!this.stage||!this.state)return;this.stage.rig.setVisibleRect(this.visibleRect());let t=this.state.maxReach(),n=this.stage.rig;this.screen==="title"?(n.setFraming(Math.max(1.6,t*.98),-.2,e),n.setPose(.18,.1,e),this.titleT0=performance.now()):this.screen==="result"?(n.setFraming(1.18,-.1,e),n.setPose(0,.08,e)):(n.setFraming(t*1,.05,e),this.screen==="play"&&n.viewIndex<0&&n.setView(0,e))}showTitle(){this.clearCompleteTimers(),this.run="idle",this.shaver.armed=!1,this.shaver.cancel(performance.now()),this.audio.motorOn(!1),this.rotateMode=!1,this.updateRotateUI(),this.state?.reset(),this.syncHairAll(),this.character?.resetExpression(),this.particles.clear(),this.setScreen("title"),this.updateTitleUI(),Ze("btn-last-result").hidden=!this.loadLastResult()}async startRun(){this.audio.ensure(),this.audio.applySettings(this.settings),this.clearCompleteTimers(),await this.loadScene(this.characterId,this.hairId);let e=this.state;e.reset(),e.consumeDirty(),this.syncHairAll(),this.character?.resetExpression(),this.particles.clear(),this.clipper.setActive(this.currentToolId()),this.clipper.setCollected(0),this.shaver.tool=Ol(this.toolDef(this.currentToolId())),this.audio.setTool(this.currentToolId()),this.shaver.resetRun(performance.now()),this.shaver.armed=!0,this.run="ready",this.pausedAccum=0,this.interrupted=!1,this.toolsUsed=new Set([this.currentToolId()]),this.finalElapsed=0,this.cardPromise=null,this.cardFile=null,this.viewsUsed=new Set([0]),this.rotateMode=!1,this.pendingView=null,this.remainingMarksKey="",this.assistActive=!1,this.guideStep=this.settings.guideSeen?3:0,this.setScreen("play"),this.stage.rig.setView(0,!1),this.updateViewButtons(),this.updateRotateUI(),this.renderToolTray(),this.updateHud(performance.now(),!0),ne("badge-interrupted").hidden=!0,ne("assist-tip").hidden=!0,ne("hud-mode").textContent=Fi[this.mode].short,ne("hud-mode").classList.toggle("ta",this.mode==="ta"),Ze("btn-pause").setAttribute("aria-label","\u4E00\u6642\u505C\u6B62"),this.showGuide(),this.setHint(),this.stage.render(),this.before=this.captureHead(),this.saveSelection()}captureHead(){try{this.character&&this.run!=="complete"&&this.character.openEyes(performance.now());let e=this.state?.maxReach()??1.6;return this.stage.capture(420,{az:0,el:.1,radius:Math.max(1.45,e*.95),ty:-.12})}catch{return null}}canvasPoint(e){let t=this.stage.renderer.domElement.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}bladeOffset(e){return e==="touch"?this.settings.bladeOffsetPx:0}rayAt(e,t,n,i){let r=this.stage;if(e<0||t<0||e>r.width||t>r.height)return!1;this.ndc.set(e/r.width*2-1,-(t/r.height)*2+1),this.raycaster.setFromCamera(this.ndc,r.rig.camera),this.headInv.copy(r.head.matrixWorld).invert();let a=this.tmpV.copy(this.raycaster.ray.origin).applyMatrix4(this.headInv),o=this.tmpV2.copy(this.raycaster.ray.direction).transformDirection(this.headInv);n.ox=a.x,n.oy=a.y,n.oz=a.z,n.dx=o.x,n.dy=o.y,n.dz=o.z;let l=this.tmpV.copy(r.rig.camera.position).applyMatrix4(this.headInv);return i.x=l.x,i.y=l.y,i.z=l.z,!0}canShave(){return this.screen==="play"&&(this.run==="ready"||this.run==="running")&&!this.rotateMode&&!this.stage.rig.animating&&!cs()&&!ba()}bindInput(e){e.addEventListener("pointerdown",n=>{if(this.audio.ensure(),this.screen!=="play")return;if(this.rotateMode){this.rotateDown(n,e);return}if(this.pointerId!==null||!this.canShave()||n.pointerType==="mouse"&&n.button!==0)return;n.preventDefault(),this.pointerId=n.pointerId;try{e.setPointerCapture(n.pointerId)}catch{}let i=this.canvasPoint(n),r=this.bladeOffset(n.pointerType);this.cursorPx={x:i.x,y:i.y-r},this.shaver.pointerDown(n.timeStamp,i.x,i.y-r),this.audio.motorOn(!0),this.settings.vibration&&navigator.vibrate&&navigator.vibrate(12)}),e.addEventListener("pointermove",n=>{if(this.rotateMode){this.rotateMove(n);return}let i=this.canvasPoint(n);if(n.pointerType==="mouse"&&this.pointerId===null&&(this.hover=i),n.pointerId!==this.pointerId)return;let r=this.bladeOffset(n.pointerType),a=e.getBoundingClientRect(),o=typeof n.getCoalescedEvents=="function"?n.getCoalescedEvents():[],l=o.length?o:[n];for(let c of l){let h={x:c.clientX-a.left,y:c.clientY-a.top};if(h.x<0||h.y<0||h.x>a.width||h.y>a.height){this.endStroke(c.timeStamp);return}this.shaver.pointerMove(c.timeStamp,h.x,h.y-r),this.cursorPx={x:h.x,y:h.y-r}}});let t=n=>{if(this.rotatePointers.has(n.pointerId)){this.rotatePointers.delete(n.pointerId),this.pinchDist=0;return}n.pointerId===this.pointerId&&this.endStroke(n.timeStamp)};e.addEventListener("pointerup",t),e.addEventListener("pointercancel",t),e.addEventListener("lostpointercapture",t),e.addEventListener("pointerleave",n=>{n.pointerType==="mouse"&&(this.hover=null),n.pointerId===this.pointerId&&n.pointerType==="mouse"&&this.endStroke(n.timeStamp)}),e.addEventListener("contextmenu",n=>n.preventDefault()),e.addEventListener("wheel",n=>{this.screen!=="play"||this.pointerId!==null||(n.preventDefault(),this.stage.rig.zoomBy(n.deltaY>0?1.06:1/1.06))},{passive:!1}),window.addEventListener("blur",()=>this.endStroke(performance.now())),document.addEventListener("visibilitychange",()=>{document.hidden?this.onHidden():this.onVisible()}),window.addEventListener("keydown",n=>this.onKey(n))}endStroke(e){if(this.pointerId===null)return;let t=this.pointerId;this.pointerId=null,this.shaver.pointerUp(Math.max(e,0)),this.audio.motorOn(!1),this.cutLevel=0,this.cursorPx=null;try{this.stage.renderer.domElement.releasePointerCapture(t)}catch{}if(this.pendingView!==null){let n=this.pendingView;this.pendingView=null,this.setView(n)}}rotateDown(e,t){e.preventDefault();try{t.setPointerCapture(e.pointerId)}catch{}this.rotatePointers.set(e.pointerId,this.canvasPoint(e)),this.pinchDist=0}rotateMove(e){let t=this.rotatePointers.get(e.pointerId);if(!t)return;let n=this.canvasPoint(e);if(this.rotatePointers.size>=2){this.rotatePointers.set(e.pointerId,n);let i=[...this.rotatePointers.values()],r=Math.hypot(i[0].x-i[1].x,i[0].y-i[1].y);this.pinchDist>0&&r>0&&this.stage.rig.zoomBy(this.pinchDist/r),this.pinchDist=r;return}this.stage.rig.orbit(n.x-t.x,n.y-t.y,this.stage.height),this.rotatePointers.set(e.pointerId,n),this.updateViewButtons()}onKey(e){if(e.target instanceof HTMLInputElement)return;if(e.key==="Escape"){if(cs()){ya("");return}if(ba()){hs();return}this.screen==="play"&&this.pause();return}if(this.screen!=="play"||cs()||ba())return;let t=Number(e.key);t>=1&&t<=5&&(this.requestView(t-1),e.preventDefault()),(e.key==="r"||e.key==="R")&&this.toggleRotate()}requestView(e){if(this.audio.ensure(),this.pointerId!==null){this.pendingView=e;return}this.setView(e)}setView(e){this.shaver.cancel(performance.now()),this.rotateMode&&(this.rotateMode=!1,this.updateRotateUI()),this.stage.rig.setView(e,!this.settings.lowStimulus||!0),this.viewsUsed.add(e),this.audio.whoosh(),this.updateViewButtons(),this.guideStep===1&&this.advanceGuide()}toggleRotate(){this.rotateMode=!this.rotateMode,this.rotateMode&&this.endStroke(performance.now()),this.rotatePointers.clear(),this.updateRotateUI(),this.setHint()}updateRotateUI(){Ze("btn-rotate").setAttribute("aria-pressed",String(this.rotateMode)),ne("badge-rotate").hidden=!this.rotateMode||this.screen!=="play";let e=this.stage?.renderer.domElement;e&&(e.style.cursor=this.screen!=="play"?"default":this.rotateMode?"grab":"none")}updateViewButtons(){let e=this.stage.rig.viewIndex;document.querySelectorAll(".view-btn[data-view]").forEach(t=>{t.setAttribute("aria-pressed",String(Number(t.dataset.view)===e))})}flushSim(e){if(this.screen==="play"&&(this.run==="ready"||this.run==="running")){let t=this.shaver.advance(e);this.afterStep(t,e,0)}}async pause(){if(this.screen!=="play"||this.run==="complete"||cs())return;let e=performance.now();if(this.flushSim(e),this.run==="complete")return;this.endStroke(e);let t=this.run==="running";t&&(this.run="paused",this.pauseStart=e,this.mode==="ta"&&this.markInterrupted()),this.shaver.armed=!1,this.audio.motorOn(!1);let i=this.mode==="ta"&&t?"\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF\u3092\u6B62\u3081\u305F\u306E\u3067\u3001\u3053\u306E\u6311\u6226\u306F\u300C\u4E2D\u65AD\u3042\u308A\u300D\u306B\u306A\u308A\u81EA\u5DF1\u30D9\u30B9\u30C8\u306E\u5BFE\u8C61\u5916\u3067\u3059\u3002\u7DF4\u7FD2\u3068\u3057\u3066\u305D\u306E\u307E\u307E\u7D9A\u3051\u3089\u308C\u307E\u3059\u3002":t?"\u30BF\u30A4\u30E0\u306F\u6B62\u307E\u3063\u3066\u3044\u307E\u3059\u3002":"\u307E\u3060\u30BF\u30A4\u30E0\u306F\u59CB\u307E\u3063\u3066\u3044\u307E\u305B\u3093\u3002",r=await hi("\u4E00\u6642\u505C\u6B62",i,[{label:"\u518D\u958B\u3059\u308B",kind:"primary",value:"resume"},{label:"\u3084\u308A\u76F4\u3059",value:"restart"},{label:"\u304A\u3058\u3055\u3093\u30FB\u9AEA\u578B\u3092\u5909\u3048\u308B",value:"title"},{label:"\u8A2D\u5B9A",value:"settings"}]);if(r==="restart"){if(await this.confirmReset()){this.startRun();return}return this.resumeFromPause()}if(r==="title"){if(await this.confirmReset()){this.showTitle();return}return this.resumeFromPause()}if(r==="settings"){this.sheets.openSettings(()=>this.resumeFromPause());return}this.resumeFromPause()}async confirmReset(){return this.run==="running"||this.run==="paused"||(this.state?this.state.cleanRatio>0:!1)?await hi("\u6700\u521D\u304B\u3089\u3084\u308A\u76F4\u3059\uFF1F","\u4ECA\u306E\u30D7\u30EC\u30A4\u306E\u6BDB\u306E\u6B8B\u308A\u3068\u30BF\u30A4\u30E0\u306F\u30EA\u30BB\u30C3\u30C8\u3055\u308C\u307E\u3059\u3002",[{label:"\u30EA\u30BB\u30C3\u30C8\u3059\u308B",kind:"danger",value:"yes"},{label:"\u30AD\u30E3\u30F3\u30BB\u30EB",value:"no"}])==="yes":!0}resumeFromPause(){if(this.screen!=="play")return;let e=performance.now();this.run==="paused"&&(this.pausedAccum+=e-this.pauseStart,this.run="running"),(this.run==="ready"||this.run==="running")&&(this.shaver.armed=!0),this.shaver.simTime=e}markInterrupted(){this.mode!=="ta"||this.interrupted||(this.interrupted=!0,ne("badge-interrupted").hidden=!1)}onHidden(){this.endStroke(performance.now()),this.flushSim(performance.now()),this.audio.pauseAll(),this.screen==="play"&&this.run==="running"&&(this.run="paused",this.pauseStart=performance.now(),this.shaver.armed=!1,this.mode==="ta"&&this.markInterrupted())}onVisible(){this.audio.resumeAll(),this.lastFrame=performance.now(),this.screen==="play"&&this.run==="paused"&&!cs()&&this.pauseDialogAfterReturn()}async pauseDialogAfterReturn(){if(await hi("\u304A\u304B\u3048\u308A\u306A\u3055\u3044",this.mode==="ta"?"\u30BF\u30D6\u3092\u96E2\u308C\u305F\u306E\u3067\u3001\u3053\u306E\u6311\u6226\u306F\u300C\u4E2D\u65AD\u3042\u308A\u300D\uFF08\u81EA\u5DF1\u30D9\u30B9\u30C8\u5BFE\u8C61\u5916\uFF09\u306B\u306A\u308A\u307E\u3057\u305F\u3002":"\u30BF\u30A4\u30E0\u306F\u6B62\u307E\u3063\u3066\u3044\u307E\u3059\u3002",[{label:"\u518D\u958B\u3059\u308B",kind:"primary",value:"resume"},{label:"\u3084\u308A\u76F4\u3059",value:"restart"}])==="restart"){this.startRun();return}this.resumeFromPause()}onContextLost(){this.endStroke(performance.now()),hi("\u8868\u793A\u304C\u4E2D\u65AD\u3055\u308C\u307E\u3057\u305F","\u30B0\u30E9\u30D5\u30A3\u30C3\u30AF\u306E\u63CF\u753B\u304C\u6B62\u307E\u308A\u307E\u3057\u305F\uFF08WebGL\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u306E\u6D88\u5931\uFF09\u3002\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002",[{label:"\u518D\u8AAD\u307F\u8FBC\u307F",kind:"primary",value:"reload"}]).then(()=>location.reload())}selectTool(e){this.mode==="ta"&&e!=="standard"||(this.audio.ensure(),this.freeToolId=e,this.screen==="play"&&(this.shaver.tool=Ol(this.toolDef(e)),this.clipper.setActive(e),this.audio.setTool(e),(this.run==="ready"||this.run==="running"||this.run==="paused")&&this.toolsUsed.add(e),this.audio.tap()),this.renderToolTray(),this.saveSelection(),this.updateTitleUI())}effectiveRadius(){return this.shaver.tool.radius*(this.assistActive?qu:1)}assistEnabled(){return this.mode==="ta"?!0:this.settings.assist}renderToolTray(){let e=ne("tool-list"),t=this.currentToolId();if(!e.childElementCount)for(let r of this.catalog.clippers){let a=document.createElement("button");a.type="button",a.className="tool-btn",a.dataset.tool=r.id,a.setAttribute("role","radio"),a.innerHTML=`<span class="tool-swatch" style="background:${r.color}"></span><span class="tool-name">${sr[r.id]?.short??r.name}</span>`,a.addEventListener("click",()=>this.selectTool(r.id)),e.appendChild(a)}e.querySelectorAll(".tool-btn").forEach(r=>{let a=r.dataset.tool;r.setAttribute("aria-checked",String(a===t)),r.disabled=this.mode==="ta"&&a!=="standard",r.setAttribute("aria-label",`${this.toolDef(a).name}\uFF1A${sr[a]?.feature??""}${r.disabled?"\uFF08\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF\u3067\u306F\u4F7F\u3048\u307E\u305B\u3093\uFF09":""}`);let o=this.sheets?.toolThumb(a);if(o&&!r.querySelector("img")){let l=document.createElement("img");l.src=o,l.alt="",r.querySelector(".tool-swatch")?.replaceWith(l)}});let n=this.toolDef(t),i=sr[t];ne("tool-desc").innerHTML=`<b>${n.name}</b>\uFF1A${i?.feature??""}${this.mode==="ta"?"\uFF08\u30BF\u30A4\u30E0\u30A2\u30BF\u30C3\u30AF\u306F\u30B9\u30BF\u30F3\u30C0\u30FC\u30C9\u56FA\u5B9A\uFF09":`\u30FB${i?.hint??""}`}`}frame=e=>{this.raf=requestAnimationFrame(this.frame);let t=performance.now(),n=Math.min(.1,Math.max(0,(t-this.lastFrame)/1e3));if(this.lastFrame=t,!this.stage||this.stage.contextLost)return;document.hidden||this.autoQualityCheck(n*1e3);let i=this.stage.rig;if(i.update(t)&&this.updateViewButtons(),this.screen==="title"&&!i.animating){let o=(t-this.titleT0)/1e3;i.az=.18+Math.sin(o*.5)*.32,i.apply()}let a=null;this.screen==="play"&&this.state&&(this.assistActive=this.assistEnabled()&&1-this.state.cleanRatio<=pr&&!this.state.complete,this.run==="ready"||this.run==="running"?(this.shaver.armed=!this.rotateMode,a=this.shaver.advance(t),this.afterStep(a,t,n)):this.shaver.simTime=t),this.syncHair(a),this.particles.suckTarget=this.clipper.activeId==="vacuum"&&this.pointerId!==null?this.tmpV2.copy(this.clipper.windowWorld):null,this.particles.update(n),this.sparkles.update(n,i.camera),this.character&&(this.character.update(t,n),this.stage.head.rotation.x=this.character.nod),this.updateCursor(t,a),this.screen==="play"&&this.updateHud(t,!1),this.stage.render()};afterStep(e,t,n){e.started&&this.run==="ready"&&(this.run="running",this.guideStep===0&&this.advanceGuide());let i=n>0?Math.min(1,e.removed/n/2.2):0;if(this.cutLevel+=(i-this.cutLevel)*Math.min(1,n*18),this.audio.setCut(this.pointerId!==null?this.cutLevel:0),this.audio.setBoost(e.boosting),ne("badge-boost").hidden=!e.boosting,e.removed>0&&this.character){for(t-this.lastReaction>2600&&(this.character.setExpression("tickle",t,650),this.lastReaction=t),this.recentCleared.push({t,n:e.cleared});this.recentCleared.length&&t-this.recentCleared[0].t>600;)this.recentCleared.shift();this.recentCleared.reduce((a,o)=>a+o.n,0)>=14&&t-this.lastSurprise>7e3&&(this.character.setExpression("surprise",t,800),this.lastSurprise=t,this.lastReaction=t),this.settings.vibration&&navigator.vibrate&&e.cleared>0&&t-this.lastVibe>140&&(navigator.vibrate(8),this.lastVibe=t)}e.cleared>0&&this.audio.drop(),this.clipper.activeId==="polish"&&e.removed>0&&e.lastHit&&t-this.lastSparkle>140&&this.state&&this.nearbyShort(e.lastHit.x,e.lastHit.y,e.lastHit.z)&&!this.settings.lowStimulus&&(this.sparkles.burst(this.tmpV.set(e.lastHit.x,e.lastHit.y,e.lastHit.z).applyMatrix4(this.stage.head.matrixWorld),3),this.audio.sparkle(),this.lastSparkle=t),e.completeAt>=0&&this.run==="running"&&this.complete(e.completeAt)}nearbyShort(e,t,n){let i=this.state;for(let r=0;r<i.count;r++){let a=i.h[r];if(a<=0||a>.08)continue;let o=i.pos[r*3]-e,l=i.pos[r*3+1]-t,c=i.pos[r*3+2]-n;if(o*o+l*l+c*c<.12)return!0}return!1}syncHair(e){if(!this.state||!this.hairView)return;let t=this.state.consumeDirty();if(!t.length)return;let n=this.clipper.activeId==="vacuum",i=0;this.hairView.sync(t,this.screen==="play"?r=>{i++,this.tmpV.set(r.x,r.y,r.z).normalize(),this.particles.spawn(r.x,r.y,r.z,r.size,r.color,this.tmpV)}:null),n&&i&&this.clipper.setCollected(this.clipper.collected+i*.0035),this.scalpShade?.update(t),this.screen==="play"&&this.updateRemainingMarks()}syncHairAll(){this.state&&(this.state.consumeDirty(),this.hairView?.syncAll(),this.scalpShade?.refreshAll())}updateCursor(e,t){let n=this.stage.rig.camera;if(this.screen!=="play"||this.rotateMode||this.run==="complete"||this.run==="paused"){this.clipper.group.visible=!1,this.guides.showBrush(null,n,1,"#fff"),this.screen!=="play"&&this.guides.hideRings();return}let i=this.pointerId!==null,r=null,a=null;i&&t?.lastHit?r=this.tmpV.set(t.lastHit.x,t.lastHit.y,t.lastHit.z).applyMatrix4(this.stage.head.matrixWorld):(a=i?this.cursorPx:this.hover,a&&this.state&&this.rayAt(a.x,a.y,this.hoverRay,this.hoverCam)&&Ul(this.state,this.hoverRay,this.character?.parts??[],.9,this.hoverHit)&&(r=this.tmpV.set(this.hoverHit.x,this.hoverHit.y,this.hoverHit.z).applyMatrix4(this.stage.head.matrixWorld)));let o=this.toolDef(this.clipper.activeId);if(r)this.clipper.group.visible=!0,this.clipper.pose(r,n,i,!!t?.boosting,e),this.guides.showBrush(r,n,this.effectiveRadius(),this.assistActive?"#ffd15c":"#ffffff");else if(a||i&&this.cursorPx){let l=a??this.cursorPx;this.ndc.set(l.x/this.stage.width*2-1,-(l.y/this.stage.height)*2+1),this.raycaster.setFromCamera(this.ndc,n),this.plane.setFromNormalAndCoplanarPoint(n.getWorldDirection(this.tmpV2).negate(),this.stage.rig.target);let c=this.raycaster.ray.intersectPlane(this.plane,this.tmpV);c?(this.clipper.group.visible=!0,this.clipper.pose(c,n,i,!1,e)):this.clipper.group.visible=!1,this.guides.showBrush(null,n,1,"#fff")}else this.clipper.group.visible=!1,this.guides.showBrush(null,n,1,"#fff");if(this.state){let c=1-this.state.cleanRatio<=pr&&!this.state.complete,h=this.clipper.activeId==="detail";c||h?(this.headInv.copy(this.stage.head.matrixWorld).invert(),this.guides.updateRings(this.state,n.position,this.headInv,c,h,e)):this.guides.hideRings(),ne("assist-tip").hidden=!c||this.state.remaining===0}}updateRemainingMarks(){let e=this.state,t=1-e.cleanRatio,n="",i=new Set;if(t<=pr&&!e.complete){for(let r=0;r<e.count;r++)e.h[r]>0&&i.add($h(e.normal[r*3],e.normal[r*3+1],e.normal[r*3+2]));n=[...i].sort().join(",")}n!==this.remainingMarksKey&&(this.remainingMarksKey=n,document.querySelectorAll(".view-btn[data-view]").forEach(r=>{let a=i.has(Number(r.dataset.view));r.classList.toggle("has-left",a);let o=ar[Number(r.dataset.view)].label;r.setAttribute("aria-label",`${o}\u304B\u3089\u898B\u308B\uFF08${Number(r.dataset.view)+1}\uFF09${a?"\uFF1A\u5208\u308A\u6B8B\u3057\u3042\u308A":""}`)}),this.setHint())}elapsedNow(e){return this.run==="running"?Math.max(0,e-this.shaver.startTime-this.pausedAccum):this.run==="paused"?Math.max(0,this.pauseStart-this.shaver.startTime-this.pausedAccum):this.run==="complete"?this.finalElapsed:0}updateHud(e,t){let n=this.state;if(!n)return;let i=this.mode==="ta"||this.settings.showTime,r=i?En(this.elapsedNow(e)):"--:--.--",a=`${wp(n.cleanRatio,n.complete)}%`;if((t||r!==this.hudCache.time)&&(ne("hud-time").textContent=r,this.hudCache.time=r,ne("hud-time-wrap").classList.toggle("hidden-time",!i)),t||a!==this.hudCache.clean){ne("hud-clean").textContent=a,this.hudCache.clean=a;let o=n.complete?100:Math.floor(n.cleanRatio*1e3)/10;ne("hud-bar").style.width=`${o}%`,ne("hud-meter").setAttribute("aria-valuenow",String(o)),ne("hud-meter").classList.toggle("done",n.complete)}}setHint(){let e=ne("hint-msg");if(this.rotateMode){e.textContent="\u30C9\u30E9\u30C3\u30B0\u3067\u56DE\u3059\u30FB2\u672C\u6307\u3067\u62E1\u5927\uFF08\u5208\u308C\u307E\u305B\u3093\uFF09";return}if(this.state&&1-this.state.cleanRatio<=pr&&!this.state.complete){e.textContent=`\u306E\u3053\u308A ${this.state.remaining} \u672C\uFF01 \u5370\u306E\u5411\u304D\u3082\u30C1\u30A7\u30C3\u30AF`;return}e.textContent=this.run==="ready"?"\u306A\u305E\u3063\u3066\u5208\u308B\uFF08\u62BC\u3057\u305F\u307E\u307E\u3067\u3082OK\uFF09":"\u306A\u305E\u3063\u3066\u5208\u308B\u30FB\u5411\u304D\u3092\u5909\u3048\u3066\u5F8C\u308D\u3082"}showGuide(){let e=ne("guide");this.guideStep===0?(e.innerHTML='<svg class="finger" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v4.5c0 3-2 5.5-5.5 5.5S7 19 6 16.5l-1.6-3.7a1.4 1.4 0 0 1 2.4-1.4L9 14" fill="none" stroke="#123B4A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>\u306A\u305E\u3063\u3066\u5208\u308B',e.hidden=!1):this.guideStep===1?(e.innerHTML="\u2193 \u5411\u304D\u3092\u5909\u3048\u3066\u3001\u5F8C\u308D\u3082",e.hidden=!1):e.hidden=!0}advanceGuide(){this.guideStep===0?(this.guideStep=1,ne("guide").hidden=!0,window.setTimeout(()=>{this.guideStep===1&&this.screen==="play"&&this.showGuide()},4500)):this.guideStep===1&&(this.guideStep=3,ne("guide").hidden=!0,this.settings.guideSeen=!0,gc(this.storage,this.settings))}complete(e){if(!this.state.complete)return;this.run="complete",this.shaver.armed=!1,this.endStroke(e),this.audio.motorOn(!1),this.guides.hideRings(),ne("assist-tip").hidden=!0,ne("guide").hidden=!0;let n=Math.max(1,e-this.shaver.startTime-this.pausedAccum);this.finalElapsed=n;let i=Math.min(Math.max(this.shaver.cuttingMs,1),n),r=Math.min(this.shaver.productiveMs,i),a=this.hairDef(),o;try{o=Mp({elapsedMs:n,parSeconds:a.parSeconds,productiveMs:r,cuttingMs:i,completed:!0,interrupted:this.interrupted})}catch(g){console.error(g),ki("\u7D50\u679C\u3092\u8A08\u7B97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");return}this.updateHud(performance.now(),!0);let l=[...this.toolsUsed],c={version:"1.1",mode:this.mode,characterId:this.characterId,hairId:this.hairId,seed:1,toolIds:l,assist:this.assistEnabled(),elapsedMs:o.elapsedMs,score:o.score,rank:o.rank,completed:!0,interrupted:this.interrupted,createdAt:new Date().toISOString()},h=this.records.add(c),u=this.records.best("1.1",this.mode,this.hairId,1);h.persisted||ki("\u8A18\u9332\u3092\u7AEF\u672B\u306B\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF08\u3053\u306E\u753B\u9762\u3092\u9589\u3058\u308B\u307E\u3067\u6709\u52B9\uFF09",3200);let d=this.charDef();this.last={result:o,characterId:d.id,characterName:d.name,hairId:a.id,hairName:a.name,mode:this.mode,toolIds:l,assist:c.assist,parSeconds:a.parSeconds,before:"",after:"",newBestTime:h.newBestTime,newBestScore:h.newBestScore,bestTime:u.time?.elapsedMs??null,bestScore:u.score?.score??null,createdAt:c.createdAt};let f=performance.now();this.character?.setExpression("happy",f),this.audio.chime(),this.settings.lowStimulus||(Nu(),this.sparkles.burst(this.tmpV.set(0,1.05,.2).applyMatrix4(this.stage.head.matrixWorld),8)),this.settings.vibration&&navigator.vibrate&&navigator.vibrate([20,60,20]),this.completeTimers.push(window.setTimeout(()=>{this.particles.clear(),this.setScreen("result"),this.completeTimers.push(window.setTimeout(()=>this.finishResult(),650))},900))}clearCompleteTimers(){this.completeTimers.forEach(e=>clearTimeout(e)),this.completeTimers=[]}finishResult(){let e=this.last;if(!e)return;let t=this.captureHead2();e.before=this.before?this.before.toDataURL("image/png"):"",e.after=t?t.toDataURL("image/png"):"",this.afterCanvas=t,this.saveLastResult(e),this.showResult(e)}afterCanvas=null;captureHead2(){try{return this.stage.capture(420,{az:0,el:.1,radius:1.45,ty:-.12})}catch{return null}}showResult(e){this.last=e,this.screen!=="result"&&this.setScreen("result");let t=e.result;ne("res-time").textContent=En(t.elapsedMs),ne("res-score").textContent=t.score.toLocaleString("ja-JP"),ne("res-rank").textContent=t.rank,ne("res-rank").setAttribute("aria-label",`\u30E9\u30F3\u30AF ${t.rank}`);let n=Fi[e.mode].short;ne("res-meta").textContent=`${e.characterName}\u30FB${e.hairName}\u30FB${n}${t.interrupted?"\uFF08\u4E2D\u65AD\u3042\u308A\uFF09":""}`,ne("result-title").textContent="\u3064\u308B\u3063\u3068\u5B8C\u4E86\uFF01",ne("res-rank").title=va[t.rank],ne("res-rank-title").textContent=va[t.rank];let i=e.toolIds.map(h=>this.toolDef(h).name).join("\u30FB"),r=Sp(t,e.parSeconds),a=[];e.newBestTime&&a.push('<span class="new">\u6700\u77ED\u30BF\u30A4\u30E0\u66F4\u65B0\uFF01</span>'),e.newBestScore&&a.push('<span class="new">\u6700\u9AD8\u70B9\u66F4\u65B0\uFF01</span>'),!a.length&&!t.interrupted&&(e.bestTime!==null&&a.push(`\u30D9\u30B9\u30C8 ${En(e.bestTime)}`),e.bestScore!==null&&a.push(`${e.bestScore.toLocaleString("ja-JP")}\u70B9`)),t.interrupted&&a.push("\u4E2D\u65AD\u3042\u308A\u306E\u305F\u3081\u81EA\u5DF1\u30D9\u30B9\u30C8\u5BFE\u8C61\u5916"),ne("res-sub").innerHTML=`<span>\u30B9\u30C3\u30AD\u30EA100\uFF05\u30FB\u4F7F\u7528\uFF1A${i}${e.assist?"\u30FB\u88DC\u52A9ON":""}</span><br><span class="res-breakdown">\u5185\u8A33 ${r.clean.toLocaleString()}\uFF0B\u901F\u3055${r.speed.toLocaleString()}\uFF0B\u52B9\u7387${r.efficiency.toLocaleString()}\uFF08\u52B9\u7387${Math.round(t.efficiency*100)}\uFF05\uFF09<br></span>${a.join(" ")}`,Bi("res-before").src=e.before||"",Bi("res-after").src=e.after||"";let o=Vl(this.config.publicUrl),l,c={result:t,hairName:e.hairName,modeName:n,characterName:e.characterName,canonicalUrl:o};try{l=Zh(c)}catch{l=Zh({...c,canonicalUrl:""})}ne("btn-x").href=l,ne("share-fallback").hidden=!0,Ze("btn-share").hidden=!0,this.cardPromise=null,this.cardFile=null,this.prepareCard().then(h=>{h&&Jh(h)&&(Ze("btn-share").hidden=!1)}).catch(()=>{})}shareText(){let e=this.last;return Kh({result:e.result,hairName:e.hairName,modeName:Fi[e.mode].short,characterName:e.characterName})}async loadImg(e){if(!e)return null;let t=new Image;t.src=e;try{await t.decode()}catch{return null}let n=document.createElement("canvas");return n.width=t.naturalWidth,n.height=t.naturalHeight,n.getContext("2d").drawImage(t,0,0),n}async prepareCard(){let e=this.last;if(!e)return null;this.cardPromise||(this.cardPromise=(async()=>Kp({result:e.result,characterName:e.characterName,hairName:e.hairName,modeName:Fi[e.mode].short,toolNames:e.toolIds.map(n=>this.toolDef(n).name),before:await this.loadImg(e.before)??this.before,after:await this.loadImg(e.after)??this.afterCanvas}))());let t=await this.cardPromise;if(!this.cardFile){let n=await Zp(t);this.cardFile=new File([n],Jp(),{type:"image/png"})}return this.cardFile}async saveCard(){try{let e=await this.prepareCard();if(!e)throw new Error("no result");let t=URL.createObjectURL(e),n=document.createElement("a");n.href=t,n.download=e.name,n.rel="noopener",document.body.appendChild(n),n.click(),n.remove();let i=document.createElement("div");i.className="card-preview-wrap";let r=document.createElement("img");r.className="card-preview",r.alt="\u7D50\u679C\u753B\u50CF\uFF081200\xD7630\uFF09",r.src=t;let a=document.createElement("p");a.className="note",a.textContent="\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u304C\u59CB\u307E\u3089\u306A\u3044\u3068\u304D\u306F\u3001\u753B\u50CF\u3092\u9577\u62BC\u3057\uFF08PC\u306F\u53F3\u30AF\u30EA\u30C3\u30AF\uFF09\u3057\u3066\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044\u3002X\u306E\u6295\u7A3F\u753B\u9762\u306B\u753B\u50CF\u306F\u81EA\u52D5\u3067\u4ED8\u304B\u306A\u3044\u306E\u3067\u3001\u4FDD\u5B58\u3057\u305F\u753B\u50CF\u3092\u81EA\u5206\u3067\u6DFB\u4ED8\u3057\u307E\u3059\u3002",i.append(r,a),ui("\u7D50\u679C\u753B\u50CF",i,()=>window.setTimeout(()=>URL.revokeObjectURL(t),6e4)),ki("\u7D50\u679C\u753B\u50CF\u3092\u4F5C\u308A\u307E\u3057\u305F")}catch(e){console.warn(e),this.cardPromise=null,this.cardFile=null,this.showShareFallback("\u753B\u50CF\u3092\u4F5C\u6210\u30FB\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6587\u9762\u3060\u3051\u30B3\u30D4\u30FC\u3059\u308B\u304B\u3001\u3082\u3046\u4E00\u5EA6\u8A66\u3057\u3066\u304F\u3060\u3055\u3044\u3002")}}async shareCard(){try{let e=await this.prepareCard();if(!e||!Jh(e)){await this.saveCard();return}await navigator.share({files:[e],text:this.shareText(),title:"\u30A2\u30D5\u30ED\u3001\u30B9\u30C3\u30AD\u30EA\u3002"})}catch(e){if(e?.name==="AbortError")return;this.showShareFallback("\u5171\u6709\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u753B\u50CF\u3092\u4FDD\u5B58\u3057\u3066\u304B\u3089\u6DFB\u4ED8\u3057\u3066\u304F\u3060\u3055\u3044\u3002")}}showShareFallback(e){ne("share-fallback-text").textContent=e,ne("share-fallback").hidden=!1}async copyText(){let e=this.shareText()+`
#\u30A2\u30D5\u30ED\u30B9\u30C3\u30AD\u30EA #\u30D6\u30E9\u30A6\u30B6\u30B2\u30FC\u30E0`+(Vl(this.config.publicUrl)?`
${Vl(this.config.publicUrl)}`:"");try{await navigator.clipboard.writeText(e),ki("\u6587\u9762\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}catch{hi("\u6587\u9762",e,[{label:"\u9589\u3058\u308B",value:"ok"}])}}saveLastResult(e){try{sessionStorage.setItem(jp,JSON.stringify(e))}catch{}}loadLastResult(){try{let e=sessionStorage.getItem(jp);if(!e)return null;let t=JSON.parse(e);return!t?.result?.completed||!Number.isFinite(t.result.elapsedMs)?null:t}catch{return null}}updateTitleUI(){document.querySelectorAll(".mode-opt").forEach(e=>e.setAttribute("aria-checked",String(e.dataset.mode===this.mode))),ne("mode-desc").textContent=Fi[this.mode].desc,ne("pill-char-name").textContent=this.charDef().name,ne("pill-hair-name").textContent=this.hairDef().name,ne("pill-tool-name").textContent=this.mode==="ta"?"\u30B9\u30BF\u30F3\u30C0\u30FC\u30C9\u56FA\u5B9A":this.toolDef(this.freeToolId).name,Ze("btn-pick-tool").disabled=!1,this.sheets?.refreshPillImages()}setMode(e){this.mode=e,this.updateTitleUI(),this.saveSelection()}async selectCharacter(e){this.characterId=e,this.saveSelection(),await this.loadScene(e,this.hairId),this.character?.setExpression("tickle",performance.now(),600),this.updateTitleUI()}async selectHair(e){this.hairId=e,this.saveSelection(),await this.loadScene(this.characterId,e),this.frameForScreen(!0),this.updateTitleUI()}applySettings(){gc(this.storage,this.settings),this.audio.applySettings(this.settings),this.clipper.leftHanded=this.settings.leftHanded,document.documentElement.classList.toggle("low-stim",this.settings.lowStimulus),Ze("btn-mute").setAttribute("aria-pressed",String(this.settings.muted)),Ze("btn-mute").setAttribute("aria-label",this.settings.muted?"\u97F3\u3092\u51FA\u3059":"\u97F3\u3092\u6D88\u3059"),this.particles.enabled=!0,this.stage&&this.hairView&&this.loadedKey&&!this.loadedKey.endsWith(`|${this.effQuality()}`)&&(this.screen!=="play"||this.run==="ready")&&this.rebuildHairView(),this.screen==="play"&&(this.updateHud(performance.now(),!0),this.renderToolTray())}bindUI(){Ze("btn-start").addEventListener("click",()=>{this.audio.ensure(),this.audio.applySettings(this.settings),this.startRun()}),document.querySelectorAll(".mode-opt").forEach(e=>e.addEventListener("click",()=>this.setMode(e.dataset.mode))),Ze("btn-pick-character").addEventListener("click",()=>this.sheets.openCharacters()),Ze("btn-pick-hair").addEventListener("click",()=>this.sheets.openHair()),Ze("btn-pick-tool").addEventListener("click",()=>this.sheets.openTools()),Ze("btn-records").addEventListener("click",()=>this.sheets.openRecords()),Ze("btn-settings-title").addEventListener("click",()=>this.sheets.openSettings()),Ze("btn-last-result").addEventListener("click",()=>{let e=this.loadLastResult();e&&(this.cardPromise=null,this.showResult(e))}),Ze("btn-pause").addEventListener("click",()=>{this.pause()}),Ze("btn-settings").addEventListener("click",()=>{this.run==="running"?this.pause():this.sheets.openSettings()}),Ze("btn-mute").addEventListener("click",()=>{this.audio.ensure(),this.settings.muted=!this.settings.muted,this.applySettings()}),Ze("btn-rotate").addEventListener("click",()=>this.toggleRotate()),document.querySelectorAll(".view-btn[data-view]").forEach(e=>e.addEventListener("click",()=>this.requestView(Number(e.dataset.view)))),Ze("btn-again").addEventListener("click",()=>{this.startRun()}),Ze("btn-to-title").addEventListener("click",()=>this.showTitle()),Ze("btn-save").addEventListener("click",()=>{this.saveCard()}),Ze("btn-share").addEventListener("click",()=>{this.shareCard()}),Ze("btn-copy-text").addEventListener("click",()=>{this.copyText()}),Ze("btn-retry-card").addEventListener("click",()=>{this.cardPromise=null,this.cardFile=null,ne("share-fallback").hidden=!0,this.saveCard()}),ne("btn-x").addEventListener("click",()=>ki("X\u306E\u6295\u7A3F\u753B\u9762\u3092\u958B\u304D\u307E\u3059\uFF08\u6295\u7A3F\u306F\u3054\u81EA\u8EAB\u3067\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF09",2600)),Ze("sheet-close").addEventListener("click",()=>hs()),ne("sheet-backdrop").addEventListener("click",()=>hs()),this.applySettings()}observeResize(){let e=ne("stage");new ResizeObserver(()=>this.onResize()).observe(e),window.addEventListener("resize",()=>this.onResize()),window.addEventListener("orientationchange",()=>this.onResize()),this.onResize()}onResize(){if(!this.stage)return;this.endStroke(performance.now());let t=ne("stage").getBoundingClientRect();this.stage.resize(Math.round(t.width),Math.round(t.height)),this.frameForScreen(!1),this.screen==="play"&&this.stage.rig.setView(Math.max(0,this.stage.rig.viewIndex),!1)}debugInfo(){let e=this.stage.renderer.info;return{screen:this.screen,run:this.run,remaining:this.state?.remaining,clean:this.state?.cleanRatio,elapsed:this.elapsedNow(performance.now()),cutting:this.shaver.cuttingMs,productive:this.shaver.productiveMs,geometries:e.memory.geometries,textures:e.memory.textures,programs:e.programs?.length,particles:this.particles.active,sceneChildren:this.stage.head.children.length,overlayChildren:this.stage.overlay.children.length,interrupted:this.interrupted,last:this.last?{...this.last,before:this.last.before.length,after:this.last.after.length}:null,xHref:ne("btn-x").href}}debugRemaining(){let e=this.state,t=this.stage.rig.camera,n=[];for(let i=0;i<e.count;i++){if(e.h[i]<=0)continue;let r=i*3,a=new C(e.base[r]+e.growth[r]*e.h[i]*.5,e.base[r+1]+e.growth[r+1]*e.h[i]*.5,e.base[r+2]+e.growth[r+2]*e.h[i]*.5).applyMatrix4(this.stage.head.matrixWorld),l=t.position.clone().sub(a).normalize().dot(new C(e.normal[r],e.normal[r+1],e.normal[r+2]));a.project(t),n.push({i,view:$h(e.normal[r],e.normal[r+1],e.normal[r+2]),x:(a.x*.5+.5)*this.stage.width,y:(-a.y*.5+.5)*this.stage.height,facing:l,h:e.h[i]})}return n}async debugOgImage(){let e=this.captureHead(),t=document.createElement("canvas");t.width=1200,t.height=630;let n=t.getContext("2d"),i=n.createLinearGradient(0,0,0,630);i.addColorStop(0,"#8fdcec"),i.addColorStop(1,"#e9f8f6"),n.fillStyle=i,n.fillRect(0,0,1200,630),e&&n.drawImage(e,620,30,580,580);let{FONT_STACK:r}=await Promise.resolve().then(()=>(ac(),Wp));return n.textBaseline="alphabetic",n.lineJoin="round",n.font=`900 120px ${r}`,n.lineWidth=16,n.strokeStyle="#ffffff",n.strokeText("\u30A2\u30D5\u30ED\u3001",60,230),n.fillStyle="#123B4A",n.fillText("\u30A2\u30D5\u30ED\u3001",60,230),n.strokeText("\u30B9\u30C3\u30AD\u30EA\u3002",60,370),n.fillStyle="#FF855E",n.fillText("\u30B9\u30C3\u30AD\u30EA\u3002",60,370),n.font=`800 40px ${r}`,n.fillStyle="#123B4A",n.fillText("\u5208\u3063\u3066\u3001\u3064\u308B\u3063\u3068\u3001\u6C17\u5206\u723D\u5FEB\u3002",64,450),n.font=`800 30px ${r}`,n.fillText("\u30B9\u30DE\u30DB\u30FBPC\u3067\u904A\u3079\u308B3D\u30D6\u30E9\u30A6\u30B6\u30B2\u30FC\u30E0",64,520),t.toDataURL("image/png")}debugCutAllBut(e){let t=this.state,n=[...Array(t.count).keys()].filter(r=>t.h[r]>0).sort((r,a)=>t.pos[r*3+2]-t.pos[a*3+2]),i=new Set(n.slice(0,e));for(let r=0;r<t.count;r++)i.has(r)||t.setHeight(r,0)}};ac();Ma();function Uu(s,e){let t=e>0?Math.round(s/e*100):0;ne("load-bar").style.width=`${t}%`,ne("load-progress").setAttribute("aria-valuenow",String(t)),ne("load-text").textContent=`\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026 ${t}%`}function em(s,e){ne("load-error").hidden=!1,ne("load-error-text").textContent=s,Ze("btn-retry").hidden=!e,ne("load-text").textContent=""}var ds=null;async function Oy(){if(ne("load-error").hidden=!0,ne("app").dataset.screen="loading",ne("screen-loading").hidden=!1,!Fp()){em(`\u3053\u306E\u7AEF\u672B\u30FB\u30D6\u30E9\u30A6\u30B6\u3067\u306F3D\u8868\u793A\uFF08WebGL\uFF09\u304C\u4F7F\u3048\u307E\u305B\u3093\u3002
\u30FB\u30D6\u30E9\u30A6\u30B6\u3092\u6700\u65B0\u7248\u306B\u66F4\u65B0\u3059\u308B
\u30FB\u8A2D\u5B9A\u3067\u30CF\u30FC\u30C9\u30A6\u30A7\u30A2\u30A2\u30AF\u30BB\u30E9\u30EC\u30FC\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B
\u30FB\u5225\u306E\u30D6\u30E9\u30A6\u30B6\uFF08Chrome / Safari / Edge\uFF09\u3067\u958B\u304F
\u306E\u3044\u305A\u308C\u304B\u3092\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002`,!1);return}try{let s=new Aa,e=td(s);document.documentElement.classList.toggle("low-stim",e.lowStimulus);let[t]=await Promise.all([Qu(),Du()]),n=ne("game-canvas");ds?await ds.boot(n,Uu):(ds=new lc(s,e,t),new URLSearchParams(location.search).has("debug")&&(window.__afro=ds),await ds.boot(n,Uu)),Uu(1,1),ds.showTitle(),s.available||window.setTimeout(()=>Promise.resolve().then(()=>(Ma(),Gp)).then(i=>i.toast("\u3053\u306E\u74B0\u5883\u3067\u306F\u8A18\u9332\u3092\u7AEF\u672B\u306B\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\uFF08\u4E00\u6642\u4FDD\u5B58\u306E\u307F\uFF09",3600)),800)}catch(s){console.error(s),ds=null,em(`\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u901A\u4FE1\u72B6\u6CC1\u3092\u78BA\u8A8D\u3057\u3066\u3001\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002
\uFF08${s?.message??s}\uFF09`,!0)}}Ze("btn-retry").addEventListener("click",()=>location.reload());Oy();
/*! For license information please see main.js.LEGAL.txt */

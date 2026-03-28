// ── ÉQUIPE ────────────────────────────────────────────────────────────────
const TEAM=[
  {id:1,slug:'bennoui',  name:'BENNOUI Imran',  fn:'Imran',    sh:'IB',role:'alt',label:'Préparateur Alternant',       color:'#92400e',bg:'#fef3c7'},
  {id:2,slug:'afriyie',  name:'AFRIYIE Grace',  fn:'Grace',    sh:'GA',role:'ph', label:'Pharmacienne (fin études)',    color:'#1e40af',bg:'#dbeafe'},
  {id:3,slug:'addaoud',  name:'ADDAOUD Imene',  fn:'Imene',    sh:'IA',role:'pr', label:'Préparatrice',                 color:'#065f46',bg:'#d1fae5'},
  {id:4,slug:'badet',    name:'BADET Aurelie',  fn:'Aurelie',  sh:'AB',role:'alt',label:'Préparatrice en formation',    color:'#92400e',bg:'#fef3c7'},
  {id:5,slug:'tounekti', name:'TOUNEKTI Ines',  fn:'Ines',     sh:'IT',role:'alt',label:'Préparatrice en alternance',   color:'#92400e',bg:'#fef3c7'},
  {id:6,slug:'benayed',  name:'BEN AYED Rayen', fn:'Rayen',    sh:'RB',role:'alt',label:'Alternant polyvalent',         color:'#92400e',bg:'#fef3c7'},
  {id:7,slug:'goldbronn',name:'GOLDBRONN Clara', fn:'Clara',   sh:'CG',role:'ph', label:'Pharmacienne',                 color:'#1e40af',bg:'#dbeafe'},
  {id:8,slug:'kabour',   name:'KABOUR Sirine',  fn:'Sirine',   sh:'SK',role:'pr', label:'Préparatrice',                 color:'#065f46',bg:'#d1fae5'},
  {id:9,slug:'medjdoub', name:'MEDJDOUB Ahlam', fn:'Ahlam',   sh:'AM',role:'alt',label:'Alternante',                   color:'#92400e',bg:'#fef3c7'},
];

// ── PLANNING TYPE ──────────────────────────────────────────────────────────
// SAMEDIS :
//   Groupe A (semaines paires)  : Clara (7), Aurélie (4)  → travaillent sam 28/03/2026
//   Groupe B (semaines impaires): Sirine (8)              → travaille sem suivante
//   Tous les samedis            : Inès (5)
//   Jamais le samedi            : Ahlam (9), Imran (1)
// samSem=0 → semaines paires = groupe A actif (valeur par défaut, correspond à auj 28/03)
// PLANNING FIXE PAR JOUR :
// Imran (1)  : Lun + Mar + Mer uniquement + Sam groupe B (impaires = sem pro)
// Inès  (5)  : Jeu + Ven uniquement       + Sam groupe A (paires   = ce sam)
// Imene (3)  : tous les jours semaine
// Rayen (6)  : tous les jours + sam
// Ahlam (9)  : tous les jours semaine (pas sam)
// Clara (7)  : Mer + Jeu + Ven + Sam groupe A
// Aurélie(4) : Sam groupe A
// Sirine (8) : Mer + Jeu + Ven + Sam groupe B
// samSem=0 → semaines paires = groupe A actif (Inès sam ce sam, Imran sam pro)
const SCHED={
  1:[ // Lundi
    {empId:1,s:'08:30',e:'19:30'},  // Imran
    {empId:3,s:'08:30',e:'19:30'},  // Imene
    {empId:6,s:'10:00',e:'19:30'},  // Rayen
    {empId:9,s:'09:00',e:'17:00'},  // Ahlam
  ],
  2:[ // Mardi
    {empId:1,s:'08:30',e:'19:30'},  // Imran
    {empId:3,s:'08:30',e:'19:30'},  // Imene
    {empId:6,s:'10:00',e:'19:30'},  // Rayen
    {empId:9,s:'09:00',e:'17:00'},  // Ahlam
  ],
  3:[ // Mercredi
    {empId:1,s:'08:30',e:'19:30'},  // Imran
    {empId:3,s:'08:30',e:'19:30'},  // Imene
    {empId:6,s:'10:00',e:'19:30'},  // Rayen
    {empId:7,s:'08:30',e:'19:30'},  // Clara
    {empId:8,s:'08:30',e:'19:30'},  // Sirine
  ],
  4:[ // Jeudi
    {empId:5,s:'08:30',e:'19:30'},  // Inès
    {empId:6,s:'10:00',e:'19:30'},  // Rayen
    {empId:7,s:'08:30',e:'19:30'},  // Clara
    {empId:8,s:'08:30',e:'19:30'},  // Sirine
    {empId:9,s:'09:00',e:'17:00'},  // Ahlam
  ],
  5:[ // Vendredi
    {empId:5,s:'08:30',e:'19:30'},  // Inès
    {empId:6,s:'10:00',e:'19:30'},  // Rayen
    {empId:7,s:'08:30',e:'19:30'},  // Clara
    {empId:8,s:'08:30',e:'19:30'},  // Sirine
    {empId:9,s:'09:00',e:'17:00'},  // Ahlam
  ],
  6:[ // Samedi
    // Rayen : tous les samedis
    {empId:6,s:'10:00',e:'19:00'},
    // Groupe A (paires = ce sam) : Inès + Clara + Aurélie
    {empId:5,s:'09:00',e:'19:00',altSam:true,samGrp:'A'},
    {empId:7,s:'09:00',e:'19:00',altSam:true,samGrp:'A'},
    {empId:4,s:'09:00',e:'19:00',altSam:true,samGrp:'A'},
    // Groupe B (impaires = sam pro) : Imran + Sirine
    {empId:1,s:'09:00',e:'19:00',altSam:true,samGrp:'B'},
    {empId:8,s:'09:00',e:'19:00',altSam:true,samGrp:'B'},
    // Ahlam (9) : pas de samedi
  ],
};

// ── CONSTANTES ─────────────────────────────────────────────────────────────
const MO=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DS=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
const DF=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const ROLE_CLS={ph:'c-ph',pr:'c-pr',alt:'c-alt'};

// ── JOURS FÉRIÉS ───────────────────────────────────────────────────────────
function isFerie(date){
  const y=date.getFullYear(),m=date.getMonth()+1,d=date.getDate();
  const fixes=[[1,1],[5,1],[5,8],[7,14],[8,15],[11,1],[11,11],[12,25]];
  if(fixes.some(([fm,fd])=>m===fm&&d===fd))return true;
  function easterDate(yr){
    const a=yr%19,b=Math.floor(yr/100),c=yr%100,d2=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d2-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m2=Math.floor((a+11*h+22*l)/451),n=Math.floor((h+l-7*m2+114)/31),p=(h+l-7*m2+114)%31+1;
    return new Date(yr,n-1,p);
  }
  const easter=easterDate(y);
  const lp=new Date(easter);lp.setDate(lp.getDate()+1);
  if(date.toDateString()===lp.toDateString())return true;
  const asc=new Date(easter);asc.setDate(asc.getDate()+39);
  if(date.toDateString()===asc.toDateString())return true;
  const pent=new Date(easter);pent.setDate(pent.getDate()+50);
  if(date.toDateString()===pent.toDateString())return true;
  return false;
}

// ── FIREBASE ───────────────────────────────────────────────────────────────
const FIREBASE_CFG={
  apiKey:"AIzaSyCbOvsiUxp_kNlpJsys1ejNC-TVGalwHAM",
  authDomain:"pharmacie-villeurbanne.firebaseapp.com",
  projectId:"pharmacie-villeurbanne",
  storageBucket:"pharmacie-villeurbanne.firebasestorage.app",
  messagingSenderId:"901431910810",
  appId:"1:901431910810:web:b09eeb8624dcd3536e1a23"
};
const FS_DOC='planning/data';
let _db=null,_fsDb=null,_fsUnsubscribe=null,_changeCallbacks=[];

function _emptyDb(){return{shifts:{},interims:{},requests:[],rid:1,pt:{},samSem:0};}

function showSync(msg,state){
  const el=document.getElementById('sync-dot');if(!el)return;
  el.title=msg;el.className='sync-dot '+(state==='ok'?'ok':state==='err'?'err':'');
}

function _initFirebase(){
  if(_fsDb)return;
  try{
    if(!window.firebase)return;
    if(!firebase.apps||!firebase.apps.length)firebase.initializeApp(FIREBASE_CFG);
    _fsDb=firebase.firestore();
    showSync('Firebase connecté','ok');
  }catch(e){showSync('Firebase erreur','err');}
}

async function dbLoad(){
  if(_db)return _db;
  try{const l=JSON.parse(localStorage.getItem('pharma_v8')||'null');if(l)_db=l;}catch{}
  if(!_db)_db=_emptyDb();
  setTimeout(()=>{_initFirebase();_startListen();},300);
  return _db;
}

function _startListen(){
  if(!_fsDb||_fsUnsubscribe)return;
  try{
    _fsUnsubscribe=_fsDb.doc(FS_DOC).onSnapshot(snap=>{
      if(snap.exists){
        _db=snap.data();
        localStorage.setItem('pharma_v8',JSON.stringify(_db));
        showSync('Synchronisé ✓','ok');
        _changeCallbacks.forEach(fn=>fn());
      }
    },()=>showSync('Hors-ligne','err'));
  }catch(e){}
}

function onDbChange(fn){_changeCallbacks.push(fn);}
function db(){return _db||_emptyDb();}
function idb(){const d=db();if(!d.shifts)d.shifts={};if(!d.interims)d.interims={};if(!d.requests)d.requests=[];if(!d.rid)d.rid=1;if(!d.pt)d.pt={};if(!d.samSem)d.samSem=0;return d;}

function sdb(d){
  _db=d;
  localStorage.setItem('pharma_v8',JSON.stringify(d));
  if(_fsDb){_fsDb.doc(FS_DOC).set(d).then(()=>showSync('Enregistré ✓','ok')).catch(()=>showSync('Erreur sync','err'));}
}

// ── HELPERS ────────────────────────────────────────────────────────────────
function dk(d){return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();}
function fi(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function ft(d){return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function r30(t){const[h,m]=t.split(':').map(Number);let rh=h,rm=0;if(m>=15&&m<=44)rm=30;else if(m>=45){rh=h+1;rm=0;}if(rh>=24){rh=23;rm=30;}return String(rh).padStart(2,'0')+':'+String(rm).padStart(2,'0');}
function tdiff(a,b){const[h1,m1]=a.split(':').map(Number),[h2,m2]=b.split(':').map(Number),d=(h2*60+m2)-(h1*60+m1);return d<=0?'—':Math.floor(d/60)+'h'+String(d%60).padStart(2,'0');}

// Numéro de semaine ISO
function isoWeek(date){
  const d=new Date(date);d.setHours(0,0,0,0);
  d.setDate(d.getDate()+3-(d.getDay()+6)%7);
  return Math.round((d-new Date(d.getFullYear(),0,4))/(7*86400000));
}
// Groupe A actif = semaines paires (samSem=0 par défaut, correspond au sam 28/03/2026)
// Groupe B actif = semaines impaires
function isGrpAActive(date){return isoWeek(date)%2===(db().samSem||0)%2;}

function empShifts(date,empId){
  const d2=db(),k2=dk(date),fi2=fi(date);
  const leave=(d2.requests||[]).find(r=>r.empId===empId&&r.status==='approved'&&(r.type==='conge'||r.type==='absent')&&r.start<=fi2&&fi2<=r.end);
  if(leave)return{empId,type:leave.type,s:'',e:''};
  const man=(d2.shifts[k2]||[]).find(s=>s.empId===empId);
  if(man)return man;
  const dow=date.getDay();
  if(dow===0)return null;
  if(isFerie(date))return null;
  if(dow===6){
    const sched=SCHED[6]||[];
    const s=sched.find(x=>x.empId===empId);
    if(!s)return null;
    if(s.altSam){
      const grpAActive=isGrpAActive(date);
      if(s.samGrp==='A'&&!grpAActive)return null;
      if(s.samGrp==='B'&&grpAActive)return null;
    }
    return s;
  }
  return(SCHED[dow]||[]).find(s=>s.empId===empId)||null;
}

function dayAllShifts(date){
  const d2=db(),k2=dk(date),dow=date.getDay();
  if(dow===0)return{present:[],conge:[],interims:d2.interims[k2]||[]};
  if(isFerie(date))return{present:[],conge:[],interims:[],ferie:true};
  const present=[],conge=[];
  TEAM.forEach(emp=>{
    const sh=empShifts(date,emp.id);
    if(!sh)return;
    if(sh.type==='conge'||sh.type==='absent'){conge.push({emp,type:sh.type});}
    else{present.push({emp,sh});}
  });
  return{present,conge,interims:d2.interims[k2]||[]};
}

function weekDays(off){
  const t=new Date(),dow=t.getDay(),mn=new Date(t);
  mn.setDate(t.getDate()-(dow===0?6:dow-1)+off*7);
  return Array.from({length:7},(_,i)=>{const d=new Date(mn);d.setDate(mn.getDate()+i);return d;});
}

function toast(msg,err){
  let t=document.getElementById('__toast');
  if(!t){t=document.createElement('div');t.id='__toast';t.style.cssText='position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(8px);padding:11px 22px;border-radius:10px;font-size:13px;font-weight:600;z-index:9999;opacity:0;transition:all .25s;pointer-events:none;white-space:nowrap;box-shadow:0 6px 24px rgba(0,0,0,.25)';document.body.appendChild(t);}
  t.textContent=msg;
  t.style.background=err?'#7f1d1d':'#052e16';
  t.style.color='#fff';
  t.style.opacity='1';
  t.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(t._t);
  t._t=setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(8px)';},2800);
}

// Charger Firebase
(function(){
  const s1=document.createElement('script');
  s1.src='https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  s1.onload=function(){
    const s2=document.createElement('script');
    s2.src='https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
    s2.onload=function(){_initFirebase();_startListen();};
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();

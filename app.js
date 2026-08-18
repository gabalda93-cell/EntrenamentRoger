(() => {
  'use strict';

  const APP_VERSION = '1.0.0';
  const STORAGE_KEY = 'ale_roberto_m1_v1';
  const BACKUP_SCHEMA = 'ale-training-backup';
  const PLAN_ID = 'roberto-m1';
  const CLIENT_ID = 'roberto';

  const PLAN = {
    clientId: CLIENT_ID,
    planId: PLAN_ID,
    title: 'Mesociclo 1',
    subtitle: 'Hipertrofia de tren superior · fuerza general · base cardiorrespiratoria',
    sessionsTarget: 12,
    order: ['A', 'B', 'C'],
    exercises: {
      A: {
        title: 'Sesión A',
        subtitle: 'Dorsal, pecho superior y base de piernas',
        cardio: true,
        exercises: [
          ex('A1','Jalón al pecho en polea',true,[8,12],120,'Pecho estable; lleva los codos hacia abajo.','Máquina de jalón convergente.'),
          ex('A2','Press inclinado en máquina',true,[8,12],120,'Recorrido cómodo y escápulas estables.','Otra máquina de press inclinado equivalente; mantén la misma para comparar progreso.'),
          ex('A3','Prensa de piernas',true,[10,15],120,'Profundidad controlable con la zona lumbar estable; evita bloquear la rodilla con agresividad.','Prensa horizontal si es la opción disponible y cómoda.'),
          ex('A4','Remo sentado en máquina',true,[8,12],120,'Tronco quieto; termina llevando el codo hacia atrás sin impulso lumbar.','Remo en polea sentado con agarre neutro.'),
          ex('A5','Elevación lateral en máquina o polea',false,[12,20],75,'Carga moderada y sin balanceo; busca el deltoide lateral.','Mantén una sola variante durante todo el bloque.'),
          ex('A6','Curl de bíceps en máquina',false,[10,15],75,'Codos quietos y bajada controlada.','Curl en polea si no hay máquina disponible.')
        ]
      },
      B: {
        title: 'Sesión B',
        subtitle: 'Pectoral, remo y cadena posterior',
        cardio: false,
        exercises: [
          ex('B1','Press de pecho en máquina',true,[8,12],120,'Ajusta el asiento para que la empuñadura quede a la altura del pecho.','Otra máquina de press de pecho con recorrido cómodo.'),
          ex('B2','Remo en polea con agarre neutro',true,[8,12],120,'Inicia con escápula y codo; no tires con la zona lumbar.','Remo sentado en máquina.'),
          ex('B3','Curl femoral sentado',true,[10,15],105,'Rango completo tolerado y pelvis estable; prioriza el control.','Curl femoral tumbado si no hay versión sentada.'),
          ex('B4','Press de hombro en máquina',false,[8,12],120,'Abdomen activo; evita compensar con extensión lumbar.','Press de hombro guiado equivalente.'),
          ex('B5','Pec deck / contractor de pecho',false,[10,15],75,'Recorrido cómodo; no fuerces el estiramiento por detrás del tronco.','Cruce de poleas si permite un recorrido estable.'),
          ex('B6','Extensión de tríceps en polea',false,[10,15],75,'Codos estables y extensión controlada; hombro quieto.','Empuje de tríceps con otro agarre cómodo.')
        ]
      },
      C: {
        title: 'Sesión C',
        subtitle: 'Espalda alta, hombro y piernas complementarias',
        cardio: true,
        exercises: [
          ex('C1','Jalón neutro en polea',true,[8,12],120,'Agarre distinto a A, con la misma mecánica básica y sin balanceo.','Máquina de jalón convergente.'),
          ex('C2','Press inclinado con mancuernas',false,[8,12],120,'Inclinación moderada; escápulas estables y recorrido cómodo.','Press inclinado en máquina.'),
          ex('C3','Extensión de cuádriceps',false,[10,15],90,'Rango cómodo, sin rebote; una pausa breve arriba puede ayudar al control.','Otra máquina de extensión de rodilla equivalente.'),
          ex('C4','Curl femoral sentado',false,[10,15],90,'Usa la misma máquina que en B si es posible para comparar la progresión.','Curl femoral tumbado si no hay versión sentada.'),
          ex('C5','Reverse fly / deltoide posterior',false,[12,20],75,'Movimiento controlado del brazo; no lo conviertas en un remo pesado.','Reverse fly en polea si no hay máquina.'),
          ex('C6','Elevación lateral',false,[12,20],75,'Máquina o polea; mantén la misma variante durante el bloque.','La otra variante estable disponible.'),
          ex('C7','Curl de bíceps en polea o máquina',false,[10,15],75,'Evita el impulso del tronco; no hace falta variar cada sesión.','Elige una variante estable y mantenla.')
        ]
      }
    }
  };

  function ex(id,name,principal,reps,rest,cue,alt){ return {id,name,principal,reps,rest,cue,alt}; }

  const PHASES = [
    {n:1, range:'Sesiones 1–3', name:'Calibración', rir:'RIR 3–4', cardio:'8 min', goal:'Aprender cargas, técnica y registro con fatiga contenida.'},
    {n:2, range:'Sesiones 4–6', name:'Base fiable', rir:'RIR 3', cardio:'10 min', goal:'Iniciar la doble progresión con una referencia ya estable.'},
    {n:3, range:'Sesiones 7–9', name:'Volumen productivo', rir:'RIR 2', cardio:'12 min', goal:'Consolidar trabajo útil sin añadir complejidad.'},
    {n:4, range:'Sesiones 10–12', name:'Consolidación', rir:'RIR 2 · última principal 1–2', cardio:'12–15 min', goal:'Pico modesto de esfuerzo y revisión para el mesociclo 2.'}
  ];

  const INTRO = [
    {
      eyebrow:'Bienvenido', title:'Un plan pensado para tu realidad',
      body:['Este bloque prioriza espalda, hombros y pecho, sin abandonar piernas. La idea no es agotarte: es conseguir un estímulo que puedas repetir aunque tu trabajo ya sea físicamente exigente.','Las 12 sesiones se hacen en orden A → B → C. Tus turnos cambian; el plan no depende de lunes, miércoles y viernes.'],
      list:['12 sesiones acreditadas','3 sesiones distintas A · B · C','45–60 min por sesión','0 series obligatorias al fallo']
    },
    {
      eyebrow:'La estructura', title:'Aquí manda la sesión, no la semana',
      body:['Si una semana solo caben una o dos sesiones, la siguiente continúa por la pendiente. No reinicias el lunes y no doblas entrenamiento para compensar.','Idealmente deja al menos un día sin fuerza entre sesiones.'],
      note:'Una sesión reducida acreditada también avanza A → B → C. Una sesión parcial no avanza.'
    },
    {
      eyebrow:'El esfuerzo', title:'Aprenderás a usar el RIR',
      body:['RIR significa repeticiones en reserva. RIR 2 quiere decir que terminas cuando crees que aún podrías hacer unas 2 repeticiones más con buena técnica.','No necesitas llegar al fallo para que la serie sea útil. En este mesociclo no hay ninguna serie obligatoria a 0 RIR.'],
      list:['Sesiones 1–3 · RIR 3–4','Sesiones 4–6 · RIR 3','Sesiones 7–9 · RIR 2','Sesiones 10–12 · RIR 2; solo la última serie de patrones principales estables puede quedar en RIR 1–2']
    },
    {
      eyebrow:'El cardio', title:'Poco, específico y recuperable',
      body:['Tus pasos diarios ya son muchos, pero eso no sustituye necesariamente un estímulo cardiorrespiratorio sostenido. Por eso solo hay cardio al final de A y C.','Bicicleta o elíptica, siempre a intensidad conversacional. Progresamos tiempo, no intensidad.'],
      list:['8 → 10 → 12 → 12–15 minutos','RPE 3–4/10','Sin perseguir calorías, kilómetros ni pulsaciones']
    },
    {
      eyebrow:'La seguridad', title:'El semáforo decide cuánto hacer hoy',
      body:['Antes de cada sesión registrarás energía, sueño, carga del turno, dolor y si tu respiración está fuera de lo habitual.'],
      lights:true,
      note:'Si aparecen síntomas respiratorios inusuales, dolor torácico, mareo o desmayo, la sesión se detiene. La app no da instrucciones sobre dosis ni cambios de medicación.'
    },
    {
      eyebrow:'El progreso', title:'Sin gráfico semanal, sí con datos útiles',
      body:['Verás tu última carga y repeticiones, y pequeños logros cuando mejores con un RIR parecido. No hay un gráfico semanal porque aquí interesa que el progreso ayude, no que meta presión.','Al completar la sesión 12 se cierra el M1 y queda listo el informe interno para revisar el siguiente bloque.']
    }
  ];

  const DEFAULT_STATE = () => ({
    schemaVersion:1, clientId:CLIENT_ID, planId:PLAN_ID, consent:false, intro:false,
    credited:0, sessions:[], cardio:[], blocked:[], last:{}, sound:true, finished:false,
    tab:'today', createdAt:new Date().toISOString()
  });

  function loadState(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return DEFAULT_STATE();
      const parsed = JSON.parse(raw);
      if(!parsed || parsed.clientId!==CLIENT_ID || parsed.planId!==PLAN_ID) return DEFAULT_STATE();
      return {...DEFAULT_STATE(), ...parsed, sessions:Array.isArray(parsed.sessions)?parsed.sessions:[], cardio:Array.isArray(parsed.cardio)?parsed.cardio:[], blocked:Array.isArray(parsed.blocked)?parsed.blocked:[], last:parsed.last&&typeof parsed.last==='object'?parsed.last:{}};
    }catch(_){ return DEFAULT_STATE(); }
  }

  let state = loadState();
  let overlay = null;

  function save(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(_){}
  }
  function setState(patch){ state = {...state, ...patch}; save(); render(); }
  function update(mutator){ state = mutator(structuredCloneSafe(state)); save(); render(); }
  function structuredCloneSafe(v){ try{return structuredClone(v);}catch(_){return JSON.parse(JSON.stringify(v));} }

  const root = document.getElementById('root');
  if(!root) return;

  const CSS = `
:root{
  --bg:#F5F0E6; --bg2:#EFE8DA; --card:#FFFBF4; --card2:#EBE3D4;
  --line:rgba(74,62,48,.10); --line2:rgba(74,62,48,.18);
  --tx:#2E2A25; --tx2:#6F665B; --tx3:#9C9184;
  --ac:#2E7D72; --acbg:rgba(46,125,114,.10); --ac2:#B4763F;
  --ok:#588A64; --warn:#C08A22; --bad:#B65A52;
  --serif:ui-serif,"New York",Georgia,"Iowan Old Style","Times New Roman",serif;
  --shadow:0 1px 2px rgba(74,62,48,.06),0 6px 20px rgba(74,62,48,.05);
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0;background:var(--bg);color:var(--tx);-webkit-text-size-adjust:100%}
body{overscroll-behavior-y:none}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
.app{background:var(--bg);color:var(--tx);min-height:100vh;max-width:440px;margin:0 auto;font-family:-apple-system,"SF Pro Text","SF Pro Display","Helvetica Neue",Inter,system-ui,sans-serif;font-size:15px;line-height:1.45;letter-spacing:-.01em;padding-bottom:96px;position:relative}
.app *{font-variant-numeric:tabular-nums} h1,h2,h3,p{margin:0}
.wrap{padding:0 16px}.lgtitle{font-family:var(--serif);font-size:31px;font-weight:600;letter-spacing:-.3px;line-height:1.14}.title{font-family:var(--serif);font-size:21px;font-weight:600;letter-spacing:-.2px}.head{font-size:17px;font-weight:600;letter-spacing:-.25px}.big{font-family:var(--serif);font-size:28px;font-weight:600}.huge{font-family:var(--serif);font-size:48px;font-weight:600;line-height:1}.phase{font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase}.cap{font-size:13px;color:var(--tx2);line-height:1.4}.cap2{font-size:12px;color:var(--tx3)}.eyebrow{font-size:11px;font-weight:640;letter-spacing:.09em;text-transform:uppercase;color:var(--tx3)}
.card{background:var(--card);border:.5px solid transparent;border-radius:16px;padding:16px;margin-bottom:10px;box-shadow:var(--shadow)}.row{display:flex;align-items:center;gap:12px}.row.sb{justify-content:space-between}.col{display:flex;flex-direction:column}.grow{flex:1;min-width:0}.sep{height:.5px;background:var(--line);margin:12px -16px}.pill{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border-radius:999px;background:var(--card2);font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--tx2);white-space:nowrap}.pill.ac{background:var(--acbg);color:var(--ac)}
.btn{appearance:none;border:none;border-radius:14px;padding:15px 18px;font-size:16px;font-weight:600;font-family:inherit;background:var(--ac);color:#FFFBF4;width:100%;letter-spacing:-.2px;transition:transform .12s ease,opacity .12s ease}.btn:active{transform:scale(.985);opacity:.9}.btn.sec{background:var(--card2);color:var(--tx)}.btn.ghost{background:transparent;color:var(--tx2);border:.5px solid var(--line2)}.btn.bad{background:var(--bad)}.btn.sm{padding:10px 12px;font-size:13px;border-radius:11px}.btn:disabled{opacity:.42;cursor:default}.lnk{border:none;background:none;color:var(--ac);font-size:13px;font-weight:600;padding:8px;cursor:pointer}
.chips{display:flex;gap:6px;flex-wrap:wrap}.chip{padding:9px 0;border-radius:11px;background:var(--card2);border:.5px solid transparent;color:var(--tx2);font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;flex:1;text-align:center;min-width:40px}.chip.on{background:var(--acbg);border-color:var(--ac);color:var(--ac)}.chip.warnc.on{background:rgba(192,138,34,.13);border-color:var(--warn);color:#8A620F}.dot{width:8px;height:8px;border-radius:4px;flex:0 0 auto}.note{border-left:2px solid var(--line2);padding-left:12px;color:var(--tx2);font-size:13px;line-height:1.5}
.banner{border-radius:14px;padding:12px 13px;margin-bottom:10px;font-size:13px;line-height:1.45;background:var(--card2);color:var(--tx2)}.banner.a{background:var(--acbg);color:var(--tx)}.banner.y{background:rgba(192,138,34,.10);border:.5px solid rgba(192,138,34,.25)}.banner.r{background:rgba(182,90,82,.10);border:.5px solid rgba(182,90,82,.25);color:var(--tx)}
.inp{width:100%;border:.5px solid var(--line2);background:var(--card2);border-radius:11px;padding:11px 12px;color:var(--tx);font-size:15px;outline:none}.inp:focus{border-color:var(--ac);box-shadow:0 0 0 3px var(--acbg)}.label{font-size:12px;color:var(--tx3);margin-bottom:6px}.field{margin-top:12px}
.ck{width:24px;height:24px;border-radius:7px;border:1px solid var(--line2);display:inline-flex;align-items:center;justify-content:center;color:#fff;flex:0 0 auto}.ck.on{background:var(--ac);border-color:var(--ac)}.tap{cursor:pointer}.tap:active{opacity:.82}
.progress{height:7px;border-radius:999px;background:var(--card2);overflow:hidden}.progress>span{height:100%;display:block;background:var(--ac);border-radius:999px;transition:width .25s ease}.meter{display:flex;gap:4px}.meter span{height:5px;flex:1;border-radius:3px;background:var(--card2)}.meter span.on{background:var(--ac)}
.tabbar{position:fixed;bottom:0;left:0;right:0;max-width:440px;margin:0 auto;display:flex;background:rgba(245,240,230,.86);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:.5px solid var(--line);padding:8px 0 max(10px,env(safe-area-inset-bottom));z-index:40}.tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10px;font-weight:600;color:var(--tx3);background:none;border:none;font-family:inherit;letter-spacing:.01em}.tab.on{color:var(--ac)}.tab svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.sheet{position:fixed;inset:0;background:var(--bg);z-index:60;overflow-y:auto;max-width:440px;margin:0 auto;animation:rise .28s cubic-bezier(.2,.8,.2,1)}@keyframes rise{from{transform:translateY(24px);opacity:.4}to{transform:none;opacity:1}}.navbar{position:sticky;top:0;background:rgba(245,240,230,.9);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:.5px solid var(--line);padding:12px 16px;z-index:5;display:flex;align-items:center;gap:12px}.x{width:32px;height:32px;border:none;background:var(--card2);border-radius:10px;color:var(--tx2);font-size:18px;display:grid;place-items:center;padding:0}.stickybottom{position:sticky;bottom:0;padding:10px 16px max(18px,env(safe-area-inset-bottom));background:linear-gradient(transparent,var(--bg) 18%,var(--bg));z-index:4}
.setrow{display:grid;grid-template-columns:34px 1fr 1fr 1.05fr;gap:7px;align-items:center;padding:9px 0;border-top:.5px solid var(--line)}.setrow:first-child{border-top:0}.setnum{font-weight:700;font-size:12px;color:var(--tx3)}.mini{width:100%;border:none;background:var(--card2);border-radius:9px;padding:9px 6px;text-align:center;color:var(--tx);font-size:14px;outline:none}.mini:focus{box-shadow:0 0 0 2px var(--acbg)}.setdone{width:32px;height:32px;border-radius:10px;border:.5px solid var(--line2);background:transparent;color:var(--tx3);font-weight:700}.setdone.on{background:var(--ac);border-color:var(--ac);color:white}
.exercise-list{display:flex;flex-direction:column;gap:8px}.exercise-item{display:flex;align-items:center;gap:12px;background:var(--card);border-radius:14px;padding:12px 13px;box-shadow:var(--shadow)}.exercise-code{width:34px;height:34px;border-radius:10px;background:var(--acbg);color:var(--ac);display:grid;place-items:center;font-size:11px;font-weight:750;flex:0 0 auto}.exercise-item.done .exercise-code{background:var(--ac);color:white}.exercise-item.locked{opacity:.55}
.timer{background:var(--card);border-radius:18px;padding:22px 16px;text-align:center;box-shadow:var(--shadow)}.timer .time{font-family:var(--serif);font-size:52px;font-weight:600;line-height:1;margin:12px 0}.timer-circle{width:118px;height:118px;border-radius:59px;border:7px solid var(--card2);display:grid;place-items:center;margin:0 auto;position:relative}.timer-circle::after{content:'';position:absolute;inset:-7px;border-radius:50%;border:7px solid var(--ac);clip-path:inset(0 50% 0 0)}
.toast{position:fixed;left:50%;bottom:max(90px,calc(env(safe-area-inset-bottom) + 78px));transform:translate(-50%,16px);width:min(360px,calc(100vw - 32px));padding:12px 14px;border-radius:15px;background:var(--tx);color:var(--card);box-shadow:0 12px 32px rgba(0,0,0,.22);font-size:13px;line-height:1.4;z-index:100;opacity:0;pointer-events:none;transition:.2s}.toast.show{opacity:1;transform:translate(-50%,0)}
@media(max-width:360px){.wrap{padding-left:13px;padding-right:13px}.card{padding:14px}.lgtitle{font-size:28px}.setrow{grid-template-columns:30px 1fr 1fr 1fr;gap:5px}}
`;

  function escapeHtml(v){ return String(v ?? '').replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function fmtDate(v){ try{return new Date(v+'T12:00:00').toLocaleDateString('es-ES',{day:'numeric',month:'short'});}catch(_){return v;} }
  function today(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function phaseNumber(credited=state.credited){ return credited>=12?4:Math.min(4,Math.floor(credited/3)+1); }
  function nextKey(){ return PLAN.order[state.credited % 3]; }
  function normalSets(e, phase=phaseNumber()){ return phase===1?2:(e.principal?3:2); }
  function targetRir(e, setIndex, totalSets, phase=phaseNumber(), yellow=false){
    let min,max,label;
    if(phase===1){min=3;max=4;label='3–4';}
    else if(phase===2){min=3;max=3;label='3';}
    else if(phase===3){min=2;max=2;label='2';}
    else if(e.principal && setIndex===totalSets-1){min=1;max=2;label='1–2';}
    else {min=2;max=2;label='2';}
    if(yellow){ min+=1; max+=1; label=min===max?String(min):`${min}–${max}`; }
    return {min,max,label};
  }
  function cardioDose(phase=phaseNumber()){
    return phase===1?{min:8,max:8,label:'8 min',rpe:'3'}:phase===2?{min:10,max:10,label:'10 min',rpe:'3–4'}:phase===3?{min:12,max:12,label:'12 min',rpe:'3–4'}:{min:12,max:15,label:'12–15 min',rpe:'3–4'};
  }
  function creditedSession(s){ return s && (s.status==='complete'||s.status==='reduced'); }
  function allExercises(){ return Object.values(PLAN.exercises).flatMap(s=>s.exercises); }
  function sessionLastFor(id){
    for(let i=state.sessions.length-1;i>=0;i--){
      const rec=state.sessions[i]?.exercises?.[id];
      if(rec && Array.isArray(rec.sets) && rec.sets.some(x=>x.done)) return rec;
    }
    return null;
  }
  function progressionAdvice(e){
    const last=sessionLastFor(e.id);
    if(!last) return {kind:'init',text:'Primera exposición: elige una carga que te deje en la parte baja-media del rango con el RIR previsto y técnica limpia.'};
    if(last.partial) return {kind:'hold',text:'La exposición anterior quedó incompleta: mantén la carga y no hagas un aumento automático.'};
    const sets=(last.sets||[]).filter(s=>s.done);
    if(!sets.length) return {kind:'hold',text:'No hay datos fiables todavía: mantén la carga.'};
    if(sets.some(s=>Number(s.reps)<e.reps[0])) return {kind:'down',text:'Quedaste por debajo del rango: mantén o baja la carga; no “salves” la serie con repeticiones sucias.'};
    if(sets.some(s=>s.rir==null||s.rir==='')) return {kind:'hold',text:'Faltó registrar el RIR: mantén la carga y completa el registro hoy.'};
    const top=sets.every(s=>Number(s.reps)>=e.reps[1]);
    const rirOk=sets.every(s=>Number(s.rir)>=Number(s.targetMin ?? 2));
    if(top&&rirOk) return {kind:'up',text:'Alcanzaste el techo del rango con el RIR previsto: sube el menor incremento disponible y vuelve a la parte baja del rango.'};
    return {kind:'keep',text:'Mantén la carga e intenta sumar 1 repetición total respecto a la última exposición, sin salirte del RIR objetivo.'};
  }

  function classifyCheckin(c){
    if(c.alarm || c.respiratory || Number(c.pain)>=4) return 'red';
    if(Number(c.sleep)<6 || Number(c.energy)<=2 || Number(c.pain)===3 || c.hardShift) return 'yellow';
    return 'green';
  }

  function icon(name){
    const paths={today:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',plan:'<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',prog:'<path d="M4 18l5-5 3 3 7-9"/><path d="M15 7h4v4"/>',set:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 3.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2L3 14.5l2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 3.1h5l.4-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2.1-1.5c.1-.3.1-.7.1-1z"/>'};
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||''}</svg>`;
  }

  function render(){
    if(!state.consent){ root.innerHTML=`<div class="app"><style>${CSS}</style>${consentHtml()}</div>`; bindConsent(); return; }
    if(!state.intro){ root.innerHTML=`<div class="app"><style>${CSS}</style>${introHtml()}</div>`; bindIntro(); return; }
    root.innerHTML=`<div class="app"><style>${CSS}</style>${mainHtml()}${overlayHtml()}</div>`;
    bindMain(); bindOverlay();
  }

  function consentHtml(){
    return `<div class="wrap" style="padding-top:58px">
      <div class="eyebrow">Entrenamiento personalizado a distancia</div>
      <h1 class="lgtitle" style="margin-top:8px">Mesociclo 1</h1>
      <p class="cap" style="margin-top:10px">12 sesiones flexibles · hipertrofia prioritaria de tren superior · fuerza general · base cardiorrespiratoria.</p>
      <div class="card" style="margin-top:24px">
        <div class="eyebrow">Antes de empezar</div>
        <p class="cap" style="margin-top:10px">Esta app guarda en este dispositivo lo que registras durante el entrenamiento: energía, sueño, dolor, cargas, repeticiones, RIR y sensaciones.</p>
        <p class="cap" style="margin-top:8px">Puedes exportarlo o borrarlo desde Ajustes. El plan es de acondicionamiento físico y no sustituye una valoración sanitaria.</p>
      </div>
      <div class="card tap" id="consentCard"><div class="row"><span class="ck" id="consentCk"></span><p class="grow" style="font-weight:550">Lo entiendo y quiero registrar mi entrenamiento aquí</p></div></div>
      <button class="btn" id="consentBtn" disabled>Empezar el mesociclo</button>
      <p class="cap2" style="margin-top:14px;margin-bottom:40px">Si aparece dolor torácico, mareo, desmayo o falta de aire/síntomas respiratorios desproporcionados o inusuales, no entrenes y prioriza valoración sanitaria cuando corresponda.</p>
    </div>`;
  }
  function bindConsent(){
    let ok=false; const c=document.getElementById('consentCard'), ck=document.getElementById('consentCk'), b=document.getElementById('consentBtn');
    c.onclick=()=>{ok=!ok;ck.classList.toggle('on',ok);ck.textContent=ok?'✓':'';b.disabled=!ok;};
    b.onclick=()=>setState({consent:true});
  }

  let introIndex=0;
  function introHtml(){
    const s=INTRO[introIndex];
    return `<div class="navbar"><button class="x" id="introBack" ${introIndex===0?'style="visibility:hidden"':''}>‹</button><div class="grow row" style="gap:5px;justify-content:center">${INTRO.map((_,i)=>`<span style="width:${i===introIndex?16:5}px;height:5px;border-radius:3px;background:${i===introIndex?'var(--ac)':'var(--card2)'}"></span>`).join('')}</div><button class="lnk" id="introSkip">Saltar</button></div>
      <div class="wrap" style="padding-top:22px">
        <div class="eyebrow">${s.eyebrow}</div><h1 class="title" style="margin-top:6px;font-size:27px;line-height:1.15">${s.title}</h1>
        ${(s.body||[]).map(x=>`<p class="cap" style="margin-top:14px;font-size:14.5px;line-height:1.55">${x}</p>`).join('')}
        ${s.list?`<div class="card" style="margin-top:16px">${s.list.map((x,i)=>`<p style="font-size:14px;font-weight:500;${i?'margin-top:10px;padding-top:10px;border-top:.5px solid var(--line)':''}">${x}</p>`).join('')}</div>`:''}
        ${s.lights?trafficLightsHtml():''}
        ${s.note?`<p class="note" style="margin:18px 2px 0">${s.note}</p>`:''}
        <button class="btn" id="introNext" style="margin:24px 0 40px">${introIndex===INTRO.length-1?'Entendido, empezamos':'Continuar'}</button>
      </div>`;
  }
  function trafficLightsHtml(){ return `<div style="margin-top:16px">${[
    ['green','VERDE','Sesión completa. Cardio A/C según el bloque.','var(--ok)'],
    ['yellow','AMARILLO','Versión reducida: 1 serie menos en los cuatro primeros ejercicios, +1 RIR y sin cardio.','var(--warn)'],
    ['red','ROJO','No entrenar. Registra el motivo y prioriza valoración si hay síntomas de alarma.','var(--bad)']
  ].map(([k,t,tx,c])=>`<div class="card"><div class="row"><span class="dot" style="width:12px;height:12px;border-radius:6px;background:${c}"></span><p class="phase" style="color:${c}">${t}</p></div><p class="cap" style="margin-top:8px">${tx}</p></div>`).join('')}</div>`; }
  function bindIntro(){
    document.getElementById('introBack').onclick=()=>{if(introIndex>0){introIndex--;render();}};
    document.getElementById('introSkip').onclick=()=>{introIndex=0;setState({intro:true});};
    document.getElementById('introNext').onclick=()=>{if(introIndex<INTRO.length-1){introIndex++;render();}else{introIndex=0;setState({intro:true});}};
  }

  function mainHtml(){
    const tab=state.tab||'today';
    const screens={today:todayHtml,plan:planHtml,prog:progressHtml,set:settingsHtml};
    return `${(screens[tab]||todayHtml)()}<div class="tabbar">${[['today','Hoy'],['plan','El plan'],['prog','Progreso'],['set','Ajustes']].map(([k,l])=>`<button class="tab ${tab===k?'on':''}" data-tab="${k}">${icon(k)}${l}</button>`).join('')}</div>`;
  }

  function todayHtml(){
    const key=nextKey(), cfg=PLAN.exercises[key], phase=phaseNumber(), p=PHASES[phase-1], pct=Math.round(state.credited/12*100);
    if(state.finished){
      return `<div class="wrap" style="padding-top:38px"><div class="eyebrow">ALÈ · Roberto</div><h1 class="lgtitle" style="margin-top:5px">Mesociclo completado</h1><p class="cap" style="margin-top:10px">Has acreditado las 12 sesiones. El M1 queda cerrado para revisar datos y diseñar el siguiente bloque.</p><div class="card" style="margin-top:18px"><div class="row sb"><div><div class="eyebrow">Fuerza</div><p class="big" style="margin-top:4px">12/12</p></div><span class="pill ac">completo</span></div></div><button class="btn" id="openReport">Abrir informe interno</button></div>`;
    }
    return `<div class="wrap" style="padding-top:34px">
      <div class="row sb"><div><div class="eyebrow">ALÈ · Roberto</div><h1 class="lgtitle" style="margin-top:4px">Hoy</h1></div><button class="x" id="helpBtn">?</button></div>
      <div class="card" style="margin-top:18px">
        <div class="row sb"><div><div class="eyebrow">Mesociclo 1</div><p class="head" style="margin-top:4px">${p.name}</p></div><span class="pill ac">${state.credited}/12</span></div>
        <div class="progress" style="margin-top:12px"><span style="width:${pct}%"></span></div>
        <p class="cap2" style="margin-top:8px">${p.range} · ${p.rir} · cardio A/C ${p.cardio}</p>
      </div>
      <div class="card">
        <div class="row sb"><div class="grow"><div class="eyebrow">Siguiente sesión</div><h2 class="title" style="margin-top:5px">${cfg.title}</h2><p class="cap" style="margin-top:5px">${cfg.subtitle}</p></div><span class="exercise-code" style="width:42px;height:42px;font-size:14px">${key}</span></div>
        <div class="sep"></div>
        <div class="row sb"><span class="cap">Fuerza</span><b>${cfg.exercises.length} ejercicios</b></div>
        <div class="row sb" style="margin-top:6px"><span class="cap">Cardio</span><b>${cfg.cardio?cardioDose(phase).label+' · RPE '+cardioDose(phase).rpe:'No programado'}</b></div>
        <button class="btn" id="startSession" style="margin-top:16px">Empezar ${cfg.title.toLowerCase()}</button>
      </div>
      ${cfg.cardio?`<div class="banner a"><b>Cardio A/C.</b> Solo se propone tras completar la fuerza y si el semáforo es verde. Si el turno ha sido especialmente duro, la versión amarilla lo omite.</div>`:`<div class="banner"><b>Sesión B sin cardio estructurado.</b> Esta exposición intermedia se mantiene más corta para proteger la recuperación.</div>`}
      <button class="btn ghost" id="openReport" style="margin-top:4px">Informe y copia de seguridad</button>
    </div>`;
  }

  function planHtml(){
    const phase=phaseNumber();
    return `<div class="wrap" style="padding-top:34px"><div class="eyebrow">Mesociclo 1</div><h1 class="lgtitle" style="margin-top:4px">El plan</h1><p class="cap" style="margin-top:8px">12 sesiones en orden A → B → C. La unidad del bloque es la sesión acreditada, no la semana natural.</p>
      <div style="margin-top:18px">${PHASES.map(p=>`<div class="card" style="${p.n===phase&&!state.finished?'border:.5px solid var(--ac)':''}"><div class="row sb"><div><div class="eyebrow">${p.range}</div><p class="head" style="margin-top:4px">${p.name}</p></div>${p.n===phase&&!state.finished?'<span class="pill ac">ahora</span>':''}</div><p class="cap" style="margin-top:9px">${p.goal}</p><div class="sep"></div><div class="row sb"><span class="cap2">Esfuerzo</span><b style="font-size:13px">${p.rir}</b></div><div class="row sb" style="margin-top:5px"><span class="cap2">Cardio A/C</span><b style="font-size:13px">${p.cardio}</b></div></div>`).join('')}</div>
      ${PLAN.order.map(k=>sessionPlanCard(k)).join('')}
      <div class="card"><div class="eyebrow">Regla de progresión</div><p class="cap" style="margin-top:8px">Dentro del rango y con el RIR previsto: mantén la carga e intenta sumar 1 repetición total la próxima exposición. Si alcanzas el techo del rango en todas las series con el RIR correcto, sube el menor incremento disponible y vuelve a la parte baja.</p><p class="note" style="margin-top:12px">Los kilos de máquinas distintas no se comparan entre sí.</p></div>
    </div>`;
  }
  function sessionPlanCard(k){
    const s=PLAN.exercises[k];
    return `<div class="card"><div class="row sb"><div><div class="eyebrow">${s.title}</div><p class="head" style="margin-top:4px">${s.subtitle}</p></div><span class="pill">${s.cardio?'fuerza + cardio':'solo fuerza'}</span></div><div class="sep"></div>${s.exercises.map(e=>`<div class="row sb" style="align-items:flex-start;margin-top:7px"><div class="grow"><b style="font-size:13px">${e.id} · ${e.name}</b><p class="cap2">${e.reps[0]}–${e.reps[1]} reps · ${e.rest}s descanso</p></div><span class="pill">${e.principal?'2→3':'2'} series</span></div>`).join('')}</div>`;
  }

  function progressHtml(){
    const completedCardio=state.cardio.filter(c=>c.complete).length;
    const rows=allExercises().map(e=>{
      const last=sessionLastFor(e.id); if(!last) return '';
      const sets=(last.sets||[]).filter(s=>s.done); if(!sets.length) return '';
      const best=sets.reduce((a,b)=>Number(b.reps)>Number(a.reps)?b:a,sets[0]);
      return `<div class="exercise-item"><span class="exercise-code">${e.id}</span><div class="grow"><p style="font-weight:600;font-size:13px">${e.name}</p><p class="cap2">Último registro: ${best.load!==''&&best.load!=null?escapeHtml(best.load)+' kg · ':''}${escapeHtml(best.reps)} reps · RIR ${escapeHtml(best.rir)}</p></div></div>`;
    }).filter(Boolean).join('');
    const achievements=buildAchievements();
    return `<div class="wrap" style="padding-top:34px"><div class="eyebrow">Mesociclo 1</div><h1 class="lgtitle" style="margin-top:4px">Progreso</h1><p class="cap" style="margin-top:8px">Sin gráfico semanal: aquí solo aparecen datos útiles de la última exposición y pequeños hitos.</p>
      <div class="row" style="gap:10px;margin-top:18px"><div class="card grow"><div class="eyebrow">Fuerza</div><p class="big" style="margin-top:4px">${state.credited}<span class="cap2"> /12</span></p></div><div class="card grow"><div class="eyebrow">Cardio</div><p class="big" style="margin-top:4px">${completedCardio}</p><p class="cap2">A/C completados</p></div></div>
      ${achievements.length?`<div class="card"><div class="eyebrow">Micrologros</div>${achievements.map((a,i)=>`<p style="font-size:13px;${i?'margin-top:9px;padding-top:9px;border-top:.5px solid var(--line)':'margin-top:8px'}">${a}</p>`).join('')}</div>`:''}
      <div class="eyebrow" style="margin:18px 2px 8px">Última carga y repeticiones</div>${rows||'<div class="card"><p class="cap">Aún no hay exposiciones registradas.</p></div>'}
      <div class="eyebrow" style="margin:20px 2px 8px">Historial de sesiones</div>${state.sessions.slice().reverse().map(s=>`<div class="card"><div class="row sb"><div><p class="head">${s.key} · ${fmtDate(s.date)}</p><p class="cap2">${s.status==='complete'?'Completa':s.status==='reduced'?'Reducida acreditada':s.status==='partial'?'Parcial':'No completada'} · bloque ${s.phase}</p></div><span class="pill ${creditedSession(s)?'ac':''}">${creditedSession(s)?'acredita':'no avanza'}</span></div></div>`).join('')||'<div class="card"><p class="cap">Todavía no hay sesiones guardadas.</p></div>'}
    </div>`;
  }

  function buildAchievements(){
    const out=[];
    for(const e of allExercises()){
      const records=state.sessions.map(s=>s.exercises?.[e.id]).filter(Boolean).filter(r=>(r.sets||[]).some(x=>x.done));
      if(records.length<2) continue;
      const a=(records[records.length-2].sets||[]).filter(x=>x.done), b=(records[records.length-1].sets||[]).filter(x=>x.done);
      if(!a.length||!b.length) continue;
      const loadA=Math.max(...a.map(x=>Number(x.load)||0)), loadB=Math.max(...b.map(x=>Number(x.load)||0));
      const repsA=a.reduce((n,x)=>n+(Number(x.reps)||0),0), repsB=b.reduce((n,x)=>n+(Number(x.reps)||0),0);
      const rirA=a.reduce((n,x)=>n+(Number(x.rir)||0),0)/a.length, rirB=b.reduce((n,x)=>n+(Number(x.rir)||0),0)/b.length;
      if(loadB>loadA && rirB>=rirA-1) out.push(`Has mejorado ${e.name.toLowerCase()} con más carga manteniendo un RIR parecido.`);
      else if(loadB===loadA && repsB>repsA && rirB>=rirA-1) out.push(`Has igualado la carga de ${e.name.toLowerCase()} con más repeticiones.`);
      if(out.length>=4) break;
    }
    return out;
  }

  function settingsHtml(){
    return `<div class="wrap" style="padding-top:34px"><div class="eyebrow">ALÈ · Roberto</div><h1 class="lgtitle" style="margin-top:4px">Ajustes</h1>
      <div class="card" style="margin-top:18px"><div class="row sb"><div><p class="head">Sonido</p><p class="cap2">Avisos discretos del temporizador de cardio.</p></div><button class="chip ${state.sound?'on':''}" id="soundToggle" style="flex:0 0 76px">${state.sound?'Activado':'Desactivado'}</button></div></div>
      <div class="card"><div class="eyebrow">Datos</div><p class="cap" style="margin-top:8px">El registro se guarda localmente en este dispositivo. La copia usa un esquema genérico de ALÈ con clientId y planId.</p><button class="btn sec" id="exportBackup" style="margin-top:12px">Guardar copia del progreso</button><button class="btn ghost" id="importBackup" style="margin-top:8px">Restaurar una copia</button><input type="file" accept="application/json,.json" id="backupFile" style="display:none"></div>
      <button class="btn ghost" id="openReport">Informe interno</button>
      <button class="btn bad" id="resetData" style="margin-top:18px">Borrar todos los datos</button>
      <p class="cap2" style="margin:12px 2px 40px">App ${APP_VERSION} · ${PLAN_ID}. No contiene correo, teléfono ni datos de contacto del cliente.</p>
    </div>`;
  }

  function overlayHtml(){
    if(!overlay) return '';
    if(overlay.type==='introReview') return `<div class="sheet">${introReviewHtml()}</div>`;
    if(overlay.type==='checkin') return `<div class="sheet">${checkinHtml()}</div>`;
    if(overlay.type==='session') return `<div class="sheet">${sessionHtml()}</div>`;
    if(overlay.type==='cardio') return `<div class="sheet">${cardioHtml()}</div>`;
    if(overlay.type==='report') return `<div class="sheet">${reportHtml()}</div>`;
    return '';
  }

  function introReviewHtml(){
    const old=introIndex, idx=overlay.index||0, s=INTRO[idx]; introIndex=idx;
    const html=`<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">Cómo funciona</p></div></div><div class="wrap" style="padding-top:22px"><div class="eyebrow">${s.eyebrow}</div><h1 class="title" style="font-size:27px;margin-top:6px">${s.title}</h1>${(s.body||[]).map(x=>`<p class="cap" style="margin-top:14px;font-size:14.5px;line-height:1.55">${x}</p>`).join('')}${s.list?`<div class="card" style="margin-top:16px">${s.list.map(x=>`<p style="font-size:14px;margin-top:7px">${x}</p>`).join('')}</div>`:''}${s.lights?trafficLightsHtml():''}${s.note?`<p class="note" style="margin-top:16px">${s.note}</p>`:''}<div class="row" style="gap:8px;margin:24px 0 40px"><button class="btn sec" id="reviewPrev" ${idx===0?'disabled':''}>Anterior</button><button class="btn" id="reviewNext">${idx===INTRO.length-1?'Cerrar':'Siguiente'}</button></div></div>`;
    introIndex=old; return html;
  }

  function checkinHtml(){
    const d=overlay.data;
    return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">Antes de empezar</p><p class="cap2">${PLAN.exercises[nextKey()].title} · check-in</p></div></div>
      <div class="wrap" style="padding-top:16px"><div class="banner a"><b>Calentamiento previsto:</b> 8–10 min progresivos en bici o elíptica + 1–2 series de aproximación del primer empuje y del primer tirón.</div>
      ${rangePicker('Energía','energy',[1,2,3,4,5],d.energy,'1 = muy baja · 5 = muy buena')}
      <div class="card"><div class="eyebrow">Sueño</div><div class="field"><input class="inp" id="ciSleep" type="number" inputmode="decimal" min="0" max="14" step="0.5" value="${escapeHtml(d.sleep)}" placeholder="Horas"></div><p class="cap2" style="margin-top:7px">Menos de 6 h activa el semáforo amarillo.</p></div>
      ${rangePicker('Dolor hoy','pain',[0,1,2,3,4,5],d.pain,'0 = nada · dolor nuevo importante ≥4 detiene la sesión')}
      ${toggleCard('hardShift','¿El turno de trabajo ha sido excepcionalmente duro?',d.hardShift,'La carga laboral alta puede convertir la sesión en reducida.')}
      ${toggleCard('respiratory','¿Tienes síntomas respiratorios fuera de lo habitual?',d.respiratory,'No se pregunta ni se modifica ninguna dosis de medicación.')}
      ${toggleCard('alarm','¿Dolor torácico, mareo/desmayo, fiebre/fatiga intensa o falta de aire desproporcionada?',d.alarm,'Si marcas sí, hoy no se inicia el entrenamiento.')}
      <button class="btn" id="evaluateCheckin">Evaluar y continuar</button><div style="height:30px"></div></div>`;
  }
  function rangePicker(title,key,vals,current,foot){ return `<div class="card"><div class="eyebrow">${title}</div><div class="chips" style="margin-top:10px">${vals.map(v=>`<button class="chip ${Number(current)===v?'on':''}" data-ci-range="${key}" data-value="${v}">${v}</button>`).join('')}</div><p class="cap2" style="margin-top:7px">${foot}</p></div>`; }
  function toggleCard(key,title,on,foot){ return `<div class="card tap" data-ci-toggle="${key}"><div class="row"><span class="ck ${on?'on':''}">${on?'✓':''}</span><div class="grow"><p style="font-weight:550">${title}</p><p class="cap2" style="margin-top:3px">${foot}</p></div></div></div>`; }

  function sessionHtml(){
    const sess=overlay.session, cfg=PLAN.exercises[sess.key], phase=sess.phase;
    if(sess.step==='warmup'){
      return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">${cfg.title}</p><p class="cap2">Entrada · calentamiento</p></div></div><div class="wrap" style="padding-top:18px"><div class="eyebrow">8–10 minutos</div><h1 class="title" style="font-size:27px;margin-top:5px">Prepárate sin prisas</h1><div class="card" style="margin-top:16px"><p class="head">1 · Bici o elíptica progresiva</p><p class="cap" style="margin-top:7px">Empieza muy fácil y aumenta suavemente la ventilación. No hacen falta sprints ni picos intensos.</p><div class="sep"></div><p class="head">2 · Series de aproximación</p><p class="cap" style="margin-top:7px">Haz 1–2 series ligeras del primer ejercicio de empuje y del primer ejercicio de tirón. No cuentan como series de trabajo.</p></div><p class="note">Si una subida de ritmo desencadena síntomas respiratorios inusuales, reduce o elimina esa subida. Sigue tu plan sanitario habitual; la app no prescribe medicación.</p><button class="btn" id="warmupDone" style="margin-top:20px">Calentamiento hecho</button></div>`;
    }
    if(sess.step==='exercise'){
      const e=sess.exercises[sess.current], rec=sess.logs[e.id], sets=rec.sets, adv=progressionAdvice(e);
      return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">${e.id} · ${e.name}</p><p class="cap2">${sess.current+1} de ${sess.exercises.length} · ${sess.statusHint}</p></div></div><div class="wrap" style="padding-top:16px">
        <div class="card"><div class="row sb"><span class="pill ac">${sets.length} series</span><span class="pill">${e.reps[0]}–${e.reps[1]} reps</span><span class="pill">${e.rest}s descanso</span></div><p class="cap" style="margin-top:11px">${e.cue}</p><div class="sep"></div><p class="cap2"><b>Alternativa:</b> ${e.alt}</p></div>
        <div class="banner ${adv.kind==='up'?'a':''}"><b>Progresión:</b> ${adv.text}</div>
        <div class="card"><div class="setrow" style="padding-top:0;border-top:0"><span></span><span class="cap2" style="text-align:center">kg</span><span class="cap2" style="text-align:center">reps</span><span class="cap2" style="text-align:center">RIR</span></div>${sets.map((s,i)=>setRowHtml(e,s,i,sets.length,sess.yellow)).join('')}</div>
        <p class="note">RIR ${targetRir(e,0,sets.length,phase,sess.yellow).label} = termina la serie cuando creas que aún podrías hacer aproximadamente ese número de repeticiones más con buena técnica.</p>
        <div class="row" style="gap:8px;margin-top:18px"><button class="btn sec" id="prevExercise" ${sess.current===0?'disabled':''}>Anterior</button><button class="btn" id="nextExercise">${sess.current===sess.exercises.length-1?'Revisar sesión':'Siguiente'}</button></div><div style="height:28px"></div></div>`;
    }
    return summarySessionHtml(sess,cfg);
  }

  function setRowHtml(e,s,i,total,yellow){
    const t=targetRir(e,i,total,overlay.session.phase,yellow);
    return `<div class="setrow" data-set="${i}"><button class="setdone ${s.done?'on':''}" data-set-done="${i}">${s.done?'✓':i+1}</button><input class="mini" type="number" inputmode="decimal" step="0.5" min="0" data-set-load="${i}" value="${escapeHtml(s.load)}" placeholder="—"><input class="mini" type="number" inputmode="numeric" min="0" max="50" data-set-reps="${i}" value="${escapeHtml(s.reps)}" placeholder="${e.reps[0]}"><select class="mini" data-set-rir="${i}" aria-label="RIR objetivo ${t.label}"><option value="">RIR ${t.label}</option>${[0,1,2,3,4,5,6].map(v=>`<option value="${v}" ${String(s.rir)===String(v)?'selected':''}>${v}</option>`).join('')}</select></div>`;
  }

  function summarySessionHtml(sess,cfg){
    const done=sess.exercises.filter(e=>sess.logs[e.id].sets.some(s=>s.done)).length;
    const all=sess.exercises.every(e=>sess.logs[e.id].sets.length && sess.logs[e.id].sets.every(s=>s.done));
    const canCredit=all;
    return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">Cerrar ${cfg.title.toLowerCase()}</p><p class="cap2">${done}/${sess.exercises.length} ejercicios con registro</p></div></div><div class="wrap" style="padding-top:16px">
      <div class="card"><div class="row sb"><div><div class="eyebrow">Resultado</div><p class="big" style="margin-top:4px">${canCredit?(sess.reduced?'Reducida':'Completa'):'Parcial'}</p></div><span class="pill ${canCredit?'ac':''}">${canCredit?'avanza A→B→C':'no avanza'}</span></div><p class="cap" style="margin-top:9px">${canCredit?'Esta sesión quedará acreditada.':'Puedes guardarla como parcial. La próxima vez se retomará la misma letra y no habrá incrementos automáticos basados en esta exposición.'}</p></div>
      <div class="card"><div class="eyebrow">RPE global de la sesión</div><div class="chips" style="margin-top:10px">${[1,2,3,4,5,6,7,8,9,10].map(v=>`<button class="chip ${sess.rpe===v?'on':''}" data-session-rpe="${v}">${v}</button>`).join('')}</div></div>
      <div class="card"><div class="eyebrow">Nota opcional</div><textarea class="inp" id="sessionNote" rows="3" placeholder="Sensaciones, molestias, contexto…">${escapeHtml(sess.note||'')}</textarea></div>
      <button class="btn" id="saveSession" ${sess.rpe==null?'disabled':''}>${canCredit?'Guardar y acreditar':'Guardar como parcial'}</button>
      ${canCredit && cfg.cardio && !sess.reduced && sess.light==='green'?`<p class="cap2" style="text-align:center;margin-top:10px">Después podrás iniciar el cardio de ${cardioDose(sess.phase).label}.</p>`:''}<div style="height:30px"></div></div>`;
  }

  function cardioHtml(){
    const c=overlay.cardio, dose=c.dose, elapsed=Math.floor(c.elapsed||0), targetSeconds=dose.min*60, remain=Math.max(0,targetSeconds-elapsed), finished=elapsed>=targetSeconds;
    if(c.step==='timer'){
      return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">Cardio · ${c.sessionKey}</p><p class="cap2">Bici o elíptica · ${dose.label} · RPE ${dose.rpe}</p></div></div><div class="wrap" style="padding-top:20px"><div class="timer"><div class="eyebrow">Intensidad conversacional</div><div class="time">${formatTime(finished?elapsed:remain)}</div><p class="cap">${finished?'Tiempo mínimo completado':'Tiempo restante hasta el mínimo'}</p><div class="progress" style="margin-top:18px"><span style="width:${Math.min(100,elapsed/targetSeconds*100)}%"></span></div></div><div class="banner a" style="margin-top:14px">RPE ${dose.rpe}/10. Debes poder mantener una conversación. No persigas calorías, distancia ni pulsaciones.</div><button class="btn" id="cardioToggle" style="margin-top:8px">${c.running?'Pausa':elapsed?'Reanudar':'Empezar'}</button><div class="row" style="gap:8px;margin-top:8px"><button class="btn sec" id="cardioFinish">Acabar</button><button class="btn ghost" id="cardioStopSymptoms">Parar por síntomas</button></div></div>`;
    }
    return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">¿Cómo ha ido?</p><p class="cap2">${Math.round((c.elapsed||0)/60)} min registrados</p></div></div><div class="wrap" style="padding-top:16px"><div class="card"><div class="eyebrow">Modalidad</div><div class="chips" style="margin-top:10px">${['Bicicleta','Elíptica'].map(v=>`<button class="chip ${c.modality===v?'on':''}" data-cardio-mod="${v}">${v}</button>`).join('')}</div></div><div class="card"><div class="eyebrow">RPE</div><div class="chips" style="margin-top:10px">${[1,2,3,4,5,6,7,8,9,10].map(v=>`<button class="chip ${c.rpe===v?'on':''}" data-cardio-rpe="${v}">${v}</button>`).join('')}</div><p class="cap2" style="margin-top:7px">Objetivo: ${dose.rpe}/10.</p></div>${toggleInline('cardioSymptoms','¿Síntomas respiratorios inusuales, dolor torácico, mareo o desmayo?',c.symptoms)}<button class="btn" id="saveCardio" ${!c.modality||c.rpe==null?'disabled':''}>Guardar cardio</button><div style="height:30px"></div></div>`;
  }
  function toggleInline(id,text,on){return `<div class="card tap" id="${id}"><div class="row"><span class="ck ${on?'on':''}">${on?'✓':''}</span><p class="grow" style="font-weight:550">${text}</p></div></div>`;}
  function formatTime(sec){sec=Math.max(0,Math.floor(sec));return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;}

  function reportHtml(){
    const report=generateReport();
    return `<div class="navbar"><button class="x" data-close>✕</button><div class="grow"><p class="head">Informe y copia</p><p class="cap2">Roberto · ${state.credited}/12 sesiones</p></div></div><div class="wrap" style="padding-top:16px"><div class="card"><div class="eyebrow">Para el entrenador</div><p class="cap" style="margin-top:8px">Resumen interno del bloque: adherencia, sesiones, cargas, cardio y señales a revisar.</p><button class="btn" id="copyReport" style="margin-top:12px">Copiar informe</button><button class="btn sec" id="downloadReport" style="margin-top:8px">Descargar informe .txt</button></div><div class="card"><div class="eyebrow">Vista previa</div><pre style="white-space:pre-wrap;font-size:10.5px;line-height:1.45;color:var(--tx2);font-family:ui-monospace,Menlo,monospace;max-height:440px;overflow:auto;margin:10px 0 0">${escapeHtml(report)}</pre></div><div style="height:30px"></div></div>`;
  }

  function generateReport(){
    const lines=[]; lines.push('ALÈ · INFORME INTERNO · ROBERTO · MESOCICLO 1'); lines.push(`Generado: ${new Date().toLocaleString('es-ES')}`); lines.push(`Plan: ${PLAN_ID} · App ${APP_VERSION}`); lines.push(''); lines.push('1. RESUMEN'); lines.push(`Sesiones acreditadas: ${state.credited}/12`); lines.push(`Sesiones registradas totales: ${state.sessions.length}`); lines.push(`Cardio completado: ${state.cardio.filter(c=>c.complete).length}`); lines.push(`Bloque actual: ${phaseNumber()}/4`); lines.push(''); lines.push('2. SESIONES'); lines.push('fecha | sesión | estado | bloque | RPE | semáforo');
    state.sessions.forEach(s=>lines.push(`${s.date} | ${s.key} | ${s.status} | ${s.phase} | ${s.rpe ?? '—'} | ${s.light}`));
    lines.push(''); lines.push('3. ÚLTIMO REGISTRO POR EJERCICIO');
    allExercises().forEach(e=>{const r=sessionLastFor(e.id); if(!r)return; const sets=(r.sets||[]).filter(x=>x.done); if(!sets.length)return; lines.push(`${e.id} · ${e.name}: `+sets.map(s=>`${s.load!==''&&s.load!=null?s.load+' kg · ':''}${s.reps} reps @RIR ${s.rir}`).join(' | '));});
    lines.push(''); lines.push('4. CARDIO'); lines.push('fecha | sesión | modalidad | min | RPE | síntomas | completo'); state.cardio.forEach(c=>lines.push(`${c.date} | ${c.sessionKey} | ${c.modality||'—'} | ${c.minutes} | ${c.rpe??'—'} | ${c.symptoms?'sí':'no'} | ${c.complete?'sí':'no'}`));
    lines.push(''); lines.push('5. SEÑALES A REVISAR'); const red=state.blocked.filter(x=>x.light==='red'); if(!red.length) lines.push('Sin bloqueos rojos registrados.'); red.forEach(x=>lines.push(`- ${x.date}: ${x.reason||'semáforo rojo'}`));
    lines.push(''); lines.push('6. REGLAS DEL BLOQUE'); lines.push('Secuencia A→B→C por sesiones, no calendario rígido.'); lines.push('Sin series obligatorias al fallo. Doble progresión por repeticiones/carga manteniendo el RIR.'); lines.push('Cardio solo A/C: 8→10→12→12–15 min, RPE 3–4, bici o elíptica.'); lines.push('Semáforo amarillo: versión reducida, +1 RIR, sin cardio. Rojo: no entrenar.'); lines.push('No hay trabajo abdominal directo en M1.'); lines.push(''); lines.push('Documento de autocregistro de entrenamiento; no es un diagnóstico ni un informe médico.'); return lines.join('\n');
  }

  function bindMain(){
    document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;save();render();window.scrollTo(0,0);});
    document.getElementById('helpBtn')?.addEventListener('click',()=>{overlay={type:'introReview',index:0};render();});
    document.getElementById('startSession')?.addEventListener('click',()=>openCheckin());
    document.querySelectorAll('#openReport').forEach(b=>b.onclick=()=>{overlay={type:'report'};render();});
    document.getElementById('soundToggle')?.addEventListener('click',()=>setState({sound:!state.sound}));
    document.getElementById('exportBackup')?.addEventListener('click',exportBackup);
    document.getElementById('importBackup')?.addEventListener('click',()=>document.getElementById('backupFile')?.click());
    document.getElementById('backupFile')?.addEventListener('change',importBackup);
    document.getElementById('resetData')?.addEventListener('click',()=>{if(confirm('Se borrarán todos los registros de Roberto en este dispositivo. ¿Continuar?')){localStorage.removeItem(STORAGE_KEY);state=DEFAULT_STATE();introIndex=0;overlay=null;render();}});
  }

  function openCheckin(){ overlay={type:'checkin',data:{energy:3,sleep:7,pain:0,hardShift:false,respiratory:false,alarm:false}};render(); }

  function bindOverlay(){
    if(!overlay) return;
    document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeOverlay());
    if(overlay.type==='introReview') bindReview();
    if(overlay.type==='checkin') bindCheckin();
    if(overlay.type==='session') bindSession();
    if(overlay.type==='cardio') bindCardio();
    if(overlay.type==='report') bindReport();
  }
  function closeOverlay(){
    if(overlay?.type==='session' && overlay.session?.step!=='summary' && !confirm('¿Salir de la sesión? Los cambios de esta sesión aún no guardada se perderán.')) return;
    if(overlay?.type==='cardio' && overlay.cardio?.running){ stopCardioClock(); if(!confirm('¿Salir del cardio? El tiempo no guardado se perderá.')){startCardioClock();return;} }
    overlay=null;render();
  }
  function bindReview(){
    document.getElementById('reviewPrev').onclick=()=>{overlay.index=Math.max(0,(overlay.index||0)-1);render();};
    document.getElementById('reviewNext').onclick=()=>{if((overlay.index||0)>=INTRO.length-1){overlay=null;render();}else{overlay.index=(overlay.index||0)+1;render();}};
  }
  function bindCheckin(){
    document.querySelectorAll('[data-ci-range]').forEach(b=>b.onclick=()=>{overlay.data[b.dataset.ciRange]=Number(b.dataset.value);render();});
    document.querySelectorAll('[data-ci-toggle]').forEach(b=>b.onclick=()=>{const k=b.dataset.ciToggle;overlay.data[k]=!overlay.data[k];render();});
    document.getElementById('ciSleep').oninput=e=>{overlay.data.sleep=e.target.value;};
    document.getElementById('evaluateCheckin').onclick=()=>{
      overlay.data.sleep=Number(document.getElementById('ciSleep').value||0);
      const light=classifyCheckin(overlay.data);
      if(light==='red'){
        state.blocked.push({date:today(),ts:Date.now(),light:'red',checkin:{...overlay.data},reason:'síntomas o indicadores de semáforo rojo'});save();
        alert('Semáforo ROJO. Hoy no se inicia el entrenamiento. Registra el motivo y, si hay síntomas de alarma, prioriza valoración sanitaria.'); overlay=null;render(); return;
      }
      startStrength(light);
    };
  }

  function startStrength(light){
    const key=nextKey(), phase=phaseNumber(), base=PLAN.exercises[key].exercises, reduced=light==='yellow', list=reduced?base.slice(0,4):base;
    const logs={}; list.forEach(e=>{const count=reduced?Math.max(1,normalSets(e,phase)-1):normalSets(e,phase); logs[e.id]={sets:Array.from({length:count},(_,i)=>({load:'',reps:'',rir:'',done:false,targetMin:targetRir(e,i,count,phase,reduced).min})),partial:false};});
    overlay={type:'session',session:{key,phase,light,yellow:reduced,reduced,step:'warmup',current:0,exercises:list,logs,rpe:null,note:'',statusHint:reduced?'versión reducida':'sesión completa'}};render();
  }

  function bindSession(){
    const s=overlay.session;
    if(s.step==='warmup'){document.getElementById('warmupDone').onclick=()=>{s.step='exercise';render();};return;}
    if(s.step==='exercise'){
      const e=s.exercises[s.current], rec=s.logs[e.id];
      document.querySelectorAll('[data-set-load]').forEach(inp=>inp.oninput=ev=>rec.sets[Number(inp.dataset.setLoad)].load=ev.target.value);
      document.querySelectorAll('[data-set-reps]').forEach(inp=>inp.oninput=ev=>rec.sets[Number(inp.dataset.setReps)].reps=ev.target.value);
      document.querySelectorAll('[data-set-rir]').forEach(sel=>sel.onchange=ev=>{const st=rec.sets[Number(sel.dataset.setRir)];st.rir=ev.target.value; const t=targetRir(e,Number(sel.dataset.setRir),rec.sets.length,s.phase,s.yellow); if(t.min>=3 && Number(st.rir)<=1) toast('RIR demasiado bajo para este bloque: reduce aproximadamente un 5–10% la carga en la siguiente serie.');});
      document.querySelectorAll('[data-set-done]').forEach(b=>b.onclick=()=>{
        const i=Number(b.dataset.setDone), st=rec.sets[i];
        const row=document.querySelector(`[data-set="${i}"]`); const load=row.querySelector(`[data-set-load="${i}"]`).value, reps=row.querySelector(`[data-set-reps="${i}"]`).value, rir=row.querySelector(`[data-set-rir="${i}"]`).value;
        if(!st.done && (!reps || rir==='')){toast('Registra al menos repeticiones y RIR antes de cerrar la serie.');return;}
        st.load=load;st.reps=reps;st.rir=rir;st.done=!st.done;render();
      });
      document.getElementById('prevExercise').onclick=()=>{if(s.current>0){captureCurrentExercise();s.current--;render();}};
      document.getElementById('nextExercise').onclick=()=>{captureCurrentExercise(); if(s.current<s.exercises.length-1){s.current++;render();}else{s.step='summary';render();}};
      return;
    }
    document.querySelectorAll('[data-session-rpe]').forEach(b=>b.onclick=()=>{s.rpe=Number(b.dataset.sessionRpe);render();});
    document.getElementById('sessionNote').oninput=e=>s.note=e.target.value;
    document.getElementById('saveSession').onclick=saveStrengthSession;
  }
  function captureCurrentExercise(){
    const s=overlay.session,e=s.exercises[s.current],rec=s.logs[e.id];
    document.querySelectorAll('[data-set-load]').forEach(inp=>rec.sets[Number(inp.dataset.setLoad)].load=inp.value);
    document.querySelectorAll('[data-set-reps]').forEach(inp=>rec.sets[Number(inp.dataset.setReps)].reps=inp.value);
    document.querySelectorAll('[data-set-rir]').forEach(inp=>rec.sets[Number(inp.dataset.setRir)].rir=inp.value);
  }

  function saveStrengthSession(){
    const s=overlay.session; s.note=document.getElementById('sessionNote')?.value||s.note||'';
    const all=s.exercises.every(e=>s.logs[e.id].sets.length && s.logs[e.id].sets.every(x=>x.done));
    const status=all?(s.reduced?'reduced':'complete'):'partial';
    Object.values(s.logs).forEach(r=>r.partial=!all);
    const record={id:`${Date.now()}-${s.key}`,date:today(),ts:Date.now(),key:s.key,phase:s.phase,light:s.light,status,rpe:s.rpe,note:s.note,checkin:undefined,exercises:s.logs};
    state.sessions.push(record);
    if(all){state.credited=Math.min(12,state.credited+1);state.finished=state.credited>=12;}
    save();
    const cfg=PLAN.exercises[s.key], shouldCardio=all&&cfg.cardio&&!s.reduced&&s.light==='green';
    if(shouldCardio){const dose=cardioDose(s.phase); overlay={type:'cardio',cardio:{sessionKey:s.key,phase:s.phase,dose,step:'timer',elapsed:0,running:false,startAt:null,modality:'',rpe:null,symptoms:false}};render();}
    else{overlay=null;render(); if(all)toast(status==='reduced'?'Sesión reducida acreditada. La secuencia avanza.':'Sesión acreditada.');}
  }

  let cardioInterval=null;
  function bindCardio(){
    const c=overlay.cardio;
    if(c.step==='timer'){
      document.getElementById('cardioToggle').onclick=()=>{c.running?stopCardioClock():startCardioClock();render();};
      document.getElementById('cardioFinish').onclick=()=>{stopCardioClock();c.step='review';render();};
      document.getElementById('cardioStopSymptoms').onclick=()=>{stopCardioClock();c.symptoms=true;c.step='review';toast('Cardio detenido. Si el síntoma es preocupante o inusual, prioriza valoración sanitaria.');render();};
      if(c.running) scheduleCardioTick();
    }else{
      document.querySelectorAll('[data-cardio-mod]').forEach(b=>b.onclick=()=>{c.modality=b.dataset.cardioMod;render();});
      document.querySelectorAll('[data-cardio-rpe]').forEach(b=>b.onclick=()=>{c.rpe=Number(b.dataset.cardioRpe);render();});
      document.getElementById('cardioSymptoms').onclick=()=>{c.symptoms=!c.symptoms;render();};
      document.getElementById('saveCardio').onclick=()=>{
        const min=Math.round((c.elapsed||0)/60*10)/10; const complete=min>=c.dose.min && !c.symptoms;
        state.cardio.push({id:`cardio-${Date.now()}`,date:today(),ts:Date.now(),sessionKey:c.sessionKey,phase:c.phase,modality:c.modality,minutes:min,rpe:c.rpe,symptoms:c.symptoms,complete});save();
        overlay=null;render();toast(complete?'Cardio guardado.':'Cardio guardado como incompleto; no afecta a la secuencia de fuerza.');
      };
    }
  }
  function startCardioClock(){const c=overlay.cardio;c.running=true;c.startAt=Date.now();scheduleCardioTick();if(state.sound)beep(520,100);}
  function stopCardioClock(){const c=overlay?.cardio;if(!c)return;if(c.running&&c.startAt){c.elapsed+=(Date.now()-c.startAt)/1000;}c.running=false;c.startAt=null;clearInterval(cardioInterval);cardioInterval=null;}
  function scheduleCardioTick(){clearInterval(cardioInterval);cardioInterval=setInterval(()=>{const c=overlay?.cardio;if(!c||!c.running){clearInterval(cardioInterval);return;}const elapsed=c.elapsed+(Date.now()-c.startAt)/1000;const target=c.dose.min*60;if(elapsed>=target&& !c.beeped){c.beeped=true;if(state.sound)beep(760,220);toast('Has completado el tiempo mínimo. Puedes terminar o continuar dentro del rango previsto.');}const timeEl=document.querySelector('.timer .time');const bar=document.querySelector('.timer .progress span');if(timeEl)timeEl.textContent=formatTime(Math.max(0,target-elapsed));if(bar)bar.style.width=`${Math.min(100,elapsed/target*100)}%`;},500);}
  function beep(freq=600,ms=120){try{const ac=new (window.AudioContext||window.webkitAudioContext)(),o=ac.createOscillator(),g=ac.createGain();o.frequency.value=freq;g.gain.value=.04;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+ms/1000);setTimeout(()=>ac.close(),ms+100);}catch(_){}}

  function bindReport(){
    document.getElementById('copyReport').onclick=async()=>{const t=generateReport();try{await navigator.clipboard.writeText(t);toast('Informe copiado.');}catch(_){downloadText('informe-roberto-m1.txt',t);}};
    document.getElementById('downloadReport').onclick=()=>downloadText(`informe-roberto-m1-${today()}.txt`,generateReport());
  }
  function exportBackup(){const payload={schema:BACKUP_SCHEMA,schemaVersion:1,appVersion:APP_VERSION,exportedAt:new Date().toISOString(),clientId:CLIENT_ID,planId:PLAN_ID,state};downloadText(`ale-roberto-m1-${today()}.json`,JSON.stringify(payload,null,2),'application/json');}
  async function importBackup(ev){
    const f=ev.target.files?.[0]; if(!f)return; try{const data=JSON.parse(await f.text()); if(data?.schema!==BACKUP_SCHEMA||data?.clientId!==CLIENT_ID||data?.planId!==PLAN_ID||!data.state||!Array.isArray(data.state.sessions)||!Array.isArray(data.state.cardio))throw new Error('invalid'); if(!confirm('Restaurar esta copia sustituirá los datos actuales. ¿Continuar?'))return; state={...DEFAULT_STATE(),...data.state,consent:true,intro:true};save();render();toast('Copia restaurada.');}catch(_){alert('Este archivo no es una copia válida de Roberto M1.');}finally{ev.target.value='';}
  }
  function downloadText(name,text,type='text/plain;charset=utf-8'){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function toast(msg){let el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('show'));setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),220);},3200);}

  window.addEventListener('pagehide',()=>save());
  window.addEventListener('beforeunload',()=>save());
  render();
})();
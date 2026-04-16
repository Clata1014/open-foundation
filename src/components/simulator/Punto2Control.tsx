import { motion } from "framer-motion";
import { Truck, Package, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Punto2ControlProps {
  onAnswer: (correct: boolean) => void;
  onBack: () => void;
}

const evaluateFormula = (expression: string): number | null => {
  try {
    const sanitized = expression.toLowerCase().replace(/x/g, '*').replace(/[^0-9+\-*/().]/g, '');
    if (!sanitized) return null;
    return new Function('return ' + sanitized)();
  } catch {
    return null;
  }
};

const Punto2Control = ({ onAnswer, onBack }: Punto2ControlProps) => {
  const [viajesA, setViajesA] = useState("");
  const [costoA, setCostoA] = useState("");
  const [viajesB, setViajesB] = useState("");
  const [costoB, setCostoB] = useState("");
  const [error2, setError2] = useState("");
  const [shake, setShake] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [inputUnitA, setInputUnitA] = useState("");
  const [inputUnitB, setInputUnitB] = useState("");
  const [success2, setSuccess2] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const resultViajesA = evaluateFormula(viajesA);
  const resultViajesB = evaluateFormula(viajesB);

  const validateA2 = () => {
    if (resultViajesA !== 3) {
      setError2("Opción A - Paso 1: Divide 1800 cajas entre 600 de capacidad.");
      triggerShake();
      return;
    }
    if (evaluateFormula(costoA) !== 15000000) {
      setError2("Opción A - Paso 2: Multiplica tus 3 viajes por el costo del flete ($5.000.000).");
      triggerShake();
      return;
    }
    setError2("¡Cálculos correctos (15 Millones), pero tomaste la decisión financiera más cara! Revisa la Opción B.");
    triggerShake();
  };

  const validateB2 = () => {
    if (resultViajesB !== 3.6) {
      setError2("Opción B - Paso 1: Divide 1800 entre 500 para saber los viajes exactos.");
      triggerShake();
      return;
    }
    const cB = evaluateFormula(costoB);
    if (cB === 10800000) {
      setError2("Opción B - Paso 2: ¡Multiplicaste por 3.6! En la vida real debes alquilar 4 camiones COMPLETOS.");
      triggerShake();
      return;
    }
    if (cB === 9000000) {
      setError2("Opción B - Paso 2: ¡Contrataste 3 camiones y dejaste 300 cajas botadas! Necesitas 4 camiones.");
      triggerShake();
      return;
    }
    if (cB === 12000000) {
      setError2("");
      setShowAnalysis(true);
    } else {
      setError2("Opción B - Paso 2: Multiplica tus 4 camiones enteros por el costo del flete ($3.000.000).");
      triggerShake();
    }
  };

  const validateUnitCost = () => {
    const cuA = evaluateFormula(inputUnitA);
    const cuB = evaluateFormula(inputUnitB);
    if (Math.round(cuA || 0) !== 8333) {
      setAnalysisError("Costo Unitario A: Divide el costo total de la Opción A ($15.000.000) entre las 1800 cajas.");
      triggerShake();
      return;
    }
    if (Math.round(cuB || 0) !== 6000) {
      setAnalysisError("Costo Unitario B: Divide el costo total de la Opción B ($12.000.000) entre las 2000 cajas transportadas (4 camiones × 500).");
      triggerShake();
      return;
    }
    setAnalysisError("");
    setSuccess2(true);

    // --- INICIO DE LÓGICA DE VOZ SEGURA ---
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const speechTexto = "¡Excelente análisis gerencial! Salió más económico porque el camión pequeño nos ahorra más de dos mil pesos por cada caja. Ese ahorro es tan grande que paga de sobra el camión que viajó medio vacío, logrando reducir el costo total de la operación... ¡Punto 2, terminado!";
        
        const speech = new SpeechSynthesisUtterance(speechTexto);
        speech.lang = 'es-ES';
        speech.pitch = 1.3;
        speech.rate = 0.95;
        
        const voces = window.speechSynthesis.getVoices();
        if (voces.length > 0) {
          const vozFemenina = voces.find(v => 
            v.lang.startsWith('es') && 
            (v.name.includes('Female') || v.name.includes('Mujer') || v.name.includes('Sabina') || v.name.includes('Mia') || v.name.includes('Paulina') || v.name.includes('Google español'))
          );
          if (vozFemenina) speech.voice = vozFemenina;
        }
        
        window.speechSynthesis.speak(speech);
      }
    } catch (error) {
      console.error("Error no fatal en la síntesis de voz:", error);
    }
    // --- FIN DE LÓGICA DE VOZ SEGURA ---
  };

  return (
    <div className="relative min-h-screen overflow-y-auto px-4 py-6 pb-24 bg-background">
      <div className="relative mx-auto max-w-4xl space-y-4">
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest bg-card px-4 py-2 rounded border border-border hover:border-muted w-fit cursor-pointer"
        >
          <span>⬅️</span> VOLVER AL PUNTO ANTERIOR
        </button>

        {/* Expediente */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-md border-l-4 border-secondary bg-card p-4 shadow-lg"
        >
          <h3 className="mb-2 flex items-center gap-2 font-orbitron text-xs font-bold uppercase tracking-wider text-secondary">
            <Package className="h-4 w-4" /> EXPEDIENTE DE DISTRIBUCIÓN — PUNTO 2
          </h3>
          <p className="font-mono text-sm leading-relaxed text-foreground">
            El cliente ha confirmado un pedido de{" "}
            <strong className="text-primary">1.800 cajas de producto terminado</strong>. Revisa la capacidad de los vehículos, calcula cuántos necesitas EXACTAMENTE para llevar TODA la carga y escribe tu fórmula matemática en las consolas.
          </p>
        </motion.div>

        {/* Error display */}
        {error2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-crisis-red/50 bg-crisis-red/10 p-4 flex items-start gap-3"
            style={shake ? { animation: "glitch 0.3s ease-in-out" } : {}}
          >
            <AlertTriangle className="h-5 w-5 text-crisis-red shrink-0 mt-0.5" />
            <p className="font-mono text-sm text-crisis-red">{error2}</p>
          </motion.div>
        )}

        {/* Cards with 2-step inputs */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* OPCIÓN A — MEGA-MULA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-crisis-red/30 bg-card p-5 space-y-3"
          >
            <p className="font-orbitron text-xs font-bold text-crisis-red flex items-center gap-2">
              <Truck className="h-5 w-5" /> OPCIÓN A — MEGA-MULA
            </p>
            <div className="space-y-1 font-mono text-xs text-muted-foreground">
              <p>Capacidad: <strong className="text-foreground">600 cajas</strong> por viaje</p>
              <p>Costo por viaje: <strong className="text-foreground">$5.000.000</strong></p>
              <p className="text-crisis-red font-bold">Costo total: ¿?</p>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-muted-foreground">PASO 1: Calcular Viajes</label>
                <input
                  type="text"
                  value={viajesA}
                  onChange={(e) => setViajesA(e.target.value)}
                  placeholder="Ej: Escribe tu fórmula..."
                  className="w-full bg-background border border-border p-2 rounded text-foreground font-mono focus:border-crisis-red focus:ring-1 focus:ring-crisis-red outline-none mt-1"
                />
                {resultViajesA === 3 && (
                  <p className="text-emerald-400 text-2xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = 3 viajes</p>
                )}
                {resultViajesA !== null && resultViajesA !== 3 && (
                  <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = {resultViajesA.toLocaleString('es-CO')} viajes</p>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground">PASO 2: Costo Total</label>
                <input
                  type="text"
                  value={costoA}
                  onChange={(e) => setCostoA(e.target.value)}
                  placeholder="Ej: Escribe tu fórmula..."
                  className="w-full bg-background border border-border p-2 rounded text-foreground font-mono focus:border-crisis-red focus:ring-1 focus:ring-crisis-red outline-none mt-1"
                />
                {evaluateFormula(costoA) === 15000000 && (
                  <p className="text-emerald-400 text-2xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = $ 15.000.000</p>
                )}
                {evaluateFormula(costoA) !== null && evaluateFormula(costoA) !== 15000000 && (
                  <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = $ {evaluateFormula(costoA)!.toLocaleString('es-CO')}</p>
                )}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={validateA2}
              disabled={!viajesA.trim() || !costoA.trim()}
              className="w-full bg-crisis-red/10 hover:bg-crisis-red/20 text-crisis-red p-3 rounded font-orbitron text-xs font-bold border border-crisis-red/30 transition-colors disabled:opacity-30"
            >
              🚛 DESPACHAR MEGA-MULA
            </motion.button>
          </motion.div>

          {/* OPCIÓN B — CAMIONES TURBO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border border-crisis-green/30 bg-card p-5 space-y-3"
          >
            <p className="font-orbitron text-xs font-bold text-crisis-green flex items-center gap-2">
              <Truck className="h-5 w-5" /> OPCIÓN B — CAMIONES TURBO
            </p>
            <div className="space-y-1 font-mono text-xs text-muted-foreground">
              <p>Capacidad: <strong className="text-foreground">500 cajas</strong> por viaje</p>
              <p>Costo por viaje: <strong className="text-foreground">$3.000.000</strong></p>
              <p className="text-crisis-green font-bold">Costo total: ¿?</p>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-muted-foreground">PASO 1: Calcular Viajes</label>
                <input
                  type="text"
                  value={viajesB}
                  onChange={(e) => setViajesB(e.target.value)}
                  placeholder="Ej: Escribe tu fórmula..."
                  className="w-full bg-background border border-border p-2 rounded text-foreground font-mono focus:border-crisis-green focus:ring-1 focus:ring-crisis-green outline-none mt-1"
                />
                {resultViajesB === 3.6 && (
                  <p className="text-amber-400 text-xl font-black mt-2 animate-pulse bg-amber-950/40 p-2 rounded inline-block border border-amber-800">⚠️ = 3.6 viajes (¡Redondea a enteros!)</p>
                )}
                {resultViajesB !== null && resultViajesB !== 3.6 && (
                  <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = {resultViajesB.toLocaleString('es-CO')} viajes</p>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground">PASO 2: Costo Total</label>
                <input
                  type="text"
                  value={costoB}
                  onChange={(e) => setCostoB(e.target.value)}
                  placeholder="Ej: Escribe tu fórmula..."
                  className="w-full bg-background border border-border p-2 rounded text-foreground font-mono focus:border-crisis-green focus:ring-1 focus:ring-crisis-green outline-none mt-1"
                />
                {evaluateFormula(costoB) === 12000000 && (
                  <p className="text-emerald-400 text-2xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800 shadow-[0_0_15px_rgba(16,185,129,0.2)]">✅ = $ 12.000.000</p>
                )}
                {evaluateFormula(costoB) !== null && evaluateFormula(costoB) !== 12000000 && (
                  <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = $ {evaluateFormula(costoB)!.toLocaleString('es-CO')}</p>
                )}
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={validateB2}
              disabled={!viajesB.trim() || !costoB.trim()}
              className="w-full bg-crisis-green/10 hover:bg-crisis-green/20 text-crisis-green p-3 rounded font-orbitron text-xs font-bold border border-crisis-green/30 transition-colors disabled:opacity-30"
            >
              🚚 DESPACHAR CAMIONES TURBO
            </motion.button>
          </motion.div>
        </div>

        {showAnalysis && (
          <div className="mt-8 animate-fade-in pb-10">
            
            {/* --- PANTALLA 1: ANTES DE GANAR (INPUTS Y CAMIONES) --- */}
            {!success2 ? (
              <div className="bg-[#0a0f1c] border-2 border-emerald-500/50 rounded-xl p-6 md:p-8 shadow-xl">
                <h2 className="text-xl md:text-2xl font-black text-emerald-400 mb-6 uppercase tracking-widest border-b border-emerald-900 pb-4">
                  📊 FASE 2: ANÁLISIS DE COSTO UNITARIO
                </h2>

                <div className="bg-slate-900 p-5 rounded-lg mb-6 border border-slate-700 shadow-inner">
                  <p className="text-amber-400 font-bold mb-3 uppercase tracking-wider text-sm">🚚 Distribución de Cajas en la Opción B:</p>
                  <ul className="space-y-3 text-slate-300 font-mono text-sm md:text-base">
                    <li className="flex items-center gap-2"><span>✅</span> 1° Camión: Lleno (500 cajas)</li>
                    <li className="flex items-center gap-2"><span>✅</span> 2° Camión: Lleno (500 cajas)</li>
                    <li className="flex items-center gap-2"><span>✅</span> 3° Camión: Lleno (500 cajas)</li>
                    <li className="flex items-center gap-2 text-amber-400 font-bold bg-amber-950/30 p-2 rounded border border-amber-500/30">
                      <span>⚠️</span> 4° Camión: Lleva 300 cajas (¡Sobra espacio, viaja casi vacío!)
                    </li>
                  </ul>
                </div>

                <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
                  Ya sabes cuánto cuesta cada opción en total. Ahora calcula cuánto te cuesta transportar <strong>CADA CAJA</strong> en cada opción escribiendo la fórmula (Flete ÷ Capacidad).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Costo Unitario — Opción A</label>
                    <input type="text" value={inputUnitA} onChange={(e) => setInputUnitA(e.target.value)} placeholder="Ej: Escribe tu fórmula..." className="w-full bg-black border border-slate-600 p-3 rounded text-white font-mono focus:border-emerald-500 outline-none" />
                    {evaluateFormula(inputUnitA) !== null && evaluateFormula(inputUnitA)! > 8330 && evaluateFormula(inputUnitA)! < 8335 && (
                      <p className="text-emerald-400 text-xl font-black mt-3 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = $8.333</p>
                    )}
                    {evaluateFormula(inputUnitA) !== null && !(evaluateFormula(inputUnitA)! > 8330 && evaluateFormula(inputUnitA)! < 8335) && (
                      <p className="text-red-500 text-lg font-black mt-3 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = $ {Math.round(evaluateFormula(inputUnitA)!).toLocaleString('es-CO')}</p>
                    )}
                  </div>
                  <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Costo Unitario — Opción B</label>
                    <input type="text" value={inputUnitB} onChange={(e) => setInputUnitB(e.target.value)} placeholder="Ej: Escribe tu fórmula..." className="w-full bg-black border border-slate-600 p-3 rounded text-white font-mono focus:border-emerald-500 outline-none" />
                    {evaluateFormula(inputUnitB) === 6000 && (
                      <p className="text-emerald-400 text-xl font-black mt-3 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = $6.000</p>
                    )}
                    {evaluateFormula(inputUnitB) !== null && evaluateFormula(inputUnitB) !== 6000 && (
                      <p className="text-red-500 text-lg font-black mt-3 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = $ {Math.round(evaluateFormula(inputUnitB)!).toLocaleString('es-CO')}</p>
                    )}
                  </div>
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); validateUnitCost(); }} className="w-full bg-blue-900 hover:bg-blue-800 text-blue-200 font-bold p-4 rounded border border-blue-700 transition-colors uppercase tracking-widest mt-4">COMPROBAR COSTO UNITARIO</button>
                {analysisError && <p className="text-red-500 font-bold mt-4 text-center">{analysisError}</p>}
              </div>
              
            ) : (
              
              /* --- PANTALLA 2: VICTORIA Y EXPLICACIÓN (ABIERTA, DIRECTA, IMPOSIBLE QUE SE CRASHEE) --- */
              <div className="bg-gradient-to-b from-emerald-950/60 to-[#0a0f1c] border-2 border-emerald-500 rounded-xl p-6 md:p-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <h2 className="text-2xl md:text-3xl font-black text-emerald-400 mb-6 text-center uppercase tracking-widest">🏆 ¡ANÁLISIS GERENCIAL COMPLETADO!</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-red-950/40 p-6 rounded-lg border border-red-900/50 text-center">
                    <p className="text-red-400 font-bold mb-2 uppercase text-sm tracking-wide">❌ Opción A (Mega-Mula)</p>
                    <p className="text-4xl font-black text-red-500 my-2">$8.333</p>
                    <p className="text-sm font-normal text-red-400">Costo por cada caja</p>
                  </div>
                  <div className="bg-emerald-950/40 p-6 rounded-lg border border-emerald-500 text-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <p className="text-emerald-400 font-bold mb-2 uppercase text-sm tracking-wide">✅ Opción B (Camiones Turbo)</p>
                    <p className="text-4xl font-black text-emerald-400 my-2">$6.000</p>
                    <p className="text-sm font-normal text-emerald-500">Costo por cada caja</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 md:p-8 rounded-xl text-left border-2 border-amber-500 shadow-2xl">
                  <h3 className="text-xl md:text-2xl font-black text-amber-400 mb-4 border-b border-slate-700 pb-3">
                    💡 ANÁLISIS MATEMÁTICO: ¿Por qué es más económico botar espacio?
                  </h3>
                  
                  <p className="text-slate-300 text-base md:text-lg mb-4 leading-relaxed">
                    El secreto financiero está en la enorme diferencia entre los <strong>$8.333</strong> y los <strong>$6.000</strong>. Fíjate cómo la matemática no miente:
                  </p>
                  
                  <ul className="space-y-4 text-slate-300 mb-6 text-base md:text-lg bg-black/80 p-5 md:p-6 rounded-lg border border-slate-700">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span> 
                      <div>
                        <strong className="text-red-400 uppercase text-sm block mb-1">El lujo de la Mega-Mula:</strong>
                        Te cobraba <strong>$8.333 por cada cajita</strong>. Es un flete carísimo porque pagas el "lujo" de no desperdiciar centímetros.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">✅</span> 
                      <div>
                        <strong className="text-emerald-400 uppercase text-sm block mb-1">La economía del Camión Turbo:</strong>
                        Te cobra solo <strong>$6.000 por cajita</strong>. ¡Esa tarifa es tan económica que te ahorras <strong className="text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded">$2.333 pesos por CADA CAJA</strong> que subes al camión!
                      </div>
                    </li>
                    <li className="flex items-start gap-3 mt-4 pt-4 border-t border-slate-700">
                      <span className="text-amber-400 mt-1 text-xl">🏆</span> 
                      <div>
                        <strong className="text-amber-400 uppercase text-sm block mb-1">El Remate Financiero:</strong>
                        Si multiplicas ese ahorro de $2.333 pesos por tus 1.800 cajas, es tantísima plata, que <strong>te alcanza de sobra para pagar el último camión medio vacío</strong>, y AÚN ASÍ te sobran 3 millones de pesos de ganancia.
                      </div>
                    </li>
                  </ul>

                  <div className="bg-emerald-950/40 p-5 border-l-4 border-emerald-500 rounded-lg mt-6">
                    <p className="text-emerald-400 font-bold text-lg uppercase tracking-wider mb-2">🎓 LA LECCIÓN DEL GERENTE</p>
                    <p className="text-slate-200 text-base leading-relaxed mb-4">
                      Un verdadero gerente logístico <strong>NO juega a llenar camiones al 100% de espacio, su objetivo real es REDUCIR EL COSTO DE OPERACIÓN.</strong>
                    </p>
                    <p className="text-amber-400 font-bold text-sm uppercase mb-1">¿Qué son los Costos de Operación?</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Son todos los gastos reales: flete, gasolina, peajes, seguros y salarios. Si alquilar un camión extra (así vaya medio vacío) hace que la sumatoria de esos costos sea más baja... ¡Esa siempre será la decisión correcta!
                    </p>
                  </div>
                </div>

                {/* BOTÓN MANUAL PARA FINALIZAR EL EJERCICIO */}
                <div className="mt-8 pt-6 border-t border-emerald-900/50 flex justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
                  <button 
                    type="button"
                    onClick={() => onAnswer(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] uppercase tracking-widest text-lg transition-transform hover:scale-105"
                  >
                    🚀 ENTENDIDO. FINALIZAR SIMULADOR
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {!showAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded border border-muted bg-muted/10 p-3 text-center"
          >
            <p className="font-mono text-xs text-muted-foreground">
              💡 <strong className="text-primary">Pista:</strong> Primero calcula los viajes (Paso 1), luego multiplica por el flete (Paso 2). ¡Cuidado con los decimales!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Punto2Control;

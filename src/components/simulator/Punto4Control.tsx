import { motion } from "framer-motion";
import { AlertTriangle, Package } from "lucide-react";
import { useState } from "react";

const evaluateFormula = (expression: string): number | null => {
  try {
    const sanitized = expression.toLowerCase().replace(/x/g, '*').replace(/[^0-9+\-*/().]/g, '');
    if (!sanitized) return null;
    return new Function('return ' + sanitized)();
  } catch {
    return null;
  }
};

interface Punto4ControlProps {
  onSuccess: () => void;
  onBack: () => void;
  inputs: { input1: string; input2: string; input3: string; input4: string; input5: string };
  setInputs: {
    setInput1: (v: string) => void;
    setInput2: (v: string) => void;
    setInput3: (v: string) => void;
    setInput4: (v: string) => void;
    setInput5: (v: string) => void;
  };
}

const Punto4Control = ({ onSuccess, onBack, inputs, setInputs }: Punto4ControlProps) => {
  const { input1, input2, input3, input4, input5 } = inputs;
  const { setInput1, setInput2, setInput3, setInput4, setInput5 } = setInputs;
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const result1 = evaluateFormula(input1);
  const result2 = evaluateFormula(input2);
  const result3 = evaluateFormula(input3);
  const result4 = evaluateFormula(input4);
  const result5 = evaluateFormula(input5);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    if (result1 !== 12750) {
      setError("Paso 1: Multiplica los minutos de búsqueda manual por la cantidad de pedidos.");
      triggerShake();
      return;
    }
    if (result2 !== 2550) {
      setError("Paso 2: Primero convierte los 180 segundos a minutos, luego multiplica por los 850 pedidos.");
      triggerShake();
      return;
    }
    if (result3 !== 10200) {
      setError("Paso 3: Resta el tiempo del caos manual menos el tiempo con tecnología WMS.");
      triggerShake();
      return;
    }
    if (result4 !== 170) {
      setError("Paso 4: Divide el tiempo salvado en minutos entre 60 para convertirlo a horas.");
      triggerShake();
      return;
    }
    if (result5 !== 21.25) {
      setError("Paso 5: Divide las horas libres entre las 8 horas de un turno laboral.");
      triggerShake();
      return;
    }
    setError("");
    onSuccess();
  };

  const renderFeedback = (result: number | null, target: number, successJsx: React.ReactNode) => {
    if (result === target) return successJsx;
    if (result !== null && result !== target) {
      return (
        <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">
          ❌ = {result.toLocaleString('es-CO')}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="relative min-h-screen overflow-y-auto px-4 py-6 pb-24 bg-background">
      <div className="relative mx-auto max-w-3xl space-y-4">
        <button
          onClick={onBack}
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest bg-card px-4 py-2 rounded border border-border hover:border-muted w-fit cursor-pointer"
        >
          <span>⬅️</span> VOLVER AL MENÚ
        </button>

        {/* Expediente */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-md border-l-4 border-sky-500 bg-card p-4 shadow-lg"
        >
          <h3 className="mb-2 flex items-center gap-2 font-orbitron text-xs font-bold uppercase tracking-wider text-sky-400">
            <Package className="h-4 w-4" /> 📦 RETO 4: EL CAOS TECNOLÓGICO (SISTEMA WMS)
          </h3>
          <p className="font-mono text-sm leading-relaxed text-foreground">
            El CEDI enfrenta un pico crítico por temporada de promociones. Debes despachar{" "}
            <strong className="text-primary">850 pedidos</strong> urgentes. Calcula el impacto de la tecnología WMS comparado con el método manual y convierte el ahorro en horas y turnos laborales.
          </p>
        </motion.div>

        {/* Data reference */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-sky-500/30 bg-sky-950/20 p-4"
        >
          <p className="font-orbitron text-xs font-bold text-sky-400 mb-2 uppercase tracking-wider">📊 TIEMPOS OPERATIVOS</p>
          <div className="grid grid-cols-3 gap-3 font-mono text-sm text-center">
            <div className="rounded border border-border bg-card p-3">
              <p className="text-muted-foreground text-xs">Manual</p>
              <p className="text-red-400 font-bold text-lg">15 min</p>
              <p className="text-muted-foreground text-[10px]">por pedido</p>
            </div>
            <div className="rounded border border-border bg-card p-3">
              <p className="text-muted-foreground text-xs">WMS</p>
              <p className="text-sky-400 font-bold text-lg">180 seg</p>
              <p className="text-muted-foreground text-[10px]">por pedido</p>
            </div>
            <div className="rounded border border-border bg-card p-3">
              <p className="text-muted-foreground text-xs">Turno</p>
              <p className="text-emerald-400 font-bold text-lg">8 horas</p>
              <p className="text-muted-foreground text-[10px]">estándar</p>
            </div>
          </div>
        </motion.div>

        {/* Error display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-crisis-red/50 bg-crisis-red/10 p-4 flex items-start gap-3"
            style={shake ? { animation: "glitch 0.3s ease-in-out" } : {}}
          >
            <AlertTriangle className="h-5 w-5 text-crisis-red shrink-0 mt-0.5" />
            <p className="font-mono text-sm text-crisis-red">{error}</p>
          </motion.div>
        )}

        {/* Input 1 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 1: TIEMPO DEL CAOS A MANO (Calcula los minutos totales perdidos en los 850 pedidos)
          </label>
          <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="Escribe tu fórmula aquí..." className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
          {renderFeedback(result1, 12750,
            <p className="text-emerald-400 font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = 12.750 Minutos Perdidos</p>
          )}
        </motion.div>

        {/* Input 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 2: TIEMPO CON TECNOLOGÍA WMS (¡Alerta! Convierte los 180 segundos a minutos en tu mente y multiplícalos por los pedidos)
          </label>
          <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Escribe tu fórmula aquí..." className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
          {renderFeedback(result2, 2550,
            <p className="text-emerald-400 font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = 2.550 Minutos Optimizados</p>
          )}
        </motion.div>

        {/* Input 3 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 3: TIEMPO MUERTO SALVADO (Resta el caos menos la tecnología)
          </label>
          <input type="text" value={input3} onChange={(e) => setInput3(e.target.value)} placeholder="Escribe tu fórmula aquí..." className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
          {renderFeedback(result3, 10200,
            <p className="text-emerald-400 font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = 10.200 Minutos Salvados</p>
          )}
        </motion.div>

        {/* Input 4 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 4: CONVERSIÓN A HORAS LIBRES (Divide el tiempo salvado entre los 60 minutos de una hora)
          </label>
          <input type="text" value={input4} onChange={(e) => setInput4(e.target.value)} placeholder="Escribe tu fórmula aquí..." className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
          {renderFeedback(result4, 170,
            <p className="text-emerald-400 font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = 170 Horas Libres</p>
          )}
        </motion.div>

        {/* Input 5 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 5: IMPACTO EN NÓMINA (Divide las horas libres entre las 8 horas del turno para saber cuántos salarios nos ahorramos)
          </label>
          <input type="text" value={input5} onChange={(e) => setInput5(e.target.value)} placeholder="Escribe tu fórmula aquí..." className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
          {result5 === 21.25 ? (
            <p className="text-emerald-400 font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">✅ = 21,25 Turnos Ahorrados</p>
          ) : result5 !== null && result5 !== 21.25 ? (
            <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">❌ = {result5.toLocaleString('es-CO')}</p>
          ) : null}
        </motion.div>

        {/* Submit */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCheck}
          disabled={!input1.trim() || !input2.trim() || !input3.trim() || !input4.trim() || !input5.trim()}
          className="w-full rounded border-2 border-sky-400 bg-sky-400/10 px-8 py-4 font-orbitron text-sm font-bold text-sky-400 transition hover:bg-sky-400/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⚡ COMPROBAR IMPACTO TECNOLÓGICO
        </motion.button>
      </div>
    </div>
  );
};

export default Punto4Control;

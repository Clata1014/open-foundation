import { motion } from "framer-motion";
import { AlertTriangle, ShoppingBag } from "lucide-react";
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

interface Punto3ControlProps {
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

const Punto3Control = ({ onSuccess, onBack, inputs, setInputs }: Punto3ControlProps) => {
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
    if (result1 !== 70000) {
      setError("Paso 1: Suma los 3 costos unitarios: Materiales + Mano de Obra + Logística.");
      triggerShake();
      return;
    }
    if (result2 !== 224000000) {
      setError("Paso 2: Multiplica el costo de 1 par por los 3.200 pares que NO se fabricarán.");
      triggerShake();
      return;
    }
    if (result3 !== 144000000) {
      setError("Paso 3: El material ya comprado (Materiales por par × 3.200 pares) es el costo hundido inevitable.");
      triggerShake();
      return;
    }
    if (result4 !== 80000000) {
      setError("Paso 4: El ahorro real es la diferencia entre el costo total evitado y el costo hundido.");
      triggerShake();
      return;
    }
    if (result5 !== 1600) {
      setError("Paso 5: Divide el efectivo salvado entre el costo de fabricar un zapato pastel ($50.000).");
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
          ❌ = $ {result.toLocaleString('es-CO')}
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
          className="rounded-md border-l-4 border-amber-500 bg-card p-4 shadow-lg"
        >
          <h3 className="mb-2 flex items-center gap-2 font-orbitron text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShoppingBag className="h-4 w-4" /> 👟 RETO 3: EL CASO DE LOS TENIS "COMET"
          </h3>
          <p className="font-mono text-sm leading-relaxed text-foreground">
            La tendencia cambió a colores pasteles. Tenemos material para ensamblar{" "}
            <strong className="text-primary">3.200 pares</strong> de Tenis Comet color neón que{" "}
            <strong className="text-crisis-red">ya nadie quiere comprar</strong>. Calcula los costos, identifica el costo hundido y determina el ahorro real.
          </p>
        </motion.div>

        {/* Cost reference */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4"
        >
          <p className="font-orbitron text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">COSTOS DE PRODUCCIÓN (1 PAR)</p>
          <div className="grid grid-cols-3 gap-3 font-mono text-sm text-center">
            <div className="rounded border border-border bg-card p-3">
              <p className="text-muted-foreground text-xs">Materiales</p>
              <p className="text-primary font-bold text-lg">$45.000</p>
            </div>
            <div className="rounded border border-border bg-card p-3">
              <p className="text-muted-foreground text-xs">Mano de Obra</p>
              <p className="text-primary font-bold text-lg">$15.000</p>
            </div>
            <div className="rounded border border-border bg-card p-3">
              <p className="text-muted-foreground text-xs">Logística</p>
              <p className="text-primary font-bold text-lg">$10.000</p>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border border-border bg-card p-5 space-y-3"
        >
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 1: COSTO TOTAL DE 1 PAR (Suma de Materiales, Mano de Obra y Logística)
          </label>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Escribe tu fórmula aquí..."
            className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
          {renderFeedback(result1, 70000,
            <p className="text-emerald-400 text-xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">
              ✅ = $ 70.000
            </p>
          )}
        </motion.div>

        {/* Input 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-border bg-card p-5 space-y-3"
        >
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 2: VALOR TOTAL DEL LOTE EN RIESGO (Costo total de 1 par multiplicado por los 3.200 pares)
          </label>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Escribe tu fórmula aquí..."
            className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
          {renderFeedback(result2, 224000000,
            <p className="text-emerald-400 text-xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">
              ✅ = $ 224.000.000
            </p>
          )}
        </motion.div>

        {/* Input 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg border border-border bg-card p-5 space-y-3"
        >
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 3: ¿CUÁNTO DINERO PERDIÓ LA EMPRESA? (Calcula el 'Costo Hundido' de los Materiales que ya se compraron)
          </label>
          <input
            type="text"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            placeholder="Escribe tu fórmula aquí..."
            className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
          {renderFeedback(result3, 144000000,
            <p className="text-amber-400 text-xl font-black mt-2 bg-amber-950/40 p-2 rounded inline-block border border-amber-800">
              ⚠️ = $ 144.000.000 (Pérdida Asumida)
            </p>
          )}
        </motion.div>

        {/* Input 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-lg border border-border bg-card p-5 space-y-3"
        >
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 4: ¿CUÁNTO DINERO SALVÓ LA EMPRESA? (Calcula el ahorro en efectivo de Nómina y Logística)
          </label>
          <input
            type="text"
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
            placeholder="Escribe tu cálculo aquí..."
            className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
          {renderFeedback(result4, 80000000,
            <p className="text-emerald-400 text-xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">
              ✅ = $ 80.000.000 (¡Efectivo Salvado!)
            </p>
          )}
        </motion.div>

        {/* Input 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-lg border border-border bg-card p-5 space-y-3"
        >
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
            PASO 5: LA REINVERSIÓN (SI FABRICAR UN ZAPATO COLOR PASTEL CUESTA $50.000, ¿CUÁNTOS PARES NUEVOS PODEMOS FABRICAR CON EL EFECTIVO QUE SALVAMOS?)
          </label>
          <input
            type="text"
            value={input5}
            onChange={(e) => setInput5(e.target.value)}
            placeholder="Escribe tu fórmula aquí..."
            className="w-full bg-background border border-border p-3 rounded text-foreground font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
          {result5 === 1600 ? (
            <p className="text-emerald-400 text-xl font-black mt-2 bg-emerald-950/40 p-2 rounded inline-block border border-emerald-800">
              ✅ = 1.600 Pares Nuevos (¡Capital Reinvertido!)
            </p>
          ) : result5 !== null && result5 !== 1600 ? (
            <p className="text-red-500 text-lg font-black mt-2 bg-red-950/40 p-2 rounded inline-block border border-red-800">
              ❌ = {result5.toLocaleString('es-CO')}
            </p>
          ) : null}
        </motion.div>

        {/* Submit */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCheck}
          disabled={!input1.trim() || !input2.trim() || !input3.trim() || !input4.trim() || !input5.trim()}
          className="w-full rounded border-2 border-crisis-green bg-crisis-green/10 px-8 py-4 font-orbitron text-sm font-bold text-crisis-green transition hover:bg-crisis-green/20 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⚡ COMPROBAR EFECTO ZARA
        </motion.button>
      </div>
    </div>
  );
};

export default Punto3Control;

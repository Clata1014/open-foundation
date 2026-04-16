import { motion } from "framer-motion";
import { RotateCcw, ChevronRight, Shield, Sparkles } from "lucide-react";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";
import { usePremiumVoice } from "@/hooks/usePremiumVoice";

interface DebriefingProps {
  choice: "truck" | "plane";
  onRetry: () => void;
  onNextLevel?: () => void;
  onForceAdvance?: () => void;
}

const FAIL_TEXT =
  "¡GAME OVER INGENIEROS! Ahorraron en el flete, pero la máquina estuvo 12 horas apagada. ¡Acaban de hacerle perder a la fábrica casi 31 millones en tiempos muertos! Están despedidos.";

const SUCCESS_TEXT =
  "¡Excelente decisión, ingenieros! El flete aéreo costó 5 millones de pesos, pero la fábrica solo se detuvo 3 horas. En total gastamos 12 millones y medio. Si hubieran elegido el camión de 800 mil pesos, 12 horas de tiempo muerto nos habrían costado 30 millones en pérdidas. ¡Acaban de ahorrarle a la empresa más de 17 millones de pesos! Recuerden: en logística, el tiempo inactivo es el enemigo más destructivo.";

const FailScreen = ({ onRetry, onForceAdvance }: { onRetry: () => void; onForceAdvance?: () => void }) => {
  const { speak, stop } = usePremiumVoice();

  useEffect(() => {
    const t = setTimeout(() => speak(FAIL_TEXT), 400);
    return () => { clearTimeout(t); stop(); };
  }, [speak, stop]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bg-background">
      <div className="fixed inset-0 animate-emergency-pulse bg-crisis-red/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg border-2 border-crisis-red bg-crisis-red/10 p-6"
      >
        <motion.div animate={{ x: [0, -10, 10, -8, 8, -4, 4, 0] }} transition={{ duration: 0.6, repeat: 3 }}>
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 overflow-hidden rounded-xl border-2 border-crisis-red animate-pulse">
              <video
                autoPlay loop muted playsInline
                className="w-full aspect-video object-cover"
                src="https://assets.mixkit.co/videos/preview/mixkit-businessman-working-on-a-laptop-and-looking-stressed-32835-large.mp4"
              />
            </div>

            <h2 className="mt-4 font-orbitron text-2xl font-black text-crisis-red md:text-3xl">
              ¡GAME OVER!
            </h2>
            <p className="mt-1 font-orbitron text-xs font-bold text-crisis-red/80">
              ¡ESTÁN DESPEDIDOS!
            </p>
            <p className="mx-auto mt-4 max-w-lg font-mono text-sm leading-relaxed text-foreground">
              Ahorraron en el flete, pero la máquina estuvo{" "}
              <span className="font-bold text-crisis-red">12 horas apagada</span>.
              ¡Perdimos casi{" "}
              <span className="font-bold text-crisis-red">$31 millones</span> en tiempos muertos!
            </p>

            {/* FAIL-FORWARD: Botón para asumir error y continuar */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { stop(); onForceAdvance?.(); }}
              className="mt-6 w-full max-w-md flex items-center justify-center gap-2 rounded-lg bg-crisis-red px-8 py-5 font-orbitron text-sm font-black text-white shadow-[0_0_30px_hsl(0,90%,55%/0.4)] uppercase tracking-wider"
            >
              🚨 ASUMIR ERROR Y CONTINUAR AL SIGUIENTE RETO
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SuccessScreen = ({ onNextLevel, onRetry }: { onNextLevel?: () => void; onRetry: () => void }) => {
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
  const { speak, stop } = usePremiumVoice();

  useEffect(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });
    const t = setTimeout(() => speak(SUCCESS_TEXT), 400);
    return () => { clearTimeout(t); stop(); };
  }, [speak, stop]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bg-background">
      <ReactConfetti
        width={dimensions.w}
        height={dimensions.h}
        recycle={false}
        numberOfPieces={500}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg border-2 border-crisis-green bg-crisis-green/10 p-6"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Shield className="h-16 w-16 text-crisis-green drop-shadow-[0_0_30px_hsl(142,76%,45%)]" />
          </motion.div>

          <h2 className="mt-4 font-orbitron text-2xl font-black text-crisis-green md:text-3xl">
            ¡EXCELENTE DECISIÓN!
          </h2>

          <div className="mt-2 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-orbitron text-xs font-bold text-primary">
              EQUILIBRIO LOGÍSTICO DESBLOQUEADO
            </span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>

          <p className="mx-auto mt-5 max-w-lg font-mono text-sm leading-relaxed text-foreground">
            El flete aéreo costó <span className="font-bold text-primary">$5.000.000</span>, pero la fábrica solo se detuvo{" "}
            <span className="font-bold text-crisis-green">3 horas</span>. En total gastamos{" "}
            <span className="font-bold text-crisis-green">$12.500.000</span>. Si hubieran elegido el camión de $800.000,{" "}
            <span className="font-bold text-crisis-red">12 horas</span> de tiempo muerto nos habrían costado{" "}
            <span className="font-bold text-crisis-red">$30.000.000</span> en pérdidas.
          </p>

          <div className="mx-auto mt-5 grid max-w-xs grid-cols-2 gap-3 font-mono text-xs">
            <div className="rounded border border-crisis-red/30 bg-crisis-red/10 p-3">
              <p className="text-crisis-red">Camión</p>
              <p className="mt-1 text-lg font-bold text-crisis-red">$30.800.000</p>
            </div>
            <div className="rounded border border-crisis-green/30 bg-crisis-green/10 p-3">
              <p className="text-crisis-green">Avioneta</p>
              <p className="mt-1 text-lg font-bold text-crisis-green">$12.500.000</p>
            </div>
          </div>

          <p className="mt-3 font-mono text-xs text-muted-foreground">
            ¡Ahorro neto: <span className="font-bold text-crisis-green">$17.500.000</span>! Recuerden: el tiempo inactivo es el enemigo más destructivo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { stop(); onRetry(); }}
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 px-6 py-3 font-orbitron text-sm font-bold text-slate-300 hover:text-white border border-slate-600 transition-colors uppercase"
            >
              ⬅️ VOLVER Y REVISAR
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNextLevel}
              className="flex items-center gap-2 rounded-lg bg-crisis-green px-8 py-4 font-orbitron text-base font-black text-background animate-bounce shadow-[0_0_30px_hsl(142,76%,45%/0.4)]"
            >
              🚀 AVANZAR AL PUNTO 2 <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Debriefing = ({ choice, onRetry, onNextLevel, onForceAdvance }: DebriefingProps) => {
  return choice === "truck"
    ? <FailScreen onRetry={onRetry} onForceAdvance={onForceAdvance} />
    : <SuccessScreen onNextLevel={onNextLevel} onRetry={onRetry} />;
};

export default Debriefing;

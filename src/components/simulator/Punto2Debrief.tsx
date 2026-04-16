import { motion } from "framer-motion";
import { RotateCcw, Shield, Sparkles } from "lucide-react";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";
import { usePremiumVoice } from "@/hooks/usePremiumVoice";

interface Punto2DebriefProps {
  correct: boolean;
  onRetry: () => void;
  onBack: () => void;
  onNextLevel?: () => void;
}

const FAIL_TEXT =
  "¡Casi lo logran ingenieros! Revisen bien los costos totales. Recuerden: deben calcular cuántos viajes necesita cada vehículo para las 600 lavadoras, multiplicar por el costo de cada viaje, y luego hallar la diferencia. ¡Vuelvan a intentarlo!";

const SUCCESS_TEXT =
  "¡Qué nivel de gerencia! Cayeron en la cuenta de la cascarita. Mil ochocientas cajas divididas entre quinientas, daba tres punto seis camiones. Muchos novatos hubieran contratado tres camiones y dejado carga tirada. A ustedes les tocó redondear y alquilar cuatro camiones completos por doce millones. Aún pagando un camión extra con espacio libre, le ahorraron tres millones a la empresa frente a la mega-mula. ¡Excelente optimización logística! Nivel 2 completado.";

const FailScreen = ({ onRetry }: { onRetry: () => void }) => {
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
            <h2 className="mt-4 font-orbitron text-2xl font-black text-crisis-red md:text-3xl">
              ¡RESPUESTA INCORRECTA!
            </h2>
            <p className="mt-1 font-orbitron text-xs font-bold text-crisis-red/80">
              REVISA TUS CÁLCULOS
            </p>
            <p className="mx-auto mt-4 max-w-lg font-mono text-sm leading-relaxed text-foreground">
              Pista: calcula cuántos viajes necesita cada vehículo para las{" "}
              <span className="font-bold text-primary">600 lavadoras</span>, multiplica por el costo de cada viaje, y encuentra la{" "}
              <span className="font-bold text-crisis-green">diferencia</span>.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { stop(); onRetry(); }}
              className="mt-6 flex items-center gap-2 rounded bg-crisis-red px-6 py-3 font-orbitron text-sm font-bold text-foreground"
            >
              <RotateCcw className="h-4 w-4" /> REINTENTAR
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SuccessScreen = ({ onBack, onNextLevel }: { onBack: () => void; onNextLevel?: () => void }) => {
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
            ¡EXCELENTE LOGÍSTICO!
          </h2>

          <div className="mt-2 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="font-orbitron text-xs font-bold text-secondary">
              COSTO UNITARIO OPTIMIZADO
            </span>
            <Sparkles className="h-4 w-4 text-secondary" />
          </div>

          <p className="mx-auto mt-5 max-w-lg font-mono text-sm leading-relaxed text-foreground">
            1.800 ÷ 500 = <strong className="text-primary">3.6 camiones</strong> → redondeamos a{" "}
            <strong className="text-crisis-green">4 camiones completos</strong> × $3.000.000 ={" "}
            <span className="font-bold text-crisis-green">$12.000.000</span>.
            La mega-mula costaba <span className="font-bold text-crisis-red">$15.000.000</span>.
            Ahorro: <span className="font-bold text-crisis-green">$3.000.000</span>.
          </p>

          <div className="mx-auto mt-5 grid max-w-xs grid-cols-2 gap-3 font-mono text-xs">
            <div className="rounded border border-crisis-red/30 bg-crisis-red/10 p-3">
              <p className="text-crisis-red">Mega-Mula (3 viajes)</p>
              <p className="mt-1 text-lg font-bold text-crisis-red">$15.000.000</p>
            </div>
            <div className="rounded border border-crisis-green/30 bg-crisis-green/10 p-3">
              <p className="text-crisis-green">Turbo (4 camiones)</p>
              <p className="mt-1 text-lg font-bold text-crisis-green">$12.000.000</p>
            </div>
          </div>

          <p className="mt-4 font-mono text-xs text-muted-foreground max-w-md">
            ¡Cuidado con los decimales! En logística real <strong className="text-primary">siempre se redondea hacia arriba</strong>.
            No puedes alquilar 0.6 camiones. ¡Nivel 2 completado!
          </p>

          <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                stop();
                onBack();
              }}
              className="flex flex-1 items-center justify-center rounded-xl border border-border bg-muted/30 px-6 py-4 font-orbitron text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              ⬅️ VOLVER AL INICIO
            </button>

            {onNextLevel && (
              <button
                type="button"
                onClick={() => {
                  stop();
                  onNextLevel();
                }}
                className="flex flex-1 items-center justify-center rounded-xl border border-crisis-green bg-crisis-green px-6 py-4 font-orbitron text-sm font-black uppercase tracking-[0.14em] text-background shadow-lg transition-transform hover:scale-[1.02] hover:bg-crisis-green/90"
              >
                🚀 AVANZAR AL PUNTO 3
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Punto2Debrief = ({ correct, onRetry, onBack, onNextLevel }: Punto2DebriefProps) => {
  return correct ? <SuccessScreen onBack={onBack} onNextLevel={onNextLevel} /> : <FailScreen onRetry={onRetry} />;
};

export default Punto2Debrief;

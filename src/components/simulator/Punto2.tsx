import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Punto2Briefing from "./Punto2Briefing";
import Punto2Control from "./Punto2Control";
import Punto2Debrief from "./Punto2Debrief";
import type { ErrorLogEntry } from "./SimuladorIndustrial";

interface Punto2Props {
  onBack: () => void;
  onNextLevel?: () => void;
  addErrorLog?: (entry: ErrorLogEntry) => void;
}

type P2Phase = "briefing" | "control" | "debrief";

const Punto2 = ({ onBack, onNextLevel, addErrorLog }: Punto2Props) => {
  const [phase, setPhase] = useState<P2Phase>("briefing");
  const [correct, setCorrect] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    setCorrect(isCorrect);
    if (!isCorrect && addErrorLog) {
      addErrorLog({
        reto: "Reto 2 — Distribución de Carga",
        textoAlumno: "Eligió Mega-Mula (Opción A) sin optimizar costo unitario",
        conceptosOmitidos: "Redondeo hacia arriba de vehículos, Costo Unitario por caja",
        teoriaCorrecta: "1800÷500=3.6→4 camiones×$3M=$12M. La Mega-Mula costaba $15M. Ahorro: $3M. Costo unitario B ($6.000) < A ($8.333)."
      });
    }
    setPhase("debrief");
  };

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "briefing" && (
          <motion.div key="p2-briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto2Briefing onProceed={() => setPhase("control")} onBack={onBack} />
          </motion.div>
        )}
        {phase === "control" && (
          <motion.div key="p2-control" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto2Control onAnswer={handleAnswer} onBack={onBack} />
          </motion.div>
        )}
        {phase === "debrief" && (
          <motion.div key="p2-debrief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto2Debrief correct={correct} onRetry={() => setPhase("briefing")} onBack={onBack} onNextLevel={onNextLevel} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Punto2;

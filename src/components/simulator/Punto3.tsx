import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Punto3Briefing from "./Punto3Briefing";
import Punto3Control from "./Punto3Control";
import Punto3Debrief from "./Punto3Debrief";
import type { ErrorLogEntry } from "./SimuladorIndustrial";

interface Punto3Props {
  onBack: () => void;
  onNextLevel?: () => void;
  addErrorLog?: (entry: ErrorLogEntry) => void;
}

type P3Phase = "briefing" | "control" | "debrief";

const Punto3 = ({ onBack, onNextLevel, addErrorLog }: Punto3Props) => {
  const [phase, setPhase] = useState<P3Phase>("briefing");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "briefing" && (
          <motion.div key="p3-briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto3Briefing onProceed={() => setPhase("control")} onBack={onBack} />
          </motion.div>
        )}
        {phase === "control" && (
          <motion.div key="p3-control" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto3Control
              onSuccess={() => setPhase("debrief")}
              onBack={onBack}
              inputs={{ input1, input2, input3, input4, input5 }}
              setInputs={{ setInput1, setInput2, setInput3, setInput4, setInput5 }}
            />
          </motion.div>
        )}
        {phase === "debrief" && (
          <motion.div key="p3-debrief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto3Debrief onRetry={() => setPhase("control")} onBack={onBack} onNextLevel={onNextLevel} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Punto3;

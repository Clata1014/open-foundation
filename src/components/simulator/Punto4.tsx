import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Punto4Briefing from "./Punto4Briefing";
import Punto4Control from "./Punto4Control";
import Punto4Debrief from "./Punto4Debrief";
import type { ErrorLogEntry } from "./SimuladorIndustrial";

interface Punto4Props {
  onBack: () => void;
  addErrorLog?: (entry: ErrorLogEntry) => void;
  errorLog?: ErrorLogEntry[];
  elapsedSeconds?: number;
}

type P4Phase = "briefing" | "control" | "debrief";

const Punto4 = ({ onBack, addErrorLog, errorLog, elapsedSeconds }: Punto4Props) => {
  const [phase, setPhase] = useState<P4Phase>("briefing");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "briefing" && (
          <motion.div key="p4-briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto4Briefing onProceed={() => setPhase("control")} onBack={onBack} />
          </motion.div>
        )}
        {phase === "control" && (
          <motion.div key="p4-control" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto4Control
              onSuccess={() => setPhase("debrief")}
              onBack={onBack}
              inputs={{ input1, input2, input3, input4, input5 }}
              setInputs={{ setInput1, setInput2, setInput3, setInput4, setInput5 }}
            />
          </motion.div>
        )}
        {phase === "debrief" && (
          <motion.div key="p4-debrief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto4Debrief onRetry={() => setPhase("control")} onBack={onBack} errorLog={errorLog} elapsedSeconds={elapsedSeconds} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Punto4;

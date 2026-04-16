import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lobby from "./Lobby";
import Briefing from "./Briefing";
import ControlPanel from "./ControlPanel";
import Debriefing from "./Debriefing";
import Punto2 from "./Punto2";
import Punto3 from "./Punto3";
import Punto4 from "./Punto4";

export type ErrorLogEntry = {
  reto: string;
  textoAlumno: string;
  conceptosOmitidos: string;
  teoriaCorrecta: string;
};

type Phase = "lobby" | "briefing" | "control" | "debrief" | "punto2" | "punto3" | "punto4";

const PHASE_ORDER: Phase[] = ["lobby", "briefing", "control", "debrief", "punto2", "punto3", "punto4"];

const SimuladorIndustrial = () => {
  const [phase, setPhase] = useState<Phase>("lobby");
  const [choice, setChoice] = useState<"truck" | "plane">("truck");
  const [errorLog, setErrorLog] = useState<ErrorLogEntry[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Start timer when leaving lobby
  useEffect(() => {
    if (phase === "lobby") {
      setElapsedSeconds(0);
      startTimeRef.current = null;
      if (timerRef.current) clearInterval(timerRef.current);
    } else if (phase === "briefing" && !startTimeRef.current) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
      }, 1000);
    }
    return () => {};
  }, [phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const addErrorLog = useCallback((entry: ErrorLogEntry) => {
    setErrorLog((prev) => [...prev, entry]);
  }, []);

  const handleSelect = (c: "truck" | "plane") => {
    setChoice(c);
    if (c === "truck") {
      addErrorLog({
        reto: "Reto 1 — Emergencia Troqueladora",
        textoAlumno: "Eligió CAMIÓN ($800.000 flete)",
        conceptosOmitidos: "Costo de tiempo muerto, Costo Total Logístico",
        teoriaCorrecta: "El camión cuesta $800K pero 12h de paro = $30M en pérdidas. Total: $30.8M. La avioneta cuesta $5M pero solo 3h de paro = $7.5M. Total: $12.5M. Ahorro: $17.5M."
      });
    }
    setPhase("debrief");
  };

  const handleRetry = () => setPhase("control");
  const handleBackToPunto1 = () => setPhase("debrief");

  const handleGhostHome = useCallback(() => {
    try { window.speechSynthesis.cancel(); } catch {}
    setPhase("lobby");
  }, []);

  const handleGhostSkip = useCallback(() => {
    try { window.speechSynthesis.cancel(); } catch {}
    setPhase((prev) => {
      const idx = PHASE_ORDER.indexOf(prev);
      if (idx < 0 || idx >= PHASE_ORDER.length - 1) return "lobby";
      return PHASE_ORDER[idx + 1];
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(173 80% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(173 80% 50% / 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ghost button: Home (bottom-left) */}
      <button
        onClick={handleGhostHome}
        className="fixed bottom-0 left-0 w-16 h-16 bg-slate-900/90 text-white flex items-center justify-center opacity-0 hover:opacity-30 z-[9999] cursor-default transition-opacity duration-500 rounded-tr-2xl"
        aria-label="Volver al inicio"
      >
        <span className="text-2xl">🏠</span>
      </button>

      {/* Ghost button: Skip (bottom-right) */}
      <button
        onClick={handleGhostSkip}
        className="fixed bottom-0 right-0 w-16 h-16 bg-slate-900/90 text-white flex items-center justify-center opacity-0 hover:opacity-30 z-[9999] cursor-default transition-opacity duration-500 rounded-tl-2xl"
        aria-label="Avanzar"
      >
        <span className="text-2xl">⏭️</span>
      </button>

      <AnimatePresence mode="wait">
        {phase === "lobby" && (
          <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Lobby onStart={() => { setErrorLog([]); setPhase("briefing"); }} />
          </motion.div>
        )}
        {phase === "briefing" && (
          <motion.div key="briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Briefing onProceed={() => setPhase("control")} />
          </motion.div>
        )}
        {phase === "control" && (
          <motion.div key="control" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ControlPanel onSelect={handleSelect} />
          </motion.div>
        )}
        {phase === "debrief" && (
          <motion.div key="debrief" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Debriefing
              choice={choice}
              onRetry={handleRetry}
              onNextLevel={() => setPhase("punto2")}
              onForceAdvance={() => setPhase("punto2")}
            />
          </motion.div>
        )}
        {phase === "punto2" && (
          <motion.div key="punto2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto2 onBack={handleBackToPunto1} onNextLevel={() => setPhase("punto3")} addErrorLog={addErrorLog} />
          </motion.div>
        )}
        {phase === "punto3" && (
          <motion.div key="punto3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto3 onBack={() => setPhase("lobby")} onNextLevel={() => setPhase("punto4")} addErrorLog={addErrorLog} />
          </motion.div>
        )}
        {phase === "punto4" && (
          <motion.div key="punto4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Punto4 onBack={() => setPhase("lobby")} addErrorLog={addErrorLog} errorLog={errorLog} elapsedSeconds={elapsedSeconds} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimuladorIndustrial;

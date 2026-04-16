import { motion } from "framer-motion";
import { Truck, Plane, DollarSign } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface ControlPanelProps {
  onSelect: (choice: "truck" | "plane") => void;
}

function safeEval(expr: string): number | null {
  try {
    const sanitized = expr.replace(/[^0-9+\-*/().  ]/g, "");
    if (!sanitized.trim()) return null;
    const result = new Function(`"use strict"; return (${sanitized})`)();
    return typeof result === "number" && isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

const MAX_BAR = 35_000_000;

/* Stress Counter */
const StressCounter = () => {
  const [loss, setLoss] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoss((prev) => prev + 10000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-crisis-red/40 bg-crisis-red/5 p-4 text-center"
    >
      <div className="flex items-center justify-center gap-2">
        <DollarSign className="h-5 w-5 text-crisis-red animate-emergency-pulse" />
        <span className="font-orbitron text-xs font-bold text-crisis-red tracking-wider">
          💸 PÉRDIDA EN TIEMPO REAL
        </span>
      </div>
      <p className="mt-2 font-mono text-3xl font-black text-crisis-red animate-counter-tick md:text-4xl">
        -$ {new Intl.NumberFormat("es-CO").format(loss)}
      </p>
      <p className="mt-1 font-mono text-xs text-muted-foreground">
        La troqueladora pierde <span className="text-crisis-red font-bold">$2.500.000</span> por hora.
      </p>
    </motion.div>
  );
};

/* Option Card */
const OptionCard = ({
  icon: Icon,
  avatarSeed,
  label,
  description,
  isCyan,
  value,
  onChange,
  total,
  onDispatch,
}: {
  icon: typeof Truck;
  avatarSeed: string;
  label: string;
  description: string;
  isCyan: boolean;
  value: string;
  onChange: (v: string) => void;
  total: number | null;
  onDispatch: () => void;
}) => {
  const barWidth = total ? Math.min((total / MAX_BAR) * 100, 100) : 0;
  const formatted = total ? new Intl.NumberFormat("es-CO").format(total) : "—";
  const colorClass = isCyan ? "text-primary" : "text-crisis-red";
  const borderClass = isCyan ? "border-primary/30" : "border-crisis-red/30";
  const bgClass = isCyan ? "bg-primary/5" : "bg-crisis-red/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex-1 rounded-xl border p-5 backdrop-blur-md ${borderClass} ${bgClass}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`}
          alt={label}
          className="h-14 w-14 rounded-full border border-border"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${colorClass}`} />
            <p className={`font-orbitron text-xs font-bold ${colorClass}`}>{label}</p>
          </div>
          <p className="mt-1 font-mono text-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="font-mono text-xs text-muted-foreground">{">"} Escribe tu fórmula aquí...</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded border border-border bg-background px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="mt-4">
        <div className="h-7 w-full overflow-hidden rounded bg-background">
          <motion.div
            className={`h-full ${isCyan ? "bg-primary" : "bg-crisis-red"}`}
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ type: "spring", stiffness: 80 }}
          />
        </div>
        <p className={`mt-1 font-mono text-sm font-bold ${colorClass}`}>Total: $ {formatted}</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onDispatch}
        disabled={!total}
        className={`mt-4 w-full rounded py-3 font-orbitron text-sm font-bold tracking-wider transition disabled:opacity-30 ${
          isCyan
            ? "bg-primary text-primary-foreground hover:brightness-110"
            : "bg-crisis-red text-foreground hover:brightness-110"
        }`}
      >
        DESPACHAR ESTE VEHÍCULO
      </motion.button>
    </motion.div>
  );
};

const ControlPanel = ({ onSelect }: ControlPanelProps) => {
  const [formulaA, setFormulaA] = useState("");
  const [formulaB, setFormulaB] = useState("");

  const totalA = useMemo(() => safeEval(formulaA), [formulaA]);
  const totalB = useMemo(() => safeEval(formulaB), [formulaB]);

  return (
    <div className="relative min-h-screen overflow-y-auto px-4 py-6 pb-24 bg-background">
      <div className="relative mx-auto max-w-4xl space-y-4">
        {/* Stress counter */}
        <StressCounter />

        {/* Expediente de la emergencia */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-md border-l-4 border-amber-500 bg-slate-900/90 p-4 shadow-lg"
        >
          <h3 className="mb-2 flex items-center gap-2 font-orbitron text-xs font-bold uppercase tracking-wider text-amber-500">
            📂 REPORTE DE DATOS CRÍTICOS
          </h3>
          <p className="font-mono text-sm leading-relaxed text-slate-300">
            La máquina troqueladora principal está totalmente detenida. El sistema financiero indica que perdemos exactamente{" "}
            <strong className="text-crisis-red">$2.500.000 POR CADA HORA</strong> que pase apagada.
          </p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-slate-300">
            Calcula en las consolas de abajo el <strong className="text-foreground">Costo Total Logístico (Flete + Tiempo Muerto)</strong> de cada vehículo para tomar una decisión.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-4 md:flex-row">
          <OptionCard
            icon={Truck}
            avatarSeed="Camionero"
            label="OPCIÓN A — RUTA TERRESTRE (CAMIÓN)"
            description="La empresa transportadora cobra $800.000 de flete y el trayecto tarda 12 horas en llegar."
            isCyan={false}
            value={formulaA}
            onChange={setFormulaA}
            total={totalA}
            onDispatch={() => onSelect("truck")}
          />
          <OptionCard
            icon={Plane}
            avatarSeed="Piloto"
            label="OPCIÓN B — RUTA AÉREA (AVIONETA)"
            description="La aerolínea cobra $5.000.000 de flete y el vuelo tarda apenas 3 horas."
            isCyan={true}
            value={formulaB}
            onChange={setFormulaB}
            total={totalB}
            onDispatch={() => onSelect("plane")}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface LobbyProps {
  onStart: () => void;
}

const Lobby = ({ onStart }: LobbyProps) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 animate-emergency-pulse bg-[radial-gradient(ellipse_at_top,hsl(0_90%_55%/0.08),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 animate-emergency-pulse bg-[radial-gradient(ellipse_at_bottom,hsl(0_90%_55%/0.05),transparent_50%)]" style={{ animationDelay: "0.5s" }} />

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 90% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(0 90% 55% / 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
      >
        <motion.div
          animate={{ rotate: [0, -15, 15, -10, 10, -5, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }}
        >
          <Phone className="h-20 w-20 text-crisis-red drop-shadow-[0_0_30px_hsl(0,90%,55%)]" />
        </motion.div>

        <motion.p
          className="font-orbitron text-xs font-bold uppercase tracking-[0.3em] text-crisis-red"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ⚠️ Llamada entrante — Gerencia General
        </motion.p>

        <h1 className="font-orbitron text-3xl font-black tracking-wider text-foreground md:text-5xl">
          SALA DE CRISIS
        </h1>
        <p className="font-orbitron text-sm font-bold tracking-widest text-muted-foreground">
          SIMULADOR DE CRISIS — POR MARIA CLARA TABARES
        </p>
        <p className="font-orbitron text-xs md:text-sm font-bold tracking-[0.25em] text-primary/70 uppercase">
          Tecnología en Producción Industrial 2026-1
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-6 rounded-lg border-2 border-crisis-red bg-crisis-red/10 px-8 py-5 font-orbitron text-base font-bold text-crisis-red transition hover:bg-crisis-red/20 md:text-lg"
        >
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            📲 CONTESTAR VIDEOLLAMADA DEL GERENTE
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Lobby;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePremiumVoice } from "@/hooks/usePremiumVoice";

interface Punto4BriefingProps {
  onProceed: () => void;
  onBack: () => void;
}

const FULL_TEXT =
  "¡Alerta en el Centro de Distribución! Estamos en plena temporada de promociones y tenemos 850 pedidos urgentes que despachar. El método manual es un desastre: los operarios caminan perdidos por pasillos kilométricos buscando mercancía con hojas de papel. La gerencia acaba de encender el sistema WMS, un cerebro digital que traza rutas óptimas con escáneres láser. ¡Necesitamos que calcules el impacto real de esta tecnología!";

const Punto4Briefing = ({ onProceed, onBack }: Punto4BriefingProps) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const { speak, stop } = usePremiumVoice();

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(FULL_TEXT, () => setDone(true));
    }, 600);
    return () => { clearTimeout(timer); stop(); };
  }, [speak, stop]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleProceed = () => { stop(); onProceed(); };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 bg-background">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(222_47%_3%)_100%)] -z-[1]" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6">
        <button
          onClick={() => { stop(); onBack(); }}
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-bold uppercase tracking-widest bg-card px-4 py-2 rounded border border-border hover:border-muted w-fit cursor-pointer self-start"
        >
          <span>⬅️</span> VOLVER AL MENÚ
        </button>

        {/* Video call frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl"
        >
          <div className="absolute inset-0 rounded-xl border-2 border-secondary animate-pulse z-10 pointer-events-none" />

          <div className="relative overflow-hidden h-72 w-full rounded-t-xl bg-slate-900 border-2 border-slate-700 shadow-2xl">
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-t-xl"
              animate={{ x: [-1, 1.5, -1, 1, 0], y: [-1, 1, -1.5, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed/fMgKrNSHnys?autoplay=1&mute=1&controls=0&loop=1&playlist=fMgKrNSHnys&modestbranding=1&playsinline=1&rel=0&disablekb=1&start=60"
                className="absolute top-1/2 left-1/2 w-[220%] h-[220%] md:w-[180%] md:h-[180%] -translate-x-1/2 -translate-y-1/2 opacity-85 contrast-125 grayscale-[15%] pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10 rounded-t-xl" />
            <div className="absolute inset-0 bg-sky-600/15 animate-pulse mix-blend-color-burn pointer-events-none z-10 rounded-t-xl" />

            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="text-white font-sans text-xs font-semibold tracking-wide">🔴 EN VIVO</span>
            </div>

            <div className="absolute bottom-4 left-4 flex flex-col gap-1 z-20">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                <span className="text-white font-sans text-sm font-semibold flex items-center gap-2">
                  📦 Dir. Logística — Centro de Distribución
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 ml-1 bg-black/40 px-2 py-1 rounded w-fit">
                <motion.div className="w-1.5 bg-green-500 rounded-full" animate={{ height: [4, 12, 4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} />
                <motion.div className="w-1.5 bg-green-500 rounded-full" animate={{ height: [8, 16, 6, 12, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} />
                <motion.div className="w-1.5 bg-green-500 rounded-full" animate={{ height: [6, 10, 16, 8, 6] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                <span className="text-green-400 text-xs font-bold ml-1 drop-shadow-md">Hablando...</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problem context */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full rounded-lg border border-sky-500/30 bg-sky-950/20 p-4"
        >
          <h3 className="font-orbitron text-xs font-bold text-sky-400 mb-3 uppercase tracking-wider">
            📊 TIEMPOS OPERATIVOS (DATOS DEL PROBLEMA)
          </h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between text-foreground">
              <span>Búsqueda Manual (por pedido)</span>
              <span className="font-bold text-red-400">15 minutos</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Tiempo con WMS (por pedido)</span>
              <span className="font-bold text-sky-400">180 segundos</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Turno laboral estándar</span>
              <span className="font-bold text-emerald-400">8 horas</span>
            </div>
            <div className="border-t border-sky-500/30 pt-2 flex justify-between text-amber-400 font-bold">
              <span>PEDIDOS URGENTES</span>
              <span>850</span>
            </div>
          </div>
        </motion.div>

        {/* Transcription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full rounded-lg border border-border bg-card/80 p-5 backdrop-blur-sm max-h-48 overflow-y-auto"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-emergency-pulse rounded-full bg-secondary" />
            <span className="font-orbitron text-[10px] font-bold text-secondary tracking-wider">
              TRANSCRIPCIÓN EN VIVO — PUNTO 4
            </span>
          </div>
          <p className="font-mono text-sm leading-relaxed text-foreground">
            {displayed}
            {!done && <span className="ml-0.5 inline-block h-4 w-1.5 animate-emergency-pulse bg-primary" />}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0.25 }}
          whileHover={done ? { scale: 1.05 } : {}}
          whileTap={done ? { scale: 0.95 } : {}}
          onClick={handleProceed}
          disabled={!done}
          className="rounded border-2 border-sky-400 bg-sky-400/10 px-8 py-3 font-orbitron text-sm font-bold text-sky-400 transition hover:bg-sky-400/20 disabled:cursor-not-allowed"
        >
          📊 ENTRAR A LA CONSOLA
        </motion.button>
      </div>
    </div>
  );
};

export default Punto4Briefing;

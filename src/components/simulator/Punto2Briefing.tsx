import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePremiumVoice } from "@/hooks/usePremiumVoice";

interface Punto2BriefingProps {
  onProceed: () => void;
  onBack: () => void;
}

const FULL_TEXT =
  "¡Atención equipo logístico! Nuevo desafío urgente. El cliente Electrohogar nos confirmó un pedido masivo: necesitan 1.800 cajas de electrodomésticos entregadas en sus bodegas regionales lo antes posible. Tenemos dos opciones de transporte. Opción A: una Mega-Mula con capacidad para 600 cajas por viaje, a un costo de 5 millones de pesos por viaje. Necesitaríamos 3 viajes. Opción B: Camiones Turbo con capacidad para 500 cajas por viaje, a un costo de 3 millones de pesos por viaje. Pero ojo: mil ochocientas dividido quinientas no da un número entero. ¿Cuántos camiones completos necesitan realmente? Calculen el costo total de cada opción e ingresen su respuesta. ¡El bono del mes depende de esta decisión!";

const Punto2Briefing = ({ onProceed, onBack }: Punto2BriefingProps) => {
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
          <span>⬅️</span> VOLVER AL PUNTO ANTERIOR
        </button>

        {/* Video call frame — same YouTube hack */}
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
                src="https://www.youtube-nocookie.com/embed/fMgKrNSHnys?autoplay=1&mute=1&controls=0&loop=1&playlist=fMgKrNSHnys&modestbranding=1&playsinline=1&rel=0&disablekb=1&start=30"
                className="absolute top-1/2 left-1/2 w-[220%] h-[220%] md:w-[180%] md:h-[180%] -translate-x-1/2 -translate-y-1/2 opacity-85 contrast-125 grayscale-[15%] pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10 rounded-t-xl" />
            <div className="absolute inset-0 bg-orange-600/15 animate-pulse mix-blend-color-burn pointer-events-none z-10 rounded-t-xl" />

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
                  👤 Dir. Logística — Electrohogar
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
              TRANSCRIPCIÓN EN VIVO — PUNTO 2
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
          className="rounded border-2 border-secondary bg-secondary/10 px-8 py-3 font-orbitron text-sm font-bold text-secondary transition hover:bg-secondary/20 disabled:cursor-not-allowed"
        >
          📦 ABRIR CONSOLA DE DISTRIBUCIÓN
        </motion.button>
      </div>
    </div>
  );
};

export default Punto2Briefing;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePremiumVoice } from "@/hooks/usePremiumVoice";

interface BriefingProps {
  onProceed: () => void;
}

const FULL_TEXT =
  "Atención equipo de ingenieros. Tenemos una emergencia crítica. La máquina troqueladora principal ha sufrido una falla catastrófica en su motor y está totalmente detenida. Es el cuello de botella de la planta. El sistema financiero me arroja una alerta roja: estamos perdiendo 2.500.000 pesos por CADA HORA que pase apagada. El repuesto está en Bogotá. Abran la consola de operaciones y calculen la opción de transporte más eficiente de inmediato.";

const Briefing = ({ onProceed }: BriefingProps) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const { speak, stop } = usePremiumVoice();

  // Start voice
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(FULL_TEXT, () => setDone(true));
    }, 600);
    return () => {
      clearTimeout(timer);
      stop();
    };
  }, [speak, stop]);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(interval);
        // Also mark done if voice already finished or unavailable
        setTimeout(() => setDone(true), 500);
      }
    }, 35);
    return () => clearInterval(interval);
  }, []);

  const handleProceed = () => {
    stop();
    onProceed();
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 bg-background">
      {/* Dark vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(222_47%_3%)_100%)] -z-[1]" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6">
        {/* Video call frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md overflow-hidden rounded-xl"
        >
          {/* Pulsing red border */}
          <div className="absolute inset-0 rounded-xl border-2 border-crisis-red animate-pulse z-10 pointer-events-none" />

          {/* Videollamada HD estilo Zoom/Teams */}
          <div className="relative overflow-hidden h-72 w-full rounded-t-xl bg-slate-900 border-2 border-slate-700 shadow-2xl">
            {/* Video real de YouTube oculto y ampliado */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-t-xl"
              animate={{ x: [-1, 1.5, -1, 1, 0], y: [-1, 1, -1.5, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
            >
              <iframe
src="https://www.youtube-nocookie.com/embed/fMgKrNSHnys?autoplay=1&mute=1&controls=0&loop=1&playlist=fMgKrNSHnys&modestbranding=1&playsinline=1&rel=0&disablekb=1"
                className="absolute top-1/2 left-1/2 w-[220%] h-[220%] md:w-[180%] md:h-[180%] -translate-x-1/2 -translate-y-1/2 opacity-85 contrast-125 grayscale-[15%] pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
              ></iframe>
            </motion.div>

            {/* Sombra inferior para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10 rounded-t-xl" />

            {/* Capa de Alarma Roja Parpadeante */}
            <div className="absolute inset-0 bg-red-600/20 animate-pulse mix-blend-color-burn pointer-events-none z-10 rounded-t-xl" />

            {/* Indicador EN VIVO */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 z-20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="text-white font-sans text-xs font-semibold tracking-wide">🔴 EN VIVO</span>
            </div>

            {/* Nombre + ecualizador de voz */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-1 z-20">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                <span className="text-white font-sans text-sm font-semibold flex items-center gap-2">
                  👤 Ing. Roberto (Gerente de Planta)
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 ml-1 bg-black/40 px-2 py-1 rounded w-fit">
                <motion.div className="w-1.5 bg-green-500 rounded-full" animate={{ height: [4, 12, 4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} />
                <motion.div className="w-1.5 bg-green-500 rounded-full" animate={{ height: [8, 16, 6, 12, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} />
                <motion.div className="w-1.5 bg-green-500 rounded-full" animate={{ height: [6, 10, 16, 8, 6] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                <span className="text-green-400 text-xs font-bold ml-1 drop-shadow-md">Hablando...</span>
              </div>
            </div>

            {/* Botones estilo Zoom */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3 pointer-events-none z-20">
              <div className="bg-slate-800/80 p-2.5 rounded-full border border-white/20 backdrop-blur-sm shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <div className="bg-red-600 p-2.5 rounded-full shadow-lg shadow-red-900/50">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full rounded-lg border border-border bg-card/80 p-5 backdrop-blur-sm max-h-48 overflow-y-auto"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-emergency-pulse rounded-full bg-crisis-red" />
            <span className="font-orbitron text-[10px] font-bold text-crisis-red tracking-wider">
              TRANSCRIPCIÓN EN VIVO
            </span>
          </div>

          <p className="font-mono text-sm leading-relaxed text-foreground">
            {displayed}
            {!done && (
              <span className="ml-0.5 inline-block h-4 w-1.5 animate-emergency-pulse bg-primary" />
            )}
          </p>
        </motion.div>

        {/* Proceed button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0.25 }}
          whileHover={done ? { scale: 1.05 } : {}}
          whileTap={done ? { scale: 0.95 } : {}}
          onClick={handleProceed}
          disabled={!done}
          className="rounded border-2 border-crisis-red bg-crisis-red/10 px-8 py-3 font-orbitron text-sm font-bold text-crisis-red transition hover:bg-crisis-red/20 disabled:cursor-not-allowed"
        >
          🔴 ENTRAR A LA SALA DE CÁLCULO
        </motion.button>
      </div>
    </div>
  );
};

export default Briefing;

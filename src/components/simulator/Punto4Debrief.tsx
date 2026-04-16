import { motion } from "framer-motion";
import { Shield, Sparkles, ArrowLeft } from "lucide-react";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";
import type { ErrorLogEntry } from "./SimuladorIndustrial";

interface Punto4DebriefProps {
  onBack: () => void;
  onRetry: () => void;
  errorLog?: ErrorLogEntry[];
  elapsedSeconds?: number;
}

const formatTime = (totalSeconds: number) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}m ${secs}s`;
};

const calcNota = (errorCount: number): string => {
  if (errorCount === 0) return "5.0 — ¡PERFECTO!";
  if (errorCount === 1) return "4.0 — MUY BIEN";
  if (errorCount === 2) return "3.5 — BIEN";
  if (errorCount === 3) return "3.0 — REGULAR";
  return "2.5 — NECESITA REFUERZO";
};

const Punto4Debrief = ({ onBack, onRetry, errorLog = [], elapsedSeconds = 0 }: Punto4DebriefProps) => {
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });

  useEffect(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speechTexto = "¡Misión cumplida! Excelente análisis logístico. Tú mismo hiciste la cuenta completa. Primero, esquivaste la cascarita de los segundos. Segundo, descubriste que salvar diez mil doscientos minutos inútiles equivale a ciento setenta horas de trabajo. Y al final, te diste cuenta de la verdadera magia: matemáticamente le ahorraste a la fábrica pagar más de veintiún salarios de empleados que solo iban a estar perdidos en la bodega. ¡Eres un gerente brillante!";
        const speech = new SpeechSynthesisUtterance(speechTexto);
        speech.lang = 'es-ES';
        speech.pitch = 1.3;
        speech.rate = 0.95;
        const voces = window.speechSynthesis.getVoices();
        const vozFemenina = voces.find(v =>
          v.lang.startsWith('es') &&
          (v.name.includes('Female') || v.name.includes('Mujer') || v.name.includes('Sabina') || v.name.includes('Mia'))
        );
        if (vozFemenina) speech.voice = vozFemenina;
        window.speechSynthesis.speak(speech);
      }
    } catch (error) {
      console.error(error);
    }

    return () => {
      try { window.speechSynthesis.cancel(); } catch {}
    };
  }, []);

  const nota = calcNota(errorLog.length);

  const buildMensajeFinal = () => {
    let msg = `🎓 SIMULADOR LOGÍSTICO — RESULTADO FINAL\n`;
    msg += `📊 Nota Final: ${nota}\n`;
    msg += `⏱️ Tiempo Total: ${formatTime(elapsedSeconds)}\n`;
    msg += `❌ Errores Cometidos: ${errorLog.length}\n`;
    msg += `\n--- BITÁCORA FORENSE DE AUDITORÍA ---\n`;
    if (errorLog.length === 0) {
      msg += `✅ ¡Sin errores! Rendimiento perfecto.\n`;
    } else {
      errorLog.forEach((e, i) => {
        msg += `\n❌ ${e.reto}\n`;
        msg += `✍️ Escribiste: "${e.textoAlumno}"\n`;
        msg += `🔍 Conceptos omitidos: ${e.conceptosOmitidos}\n`;
        msg += `✅ Teoría: ${e.teoriaCorrecta}\n`;
      });
    }
    return msg;
  };

  const handleWhatsApp = () => {
    try { window.speechSynthesis.cancel(); } catch {}
    const mensajeFinal = buildMensajeFinal();
    const whatsappUrl = `https://wa.me/573126079424?text=${encodeURIComponent(mensajeFinal)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-8 bg-background">
      <ReactConfetti
        width={dimensions.w}
        height={dimensions.h}
        recycle={false}
        numberOfPieces={500}
        colors={['#38bdf8', '#0ea5e9', '#10b981', '#34d399', '#fbbf24']}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg border-2 border-sky-400 bg-sky-400/10 p-6"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Shield className="h-16 w-16 text-sky-400 drop-shadow-[0_0_30px_hsl(199,89%,48%)]" />
          </motion.div>

          <h2 className="mt-4 font-orbitron text-2xl font-black text-sky-400 md:text-3xl">
            🚀 BODEGA OPTIMIZADA CON ÉXITO
          </h2>

          <div className="mt-2 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="font-orbitron text-xs font-bold text-amber-400">
              SISTEMA WMS VALIDADO
            </span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          {/* Stats */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-8 w-full max-w-4xl mx-auto">
            <div className="flex-1 bg-red-950/30 border border-red-800/80 rounded-xl p-6 text-center">
              <p className="text-red-400 text-sm font-black tracking-widest mb-2 uppercase">💥 Caos Manual</p>
              <p className="text-red-500 text-4xl font-black font-mono">12.750</p>
              <p className="text-red-300/70 text-xs mt-2 uppercase font-bold tracking-wider">Minutos Perdidos</p>
            </div>
            <div className="flex-1 bg-emerald-950/30 border border-emerald-500 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <p className="text-emerald-400 text-sm font-black tracking-widest mb-2 uppercase">✅ Ahorro Total</p>
              <p className="text-emerald-400 text-4xl font-black font-mono drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">21,25</p>
              <p className="text-emerald-300/70 text-xs mt-2 uppercase font-bold tracking-wider">Turnos Ahorrados</p>
            </div>
          </div>

          {/* Lesson */}
          <div className="mt-8 text-left bg-slate-800/80 p-6 rounded-lg border-l-4 border-sky-400 w-full">
            <p className="text-xl text-sky-400 font-black mb-2">💡 LA LECCIÓN GERENCIAL:</p>
            <p className="text-slate-300 text-lg leading-relaxed">
              ¡Tú mismo hiciste el cálculo! Esquivaste la trampa de los segundos, pasaste a minutos, y descubriste el verdadero impacto de la tecnología. Al realizar la conversión final, comprobaste que salvar <strong className="text-emerald-400">10.200 minutos</strong> equivale exactamente a regalarle a la empresa <strong className="text-emerald-400">170 horas de trabajo libre</strong>.
              <br/><br/>
              Como gerente, le acabas de ahorrar a la empresa tener que contratar y pagarle a <strong className="text-white bg-slate-900 px-2 py-1 rounded">21 operarios extras hoy</strong> que solo habrían caminado perdidos por la bodega. ¡La tecnología no es un gasto, es rentabilidad pura!
            </p>
          </div>

          {/* NOTA FINAL */}
          <div className="mt-8 w-full bg-slate-900 border-2 border-amber-500 rounded-xl p-6">
            <h3 className="font-orbitron text-lg font-black text-amber-400 mb-2">📊 RESULTADO FINAL</h3>
            <p className="text-3xl font-black text-white font-mono">{nota}</p>
            <p className="text-muted-foreground text-sm mt-1">⏱️ Tiempo total: {formatTime(elapsedSeconds)}</p>
            <p className="text-muted-foreground text-sm">❌ Errores cometidos: {errorLog.length}</p>
          </div>

          {/* BITÁCORA FORENSE DE AUDITORÍA */}
          {errorLog.length > 0 && (
            <div className="mt-6 w-full bg-slate-900 border border-crisis-red/50 rounded-xl p-6 text-left">
              <h3 className="font-orbitron text-sm font-black text-crisis-red mb-4 uppercase tracking-wider">
                📋 BITÁCORA FORENSE DE AUDITORÍA
              </h3>
              <div className="whitespace-pre-wrap font-mono text-xs text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
                {errorLog.map((e, i) => (
                  <div key={i} className="mb-4 pb-4 border-b border-slate-700 last:border-0">
                    {`❌ ${e.reto}\n✍️ Escribiste: "${e.textoAlumno}"\n🔍 Conceptos omitidos: ${e.conceptosOmitidos}\n✅ Teoría: ${e.teoriaCorrecta}`}
                  </div>
                ))}
              </div>
            </div>
          )}

          {errorLog.length === 0 && (
            <div className="mt-6 w-full bg-emerald-950/30 border border-emerald-500/50 rounded-xl p-6 text-center">
              <p className="text-emerald-400 font-black text-lg">✅ ¡RENDIMIENTO PERFECTO! Sin errores registrados.</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 px-6 py-3 font-orbitron text-sm font-bold text-slate-300 hover:text-white border border-slate-600 transition-colors uppercase"
            >
              ⬅️ VOLVER Y REVISAR
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                try { window.speechSynthesis.cancel(); } catch {}
                onBack();
              }}
              className="flex items-center gap-2 rounded border border-muted px-6 py-3 font-orbitron text-sm font-bold text-muted-foreground transition-colors hover:bg-muted/20"
            >
              <ArrowLeft className="h-4 w-4" /> VOLVER AL MENÚ
            </motion.button>
          </div>

          {/* BOTÓN WHATSAPP */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={handleWhatsApp}
            className="mt-6 w-full max-w-md rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8 py-5 font-orbitron text-base font-black text-white shadow-lg border border-emerald-400 uppercase flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          >
            📲 ENVIAR RESULTADO POR WHATSAPP
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Punto4Debrief;

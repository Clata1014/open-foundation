import { motion } from "framer-motion";
import { Shield, Sparkles, ArrowLeft } from "lucide-react";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";

interface Punto3DebriefProps {
  onBack: () => void;
  onRetry: () => void;
  onNextLevel?: () => void;
}

const Punto3Debrief = ({ onBack, onRetry, onNextLevel }: Punto3DebriefProps) => {
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });

  useEffect(() => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });

    // Speech synthesis
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speechTexto = "¡Misión cumplida! Presta mucha atención. Un Costo Hundido es ese dinero que ya gastaste y no puedes recuperar, como cuando compras la boleta para una película mala. Un gerente novato habría fabricado los tenis neón para no perder las telas, botando a la basura ochenta millones de pesos. Pero tú aplicaste el Efecto Zara y salvaste el efectivo. Y escucha bien esto: el verdadero éxito no es solo cancelar un proyecto malo, es ser ágil para inyectarle esa plata al producto que sí va a dar ganancias. Con esos ochenta millones que protegiste, pudimos fabricar de inmediato mil seiscientos pares nuevos de la tendencia pastel que se venderán como pan caliente. ¡Eso es tener mente de tiburón en los negocios!";
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

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bg-background">
      <ReactConfetti
        width={dimensions.w}
        height={dimensions.h}
        recycle={false}
        numberOfPieces={500}
        colors={['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b']}
        style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg border-2 border-crisis-green bg-crisis-green/10 p-6"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Shield className="h-16 w-16 text-crisis-green drop-shadow-[0_0_30px_hsl(142,76%,45%)]" />
          </motion.div>

          <h2 className="mt-4 font-orbitron text-2xl font-black text-crisis-green md:text-3xl">
            ¡EFECTO ZARA ACTIVADO!
          </h2>

          <div className="mt-2 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="font-orbitron text-xs font-bold text-amber-400">
              PRODUCCIÓN DETENIDA A TIEMPO
            </span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          <div className="mt-8 bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl text-left w-full max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-amber-400 mb-4 uppercase tracking-widest">
              💡 LECCIÓN GERENCIAL: EL COSTO HUNDIDO
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Es cierto que los <span className="font-bold text-red-400">$144.000.000</span> de los materiales ya se perdieron. En finanzas, esto se llama <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded mx-1">Costo Hundido</span> (plata que ya salió y no se puede recuperar).
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Un gerente novato diría: <em>"¡Terminemos de fabricar los tenis para no perder la tela!"</em>. ¡Esa es una pésima decisión!
            </p>
             <p className="text-slate-300 text-lg leading-relaxed">
               Al aplicar el Efecto Zara y tener el valor de decir <strong>"¡PAREN TODO!"</strong>, asumiste la pérdida inicial de la tela, pero evitaste que la empresa botara <span className="font-bold text-emerald-400">$80.000.000</span> adicionales en efectivo pagando salarios y bodegas por unos tenis que ya nadie quiere comprar. ¡El verdadero gerente protege el flujo de caja a futuro!
             </p>

             <div className="border-t border-slate-700 pt-6 mt-6">
               <p className="text-slate-300 text-lg leading-relaxed">
                 <strong className="text-emerald-400 text-xl">🚀 El Verdadero Efecto Zara (Agilidad):</strong><br/>
                 El éxito no es solo tener el valor de cancelar un proyecto malo, <strong className="text-white bg-slate-800 px-2 py-1 rounded">es ser ágil para inyectarle plata al producto que SÍ va a dar ganancias.</strong> Con los $80.000.000 en efectivo que salvaste, la empresa pudo reinvertir inmediatamente y fabricar <span className="font-black text-emerald-400 text-2xl bg-emerald-950/50 px-2 border border-emerald-800 py-1 rounded mx-1">1.600</span> pares nuevos de tenis pastel. ¡Pasaste de una pérdida segura a una nueva oportunidad de ventas en tiempo récord!
               </p>
             </div>
           </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-8 mt-4 w-full max-w-4xl mx-auto">
            <div className="flex-1 bg-red-950/30 border border-red-800/80 rounded-xl p-6 text-center">
              <p className="text-red-400 text-sm font-black tracking-widest mb-2 uppercase">💥 Costo Hundido (Pérdida)</p>
              <p className="text-red-500 text-4xl font-black font-mono">$ 144.000.000</p>
              <p className="text-red-300/70 text-xs mt-2 uppercase font-bold tracking-wider">Dinero perdido en Telas</p>
            </div>
            <div className="flex-1 bg-emerald-950/30 border border-emerald-500 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <p className="text-emerald-400 text-sm font-black tracking-widest mb-2 uppercase">💰 Efectivo Salvado</p>
              <p className="text-emerald-400 text-4xl font-black font-mono drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">$ 80.000.000</p>
              <p className="text-emerald-300/70 text-xs mt-2 uppercase font-bold tracking-wider">Capital para Reinvertir</p>
            </div>
          </div>


          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
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

          {onNextLevel && (
            <div className="mt-6 w-full flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                onClick={() => {
                  try { window.speechSynthesis.cancel(); } catch {}
                  onNextLevel();
                }}
                className="w-full max-w-md rounded-xl bg-sky-500 px-8 py-5 font-orbitron text-base font-black text-background shadow-lg hover:scale-105 border border-sky-400 uppercase flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.5)]"
              >
                🚀 AVANZAR AL PUNTO 4
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Punto3Debrief;

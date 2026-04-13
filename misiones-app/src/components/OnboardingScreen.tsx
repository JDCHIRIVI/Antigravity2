import { motion, type PanInfo, useMotionValue, useTransform } from "framer-motion";

type Props = {
  onDismiss: () => void;
};

export default function OnboardingScreen({ onDismiss }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    // If user swipes more than 100px in either direction, dismiss
    if (Math.abs(info.offset.x) > 100) {
      onDismiss();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="absolute inset-0 z-[100] bg-[rgba(224,224,224,0.8)] backdrop-blur-md flex flex-col justify-center items-center overflow-hidden px-6"
    >
      <div className="absolute top-[10%] text-center max-w-[340px] px-4 pointer-events-none z-[110]">
        <h2 className="font-extrabold text-[32px] text-base-gray-800 tracking-tight leading-tight">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 font-medium text-[18px] text-base-gray-500 leading-snug">
          Desliza para decidir tu destino. Tienes 12 horas para cumplir cada misión aceptada.
        </p>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        style={{ x, rotate }}
        className="relative w-full max-w-[340px] h-[500px] mt-16 bg-base-gray-200 rounded-[48px] shadow-outset-md p-8 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing font-sans"
      >
        
        {/* Floating Labels */}
        <div className="absolute top-[20%] -left-8 bg-base-gray-200 shadow-outset-sm px-4 py-2 rounded-full border border-base-gray-200 transform -rotate-12 pointer-events-none">
          <span className="text-[14px] font-bold text-brand-accent-red leading-none">⬅️ Swipe Acobardarse</span>
        </div>

        <div className="absolute bottom-[20%] -right-8 bg-base-gray-200 shadow-outset-sm px-4 py-2 rounded-full border border-base-gray-200 transform rotate-12 pointer-events-none">
          <span className="text-[14px] font-bold text-brand-accent-green leading-none">Swipe Aceptar ➡️</span>
        </div>

        {/* Animated Hand Gesture */}
        <motion.div 
          animate={{ 
            x: [0, -80, 0, 0, 80, 0, 0], 
            rotate: [0, -15, 0, 0, 15, 0, 0], 
            scale: [1, 1.1, 1, 1, 1.1, 1, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1],
            ease: "easeInOut" 
          }}
          className="text-[140px] filter drop-shadow-md z-10 select-none pb-12"
        >
          👆
        </motion.div>

      </motion.div>

    </motion.div>
  );
}

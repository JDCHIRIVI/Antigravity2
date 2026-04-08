import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Check, X, Orbit } from "lucide-react";
import heroImage from "../assets/hero.png";

type MissionCardProps = {
  onAccept: () => void;
  onReject: () => void;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  difficulty: number;
  rewards: number;
  progress: number;
  indexInStack?: number;
};

export default function MissionCard({
  onAccept,
  onReject,
  title,
  subtitle,
  description,
  tags,
  difficulty,
  rewards,
  progress,
  indexInStack = 0,
}: MissionCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const dragOpacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const [exitDirection, setExitDirection] = useState<'left' | 'down' | null>(null);

  const isTop = indexInStack === 0;

  const rejectScale = useTransform(x, [-100, 0], [1.15, 1]);
  const rejectBg = useTransform(x, [-100, 0], ["#ef4444", "#E0E0E0"]);
  const rejectColor = useTransform(x, [-100, 0], ["#FFFFFF", "#ef4444"]);

  const acceptScale = useTransform(x, [0, 100], [1, 1.15]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitDirection('down');
    } else if (info.offset.x < -100) {
      setExitDirection('left');
    }
  };

  const handleAnimationComplete = () => {
    if (exitDirection === 'down') {
      onAccept();
    } else if (exitDirection === 'left') {
      onReject();
    }
  };

  return (
    <motion.div
      onAnimationComplete={handleAnimationComplete}
      animate={
        exitDirection === 'down'
          ? { x: 0, y: 350, scale: 0.2, opacity: 0 }
          : exitDirection === 'left'
          ? { x: -500, scale: 1, opacity: 0 }
          : {
              scale: isTop ? 1 : indexInStack === 1 ? 0.95 : 0.90,
              y: isTop ? 0 : indexInStack === 1 ? 32 : 64, // 32 = translate-y-8, 64 = translate-y-16
              zIndex: 20 - indexInStack * 10,
              x: 0,
              opacity: 1
            }
      }
      transition={{ duration: exitDirection ? 0.4 : 0.3 }}
      style={{
        x: isTop && !exitDirection ? x : 0,
        rotate: isTop && !exitDirection ? rotate : 0,
        opacity: isTop && !exitDirection ? dragOpacity : undefined,
      }}
      drag={isTop && !exitDirection ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTop && !exitDirection ? handleDragEnd : undefined}
      className={`absolute top-0 w-full max-w-[448px] h-[726px] bg-base-gray-200 rounded-[48px] shadow-outset-md p-8 flex flex-col items-center gap-4 pb-0 font-sans ${
        isTop && !exitDirection ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Container opacity filter for depth effect */}
      <div
        className={`absolute inset-0 rounded-[48px] pointer-events-none transition-opacity duration-300 ${
          isTop ? "opacity-0" : indexInStack === 1 ? "opacity-20 bg-white/40" : "opacity-40 bg-white/60"
        }`}
      />

      {/* Hero Image Section */}
      <div className="w-full relative rounded-[32px] overflow-hidden h-[141px] shadow-inset-sm shrink-0">
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply pointer-events-none"
        />
      </div>

      {/* Header and Description */}
      <div className="flex flex-col items-center text-center mt-2 relative z-10">
        <h2 className="font-extrabold text-[30px] leading-[1.25] text-base-gray-800 tracking-[-0.75px]">
          {title}
          <br />
          {subtitle}
        </h2>
        <p className="font-medium text-[16px] text-base-gray-500 max-w-[280px] leading-[1.5] mt-3">
          {description}
        </p>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 w-full relative z-10 shrink-0">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-base-gray-200 shadow-outset-sm rounded-full text-[11px] font-bold text-brand-accent-green inline-block"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 w-full mt-4 relative z-10 shrink-0">
        {/* Difficulty */}
        <div className="flex flex-col items-center pt-3 pb-4 px-2 bg-transparent rounded-[24px] shadow-inset-sm relative">
          <span className="text-[9px] font-bold text-base-gray-500 uppercase tracking-[0.5px] mb-2 leading-none text-center">
            Difficulty
          </span>
          <div className="flex gap-0.5 text-brand-accent-yellow">
            {Array.from({ length: difficulty }).map((_, i) => (
              <Orbit key={i} className="w-3.5 h-3.5" />
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="flex flex-col items-center pt-3 pb-4 px-2 bg-transparent rounded-[24px] shadow-inset-sm relative">
          <span className="text-[9px] font-bold text-base-gray-500 uppercase tracking-[0.5px] mb-2 leading-none text-center">
            Rewards
          </span>
          <div className="flex gap-1 items-center">
            <span className="text-[16px] font-bold text-brand-accent-green leading-none">{rewards}</span>
            <div className="w-2 h-2 bg-brand-accent-greenLight rounded-full flex-shrink-0" />
          </div>
        </div>

        {/* Level */}
        <div className="flex flex-col items-center pt-3 pb-4 px-2 bg-transparent rounded-[24px] shadow-inset-sm relative">
          <span className="text-[9px] font-bold text-base-gray-500 uppercase tracking-[0.5px] mb-2 leading-none text-center">
            Level
          </span>
          <div className="flex gap-1 items-center">
            <span className="text-[16px] font-bold text-base-gray-800 leading-none">{progress}</span>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons overlapping the bottom */}
      <div
        className={`absolute -bottom-8 w-full flex justify-center gap-8 px-6 transition-opacity duration-300 ${
          isTop ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
        }`}
      >
        <motion.button
          onClick={() => setExitDirection('left')}
          style={{
            scale: isTop && !exitDirection ? rejectScale : 1,
            backgroundColor: isTop && !exitDirection ? rejectBg : "#E0E0E0",
            color: isTop && !exitDirection ? rejectColor : "#ef4444",
          }}
          className="w-16 h-16 flex items-center justify-center rounded-full shadow-outset-md active:scale-95 transition-transform"
        >
          <X size={24} strokeWidth={3} />
        </motion.button>
        <motion.button
          onClick={() => setExitDirection('down')}
          style={{
            scale: isTop && !exitDirection ? acceptScale : 1,
          }}
          className="w-20 h-20 flex items-center justify-center bg-brand-accent-green rounded-full shadow-neumorphism-green text-white active:scale-95 transition-transform"
        >
          <Check size={32} strokeWidth={3} />
        </motion.button>
      </div>
    </motion.div>
  );
}

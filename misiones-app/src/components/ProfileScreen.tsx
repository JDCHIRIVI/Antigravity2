import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, Flame, CheckCircle2, CircleDollarSign, 
  TrendingUp, Users, Medal, Award, Verified, Lock 
} from "lucide-react";
import avatarImg from "../assets/avatar.png";
import type { PlayerStats } from "../App";

type ProfileScreenProps = {
  stats: PlayerStats;
};

export default function ProfileScreen({ stats }: ProfileScreenProps) {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem("playerName") || "User");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(playerName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const finalName = tempName.trim() || 'User';
    setPlayerName(finalName);
    localStorage.setItem("playerName", finalName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="w-full max-w-[448px] h-full overflow-y-auto pb-40 px-6 font-sans scrollbar-hide">
      
      {/* Header Container */}
      <div className="bg-base-gray-200 mt-6 mb-8 w-full p-4 px-6 rounded-[24px] shadow-outset-md flex justify-between items-center">
        <h1 className="text-[18px] font-bold text-base-gray-800 tracking-[-0.45px]">
          Perfil
        </h1>
        
        <button 
          onClick={() => {
            setTempName(playerName);
            setIsEditing((prev) => !prev);
          }}
          className={`w-[40px] h-[40px] flex items-center justify-center rounded-full active:scale-95 transition-transform ${isEditing ? "shadow-inset-sm text-brand-accent-green" : "shadow-inset-sm text-base-gray-500"}`}
        >
          <Settings size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Hero Section: Avatar Profile & Streak */}
      <div className="flex w-full items-start justify-between mt-4">
        
        {/* Left: Avatar & Name */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-[128px] h-[128px] rounded-full p-2 bg-transparent shadow-outset-md border-4 border-base-gray-200 flex items-center justify-center relative">
             <div className="w-full h-full rounded-full overflow-hidden shadow-inset-sm">
               <img src={avatarImg} alt="User Avatar" className="w-full h-full object-cover" />
             </div>
          </div>
          
          <div className="mt-6 flex flex-col items-center text-center w-full px-2">
            {isEditing ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <input 
                  ref={inputRef}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tu Nombre"
                  spellCheck={false}
                  className="w-[130px] bg-base-gray-200 shadow-inset-md rounded-[16px] py-3 text-center font-bold text-[18px] text-base-gray-800 outline-none focus:ring-[3px] focus:ring-brand-accent-green/20 transition-all font-sans"
                />
                <button 
                  onClick={handleSave}
                  className="bg-base-gray-200 shadow-outset-md text-brand-accent-green font-bold text-[14px] px-6 py-2.5 rounded-full active:scale-95 transition-all"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <h2 className="font-extrabold text-[24px] text-base-gray-800 leading-none tracking-[-0.6px] max-w-[150px] break-words">
                {playerName}
              </h2>
            )}
            
            {!isEditing && (
              <p className="mt-2 text-[12px] font-bold text-base-gray-500 uppercase tracking-[1.2px] leading-tight max-w-[130px]">
                Rango: Arquitecto del caos
              </p>
            )}
          </div>
        </div>

        {/* Right: Streak Meter */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-[145px] h-[145px] rounded-full shadow-inset-sm flex items-center justify-center p-8 relative">
             <div className="w-full h-full absolute inset-0 m-auto flex items-center justify-center rounded-full shadow-outset-md bg-base-gray-200">
                <Flame size={40} className={stats.streak > 0 ? "text-brand-accent-orange -mt-2" : "text-base-gray-500 -mt-2 opacity-50"} strokeWidth={2} />
             </div>
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <span className="font-extrabold text-[48px] text-base-gray-800 leading-none">
              <motion.span key={stats.streak} initial={{ scale: 1.5, color: '#f97316' }} animate={{ scale: 1, color: '#2e3335' }}>
                {stats.streak}
              </motion.span>
            </span>
            <span className="mt-1 text-[10px] font-bold text-base-gray-500 uppercase tracking-[1px]">
              Días en racha
            </span>
          </div>
        </div>

      </div>

      {/* Stats Panel (Grid) */}
      <div className="mt-10 grid grid-cols-2 gap-6 w-full">
        
        {/* Missions Completed */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <CheckCircle2 className="text-brand-accent-green mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">
             <motion.span key={stats.completed} initial={{ scale: 1.5, color: '#22c55e' }} animate={{ scale: 1, color: '#2e3335' }}>
                {stats.completed}
             </motion.span>
          </span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Misiones Cumplidas</span>
        </div>

        {/* Chaos Coins */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <CircleDollarSign className="text-brand-accent-yellow mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">
             <motion.span key={stats.chaosCoins} initial={{ scale: 1.5, color: '#eab308' }} animate={{ scale: 1, color: '#2e3335' }}>{stats.chaosCoins}</motion.span>
          </span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Chaos Coins</span>
        </div>

        {/* Level */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <TrendingUp className="text-brand-accent-red mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">
             <motion.span key={stats.level} initial={{ scale: 1.5, color: '#ef4444' }} animate={{ scale: 1, color: '#2e3335' }}>{stats.level}</motion.span>
          </span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Nivel Actual</span>
        </div>

        {/* Community */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <Users className="text-[#3b82f6] mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">
             <span>{stats.community}</span>
          </span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Comunidad</span>
        </div>

      </div>

      {/* Recent Achievements */}
      <div className="mt-10 mb-8 w-full">
        <h3 className="text-[12px] font-bold text-base-gray-500 uppercase tracking-[1.2px] mb-4 pl-2">
          Logros Recientes
        </h3>
        
        <div className="w-full h-[80px] rounded-full shadow-inset-sm px-6 flex items-center justify-around overflow-visible">
          
          {[
            { 
              visible: stats.completed > 0, 
              text: "Iniciador del Caos: Cumpliste tu primera misión.", 
              icon: <Medal size={20} className={stats.completed > 0 ? "text-brand-accent-orange" : "text-base-gray-500"} />
            },
            { 
              visible: stats.rejections >= 10, 
              text: "Mirofóbico: Rechazaste 10 misiones seguidas.", 
              icon: <Award size={20} className={stats.rejections >= 10 ? "text-[#3b82f6]" : "text-base-gray-500"} />
            },
            { 
              visible: stats.lies >= 3, 
              text: "Mentiroso Compulsivo: Engañaste al hada madrina 3 veces.", 
              icon: <Verified size={20} className={stats.lies >= 3 ? "text-brand-accent-green" : "text-base-gray-500"} />
            },
            { 
              visible: stats.level >= 10, 
              text: stats.level >= 10 ? "Trascendido: Superaste el nivel 10." : "Cerrado: Desbloquea al llegar a Nivel 10.", 
              icon: <Lock size={20} className={stats.level >= 10 ? "text-brand-accent-yellow" : "text-base-gray-500"} />
            }
          ].map((achv, idx) => (
             <div key={idx} className={`w-[48px] h-[48px] rounded-full bg-base-gray-200 shadow-outset-md flex items-center justify-center relative group ${achv.visible ? '' : 'opacity-40'} transition-opacity`}>
                {achv.icon}
                <div className="absolute bottom-full mb-4 hidden group-hover:block group-active:block w-36 bg-base-gray-200 shadow-neumorphism rounded-[16px] p-3 border border-white/40 z-[100] text-center">
                   <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-base-gray-200 rotate-45 pointer-events-none"></div>
                   <span className="relative text-[11px] font-extrabold text-base-gray-800 leading-tight block z-10">{achv.text}</span>
                </div>
             </div>
          ))}

        </div>
      </div>

    </div>
  );
}

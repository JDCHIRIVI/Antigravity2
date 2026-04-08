import { 
  Settings, Flame, CheckCircle2, CircleDollarSign, 
  TrendingUp, Users, Medal, Award, Verified, Lock 
} from "lucide-react";
import avatarImg from "../assets/avatar.png";

export default function ProfileScreen() {
  return (
    <div className="w-full max-w-[448px] h-full overflow-y-auto pb-40 px-6 font-sans scrollbar-hide">
      
      {/* Header Container */}
      <div className="bg-base-gray-200 mt-6 mb-8 w-full p-4 px-6 rounded-[24px] shadow-outset-md flex justify-between items-center">
        <h1 className="text-[18px] font-bold text-base-gray-800 tracking-[-0.45px]">
          Perfil
        </h1>
        
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full shadow-inset-sm text-base-gray-500 active:scale-95 transition-transform">
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
          
          <div className="mt-6 flex flex-col items-center text-center">
            <h2 className="font-extrabold text-[24px] text-base-gray-800 leading-none tracking-[-0.6px]">
              User
            </h2>
            <p className="mt-2 text-[12px] font-bold text-base-gray-500 uppercase tracking-[1.2px] leading-tight max-w-[130px]">
              Rango: Arquitecto del caos
            </p>
          </div>
        </div>

        {/* Right: Streak Meter */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-[145px] h-[145px] rounded-full shadow-inset-sm flex items-center justify-center p-8 relative">
             <div className="w-full h-full absolute inset-0 m-auto flex items-center justify-center rounded-full shadow-outset-md bg-base-gray-200">
                <Flame size={40} className="text-brand-accent-orange -mt-2" strokeWidth={2} />
             </div>
          </div>

          <div className="mt-4 flex flex-col items-center text-center">
            <span className="font-extrabold text-[48px] text-base-gray-800 leading-none">
              14
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
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">42</span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Misiones Cumplidas</span>
        </div>

        {/* Chaos Coins */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <CircleDollarSign className="text-brand-accent-yellow mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">850</span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Chaos Coins</span>
        </div>

        {/* Level */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <TrendingUp className="text-brand-accent-red mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">12</span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Nivel Actual</span>
        </div>

        {/* Community */}
        <div className="bg-transparent shadow-outset-md rounded-[48px] p-6 flex flex-col items-center justify-center">
          <Users className="text-[#3b82f6] mb-2" size={24} strokeWidth={2.5} />
          <span className="font-bold text-[24px] text-base-gray-800 leading-none">312</span>
          <span className="mt-2 text-[10px] font-bold text-base-gray-500 uppercase tracking-[0.5px] text-center">Comunidad</span>
        </div>

      </div>

      {/* Recent Achievements */}
      <div className="mt-10 mb-8 w-full">
        <h3 className="text-[12px] font-bold text-base-gray-500 uppercase tracking-[1.2px] mb-4 pl-2">
          Logros Recientes
        </h3>
        
        <div className="w-full h-[80px] rounded-full shadow-inset-sm px-8 flex items-center justify-between">
          
          <div className="w-[48px] h-[48px] rounded-full bg-base-gray-200 shadow-outset-md flex items-center justify-center">
             <Medal size={20} className="text-brand-accent-orange" />
          </div>
          
          <div className="w-[48px] h-[48px] rounded-full bg-base-gray-200 shadow-outset-md flex items-center justify-center">
             <Award size={20} className="text-[#3b82f6]" />
          </div>

          <div className="w-[48px] h-[48px] rounded-full bg-base-gray-200 shadow-outset-md flex items-center justify-center">
             <Verified size={20} className="text-brand-accent-green" />
          </div>

          <div className="w-[48px] h-[48px] rounded-full bg-base-gray-200 shadow-outset-md flex items-center justify-center opacity-40">
             <Lock size={20} className="text-base-gray-500" />
          </div>

        </div>
      </div>

    </div>
  );
}

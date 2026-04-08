import { useState, useEffect } from "react";
import { Camera, Hourglass, XCircle } from "lucide-react";

type MissionListItemProps = {
  title: string;
  subtitle: string;
  description: string;
  IconComponent: React.ElementType;
  acceptedAt: number;
  manuallyFailed?: boolean;
  onFail: () => void;
};

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function MissionListItem({ title, subtitle, description, IconComponent, acceptedAt, manuallyFailed, onFail }: MissionListItemProps) {
  const TWELVE_HOURS = 12 * 3600 * 1000;
  
  const [timeLeft, setTimeLeft] = useState(() => 
    Math.max(0, Math.floor((TWELVE_HOURS - (Date.now() - acceptedAt)) / 1000))
  );

  useEffect(() => {
    if (timeLeft <= 0 || manuallyFailed) return;
    
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((TWELVE_HOURS - (Date.now() - acceptedAt)) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [acceptedAt, timeLeft, TWELVE_HOURS, manuallyFailed]);

  const isFallida = manuallyFailed || timeLeft <= 0;
  const isWarning = timeLeft < 900 && !isFallida; // Less than 15 minutes left

  // Calculate generic progress just for visual fill based on passed time
  const passedTimePercent = ((12 * 3600) - timeLeft) / (12 * 3600) * 100;

  return (
    <div className={`relative w-full bg-base-gray-200 shadow-neumorphism rounded-[48px] p-6 flex flex-col gap-6 font-sans transition-all duration-300 ${isFallida ? "opacity-60 grayscale-[30%]" : ""}`}>
      
      {/* Sello de Misión Fallida */}
      {isFallida && (
        <div className="absolute inset-0 m-auto w-10/12 h-20 border-4 border-brand-accent-red rounded-[20px] flex items-center justify-center transform -rotate-6 z-20 pointer-events-none shadow-outset-md bg-base-gray-200/40 backdrop-blur-[2px]">
          <XCircle size={32} className="text-brand-accent-red mr-3" strokeWidth={2.5}/>
          <span className="font-extrabold text-[28px] text-brand-accent-red uppercase tracking-[4px]">Fallida</span>
        </div>
      )}

      {/* Header: Title and Icon */}
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col pr-4">
          <h2 className={`font-bold text-[20px] leading-[1.25] text-left ${isFallida ? "text-base-gray-500 line-through" : "text-base-gray-800"}`}>
            {title} {subtitle}
          </h2>
          <p className="mt-2 text-[14px] font-medium text-base-gray-500 leading-[1.5]">
            {description}
          </p>
        </div>
        <div className={`shrink-0 mt-1 ${isWarning || isFallida ? "text-brand-accent-red" : "text-brand-accent-green"}`}>
          <IconComponent size={22} strokeWidth={2.5} />
        </div>
      </div>

      {/* Timer Section */}
      <div className={`w-full shadow-inset-sm rounded-full px-6 py-4 flex items-center justify-between ${isFallida ? "bg-base-gray-300/50" : ""}`}>
        
        <div className={`flex flex-col items-center justify-center font-mono font-bold tracking-[1.8px] text-[18px] w-24 ${isFallida || isWarning ? "text-[#9f403d]" : "text-[#005f2e]"}`}>
          <span><Hourglass size={16} strokeWidth={3} className="mb-1 opacity-70" /></span>
          <span className="leading-tight">{formatTime(timeLeft)}</span>
        </div>

        {/* Custom Progress Bar matching design */}
        <div className="flex-1 bg-[#dee3e4] h-[8px] rounded-full mx-4 shadow-inset-sm overflow-hidden flex items-center">
           {/* If warning or failed, we show a red/coral bg */}
           <div 
             className={`h-full rounded-full transition-all duration-1000 ${isWarning || isFallida ? "bg-[#fe8983]" : "bg-[#75ec98]"}`} 
             style={{ width: `${isFallida ? 100 : passedTimePercent}%` }} 
           />
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex justify-between w-full items-center pl-2 ${isFallida ? 'pointer-events-none opacity-50' : ''}`}>
        <button className="flex items-center gap-2 bg-base-gray-200 px-6 py-3 rounded-full shadow-neumorphism text-brand-accent-green font-bold text-[16px] leading-[1.2] active:scale-95 transition-transform text-left">
          <Camera size={18} strokeWidth={2.5} />
          <span>Subir<br/>Evidencia</span>
        </button>

        <button 
          onClick={onFail}
          className="flex items-center justify-center font-semibold text-[14px] text-base-gray-500 bg-transparent active:scale-95 transition-transform"
        >
          Acobardarse
        </button>
      </div>

    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MissionListItem from "./MissionListItem";
import avatarImg from "../assets/avatar.png";
import type { AcceptedMission } from "../App";

type Props = {
  acceptedMissions: AcceptedMission[];
  onFailMission: (id: number, acceptedAt: number) => void;
  onCompleteMission: (id: number, acceptedAt: number) => void;
  onLie: () => void;
};

export default function MissionListScreen({ acceptedMissions, onFailMission, onCompleteMission, onLie }: Props) {
  const [now, setNow] = useState(Date.now());
  const [completingMission, setCompletingMission] = useState<AcceptedMission | null>(null);

  // Force re-render periodically so that if a mission fails while viewing the list, it drops to the bottom
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const TWELVE_HOURS = 12 * 3600 * 1000;

  const sortedMissions = [...acceptedMissions].sort((a, b) => {
    const aFailed = a.manuallyFailed || (!a.cumplida && now - a.acceptedAt >= TWELVE_HOURS);
    const bFailed = b.manuallyFailed || (!b.cumplida && now - b.acceptedAt >= TWELVE_HOURS);
    
    // Sort logic: Active > Completed > Failed
    const scoreA = aFailed ? -1 : (a.cumplida ? 0 : 1);
    const scoreB = bFailed ? -1 : (b.cumplida ? 0 : 1);

    if (scoreA !== scoreB) return scoreB - scoreA;
    return b.acceptedAt - a.acceptedAt; // Newest first
  });

  return (
    <>
      <div className="w-full max-w-[448px] h-full overflow-y-auto pb-40 px-6 font-sans scrollbar-hide flex flex-col relative z-0">
        
        {/* Header element */}
        <div className="bg-base-gray-200 mt-6 mb-8 w-full p-4 px-6 rounded-full shadow-neumorphism flex justify-between items-center shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[30px] font-bold text-brand-accent-green leading-[1.2] tracking-[-0.75px]">
              Agenda del Caos
            </h1>
            <p className="text-[14px] font-medium text-base-gray-500">
              El reloj no perdona
            </p>
          </div>
          
          {/* Avatar Profile */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden shadow-inset-sm flex-shrink-0 relative bg-[#dee3e4]">
            <img src={avatarImg} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* List Container */}
        <div className="flex flex-col gap-8 w-full relative z-10">
          {sortedMissions.length === 0 ? (
            <div className="text-center font-bold text-base-gray-500 mt-10">
              No tienes misiones aceptadas aún. ¡Ve a buscar!
            </div>
          ) : (
            sortedMissions.map((mission) => (
              <MissionListItem 
                key={`${mission.id}-${mission.acceptedAt}`}
                title={mission.title}
                subtitle={mission.subtitle}
                description={mission.description}
                IconComponent={mission.IconComponent}
                acceptedAt={mission.acceptedAt}
                manuallyFailed={mission.manuallyFailed}
                cumplida={mission.cumplida}
                onFail={() => onFailMission(mission.id, mission.acceptedAt)}
                onCompleteRequest={() => setCompletingMission(mission)}
              />
            ))
          )}
        </div>
      </div>

      {/* Pop-up Global de Detector de Mentiras */}
      <AnimatePresence>
        {completingMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-base-gray-200/80 backdrop-blur-md flex justify-center items-center px-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-base-gray-200 shadow-outset-lg rounded-[48px] p-8 max-w-[360px] w-full flex flex-col items-center text-center font-sans border-t border-white/40"
            >
              <h2 className="font-extrabold text-[22px] text-base-gray-800 leading-tight mb-2">
                ¿Estás diciendo la verdad?
              </h2>
              <p className="font-medium text-[16px] text-base-gray-500 leading-snug">
                Si mientes, un hada madrina se pondrá muy triste 🧚✨
              </p>
              
              <div className="flex flex-col gap-5 mt-10 w-full">
                <button
                  onClick={() => {
                    onCompleteMission(completingMission.id, completingMission.acceptedAt);
                    setCompletingMission(null);
                  }}
                  className="bg-base-gray-200 shadow-outset-md text-brand-accent-green font-bold text-[16px] py-4 rounded-full active:scale-95 transition-all outline-none"
                >
                  Digo la verdad
                </button>
                <button
                  onClick={() => {
                    onLie();
                    setCompletingMission(null);
                  }}
                  className="bg-base-gray-200 shadow-inset-sm text-[#9f403d] font-bold text-[14px] py-4 px-2 tracking-tight rounded-full active:scale-95 transition-all outline-none"
                >
                  Me descubriste, estoy mintiendo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

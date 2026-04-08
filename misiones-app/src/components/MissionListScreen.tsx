import { useState, useEffect } from "react";
import MissionListItem from "./MissionListItem";
import avatarImg from "../assets/avatar.png";
import type { AcceptedMission } from "../App";

type Props = {
  acceptedMissions: AcceptedMission[];
  onFailMission: (id: number, acceptedAt: number) => void;
};

export default function MissionListScreen({ acceptedMissions, onFailMission }: Props) {
  const [now, setNow] = useState(Date.now());

  // Force re-render periodically so that if a mission fails while viewing the list, it drops to the bottom
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const TWELVE_HOURS = 12 * 3600 * 1000;

  const sortedMissions = [...acceptedMissions].sort((a, b) => {
    const aFailed = a.manuallyFailed || now - a.acceptedAt >= TWELVE_HOURS;
    const bFailed = b.manuallyFailed || now - b.acceptedAt >= TWELVE_HOURS;
    if (aFailed === bFailed) return b.acceptedAt - a.acceptedAt; // Newest first
    return aFailed ? 1 : -1;
  });

  return (
    <div className="w-full max-w-[448px] h-full overflow-y-auto pb-40 px-6 font-sans scrollbar-hide flex flex-col">
      
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
      <div className="flex flex-col gap-8 w-full">
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
              onFail={() => onFailMission(mission.id, mission.acceptedAt)}
            />
          ))
        )}
      </div>

    </div>
  );
}

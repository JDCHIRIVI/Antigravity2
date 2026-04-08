import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MissionCard from "./components/MissionCard";
import BottomNavigation from "./components/BottomNavigation";
import MissionListScreen from "./components/MissionListScreen";
import ProfileScreen from "./components/ProfileScreen";
import { getRandomMissions, type Mission } from "./data/missions";

export type AcceptedMission = Mission & { acceptedAt: number; manuallyFailed?: boolean };

function App() {
  const [activeTab, setActiveTab] = useState<"misiones" | "list" | "profile">("misiones");
  
  // Logical Functional State
  const [pendingMissions, setPendingMissions] = useState<Mission[]>([]);
  const [acceptedMissions, setAcceptedMissions] = useState<AcceptedMission[]>([]);

  useEffect(() => {
    // Fill or refill pool with all 31 elements randomized
    if (pendingMissions.length === 0) {
      setPendingMissions(getRandomMissions(31));
    }
  }, [pendingMissions.length]);

  const handleAccept = (mission: Mission) => {
    setAcceptedMissions(prev => [{ ...mission, acceptedAt: Date.now() }, ...prev]);
    setPendingMissions(prev => prev.slice(1)); // Remove the top one
  };

  const handleReject = () => {
    setPendingMissions(prev => prev.slice(1));
  };

  const handleFailMission = (id: number, acceptedAtTime: number) => {
    setAcceptedMissions(prev => prev.map(m => 
      (m.id === id && m.acceptedAt === acceptedAtTime) ? { ...m, manuallyFailed: true } : m
    ));
  };

  const visibleMissions = pendingMissions.slice(0, 3).map((mission, i) => ({
    ...mission,
    indexInStack: i
  })).reverse(); // Reverse for DOM stacking

  return (
    <div className={`relative w-full min-h-screen overflow-hidden flex flex-col items-center p-0`}>
      {/* Contenedor condicional para la vista principal de Swipe */}
      <div 
        className={`relative w-full max-w-[448px] h-[calc(100vh-140px)] max-h-[726px] mt-[10px] z-10 flex justify-center pt-[23px] pb-[13px] px-[24px] ${activeTab === 'misiones' ? 'block' : 'hidden'}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {activeTab === 'misiones' && visibleMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              title={mission.title}
              subtitle={mission.subtitle}
              description={mission.description}
              tags={mission.tags}
              difficulty={mission.difficulty}
              rewards={mission.rewards}
              progress={mission.progress}
              indexInStack={mission.indexInStack}
              onAccept={() => handleAccept(mission)}
              onReject={handleReject}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Contenedor de la Lista */}
      {activeTab === 'list' && (
        <MissionListScreen 
          acceptedMissions={acceptedMissions} 
          onFailMission={handleFailMission}
        />
      )}

      {/* Contenedor de Perfil */}
      {activeTab === 'profile' && <ProfileScreen />}
      
      <BottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}

export default App;

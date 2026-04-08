import { Flame, List, User } from "lucide-react";

type NavigationProps = {
  activeTab: "misiones" | "list" | "profile";
  onChangeTab: (tab: "misiones" | "list" | "profile") => void;
};

export default function BottomNavigation({ activeTab, onChangeTab }: NavigationProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex h-16 w-11/12 max-w-[400px] items-center px-2 rounded-[30px] shadow-inset-sm bg-base-gray-200 z-50">
      <div className="flex w-full items-center justify-between">
        <button 
          onClick={() => onChangeTab("misiones")} 
          className={`flex flex-1 items-center justify-center h-12 rounded-full transition-all duration-300 ${activeTab === "misiones" ? "shadow-neumorphism bg-brand-accent-orange text-white" : "text-base-gray-500"}`}
        >
          <Flame className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onChangeTab("list")} 
          className={`flex flex-1 items-center justify-center h-12 rounded-full transition-all duration-300 ${activeTab === "list" ? "shadow-neumorphism bg-[#64748b] text-white" : "text-base-gray-500"}`}
        >
          <List className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onChangeTab("profile")} 
          className={`flex flex-1 items-center justify-center h-12 rounded-full transition-all duration-300 ${activeTab === "profile" ? "shadow-neumorphism bg-[#60a5fa] text-white" : "text-base-gray-500"}`}
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

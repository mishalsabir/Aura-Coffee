import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
      <div className="px-5 py-2.5 rounded-full bg-[#18110d]/95 border border-aura-gold/50 shadow-2xl backdrop-blur-xl flex items-center space-x-2.5 text-aura-cream text-xs font-medium tracking-wide">
        <Sparkles className="w-4 h-4 text-aura-gold shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};


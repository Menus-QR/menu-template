import React, { createContext, useState, ReactNode, useContext } from 'react';

interface MenuContextType {
  selectedVideoId: string | null;
  setSelectedVideoId: (id: string | null) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <MenuContext.Provider value={{ selectedVideoId, setSelectedVideoId }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext(): MenuContextType {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
}

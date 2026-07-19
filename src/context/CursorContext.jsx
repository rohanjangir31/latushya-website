import { createContext, useContext, useState, useEffect } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'view', 'hidden'

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

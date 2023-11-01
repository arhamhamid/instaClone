// AppContext.js
import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null);

  return (
    <AppContext.Provider
      value={{ currentUserUid, setCurrentUserUid, currentUserName, setCurrentUserName }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

import { SERVER_URL } from '@env';
import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

// Create a context with a default value of null
const SocketContext = createContext<Socket | null>(null);

// Create a provider component
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useMemo(() => io(SERVER_URL), []);
  const {user} = useAuth();

  React.useEffect(() => {
    socket.on('connect', () => {
      socket.emit('registerUser', user.id);
    });

    return () => {
      socket.off('userStatusChanged');
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = (): Socket => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

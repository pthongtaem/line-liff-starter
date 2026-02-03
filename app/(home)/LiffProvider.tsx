import liff, { Liff } from '@line/liff';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AppContextType {
  liffObject: Liff | null;
  liffError: string | null;
}

// 1. สร้าง Context พร้อมกำหนด Type
// กำหนดค่าเริ่มต้นเป็น undefined เพื่อใช้ตรวจสอบใน Hook
const AppContext = createContext<AppContextType | undefined>(undefined);

// 2. สร้าง Provider Component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log('start liff.init()...');
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
      .then(() => {
        console.log('liff.init() done');
        setLiffObject(liff);
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.NEXT_PUBLIC_LIFF_ID) {
          console.info(
            'LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.',
          );
        }
        setLiffError(error.toString());
      });
  }, []);

  const value: AppContextType = {
    liffObject,
    liffError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

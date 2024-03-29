import { createContext, useState } from 'react';

const AuthContext = createContext({});

const initialState = {
  userProfile: false
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [multiData, setMultiData] = useState({});
  const setMultiValues = (values) => {
    setMultiData((prev) => ({
      ...prev,
      ...values
    }));
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        persist,
        setPersist,
        currentStep,
        setCurrentStep,
        multiData,
        setMultiValues,
        setMultiData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

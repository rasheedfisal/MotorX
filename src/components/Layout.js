import { Outlet, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
//import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '.';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Layout = () => {
  const { pathname } = useLocation();
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useAuth();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 10 }
  };
  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.5
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          {/* <TooltipComponent content="Settings" position="Top"> */}
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: '50%' }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>
          {/* </TooltipComponent> */}
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
          >
            {themeSettings && <ThemeSettings />}
            {/* Route Children Inheretance */}
            <Outlet />
          </motion.div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;

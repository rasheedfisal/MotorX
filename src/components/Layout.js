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

  const variants = {
    inactive: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    out: {
      opacity: 0,
      y: -100,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    in: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex h-screen antialiased dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          {/* <div className="flex-1 h-full overflow-x-hidden overflow-y-auto"> */}
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
            {/* <div className="flex-shrink-0 hidden w-72 border-r md:block sidebar dark:bg-secondary-dark-bg bg-white "> */}
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
          {/* <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full"> */}
          <div className="flex-1 bg-main-bg dark:bg-main-dark-bg">
            <div class="px-4 py-4 lg:py-6">
              <Navbar />
            </div>
            <motion.div
              key={pathname}
              initial="in"
              animate="inactive"
              exit="out"
              variants={variants}
              // initial="initial"
              // animate="in"
              // variants={pageVariants}
              //transition={pageTransition}
            >
              {themeSettings && <ThemeSettings />}
              {/* Route Children Inheretance */}
              <Outlet />
            </motion.div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

import { IconContext } from 'react-icons/lib';
import useAuth from '../hooks/useAuth';

import React from 'react';

function ColoredIcons({ icon, size }) {
  const { currentColor } = useAuth();
  return (
    <IconContext.Provider value={{ color: currentColor, size: size }}>
      <div>{icon}</div>
    </IconContext.Provider>
  );
}

export default ColoredIcons;

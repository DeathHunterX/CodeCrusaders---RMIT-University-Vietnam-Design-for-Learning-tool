import React from 'react'
import { IconContext } from 'react-icons/lib';

export function IconSetting(icon, color, size) {
    return (
      <IconContext.Provider
        value={{ color: color}}
      >
        {icon}
      </IconContext.Provider>
    );
}
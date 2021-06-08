// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

export type MenuId = null | 'item' | 'main';

type MenuType = {
  id: MenuId,
  close: () => void,
  open: (id, anchorEl: HTMLElement) => void,
  anchorEl: HTMLElement | null,
};

const defaultMenu: MenuType = {
  id: null,
  close: () => void 0,
  open: () => void 0,
  anchorEl: null,
};
export const MenuContext = React.createContext<MenuType>(defaultMenu);

// eslint-disable-next-line
export default function MenuProvider({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const idRef = React.useRef(null);
  const open = useAutoCallback((id, anchorEl) => {
    idRef.current = id;
    setAnchorEl(anchorEl);
  });
  const close = useAutoCallback(() => {
    idRef.current = null;
    setAnchorEl(null);
  });

  return (
    <MenuContext.Provider
      value={useAutoMemo({
        id: idRef.current,
        open,
        close,
        anchorEl,
      })}
    >
      {children}
    </MenuContext.Provider>
  );
}

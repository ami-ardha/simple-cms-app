'use client';

import React, { useCallback, useEffect, useState } from 'react';

const encrypt = (text: string): string => {
  return btoa(text);
};

const decrypt = (ciphertext: string): string => {
  try {
    return atob(ciphertext);
  } catch (error) {
    console.error('Failed to decrypt data from localStorage', error);
    return '';
  }
};

interface MenuItem {
  id: string;
  name: string;
}

interface MenuGroup {
  id: string;
  name: string;
  menus: MenuItem[];
}

type InitialValueProps = {
  menuGroups: MenuGroup[];
  addMenuGroup: (name: string) => void;
  removeMenuGroup: (groupId: string) => void;
  addMenuItem: (groupId: string, itemName: string) => void;
  removeMenuItem: (groupId: string, itemId: string) => void;
};

const initialValue: InitialValueProps = {
  menuGroups: [],
  addMenuGroup: () => undefined,
  removeMenuGroup: () => undefined,
  addMenuItem: () => undefined,
  removeMenuItem: () => undefined,
};

const CMSContext = React.createContext(initialValue);

const useCMSContext = () => {
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const savedData = window.localStorage.getItem('cmsMenuGroups');
    if (savedData) {
      try {
        const decryptedData = decrypt(savedData);
        return JSON.parse(decryptedData);
      } catch (error) {
        console.error('Failed to parse menu groups from localStorage', error);
        return [];
      }
    }
    return [
      {
        id: 'group-1',
        name: 'Manajemen Konten',
        menus: [
          { id: 'menu-1-1', name: 'Artikel' },
          { id: 'menu-1-2', name: 'Kategori' },
        ],
      },
    ];
  });

  useEffect(() => {
    try {
      const stringifiedData = JSON.stringify(menuGroups);
      const encryptedData = encrypt(stringifiedData);
      window.localStorage.setItem('cmsMenuGroups', encryptedData);
    } catch (error) {
      console.error('Failed to save menu groups to localStorage', error);
    }
  }, [menuGroups]);

  console.log('menuGroups updated:', menuGroups);

  const addMenuGroup = useCallback((name: string) => {
    if (name.trim() === '') return;
    const newGroup: MenuGroup = { id: `group-${Date.now()}`, name, menus: [] };
    setMenuGroups((prevGroups) => [...prevGroups, newGroup]);
  }, []);

  const removeMenuGroup = useCallback((groupId: string) => {
    setMenuGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  }, []);

  const addMenuItem = useCallback((groupId: string, itemName: string) => {
    if (itemName.trim() === '') return;
    setMenuGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              menus: [
                ...group.menus,
                { id: `menu-${Date.now()}`, name: itemName },
              ],
            }
          : group
      )
    );
  }, []);

  const removeMenuItem = useCallback((groupId: string, itemId: string) => {
    setMenuGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              menus: group.menus.filter((menu) => menu.id !== itemId),
            }
          : group
      )
    );
  }, []);

  return {
    menuGroups,
    addMenuGroup,
    removeMenuGroup,
    addMenuItem,
    removeMenuItem,
  };
};

const CMSProvider = (props: { children: React.ReactNode }) => {
  const { Provider } = CMSContext;
  const hookValue = useCMSContext();
  return <Provider value={hookValue}>{props.children}</Provider>;
};

export { CMSContext, CMSProvider };

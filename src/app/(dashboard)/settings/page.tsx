'use client';

import { CMSContext } from '@/context/cmsContext';
import React, { useState, useEffect, FC, useContext } from 'react';

const SettingsPage: FC = () => {
  const {
    menuGroups,
    addMenuGroup,
    removeMenuGroup,
    addMenuItem,
    removeMenuItem,
  } = useContext(CMSContext);

  const [newGroupName, setNewGroupName] = useState('');
  const [newMenuName, setNewMenuName] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState(
    menuGroups.length > 0 ? menuGroups[0].id : ''
  );

  useEffect(() => {
    if (
      menuGroups.length > 0 &&
      !menuGroups.find((group) => group.id === selectedGroupId)
    ) {
      setSelectedGroupId(menuGroups[0].id);
    }
  }, [menuGroups, selectedGroupId]);

  const handleAddGroup = () => {
    if (newGroupName.trim() === '') return;
    addMenuGroup(newGroupName.trim());
    setNewGroupName('');
  };

  const handleRemoveGroup = (groupId: string) => {
    removeMenuGroup(groupId);
  };

  const handleAddMenu = () => {
    if (newMenuName.trim() === '' || selectedGroupId === '') return;
    addMenuItem(selectedGroupId, newMenuName.trim());
    setNewMenuName('');
  };

  const handleRemoveMenu = (groupId: string, menuId: string) => {
    removeMenuItem(groupId, menuId);
  };

  return (
    <div className="max-w-4xl font-sans">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-background-dark rounded-lg border p-4">
            <h2 className="mb-3 text-xl font-semibold">Add New Menu Group</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g., Laporan"
                className="flex-grow rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddGroup}
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Add Group
              </button>
            </div>
          </div>
          <div className="bg-background-dark rounded-lg border p-4 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">Add New Menu</h2>
            <div className="space-y-3">
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={menuGroups.length === 0}
              >
                {menuGroups.length > 0 ? (
                  menuGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))
                ) : (
                  <option>No groups available</option>
                )}
              </select>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  placeholder="e.g., Laporan Penjualan"
                  className="flex-grow rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={menuGroups.length === 0}
                />
                <button
                  onClick={handleAddMenu}
                  className={`rounded-md px-4 py-2 text-white transition ${menuGroups.length === 0 ? 'cursor-not-allowed bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                  disabled={menuGroups.length === 0}
                >
                  Add Menu
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background-dark rounded-lg border p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Existing Menus</h2>
          <div className="space-y-4">
            {menuGroups.length > 0 ? (
              menuGroups.map((group) => (
                <div key={group.id} className="border-b pb-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                      {group.name}
                    </h3>
                    <button
                      onClick={() => handleRemoveGroup(group.id)}
                      className="text-sm font-semibold text-red-500 hover:text-red-700"
                    >
                      Remove Group
                    </button>
                  </div>
                  <ul className="list-disc space-y-1 pl-5">
                    {group.menus.map((menu) => (
                      <li
                        key={menu.id}
                        className="flex items-center justify-between text-gray-600 dark:text-gray-400"
                      >
                        <span>{menu.name}</span>
                        <button
                          onClick={() => handleRemoveMenu(group.id, menu.id)}
                          className="text-xs font-medium text-gray-400 hover:text-red-600"
                        >
                          remove
                        </button>
                      </li>
                    ))}
                    {group.menus.length === 0 && (
                      <p className="text-sm text-gray-400 italic">
                        No menus in this group.
                      </p>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No menu groups have been added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

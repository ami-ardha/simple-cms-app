'use client';

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CMSContext } from '@/context/cmsContext';
import {
  SCH_AddGroup,
  AddGroupFormInputs,
  SCH_AddMenu,
  AddMenuFormInputs,
} from '../model/schema';
import { addGroupFormFields, addMenuFormFields } from '../model/constants';
import InputField from '@/shared/ui/InputField';
import Button from '@/shared/ui/Button';

export const SettingsForm = () => {
  const {
    menuGroups,
    addMenuGroup,
    removeMenuGroup,
    addMenuItem,
    removeMenuItem,
  } = useContext(CMSContext);

  const {
    register: registerGroup,
    handleSubmit: handleSubmitGroup,
    formState: { errors: errorsGroup },
    reset: resetGroupForm,
  } = useForm<AddGroupFormInputs>({
    resolver: zodResolver(SCH_AddGroup),
    mode: 'onBlur',
  });

  const onAddGroupSubmit = (data: AddGroupFormInputs) => {
    addMenuGroup(data.groupName);
    resetGroupForm();
  };

  const {
    register: registerMenu,
    handleSubmit: handleSubmitMenu,
    formState: { errors: errorsMenu },
    reset: resetMenuForm,
  } = useForm<AddMenuFormInputs>({
    resolver: zodResolver(SCH_AddMenu),
    mode: 'onBlur',
  });

  const onAddMenuSubmit = (data: AddMenuFormInputs) => {
    addMenuItem(data.groupId, data.menuName);
    resetMenuForm();
  };

  return (
    <div className="max-w-4xl font-sans">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <form
            onSubmit={handleSubmitGroup(onAddGroupSubmit)}
            className="dark:border-neutral-dark dark:bg-neutral-base rounded-lg border bg-white p-4 shadow-sm"
          >
            <h2 className="mb-3 text-xl font-semibold">Add New Menu Group</h2>
            <div className="flex items-start space-x-2">
              <div className="flex-grow">
                {addGroupFormFields.map((field) => (
                  <InputField
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    type="text"
                    placeholder={field.placeholder}
                    register={registerGroup(
                      field.name as keyof AddGroupFormInputs
                    )}
                    error={errorsGroup[field.name as keyof AddGroupFormInputs]}
                    className="p-2"
                  />
                ))}
              </div>
              <Button type="submit" variant={'link'} color={'primary'}>
                Add Group
              </Button>
            </div>
          </form>

          <form
            onSubmit={handleSubmitMenu(onAddMenuSubmit)}
            className="dark:border-neutral-dark dark:bg-neutral-base rounded-lg border bg-white p-4 shadow-sm"
          >
            <h2 className="mb-3 text-xl font-semibold">Add New Menu</h2>
            <div className="space-y-3">
              {addMenuFormFields.map((field) => {
                const fieldName = field.name as keyof AddMenuFormInputs;
                const error = errorsMenu[fieldName];

                switch (field.type) {
                  case 'select':
                    return (
                      <div key={fieldName}>
                        <select
                          {...registerMenu(fieldName)}
                          className="dark:border-neutral-light dark:bg-neutral-dark w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          disabled={menuGroups.length === 0}
                        >
                          <option value="">-- {field.label} --</option>
                          {menuGroups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                        </select>
                        {error && (
                          <p className="mt-1 font-bold text-red-600">
                            {error.message}
                          </p>
                        )}
                      </div>
                    );
                  case 'text':
                    return (
                      <div
                        key={fieldName}
                        className="flex items-start space-x-2"
                      >
                        <div className="flex-grow">
                          <InputField
                            id={fieldName}
                            label={field.label}
                            type="text"
                            placeholder={field.placeholder}
                            register={registerMenu(fieldName)}
                            error={error}
                            className="p-2"
                            disabled={menuGroups.length === 0}
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={menuGroups.length === 0}
                          variant={'link'}
                          color={'primary'}
                        >
                          Add Menu
                        </Button>
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </form>
        </div>

        <div className="dark:border-neutral-dark dark:bg-neutral-base rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Existing Menus</h2>
          <div className="space-y-4">
            {menuGroups.length > 0 ? (
              menuGroups.map((group) => (
                <div
                  key={group.id}
                  className="dark:border-neutral-light border-b pb-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold">{group.name}</h3>
                    <Button
                      variant="ghost"
                      color="danger"
                      className="!p-1 !text-sm"
                      onClick={() => removeMenuGroup(group.id)}
                    >
                      Remove Group
                    </Button>
                  </div>
                  <ul className="list-disc space-y-1 pl-5">
                    {group.menus.map((menu) => (
                      <li
                        key={menu.id}
                        className="flex items-center justify-between"
                      >
                        <span>{menu.name}</span>
                        <Button
                          variant="link"
                          color="secondary"
                          className="!p-1 !text-xs"
                          onClick={() => removeMenuItem(group.id, menu.id)}
                        >
                          remove
                        </Button>
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
              <p>No menu groups have been added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import clsx from 'clsx';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// Types
interface TabsContextType {
  activeTab: string | number;
  setActiveTab: (value: string | number) => void;
}

interface TabsProps {
  children: ReactNode;
  className?: string;
  defaultValue: string | number;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string | number;
  children: ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string | number;
  children: ReactNode;
  className?: string;
}

// Create Context
const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: FC<TabsProps> = ({ children, className, defaultValue }) => {
  const [activeTab, setActiveTab] = useState<string | number>(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={twMerge('w-full stacked flex-1 ', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

// Tab List
export const TabsList = ({ children, className }: TabsListProps) => {
  return <div className={twMerge('flex', className)}>{children}</div>;
};

// Tab Trigger
export const TabsTrigger = ({ value, className, children }: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs.Trigger must be used within a Tabs component');
  }
  const { activeTab, setActiveTab } = context;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={twMerge(
        clsx(
          'capitalize border px-4 py-2 text-sm font-medium transition-all -mb-2 grow-0 hover:bg-surface-1 active:bg-surface-3 hover:cursor-pointer min-w-24',
          activeTab === value
            ? 'surface-2 border-adjust hover:bg-surface-1 '
            : 'border-transparent dark:hover:surface-4 hover:bg-mid/30 hover:text-else'
        ),
        className
      )}
    >
      {children}
    </button>
  );
};

// Tab Content
export const TabsContent = ({ value, className, children }: TabsContentProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs.Content must be used within a Tabs component');
  }
  const { activeTab } = context;

  if (activeTab !== value) return null;

  return <div className={twMerge('w-full h-full ', className)}>{children}</div>;
};



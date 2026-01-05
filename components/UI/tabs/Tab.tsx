import clsx from 'clsx';
import { useState, createContext, useContext, ReactNode, FC } from 'react';
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

const Tabs: FC<TabsProps> & {
  List: FC<TabsListProps>;
  Trigger: FC<TabsTriggerProps>;
  Content: FC<TabsContentProps>;
} = ({ children, className, defaultValue }) => {
  const [activeTab, setActiveTab] = useState<string | number>(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={twMerge('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

// Tab List
Tabs.List = ({ children, className }: TabsListProps) => {
  return <div className={twMerge('flex', className)}>{children}</div>;
};

// Tab Trigger
Tabs.Trigger = ({ value, className, children }: TabsTriggerProps) => {
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
          'capitalize border px-4 py-2 text-sm font-medium transition-all -mb-2 flex-1',
          activeTab === value
            ? 'surface-2 border-adjust text-main dark:bg-blue-400/30'
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
Tabs.Content = ({ value, className, children }: TabsContentProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs.Content must be used within a Tabs component');
  }
  const { activeTab } = context;

  if (activeTab !== value) return null;

  return <div className={twMerge('w-full h-full p-6', className)}>{children}</div>;
};

export default Tabs;

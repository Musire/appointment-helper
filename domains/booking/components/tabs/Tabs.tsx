type TabsProps = {
    anchor: string;
    onChange: () => void;
}
export default function Tabs ({ anchor, onChange }: TabsProps) {
    const activeStyle = 'border-b-2 border-whitesmoke/87 text-whitesmoke/87'
    const inactiveStyle = 'text-whitesmoke/37 hover:text-whitesmoke/60'


    return (
        <span className="flex items-center space-x-4 ">
            <button 
                onClick={onChange}
                className={`px-3 py-2 transition-colors hover:cursor-pointer ${anchor === 'store' ? activeStyle : inactiveStyle}`}
            >
                Store
            </button>
            <p 
                className={`px-3 py-2 transition-colors hover:cursor-pointer ${anchor === 'staff' ? activeStyle : inactiveStyle}`}
            >
                Staff
            </p>
        </span>
    );
}
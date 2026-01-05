
type CardDisplayProps = {
    children: React.ReactNode,
    isEmpty: boolean
}

export default function CardDisplay({ children, isEmpty }: CardDisplayProps){
    
    if (isEmpty) {
        return (
        <ul className="w-full flex-1 grid place-items-center">
            <li>
                <p className="opacity-60">No items found</p>
            </li>
        </ul>
        );
    }
    
    return (
        <ul className=" w-full h-full grow p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-y-scroll max-h-[76dvh] scrollbar-none ">
            {children}
        </ul>
    );
}
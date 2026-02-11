
type StoreDetailsProps<T> = {
    view: 'stores' | 'details';
    data: T;
}

export default function StoreDetails<T> ({ view, data }: StoreDetailsProps<T>) {
    if (view !== 'details') return null;

    return (
        <div className="max-h-[67dvh] overflow-scroll scrollbar-none ">
            <pre className="">
                {JSON.stringify(data, null, 2)}
            </pre>
            
        </div>
    );
}
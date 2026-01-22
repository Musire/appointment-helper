import { ControlledInput } from "../UI";
import { DropdownButton } from "../UI/buttons";

export type StoreSelect = { 
    name: string; 
    id: string; 
}

export type StoreSelectionProps = {
    stores: StoreSelect[] | undefined
}


export default function AvailabilityStoreSelection ({ stores }: StoreSelectionProps) {
    return (
        <ControlledInput
            label="select store"
            name={'storeId'}
            children={(field) => (
                <DropdownButton  
                    options={stores?.map(c => c.name) ?? []}
                    value={
                        stores?.find(c => c.id === field.value)?.name ?? null
                    }
                    onChange={(selectedName) => {
                        const category = stores?.find(c => c.name === selectedName)
                        if (category) {
                            field.onChange(category.id)
                        }
                    }}
                />
            )}
        />
    );
}
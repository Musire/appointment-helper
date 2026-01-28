'use client';
import { ControlledInput, FormCheckbox } from "@/components/UI";
import { DropdownButton } from "@/components/UI/buttons";
import { X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export type TimeslotInputProps = {
    trigger: string;
}

export type SlotType = {
    id: string;
    from: string;
    to: string;
}

export default function TimeslotInput ({ trigger }: TimeslotInputProps) {
    const { watch, control } = useFormContext()
    const required = watch(`${trigger}.enabled`)

    const { append, remove } = useFieldArray({
        control,
        name: `${trigger}.slots`,
    });

    const addSlot = () => {
        append({
            id: crypto.randomUUID(),
            from: "",
            to: "",
        });
    };

    const removeSlot = (index: number) => {
        if (index === 0) return;
        remove(index);
    };
    
    return (
        <fieldset className="flex space-x-4 items-start"> 
            <FormCheckbox
                name={`${trigger}.enabled`}
                label={trigger}
            />
            {!required && <p className="">unavailable</p>}
            {required && (
                <div className="flex flex-col space-y-4 ">
                    {watch(`${trigger}.slots`)?.map((slot: SlotType, index: number) => (
                        <div key={slot.id} className="flex space-x-2 ">
                            <p className="mt-2">from</p>
                            <ControlledInput 
                                name={`${trigger}.slots.${index}.from`}
                                children={(field) => (
                                    <DropdownButton 
                                        buttonStyle="w-32"
                                        options={['1']}
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)} 
                                    />  
                                )}
                            />
                            <p className="mt-2">to</p>
                            <ControlledInput 
                                name={`${trigger}.slots.${index}.to`}
                                children={(field) => (
                                    <DropdownButton
                                        buttonStyle="w-32"
                                        options={['4']}
                                        value={field.value}
                                        onChange={(val) => field.onChange(val)} 
                                    />  
                                )}
                            />
                            {<button 
                                onClick={() => removeSlot(index)} 
                                type="button" 
                                className={`hover:cursor-pointer h-fit mt-2 
                                ${(index === 0) ? "invisible"  : ""}`}><X size={25} /></button>}
                        </div>
                    ))}
                    <button onClick={addSlot} type="button" className="hover:cursor-pointer">+ Add time range</button>
                </div>
            )}

        </fieldset>
    );
}
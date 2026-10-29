
'use client';

import { DropdownButton } from '@/components/ui';
import { OptionType } from '../usePoolFilters';

type Props = {
    options: OptionType[];
    selected: OptionType[];
    onSelect: (value: OptionType) => void;
};

export default function PoolFilter({
    options,
    selected,
    onSelect,
}: Props) {
    return (
        <DropdownButton<OptionType>
            options={options}
            selectedValues={selected}
            onChange={onSelect}
            multiple
            buttonStyle="w-48"
            drawerStyle="w-48"
        />
    );
}

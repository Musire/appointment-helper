'use client';

import { ActionForm } from '@/components/ui';
import { v4 as uuid } from 'uuid';

import { BusinessHoursFields } from '@/components/ui/forms/inputs/BusinessHoursFields';
import { SaveStoreAvailabilitySchema } from '@/domains/availability/availability.validations';
import { TimeBlock } from '@/domains/offering/offering.types';
import { saveBusinessHours } from '@/domains/store/store.actions';

type Props = {
  storeId: string;
  initialBlocks?: TimeBlock[];
};

export const DEFAULT_BLOCK = (): TimeBlock => ({
  id: uuid(),
  start: 540,
  end: 1020,
  days: [],
});

export default function AdminHourForm({
  storeId,
  initialBlocks,
}: Props) {
  const initialValues = {
    storeId,
    blocks: initialBlocks?.length
      ? initialBlocks
      : [DEFAULT_BLOCK()],
  };

  const onSuccess = () => {
    console.log('Business hours saved successfully');
  };

  return (
    <ActionForm
      schema={SaveStoreAvailabilitySchema}
      initialValues={initialValues}
      actionFn={saveBusinessHours}
      onSuccess={onSuccess}
    >
      <div className="stacked flex-1 overflow-hidden">
        <BusinessHoursFields />
      </div>
    </ActionForm>
  );
}

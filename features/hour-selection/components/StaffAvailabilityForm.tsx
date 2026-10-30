'use client';

import { ActionForm } from '@/components/ui';
import { v4 as uuid } from 'uuid';

import { BusinessHoursFields } from '@/components/ui/forms/inputs/BusinessHoursFields';
import { saveStoreAvailability } from '@/domains/availability/availability.actions';
import { TimeBlock } from '@/domains/offering/offering.types';
import { SaveStoreAvailabilitySchema } from '@/domains/availability/availability.validations';

type Props = {
  storeStaffId: string;
  initialBlocks?: TimeBlock[];
};

export const DEFAULT_BLOCK = (): TimeBlock => ({
  id: uuid(),
  start: 540,
  end: 1020,
  days: [],
});

export default function StaffAvailabilityForm({
  storeStaffId,
  initialBlocks,
}: Props) {
  const initialValues = {
    storeStaffId,
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
      actionFn={saveStoreAvailability}
      onSuccess={onSuccess}
    >
      <div className="stacked flex-1 overflow-hidden">
        <BusinessHoursFields />
      </div>
    </ActionForm>
  );
}

'use client';

import { ActionForm } from '@/components/ui';
import { v4 as uuid } from 'uuid';

import { BusinessHoursFields } from '@/components/ui/forms/inputs/BusinessHoursFields';
import { TimeBlock } from '@/domains/offering/offering.types';
import { saveBusinessHours } from '@/domains/store/store.actions';
import { saveBusinessHoursSchema } from '@/domains/store/store.validations';

type Props = {
  initialBlocks?: TimeBlock[];
};

export const DEFAULT_BLOCK = (): TimeBlock => ({
  id: uuid(),
  start: 540,
  end: 1020,
  days: [],
});

export default function BusinessHoursForm({
  initialBlocks,
}: Props) {
  const initialValues = {
    blocks: initialBlocks?.length
      ? initialBlocks
      : [DEFAULT_BLOCK()],
  };

  const onSuccess = () => {
    console.log('Business hours saved successfully');
  };

  return (
    <ActionForm
      schema={saveBusinessHoursSchema}
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

'use client';

import { ActionForm, Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { TimeBlock } from '@/domains/offering/offering.types';
import { saveBusinessHours } from '@/domains/store/store.actions';
import { saveBusinessHoursSchema } from '@/domains/store/store.validations';
import TimeBlockCard from './TimeBlockCard';

type Props = {
  initialBlocks?: TimeBlock[];
};

const DEFAULT_BLOCK = (): TimeBlock => ({
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
      <BusinessHoursFields />
    </ActionForm>
  );
}

function BusinessHoursFields() {
  const { control } = useFormContext<{ blocks: TimeBlock[] }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  });

  function addBlock() {
    append(DEFAULT_BLOCK());
  }

  return (
    <>
      <Button
        type="button"
        onClick={addBlock}
        className="centered size-10"
      >
        <Plus />
      </Button>

      {fields.map((block, index) => (
        <TimeBlockCard
          key={block.id}
          index={index}
          onDelete={() => remove(index)}
        />
      ))}
    </>
  );
}
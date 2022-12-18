import React from 'react';
import { useFieldArray } from 'react-hook-form';
import NestedFeatures from './NestedFeatures';

export default function MainFeatureTypes({
  control,
  register,
  setValue,
  getValues
}) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test'
  });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="flex flex-col">
            <h3 className="text-2xl underline">{item.typeName}</h3>
            <div className="flex items-center mb-4">
              <NestedFeatures nestIndex={index} {...{ control, register }} />
            </div>
          </div>
        );
      })}
    </>
  );
}

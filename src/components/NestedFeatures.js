import React from 'react';
import { useFieldArray } from 'react-hook-form';

const NestedFeatures = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `features[${nestIndex}].features`
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} className="flex items-center mb-4">
            <input
              name={`features[${nestIndex}].features[${k}].id`}
              ref={register()}
              type="checkbox"
              value={(e) => e.target.checked}
              defaultValue={item.isSelected}
              className="w-4 h-4 rounded"
            />
            <label
              htmlFor={`features[${nestIndex}].features[${k}].id`}
              className="ml-2 text-sm font-medium text-black"
            />
          </div>
        );
      })}
    </div>
  );
};

export default NestedFeatures;

// components/IconFields.tsx
import React from 'react';
import { useFieldArray, Control, RegisterOptions } from 'react-hook-form';
import { CoverPageData } from '@/types/coverpage';


interface IconFieldsProps {
  control: Control<CoverPageData['coverPage']>;
  register: any;
  watch: any;
}

const IconFields: React.FC<IconFieldsProps> = ({ control, register, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'icons',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Icon {index + 1}</h3>
          <div className="mb-2">
            <label className="block mb-1">Icon Class</label>
            <input
              {...register(`icons.${index}.iconClass` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., fas fa-wifi"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Alt Text</label>
            <input
              {...register(`icons.${index}.alt` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., Wi-Fi Icon"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Position Bottom (px or %)</label>
            <input
              {...register(`icons.${index}.position.bottom` as const)}
              className="w-full p-2 border rounded"
              type="text"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Position Left (px or %)</label>
            <input
              {...register(`icons.${index}.position.left` as const)}
              className="w-full p-2 border rounded"
              type="text"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Width</label>
            <input
              {...register(`icons.${index}.width` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., 24px"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove Icon
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            type: 'icon', // Add this line
            iconClass: '',
            alt: '',
            position: { bottom: '', left: '' },
            width: '',
          })
        }
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Icon
      </button>
    </div>
  );
};

export default IconFields;

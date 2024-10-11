// components/TextElementFields.tsx
import React from 'react';
import { useFieldArray, Control, Controller } from 'react-hook-form';
import { CoverPageData } from '@/types/coverpage';
import { SketchPicker } from 'react-color';

interface TextElementFieldsProps {
  control: Control<CoverPageData['coverPage']>;
  register: any;
  watch: any;
}

const TextElementFields: React.FC<TextElementFieldsProps> = ({ control, register, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'textElements',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Text Element {index + 1}</h3>
          <div className="mb-2">
            <label className="block mb-1">Content</label>
            <input
              {...register(`textElements.${index}.content` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Text Content"
            />
          </div>
          {/* Font Settings */}
          <div className="mb-2">
            <label className="block mb-1">Font Family</label>
            <input
              {...register(`textElements.${index}.font.family` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., Verdana, sans-serif"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Font Size</label>
            <input
              {...register(`textElements.${index}.font.size` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., 24px"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Font Weight</label>
            <input
              {...register(`textElements.${index}.font.weight` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., normal, bold"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Font Style</label>
            <input
              {...register(`textElements.${index}.font.style` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., normal, italic"
            />
          </div>
          {/* Position */}
          <div className="mb-2">
            <label className="block mb-1">Position Top</label>
            <input
              {...register(`textElements.${index}.position.top` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., 200px"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Position Left</label>
            <input
              {...register(`textElements.${index}.position.left` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., 40px"
            />
          </div>
          {/* Colors */}
          <div className="mb-2">
            <label className="block mb-1">Text Color</label>
            <Controller
              control={control}
              name={`textElements.${index}.color` as const}
              render={({ field }) => (
                <SketchPicker
                  color={field.value}
                  onChangeComplete={(color) => field.onChange(color.hex)}
                />
              )}
            />
          </div>
          {/* Text Alignment */}
          <div className="mb-2">
            <label className="block mb-1">Text Align</label>
            <select
              {...register(`textElements.${index}.textAlign` as const)}
              className="w-full p-2 border rounded"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          {/* Z-Index */}
          <div className="mb-2">
            <label className="block mb-1">Z-Index</label>
            <input
              {...register(`textElements.${index}.zIndex` as const)}
              className="w-full p-2 border rounded"
              type="number"
              min="0"
            />
          </div>
          {/* Opacity */}
          <div className="mb-2">
            <label className="block mb-1">Opacity</label>
            <input
              {...register(`textElements.${index}.opacity` as const)}
              className="w-full p-2 border rounded"
              type="number"
              step="0.1"
              min="0"
              max="1"
            />
          </div>
          {/* Max Width */}
          <div className="mb-2">
            <label className="block mb-1">Max Width</label>
            <input
              {...register(`textElements.${index}.maxWidth` as const)}
              className="w-full p-2 border rounded"
              type="text"
              placeholder="e.g., 300px"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Remove Text Element
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            content: '',
            font: { family: '', size: '', weight: '', style: '' },
            position: { top: '', left: '' },
            color: '#000000',
            textAlign: 'left',
            zIndex: 10,
            opacity: 1,
            maxWidth: '',
          })
        }
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Text Element
      </button>
    </div>
  );
};

export default TextElementFields;

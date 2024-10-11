// ElementProperties.tsx
import React from 'react';

interface ElementPropertiesProps {
  element: any;
  onChange: (newProps: any) => void;
}

const ElementProperties: React.FC<ElementPropertiesProps> = ({
  element,
  onChange,
}) => {
  if (element.type === 'text') {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Text Properties</h3>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Text</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={element.props.text}
            onChange={(e) =>
              onChange({ ...element.props, text: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Font Size</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={element.props.fontSize}
            onChange={(e) =>
              onChange({ ...element.props, fontSize: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Color</label>
          <input
            type="color"
            className="w-full p-2 border rounded"
            value={element.props.fill}
            onChange={(e) =>
              onChange({ ...element.props, fill: e.target.value })
            }
          />
        </div>
      </div>
    );
  } else if (element.type === 'image') {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Image Properties</h3>
        {/* Add more properties if needed */}
        <div className="mb-2">
          <label className="block mb-1 font-semibold">Rotation</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={element.props.rotation || 0}
            onChange={(e) =>
              onChange({ ...element.props, rotation: Number(e.target.value) })
            }
          />
        </div>
      </div>
    );
  }
  return null;
};

export default ElementProperties;

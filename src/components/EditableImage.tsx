// EditableImage.tsx
import React, { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';

interface EditableImageProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

const EditableImage: React.FC<EditableImageProps> = ({
  element,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [image] = useImage(element.props.src);

  useEffect(() => {
    if (isSelected) {
      // Attach transformer
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        image={image}
        x={element.x}
        y={element.y}
        width={element.props.width || 200}
        height={element.props.height || 200}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Reset scale to 1
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            props: {
              ...element.props,
              width: node.width() * scaleX,
              height: node.height() * scaleY,
              rotation: node.rotation(),
            },
          });
        }}
        {...element.props}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          anchorSize={7}
          borderDash={[6, 2]}
        />
      )}
    </>
  );
};

export default EditableImage;

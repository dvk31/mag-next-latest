// EditableText.tsx
import React, { useRef, useEffect } from 'react';
import { Text, Transformer, Rect, Group } from 'react-konva';

interface EditableTextProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  element,
  isSelected,
  onSelect,
  onChange,
}) => {
  const groupRef = useRef<any>();
  const textRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // Attach transformer
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Extract properties
  const {
    text,
    fontSize,
    fill,
    fontFamily,
    fontStyle,
    fontWeight,
    width,
    align,
    padding,
    backgroundColor,
    rotation,
    cornerRadius,
    letterSpacing,
  } = element.props;

  return (
    <>
      <Group
        ref={groupRef}
        x={element.x}
        y={element.y}
        draggable
        rotation={rotation || 0}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = groupRef.current;
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
              scaleX,
              scaleY,
              rotation: node.rotation(),
            },
          });
        }}
      >
        {backgroundColor && (
          <Rect
            fill={backgroundColor}
            cornerRadius={cornerRadius || 0}
            width={(textRef.current?.width() || 0) + (padding || 0) * 2}
            height={(textRef.current?.height() || 0) + (padding || 0) * 2}
            x={-(padding || 0)}
            y={-(padding || 0)}
          />
        )}
        <Text
          ref={textRef}
          text={text}
          fontSize={fontSize}
          fill={fill}
          fontFamily={fontFamily}
          fontStyle={fontStyle}
          fontWeight={fontWeight}
          width={width}
          align={align}
          padding={padding}
          letterSpacing={letterSpacing}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          nodes={[groupRef.current]}
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

export default EditableText;

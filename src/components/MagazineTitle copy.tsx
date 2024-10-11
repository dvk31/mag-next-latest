// components/MagazineTitle.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import { SketchPicker } from 'react-color';
import { Input } from './ui/input'; // Ensure you have an Input component from shadcn/ui
import { Button } from './ui/button'; // Ensure you have a Button component from shadcn/ui
import { CoverPageData } from '@/types/coverpage';

interface MagazineTitleProps {
  titleData: CoverPageData['coverPage']['magazineTitle'];
}

export const MagazineTitle: React.FC<MagazineTitleProps> = ({ titleData }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    selected: node.events.selected,
    props: node.data.props,
  }));

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className="absolute"
      style={{
        top: props.titleData.position.top,
        left: props.titleData.position.left,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: props.titleData.font.family,
            fontSize: props.titleData.font.size,
            fontWeight: props.titleData.font.weight,
            fontStyle: props.titleData.font.style,
            color: props.titleData.color,
            margin: 0,
          }}
        >
          {props.titleData.text}
        </h1>
        <h2
          style={{
            fontFamily: props.titleData.subFont.family,
            fontSize: props.titleData.subFont.size,
            fontWeight: props.titleData.subFont.weight,
            fontStyle: props.titleData.subFont.style,
            color: props.titleData.subColor,
            marginTop: props.titleData.spacing,
            margin: 0,
          }}
        >
          {props.titleData.subText}
        </h2>
      </div>

      {selected && (
        <div className="absolute top-0 right-0 p-4 bg-white border rounded shadow-lg z-10">
          {/* Main Title Controls */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Main Title</label>
            <Input
              value={props.titleData.text}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.text = e.target.value))
              }
              placeholder="Enter main title"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Main Title Color</label>
            <SketchPicker
              color={props.titleData.color}
              onChangeComplete={(color) =>
                setProp((props: any) => (props.titleData.color = color.hex))
              }
            />
          </div>

          {/* Sub Title Controls */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Title</label>
            <Input
              value={props.titleData.subText}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.subText = e.target.value))
              }
              placeholder="Enter sub title"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Title Color</label>
            <SketchPicker
              color={props.titleData.subColor}
              onChangeComplete={(color) =>
                setProp((props: any) => (props.titleData.subColor = color.hex))
              }
            />
          </div>

          {/* Font Controls */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Font Family</label>
            <Input
              value={props.titleData.font.family}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.font.family = e.target.value))
              }
              placeholder="e.g., Arial, sans-serif"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Font Size</label>
            <Input
              value={props.titleData.font.size}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.font.size = e.target.value))
              }
              placeholder="e.g., 24px"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Font Weight</label>
            <Input
              value={props.titleData.font.weight}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.font.weight = e.target.value))
              }
              placeholder="e.g., bold"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Font Style</label>
            <Input
              value={props.titleData.font.style}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.font.style = e.target.value))
              }
              placeholder="e.g., italic"
              className="w-full"
            />
          </div>

          {/* Sub Font Controls */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Font Family</label>
            <Input
              value={props.titleData.subFont.family}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.subFont.family = e.target.value))
              }
              placeholder="e.g., Arial, sans-serif"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Font Size</label>
            <Input
              value={props.titleData.subFont.size}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.subFont.size = e.target.value))
              }
              placeholder="e.g., 18px"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Font Weight</label>
            <Input
              value={props.titleData.subFont.weight}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.subFont.weight = e.target.value))
              }
              placeholder="e.g., normal"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Font Style</label>
            <Input
              value={props.titleData.subFont.style}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.subFont.style = e.target.value))
              }
              placeholder="e.g., normal"
              className="w-full"
            />
          </div>

          {/* Position Controls */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Position Top</label>
            <Input
              value={props.titleData.position.top}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.position.top = e.target.value))
              }
              placeholder="e.g., 50px or 10%"
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Position Left</label>
            <Input
              value={props.titleData.position.left}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.position.left = e.target.value))
              }
              placeholder="e.g., 50px or 10%"
              className="w-full"
            />
          </div>

          {/* Spacing Control */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Spacing (Sub Title)</label>
            <Input
              value={props.titleData.spacing}
              onChange={(e) =>
                setProp((props: any) => (props.titleData.spacing = e.target.value))
              }
              placeholder="e.g., 10px"
              className="w-full"
            />
          </div>

          {/* Reset Button */}
          <Button
            variant="secondary"
            onClick={() => {
              setProp((props: any) => {
                props.titleData = {
                  position: { top: '0px', left: '0px' },
                  font: {
                    family: 'Arial, sans-serif',
                    size: '24px',
                    weight: 'bold',
                    style: 'normal',
                  },
                  subFont: {
                    family: 'Arial, sans-serif',
                    size: '18px',
                    weight: 'normal',
                    style: 'normal',
                  },
                  color: '#000000',
                  subColor: '#555555',
                  text: 'Main Title',
                  subText: 'Sub Title',
                  spacing: '10px',
                };
              });
            }}
            className="mt-2 w-full"
          >
            Reset to Default
          </Button>
        </div>
      )}
    </div>
  );
};

MagazineTitle.craft = {
  props: {
    titleData: {
      position: { top: '0px', left: '0px' },
      font: {
        family: 'Arial, sans-serif',
        size: '24px',
        weight: 'bold',
        style: 'normal',
      },
      subFont: {
        family: 'Arial, sans-serif',
        size: '18px',
        weight: 'normal',
        style: 'normal',
      },
      color: '#000000',
      subColor: '#555555',
      text: 'Main Title',
      subText: 'Sub Title',
      spacing: '10px',
    },
  },
  displayName: 'Magazine Title',
};

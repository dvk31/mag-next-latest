// components/BackgroundImage.tsx
import React from 'react';
import { useNode } from '@craftjs/core';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const BackgroundImage = () => {
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
    <div ref={(ref: HTMLDivElement | null) => ref && connect(drag(ref))} className="relative p-2">
      {props.backgroundImage.url && (
        <Image
          src={props.backgroundImage.url}
          alt={props.backgroundImage.alt || 'Background Image'}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      )}
      {selected && (
        <div className="absolute top-0 right-0 p-4 bg-white border rounded shadow-lg">
          <label className="block mb-2 text-sm font-medium">Image URL</label>
          <Input
            value={props.backgroundImage.url}
            onChange={(e) => setProp((props: any) => (props.backgroundImage.url = e.target.value))}
            className="mb-4"
          />
          <label className="block mb-2 text-sm font-medium">Alt Text</label>
          <Input
            value={props.backgroundImage.alt}
            onChange={(e) => setProp((props: any) => (props.backgroundImage.alt = e.target.value))}
          />
          <Button
            onClick={() => {
              // Optional: Add functionality like removing the image
            }}
            className="mt-4"
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
};

BackgroundImage.craft = {
  props: {
    backgroundImage: {
      url: '',
      alt: '',
    },
  },
  displayName: 'Background Image',
};

import React from 'react';
import Image from 'next/image';

interface QRCodeProps {
  url: string;
  alt: string;
  position: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    transform?: string;
  };
  width: string;
  caption: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, alt, position, width, caption }) => {
  return (
    <div
      className="absolute flex flex-col items-center justify-center"
      style={{
        top: position.top,
        left: position.left,
        bottom: position.bottom,
        right: position.right,
        transform: position.transform,
        width: width,
      }}
    >
      <div style={{ width: width, height: width, position: 'relative' }}>
        <Image
          src={url}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <span className="text-white mt-2 text-center">{caption}</span>
    </div>
  );
};

export default QRCode;
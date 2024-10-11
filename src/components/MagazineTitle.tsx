// components/MagazineTitle.tsx
import React from 'react';
import { CoverPageData } from '@/types/coverpage';

interface MagazineTitleProps {
  titleData: CoverPageData['coverPage']['magazineTitle'];
}

const MagazineTitle: React.FC<MagazineTitleProps> = ({ titleData }) => {
  return (
    <div
      className="absolute"
      style={{
        top: titleData.position.top,
        left: titleData.position.left,
      }}
    >
      <h1
        style={{
          fontFamily: titleData.font.family,
          fontSize: titleData.font.size,
          fontWeight: titleData.font.weight,
          fontStyle: titleData.font.style,
          color: titleData.color,
          margin: 0,
        }}
      >
        {titleData.text}
      </h1>
      <h2
        style={{
          fontFamily: titleData.subFont.family,
          fontSize: titleData.subFont.size,
          fontWeight: titleData.subFont.weight,
          fontStyle: titleData.subFont.style,
          color: titleData.subColor,
          marginTop: titleData.spacing,
          margin: 0,
        }}
      >
        {titleData.subText}
      </h2>
    </div>
  );
};

export default MagazineTitle;

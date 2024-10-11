import React from 'react';
import { CoverPageData } from '@/types/coverpage';

interface BadgeProps {
  badgeData: CoverPageData['coverPage']['badge'];
}

const Badge: React.FC<BadgeProps> = ({ badgeData }) => {
  const {
    content,
    backgroundImage,
    position,
    width,
    height,
    font,
    color,
    ...otherStyles
  } = badgeData;

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    ...position,
    width,
    height,
    color,
    fontFamily: font.family,
    fontSize: font.size,
    fontWeight: font.weight,
    fontStyle: font.style,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...otherStyles,
  };

  return (
    <div style={badgeStyle}>
      {content}
    </div>
  );
};

export default Badge;
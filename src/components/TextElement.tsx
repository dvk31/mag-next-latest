import React from 'react';

interface TextElementProps {
  content: string;
  font: {
    family: string;
    size: string;
    weight: string;
    style: string;
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: string;
  };
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  color: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  transform?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  zIndex?: number;
  opacity?: number;
  maxWidth?: string;
}

const TextElement: React.FC<TextElementProps> = ({
  content,
  font,
  position,
  color,
  backgroundColor,
  padding,
  margin,
  transform,
  textAlign,
  zIndex,
  opacity,
  maxWidth,
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    ...position,
    fontFamily: font.family,
    fontSize: font.size,
    fontWeight: font.weight,
    fontStyle: font.style,
    lineHeight: font.lineHeight,
    letterSpacing: font.letterSpacing,
    textTransform: font.textTransform as 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana',
    color,
    backgroundColor,
    padding,
    margin,
    transform,
    textAlign,
    zIndex,
    opacity,
    maxWidth,
  };

  return <div style={style}>{content}</div>;
};

export default TextElement;
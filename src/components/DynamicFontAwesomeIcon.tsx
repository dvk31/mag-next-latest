// components/DynamicFontAwesomeIcon.tsx
import dynamic from 'next/dynamic';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon), {
  ssr: false,
});

interface DynamicFontAwesomeIconProps {
  icon: IconProp;
  style?: React.CSSProperties;
}

const DynamicFontAwesomeIconComponent: React.FC<DynamicFontAwesomeIconProps> = ({ icon, style }) => {
  return <FontAwesomeIcon icon={icon} style={style} />;
};

export default DynamicFontAwesomeIconComponent;

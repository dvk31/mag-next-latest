import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

const HeavyComponent: ComponentType = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});

export default HeavyComponent;
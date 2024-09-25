// src/app/dashboard/publications/page.tsx

import React from 'react';
import PublicationsList from '@/components/PublicationsList';


const PublicationsPage: React.FC = () => {

  return (
    <div className="publications-page">
      <PublicationsList />
    </div>
  );
};

export default PublicationsPage;

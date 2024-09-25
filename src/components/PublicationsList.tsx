// src/components/PublicationsList.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Publication } from '@/lib/api.types';


const PublicationsList: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await fetch('/api/publications/', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch publications');
        }

        const data: Publication[] = await res.json();
        setPublications(data);
      } catch (err) {
        console.error(`Failed to fetch publications: ${err instanceof Error ? err.message : err}`);
        setError(err instanceof Error ? err.message : String(err)); // Convert to string if not an Error
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) {
    return <div>Loading publications...</div>;
  }

  if (error) {
    return <div>Error loading publications: {error}</div>;
  }

  return (
    <div>
      <h2>Publications</h2>
      <ul>
        {publications.map(pub => (
          <li key={pub.id}>
            <h3>{pub.name}</h3>
            <p>Type: {pub.publication_type}</p>
            <p>Description: {pub.description || 'N/A'}</p>
            <p>Privacy: {pub.privacy}</p>
            {pub.logo && <img src={pub.logo.file} alt={`${pub.name} Logo`} width={100} />}
            {pub.cover_image && <img src={pub.cover_image.file} alt={`${pub.name} Cover`} width={200} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicationsList;

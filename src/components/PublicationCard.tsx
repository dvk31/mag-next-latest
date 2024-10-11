// src/components/PublicationCard/PublicationCard.tsx

import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Publication } from '@/types/publication';

interface PublicationCardProps {
  publication: Publication;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onView, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {publication.cover_image ? (
        <div className="relative h-48 w-full">
          <Image
            src={publication.cover_image.file}
            alt={`${publication.name} Cover`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Cover Image</span>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center mb-2">
          {publication.logo ? (
            <Image
              src={publication.logo.file}
              alt={`${publication.name} Logo`}
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              Logo
            </div>
          )}
          <h2 className="ml-4 text-xl font-semibold">{publication.name}</h2>
        </div>
        <p className="text-gray-600 mb-2"><strong>Type:</strong> {publication.publication_type}</p>
        <p className="text-gray-700 mb-4">{publication.description}</p>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onView(publication.id)}>
            View
          </Button>
          <Button variant="primary" onClick={() => onEdit(publication.id)}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;

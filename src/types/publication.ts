// src/types/publication.d.ts

export type PublicationType = 'magazine' | 'book' | 'newspaper' | 'brochure';
export type PrivacyType = 'private' | 'community';

export interface Publication {
  id: string;
  name: string;
  publication_type: PublicationType;
  description?: string;
  privacy: PrivacyType;
  logo?: string | null;
  cover_image?: string | null;
  publication_video?: string | null;
  created_by: {
    id: string;
    email: string;
  };
  members: Array<{
    id: string;
    user: {
      id: string;
      email: string;
    };
  }>;
}

export interface CreatePublicationInput {
  name: string;
  publication_type: PublicationType;
  description?: string;
  privacy?: PrivacyType;
  logo?: string;
  cover_image?: string;
  publication_video?: string;
  member_ids?: string[];
  [key: string]: File | string | null; 
}

export interface PublicationsContextType {
  publications: Publication[];
  createPublication: (input: CreatePublicationInput) => Promise<Publication>;
  fetchPublications: () => Promise<void>;
  fetchPublicationById: (id: string) => Promise<Publication>;
  loading: boolean;
  error: string | null;
  currentPublication: Publication | null;
}


export interface Media {
    id: string;
    file: string;
  }
  
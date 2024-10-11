// src/contexts/MediaAssetContext.tsx

import api from '@/lib/api';

// Ensure this function is exported
export const uploadMediaAsset = async (file: File, assetType: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('asset_type', assetType);

  const response = await api.post('media-assets/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

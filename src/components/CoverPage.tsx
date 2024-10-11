import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter
import DynamicFontAwesomeIcon from '../components/DynamicFontAwesomeIcon';
import MagazineTitle from '../components/MagazineTitle';
import Badge from '../components/Badge';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import TextElement from '../components/TextElement';
import QRCode from '../components/QRCode';

config.autoAddCss = false;

interface CoverPageProps {
  magazineId?: string;
}

interface IconData {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  width: string;
  iconClass: string;
}

const CoverPage: React.FC<CoverPageProps> = ({ magazineId }) => {
  const router = useRouter(); // Use the useRouter hook
  const { magazines, loading, error, fetchMagazines } = useMagazineContext();
  const [coverPage, setCoverPage] = useState<any | null>(null);

  useEffect(() => {
    if (magazines.length === 0 && !loading && !error) {
      fetchMagazines();
    }
  }, [magazines, loading, error, fetchMagazines]);

  useEffect(() => {
    console.log('Magazine ID:', magazineId);
    console.log('Magazines:', magazines);

    let magazine;
    if (magazineId) {
      magazine = magazines.find((mag) => mag.id === magazineId);
    } else if (magazines.length > 0) {
      magazine = magazines[0];
    }

    if (magazine && magazine.cover_page && magazine.cover_page.coverPage) {
      setCoverPage(magazine.cover_page.coverPage);
    }
  }, [magazines, magazineId]);

  const handleEditClick = () => {
    if (magazineId) {
      router.push(`/edit-coverpage?id=${magazineId}`);
    } else {
      console.error('No magazine ID available for editing');
    }
  };

  if (loading) {
    return <div>Loading cover page...</div>;
  }

  if (error) {
    return <div>Error loading cover page: {error}</div>;
  }

  if (!coverPage) {
    return <div>Cover page not found. {magazineId ? `Magazine ID: ${magazineId}` : 'No magazine ID provided.'}</div>;
  }

  console.log('Rendering cover page:', coverPage);

  return (
    <div className="relative w-full min-h-screen p-4 overflow-hidden bg-gray-100 dark:bg-gray-900">
      <h1>{coverPage.title}</h1>
      {coverPage.backgroundImage && (
        <>
          <Image
            src={coverPage.backgroundImage.url}
            alt={coverPage.backgroundImage.alt || "Background image"}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
        </>
      )}

      {/* Edit button */}
      <button
        onClick={handleEditClick}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Edit Cover Page
      </button>

      {coverPage.magazineTitle && (
        <MagazineTitle titleData={coverPage.magazineTitle} />
      )}

      {coverPage.textElements && coverPage.textElements.map((text, index) => (
        <TextElement
          key={index}
          content={text.content}
          font={text.font}
          position={text.position}
          color={text.color}
          backgroundColor={text.backgroundColor}
          padding={text.padding}
          margin={text.margin}
          transform={text.transform}
          textAlign={text.textAlign}
          zIndex={text.zIndex}
          opacity={text.opacity}
          maxWidth={text.maxWidth}
        />
      ))}

      {coverPage.icons && coverPage.icons.map((icon: IconData, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: icon.position.top,
            bottom: icon.position.bottom,
            left: icon.position.left,
            right: icon.position.right,
            width: icon.width,
            height: icon.width,
          }}
        >
          {icon.iconClass && (
            <DynamicFontAwesomeIcon
              icon={icon.iconClass.startsWith('fa-') ? icon.iconClass.substring(3) as IconProp : icon.iconClass as IconProp}
              style={{ width: '100%', height: '100%', color: 'white' }}
            />
          )}
        </div>
      ))}

      {coverPage.badge && (
        <Badge badgeData={coverPage.badge} />
      )}

      {coverPage.qrCode && (
        <QRCode
          url={coverPage.qrCode.url}
          alt={coverPage.qrCode.alt}
          position={coverPage.qrCode.position}
          width={coverPage.qrCode.width}
          caption={coverPage.qrCode.caption}
        />
      )}
    </div>
  );
};

export default CoverPage;
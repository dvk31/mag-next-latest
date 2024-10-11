interface Position {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }
  
  interface Font {
    family: string;
    size: string;
    weight: string;
    style: string;
    lineHeight?: string;
    letterSpacing?: string;
    textTransform?: string;
  }
  
  interface ImageElement {
    url: string;
    alt: string;
    position: { top: string; left: string };
    width: string;
  }
  
  interface TextElement {
    content: string;
    font: Font;
    position: Position;
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
  
  interface Icon {
    type: string;
    iconClass: string;
    alt: string;
    position: Position;
    width: string;
  }
  
  export interface CoverPageData {
    coverPage: {
      title: string;
      backgroundImage: {
        url: string;
        alt: string;
      };
      magazenieLogo: ImageElement;
      featuredImage: ImageElement & {
        height: string;
      };
      qrCode: {
        url: string;
        alt: string;
        position: {
          top: string;
          left: string;
          transform: string;
        };
        width: string;
        caption: string;
      };
      textElements: TextElement[];
      icons: Icon[];
      badge: {
        content: string;
        backgroundImage?: string;
        position: Position;
        width: string;
        height: string;
        font: Font;
        color: string;
        backgroundColor?: string;
        borderRadius?: string;
        transform?: string;
        boxShadow?: string;
        padding?: string;
        textAlign?: 'left' | 'center' | 'right' | 'justify';
        display?: string;
        alignItems?: string;
        justifyContent?: string;
        zIndex?: number;
        opacity?: number;
      };
      magazineTitle: {
        text: string;
        subText: string;
        font: Font;
        subFont: Font;
        color: string;
        subColor: string;
        position: Position;
        spacing: string;
        textAlign?: 'left' | 'center' | 'right' | 'justify';
        zIndex?: number;
        opacity?: number;
      };
    };
  }
  
  export interface CoverPageProps {
    coverPage: CoverPageData['coverPage'];
  }
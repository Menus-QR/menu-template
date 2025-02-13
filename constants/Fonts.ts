// This file contains font settings for the application

// Google Fonts link for the desired font
export const GOOGLE_FONTS_LINK =
  'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';

// Font family names to be used in the application
export const FONT_FAMILY = {
  regular: 'Inter',
};

// Function to inject the Google Fonts link into the document head
export function injectGoogleFonts() {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.href = GOOGLE_FONTS_LINK;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
}

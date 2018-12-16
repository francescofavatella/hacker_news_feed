export const shortenedText = len => string =>
  string && string.length > len ? string.substring(0, len - 3) + '...' : string;

export const veryShortText = shortenedText(10);
export const shortText = shortenedText(25);
export const longText = shortenedText(500);

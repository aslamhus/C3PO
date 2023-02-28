export const getBinaryCodeFromImageURL = (url) => {
  const prefix = 'binary-message_0000s_';
  const regex = new RegExp(`${prefix}[^-]*-(.*)\.png`);
  return url.match(regex)[1];
};

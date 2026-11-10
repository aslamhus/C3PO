import { charToBinary } from "../../ControlKeypad/binaryDict";

export const getBinaryCodeFromImageURL = (url) => {
  const prefix = "binary-message_0000s_";
  const regex = new RegExp(`${prefix}[^-]*-(.*)\.png`);
  return url.match(regex)[1];
};

export const getByteDataFromMessage = (message, decoded = []) => {
  let data = [];
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    data.push({
      char,
      decoded: decoded[i] ?? false,
      binary: charToBinary[char],
      guess: null,
      animationDelay: 0,
      wordFound: false,
    });
  }
  return data;
};

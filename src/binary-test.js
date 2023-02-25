const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
button.onclick = () => {
  const binary = textarea.value;
  binary2Text(binary);
  //   console.log(binary2Text(binary));
};

const binary2Text = (binary) => {
  const string = removeSpaces(binary);
  const bytes = string.match(/.{1,8}/g);
  correctBinary(bytes, srcBinary);
  return bytes;
};

const removeSpaces = (str) => {
  return str.replace(/\s/g, '');
};

const correctBinary = (badBinary, srcBinary) => {
  console.log('correct');
  if (badBinary.length != srcBinary.length) {
    console.log('badBinary', badBinary);
    console.log('srcBinary', srcBinary);
    throw new Error(
      `bad length input length: ${badBinary.length}, src length: ${srcBinary.length}`
    );
  }
  const corrections = { zero: {}, one: {} };
  badBinary.forEach((byte, index) => {
    const srcByte = srcBinary[index];
    if (byte != srcByte) {
      console.log('badbit', byte, srcByte, index + 1);
      for (let i = 0; i < byte.length; i++) {
        const bit = byte.charAt(i);
        const srcBit = srcByte.charAt(i);
        if (bit != srcBit) {
          if (Number(srcBit) == 0) {
            corrections.zero[bit] = '';
          } else if (Number(srcBit) == 1) {
            corrections.one[bit] = '';
          } else {
            console.error('unknown value');
          }
          console.log(`${bit} => ${srcBit}`);
        }
      }
    }
  });

  console.log(corrections);
  //   str.replace(/[Oo])
};

const srcBinary =
  '01000100 01100101 01100001 01110010 00100000 01010011 01111001 01101100 01110110 01100001 01101110 00101100 00100000 01001001 00100000 01101000 01101111 01110000 01100101 00100000 01111001 01101111 01110101 00100000 01100101 01101110 01101010 01101111 01111001 00100000 01110100 01101000 01101001 01110011 00100000 01100100 01110010 01100001 01110111 01101001 01101110 01100111 00100000 01101111 01100110 00100000 01000011 00101101 00110011 01010000 00110000 00101110 00100000 01001100 01101111 01110100 01110011 00100000 01101111 01100110 00100000 01101100 01101111 01110110 01100101 00101100 00100000 01000001 01110011 01101100 01100001 01101101 00100000 01100011 01101000 01100001 01100011 01101000 01100001'.split(
    /\s/
  );

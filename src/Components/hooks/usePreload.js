import { useRef } from "react";

const loadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      console.log("img loaded", src);
      resolve();
    };
    img.src = src;
  });
};

export default function usePreload(assets) {
  const resolverRef = useRef();
  const preload = async () => {
    const { images, sound } = assets || {};
    let promises = [];
    if (images.length) {
      for (let src of images) {
        promises.push(loadImage(src));
      }
    }
    resolverRef.current = Promise.all(promises);
    return resolverRef.current;
  };
  return { preload, resolverRef };
}

// c3Po preload assets

import bodyPartImages from "../C3PO/Body/body-part-images";
import bodyPartImagesColor from "./Body/body-part-images-color";
import background from "@images/backgrounds/tatooine-background.png";
import midground from "@images/backgrounds/tatooine-midground.png";
import foreground from "@images/backgrounds/tatooine-foreground.png";

export default {
  images: [
    ...Object.values({ ...bodyPartImages, ...bodyPartImagesColor }),
    background,
    midground,
    foreground,
  ],
  sound: [],
};

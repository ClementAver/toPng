import { readdir } from "node:fs/promises";
import Jimp from "jimp";
import { fileTypeFromFile } from "file-type";
import webp from "webp-converter";

const sourceLocation = "in/";
const saveLacation = "out/";
const files = await readdir(sourceLocation, { withFileTypes: true });
const names = [];

files.map((file) => {
  names.push(file.name);
});

names.map(async (name) => {
  const { mime } = await fileTypeFromFile(sourceLocation + name); // mime type.

  if (mime === "image/webp") {
    // If the mime type is "webp" (unsupported by jimp).
    webp.dwebp(sourceLocation + name, saveLacation + png(name), "-o");
  } else {
    Jimp.read(sourceLocation + name, (err, source) => {
      if (err) throw err;
      source.write(saveLacation + png(name));
    });
  }
});

function png(str) {
  return str.slice(0, str.lastIndexOf(".")) + ".png";
}

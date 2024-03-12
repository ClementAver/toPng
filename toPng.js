import { readdir } from "node:fs/promises";
import Jimp from "jimp";

const files = await readdir("./in", { withFileTypes: true });
const names = [];

const sourceLocation = "in/";
const saveLacation = "out/";

files.map((file) => {
  names.push(file.name);
});

names.map((name) => {
  Jimp.read(sourceLocation + name)
    .then((source) => {
      return source.quality(100).write(saveLacation + png(name));
    })
    .catch((err) => {
      console.error(err);
    });
});

function png(str) {
  return str.slice(0, str.lastIndexOf(".")) + ".png";
}

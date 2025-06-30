const allowedExtensionsImg = ["jpg", "jpeg", "png", "webp", "gif", "mp4"];
const allowedExtensionsAudio = ["mp3", "wav", "ogg"];

export const fileTypesToExtensions = {
  img: allowedExtensionsImg,
  audio: allowedExtensionsAudio,
};

const maxSizeInMB = 5;
const maxSizeInMBAudio = 10;

export const fileTypesMaxSizeInMB = {
  img: maxSizeInMB,
  audio: maxSizeInMBAudio,
};

const TYPES = ['png', 'jpeg', 'jpg'];

const isType = (file) => TYPES.some((type) => file.name.endsWith(type));

const showImg = (file, img) => {
  if (isType(file)) {
    img.src = URL.createObjectURL(file);
    return true;
  }
};


export { showImg };

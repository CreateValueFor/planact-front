function imageBase64(base64) {
  const imageString = `data:image; base64,${base64.img}`;
  return imageString;
}

export default imageBase64;

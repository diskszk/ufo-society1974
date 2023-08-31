export const getDefaultImageFile = (): FileList => {
  const file = new File([""], "no_image", { type: "image/jpeg" });
  const dataTransfer = new DataTransfer();

  dataTransfer.items.add(file);
  return dataTransfer.files;
};

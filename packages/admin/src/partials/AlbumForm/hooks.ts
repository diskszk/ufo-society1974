import { useState, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { NO_IMAGE, THREE_SONGS } from "../../constants";
import { AlbumInput } from "../../lib/schemas/albumSchema";

export function useImageFile(
  watch: UseFormWatch<AlbumInput>,
  _image: string = NO_IMAGE
) {
  const [previewImageSrc, setPreviewImageSrc] = useState(THREE_SONGS);

  // 画像が挿入されたらpreview画像を更新する
  const watchImageFile = watch("imageFile");

  useEffect(() => {
    const file = watchImageFile.item(0) as File;

    setPreviewImageSrc(URL.createObjectURL(file));
  }, [watchImageFile]);

  return { previewImageSrc };
}

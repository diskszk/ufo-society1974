import { useState, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { NO_IMAGE } from "../../constants";
import { AlbumInput } from "../../lib/schemas/albumSchema";

export function useImageFile(watch: UseFormWatch<AlbumInput>) {
  const [previewImageSrc, setPreviewImageSrc] = useState(NO_IMAGE);

  // 画像が挿入されたらpreview画像を更新する
  const watchImageFile = watch("imageFile");

  useEffect(() => {
    const file = watchImageFile.item(0) as File;

    setPreviewImageSrc(URL.createObjectURL(file));
  }, [watchImageFile]);

  return { previewImageSrc };
}

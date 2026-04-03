import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import style from "./DropZone.module.css";

export default function DropZone({ onFileSelect }) {
  const [preview, setPreview] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        onFileSelect(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`${style.dropZone} ${isDragActive ? style.active : ""}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className={style.previewContainer}>
          <img src={preview} alt="Preview" className={style.previewImg} />
          <p>File selected! Click or drag to change.</p>
        </div>
      ) : (
        <p>Drag and drop a product image here, or click to select</p>
      )}
    </div>
  );
}

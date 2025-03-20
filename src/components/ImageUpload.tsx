"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { handleDelete } from "@/Action/paymentIntent";
import { Badge } from "@heroui/react";

interface cloudinaryResponse {
  asset_id: string;
  public_id: string;
  secure_url: string;
}

type ImageUploadedPorops = {
  uploadedImages: cloudinaryResponse[];
  setUploadedImage: Dispatch<SetStateAction<cloudinaryResponse[]>>;
};

const ImageUploader = ({
  uploadedImages,
  setUploadedImage,
}: ImageUploadedPorops) => {
  // const [uploadedImages, setUploadedImage] = useState<cloudinaryResponse[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError(null);
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "supreme_store");
        formData.append("cloud_name", "dpnms1tbz");

        const response = await axios.post<cloudinaryResponse>(
          `https://api.cloudinary.com/v1_1/dpnms1tbz/image/upload`,
          formData
        );
        return response.data;
      });
      const results = await Promise.all(uploadPromises);
      setUploadedImage((prevImages) => [...prevImages, ...results]);
    } catch (error) {
      setError("Error uploading images.");
      console.log(error);
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteImage = async (publicId: string) => {
    try {
      const response = await handleDelete(publicId);

      if (response.result === "ok") {
        setUploadedImage((prevImage) =>
          prevImage.filter((image) => image.public_id !== publicId)
        );
      } else {
        setError("Failed to delete image");
      }
    } catch (error) {
      setError("Failed to delete image");
      console.error(error);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="cursor-pointer border-dotted rounded border-3 p-4 border-gray-600"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to selectfiles</p>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {uploading && <p className="font-medium text-medium">Uploading...</p>}
      <div className="flex gap-3 mt-3">
        {uploadedImages.map((image) => (
          <div key={image.public_id} className="relative">
            <Badge
              color="danger"
              content={
                <button
                  onClick={() => handleDeleteImage(image.public_id)}
                  className="font-bold text-medium"
                  type="button"
                >
                  x
                </button>
              }
            >
              <Image
                src={image.secure_url}
                alt="Uploaded_image"
                width={100}
                height={70}
                className="rounded-lg h-24 mt-2"
              />
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

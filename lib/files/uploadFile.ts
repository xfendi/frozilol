import toast from "react-hot-toast";
import { updateCustomizeField } from "./updateFileInDatabase";

type UploadFileParams = {
  file: File | null;
  setUploading: (val: boolean) => void;
  key: string; // np. "background", "audio"
  profile: { id: number };
  type?: string; // np. "img", "audio" — dla API
  successMsg?: string;
};

export const uploadFile = async ({
  file,
  setUploading,
  key,
  profile,
  type = "img",
  successMsg = "File uploaded successfully!",
}: UploadFileParams) => {
  try {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.set("file", file);
    data.set("type", type);

    const uploadRequest = await fetch("/api/files/upload", {
      method: "POST",
      body: data,
    });

    const resData = await uploadRequest.json();

    if (uploadRequest.status !== 200) {
      toast.error(resData?.error || "Upload failed");
      return;
    }

    const { url, id, extension } = resData;
    const fileData = { URL: url, ID: id, extension };

    await updateCustomizeField(key, fileData, profile.id);

    toast.success(successMsg);
  } catch (e) {
    console.error(e);
    toast.error("Failed to upload file");
  } finally {
    setUploading(false);
  }
};

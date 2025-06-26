import toast from "react-hot-toast";
import { updateCustomizeField } from "./updateFileInDatabase";

export const handleDeleteFile = async (
  profile: any,
  key: string,
  setUploading: (val: boolean) => void
) => {
  try {
    const data = new FormData();
    data.set("id", profile.customize[key]?.ID);

    const deleteRequest = await fetch("/api/files/delete", {
      method: "POST",
      body: data,
    });

    if (deleteRequest.status !== 200) {
      toast.error("Failed to delete file");
      return;
    }

    await updateCustomizeField(key, null, profile.id);

    toast.success("File deleted successfully!");
  } catch (e) {
    console.log(e);
    toast.error("Failed to delete file");
  } finally {
    setUploading(false);
  }
};

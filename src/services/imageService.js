import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
  );
  return response.data.data.url;
};

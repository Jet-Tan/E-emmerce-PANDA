import { v2 as cloudinary } from "cloudinary";

console.log("check", process.env.CLODINARY_CLOUD_NAME);
cloudinary.config({
  cloud_name: process.env.CLODINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

const uploadImageClodinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  try {
    const uploadImage = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
          if (error) {
            console.error("Cloudinary upload error:", error); // Log the error
            return reject(error);
          }
          resolve(uploadResult);
        })
        .end(buffer);
    });

    return uploadImage;
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw new Error("Image upload to Cloudinary failed");
  }
};

export default uploadImageClodinary;

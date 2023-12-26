import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handleUpload(image: any) {
 const response = await cloudinary.uploader.upload(image, {
  resource_type: "auto",
 });

 return response;
}

export default cloudinary;
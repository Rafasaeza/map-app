import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
   
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    //almaceno los bytes en memoria
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    //Guardo el archivo en el servidor
    const filePath = path.join(process.cwd(), 'public', file.name)
    await writeFile(filePath, buffer)

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
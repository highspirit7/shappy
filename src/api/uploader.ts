export async function uploadImage(file: File): Promise<Response> {
  const formData = new FormData();
  const url = 'https://api.cloudinary.com/v1_1/driw9zrgl/image/upload';

  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET ?? ''
  );

  const result = await fetch(url, {
    method: 'POST',
    body: formData
  })
  const data = await result.json();

  return data;
}

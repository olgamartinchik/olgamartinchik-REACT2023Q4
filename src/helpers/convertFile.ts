import { FileObject } from '../store/form';

export const convertFileToBase64 = (file: FileObject): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file as Blob);
  });
};
// export const convertFileToBase64 = (file: FileObject): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     if (!(file instanceof Blob)) {
//       reject(new Error('Input is not a valid Blob.'));
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => {
//       if (typeof reader.result === 'string') {
//         resolve(reader.result);
//       } else {
//         reject(new Error('Failed to convert file to base64.'));
//       }
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsDataURL(file);
//   });
// };

// onChange={(e: ChangeEvent<HTMLInputElement>) => {
//   const files: FileList | null = e.target.files;
//   if (files && files.length > 0) {
//     const image = new FileReader();
//     image.onloadend = () => {
//       const base64String = image.result;
//       dispatch(setReactHookFormFile(base64String));
//     };
//     image.readAsDataURL(files[0]);
//   }
// }}

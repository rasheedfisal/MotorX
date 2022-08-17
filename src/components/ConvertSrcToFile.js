// export default async function ConvertSrcToFile(
//   url,
//   name,
//   defaultType = 'image/jpeg',
//   setLoading
// ) {
//   setLoading(true);
//   const response = await fetch(url, { mode: 'cors' });
//   const data = await response.blob();
//   setLoading(false);
//   return new File([data], name, {
//     type: data.type || defaultType
//   });
// }

import Image from './Image';
const ShowImage = ({ images, setParentState }) => {
  const removeImage = (file) => () => {
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(file), 1);
    setParentState(newFiles);
  };

  // const show = (image) => {

  // };
  return (
    <div className="flex justify-center mt-3">
      {images.map((image, i) => (
        <Image key={i} image={image} removeImage={removeImage} />
      ))}
    </div>
  );
};
export default ShowImage;

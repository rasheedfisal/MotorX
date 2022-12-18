import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { FileInput } from '../../components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionFive = ({ handleClick, pageVariants, pageTransition }) => {
  const { currentColor, multiData, setMultiValues } = useAuth();
  const [isHovering, setIsHovering] = useState(false);
  const [inputFile, setInputFile] = useState([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: multiData.files
    }
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const onSubmit = (data) => {
    setMultiValues({ files: inputFile });

    //console.log(inputFile);
    //console.log(multiData);
    handleClick('next');
  };

  useEffect(() => {
    if (multiData?.files) {
      setInputFile([...multiData?.files]);
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="step4"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container flex justify-around my-8 ">
            <div className="w-10/12 m-auto py-10 px-12 mb-5">
              <FileInput
                name="files"
                control={control}
                inputFile={inputFile}
                setInputFile={setInputFile}
              />
            </div>
          </div>
          <div className="mx-4 p-4 flex justify-between items-center">
            <div className="w-full flex justify-around items-center">
              <button
                onClick={() => handleClick()}
                type="button"
                className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-white font-normal py-2 px-4 mr-1 rounded"
                style={{ backgroundColor: currentColor }}
              >
                {' '}
                Previous{' '}
              </button>
              <button
                type="submit"
                className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-orange-700 hover:bg-orange-700 text-orange-700 hover:text-white font-normal py-2 px-4 rounded"
                style={{
                  borderColor: currentColor,
                  color: isHovering ? 'white' : currentColor,
                  backgroundColor: isHovering ? currentColor : ''
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {' '}
                Next{' '}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default SectionFive;

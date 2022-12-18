import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
//import MainFeatureTypes from '../../components/MainFeatureTypes';

const SectionFour = ({
  features,
  handleClick,
  pageVariants,
  pageTransition
}) => {
  const { currentColor, setMultiValues, multiData } = useAuth();

  const [isHovering, setIsHovering] = useState(false);

  // const defaultValues = {
  //   features: features.features
  // };
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    //defaultValues: multiData.features
    defaultValues: { features: features.features }
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleSubmitClick = (data) => {
    setMultiValues({ features: data });
    //console.log(features);
    //console.log(data);
    handleClick('next');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="step4"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <form onSubmit={handleSubmit(handleSubmitClick)}>
          <div className="container flex justify-around my-8 ">
            <div className="w-10/12 m-auto py-10 px-12 mb-5">
              <div className="flex justify-between">
                {/* <MainFeatureTypes
              {...{
                control,
                register,
                defaultValues,
                getValues,
                setValue,
                errors
              }}
            /> */}
                {features.map((type, i) => (
                  <div key={type.id} className="flex flex-col">
                    <h3 className="text-2xl underline">{type.typeName}</h3>
                    {type.features.map((feat, i) => (
                      <div key={feat.id} className="flex items-center mb-4">
                        <input
                          {...register(`${feat.id}`)}
                          name={feat.id}
                          type="checkbox"
                          //value={feat.isSelected}
                          defaultChecked={feat.isSelected}
                          onChange={(e) => (feat.isSelected = e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <label
                          htmlFor={feat.id}
                          className="ml-2 text-sm font-medium text-black"
                        >
                          {feat.featureName}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
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
export default SectionFour;

import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

const Sectiontwo = ({
  years,
  gearbox,
  trims,
  handleClick,
  pageVariants,
  pageTransition
}) => {
  const { currentColor, multiData, setMultiValues } = useAuth();

  const [isHovering, setIsHovering] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      years: multiData.years,
      gearbox: multiData.gearbox,
      trims: multiData.trims,
      seats: multiData.seats,
      kilometer: multiData.kilometer
    }
  });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleSubmitClick = (data) => {
    setMultiValues(data);
    // console.log(data);
    handleClick('next');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="step2"
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <form onSubmit={handleSubmit(handleSubmitClick)}>
          <div className="container flex justify-around my-8 ">
            <div className="w-10/12 m-auto py-10 px-12 mb-5">
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Year
                </label>
                <Controller
                  name="years"
                  control={control}
                  {...register('years', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      inputId="56"
                      options={years.map(({ id, yearName }) => ({
                        value: id,
                        label: yearName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.years && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.years.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Gearbox
                </label>
                <Controller
                  name="gearbox"
                  control={control}
                  {...register('gearbox', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={gearbox.map(({ id, gearboxName }) => ({
                        value: id,
                        label: gearboxName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.gearbox && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.gearbox.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Trim
                </label>
                <Controller
                  name="trims"
                  control={control}
                  {...register('trims', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={trims.map(({ id, trimName }) => ({
                        value: id,
                        label: trimName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.trims && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.trims.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Seats
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  name="seats"
                  type="number"
                  placeholder=""
                  {...register('seats', {
                    required: 'This field is required',
                    valueAsNumber: true
                  })}
                />
                {errors.seats && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.seats.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Kilometer
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  name="kilometer"
                  type="text"
                  placeholder=""
                  defaultValue="0"
                  {...register('kilometer', {
                    required: 'This field is required'
                  })}
                />
                {errors.kilometer && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.kilometer.message}
                  </div>
                )}
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
export default Sectiontwo;

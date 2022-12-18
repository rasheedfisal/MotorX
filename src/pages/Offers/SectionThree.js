import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

const SectionThree = ({
  specs,
  locations,
  currencies,
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
      specs: multiData.specs,
      locations: multiData.locations,
      currencies: multiData.currencies,
      price: multiData.price,
      ytLink: multiData.ytLink,
      isActive: multiData.isActive
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
        key="step3"
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
                  Specs
                </label>
                <Controller
                  name="specs"
                  control={control}
                  {...register('specs', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={specs.map(({ id, specsName }) => ({
                        value: id,
                        label: specsName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.specs && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.specs.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Location
                </label>
                <Controller
                  name="locations"
                  control={control}
                  {...register('locations', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={locations.map(({ id, locationName }) => ({
                        value: id,
                        label: locationName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.locations && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.locations.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Currency
                </label>
                <Controller
                  name="currencies"
                  control={control}
                  {...register('currencies', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={currencies.map(({ id, currencyName }) => ({
                        value: id,
                        label: currencyName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.currencies && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.currencies.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Price
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  name="price"
                  type="number"
                  placeholder=""
                  {...register('price', {
                    required: 'This field is required',
                    valueAsNumber: true
                  })}
                />
                {errors.price && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.price.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  YT Link
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  name="ytLink"
                  type="text"
                  placeholder=""
                  {...register('ytLink')}
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  {...register('isActive')}
                  type="checkbox"
                  checked={true}
                  onChange={(e) => e.target.checked}
                  className="w-4 h-4 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 text-sm font-medium text-black"
                >
                  Is Active
                </label>
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
export default SectionThree;

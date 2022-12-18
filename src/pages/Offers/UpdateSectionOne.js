import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UpdateSectionOne = ({
  carTypes,
  brands,
  setModels,
  models,
  colors,
  handleClick,
  pageVariants,
  pageTransition
}) => {
  const { currentColor, multiData, setMultiValues } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isHovering, setIsHovering] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      description: multiData.description,
      carTypes: multiData.carTypes,
      brands: multiData.brands,
      models: multiData.models,
      colors: multiData.colors
    }
  });

  const ReadResponseList = async (e) => {
    console.log(e);
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(
        `/BrandModel/GetModelByBrand?bid=${e.value}`,
        {
          ContentType: 'application/json',
          signal: controller.signal
        }
      );
      isMounted && setModels(response?.data);
    } catch (err) {}

    return () => {
      isMounted = false;
      controller.abort();
    };
  };

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
        key="step1"
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
                  Brand
                </label>
                <Controller
                  name="brands"
                  control={control}
                  {...register('brands')}
                  ref={null}
                  render={({ field: { value } }) => (
                    <Select
                      cacheOptions
                      defaultValue={value}
                      isClearable
                      options={brands.map(({ id, name }) => ({
                        value: id,
                        label: name
                      }))}
                      onChange={async (e) => ReadResponseList(e)}
                    />
                  )}
                />
                {errors.brands && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.brands.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Model
                </label>
                <Controller
                  name="models"
                  control={control}
                  {...register('models', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={models.map(({ id, modelName }) => ({
                        value: id,
                        label: modelName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.models && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.models.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Description
                </label>
                <textarea
                  rows="10"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="description"
                  type="textAria"
                  placeholder=""
                  {...register('description', {
                    required: 'This field is required'
                  })}
                />
                {errors.description && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Category
                </label>
                <Controller
                  name="carTypes"
                  control={control}
                  {...register('carTypes', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={carTypes.map(({ id, typeName }) => ({
                        value: id,
                        label: typeName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.carTypes && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.carTypes.message}
                  </div>
                )}
              </div>

              <div className="mb-1">
                <label className="text-gray-600 font-medium block mt-4 dark:text-white">
                  Color
                </label>
                <Controller
                  name="colors"
                  control={control}
                  {...register('colors', {
                    required: 'This field is required'
                  })}
                  ref={null}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      cacheOptions
                      value={value}
                      isClearable
                      options={colors.map(({ id, colorName }) => ({
                        value: id,
                        label: colorName
                      }))}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.colors && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.colors.message}
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
export default UpdateSectionOne;

import React, { useState, useEffect } from 'react';
import { Stepper, Loader } from '../../components';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SectionOne from './SectionOne';
import Sectiontwo from './Sectiontwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import SectionFive from './SectionFive';
import Confirmation from './Confirmation';

const Add = () => {
  const { currentStep, setCurrentStep } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const [carTypes, setCarTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [years, setYears] = useState([]);
  const [gearbox, setGearbox] = useState([]);
  const [trims, setTrims] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [features, setFeatures] = useState([]);

  const [loading, setLoading] = useState(false);
  const override = {
    //position: 'absolute',
    //width: '100%',
    //height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '26px'
    //backgroundColor: 'rgba(0,0,0,.5)'
  };

  const stepArray = [
    'Basic I',
    'Basic II',
    'Basic III',
    'Features',
    'Gallary',
    'Confirm'
  ];
  const pageVariants = {
    initial: { opacity: 0, y: 45 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 45 }
  };
  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5
  };

  const fetchSettings = async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/Offer/GetOfferSettings', {
        signal: controller.signal
      });
      setLoading(false);
      setCarTypes(response?.data?.carTypes);
      setBrands(response?.data?.brands);
      setModels(response?.data?.models);
      setColors(response?.data?.colors);
      setYears(response?.data?.years);
      setGearbox(response?.data?.gearbox);
      setTrims(response?.data?.trims);
      setSpecs(response?.data?.specs);
      setLocations(response?.data?.locations);
      setCurrencies(response?.data?.currencies);
      setFeatures(response?.data?.features);
      // console.log(response?.data);
    } catch (error) {
      setLoading(false);
      controller.abort();
      console.log(error);
    }

    return () => {
      controller.abort();
    };
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return (
          <SectionOne
            carTypes={carTypes}
            brands={brands}
            setModels={setModels}
            models={models}
            colors={colors}
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
          />
        );
      case 2:
        return (
          <Sectiontwo
            years={years}
            gearbox={gearbox}
            trims={trims}
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
          />
        );
      case 3:
        return (
          <SectionThree
            specs={specs}
            locations={locations}
            currencies={currencies}
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
          />
        );
      case 4:
        return (
          <SectionFour
            features={features}
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
          />
        );
      case 5:
        return (
          <SectionFive
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
          />
        );
      case 6:
        return (
          <Confirmation
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
            features={features}
            setFeatures={setFeatures}
          />
        );
      default:
        break;
    }
  };

  const handleClick = (clickType) => {
    let newStep = currentStep;
    clickType === 'next' ? newStep++ : newStep--;
    // Check if steps are within the boundary
    if (newStep > 0 && newStep <= stepArray.length) {
      setCurrentStep(newStep);
    }
  };

  return (
    <div className="w-10/12 mx-auto shadow-xl rounded-2xl pb-2 mb-10 bg-gray-200">
      <div className="container horizontal">
        <Stepper steps={stepArray} currentStepNumber={currentStep} />
      </div>
      <Loader loading={loading} override={override} />
      {/* <div className="inline-block relative"> */}
      {displaySteps(currentStep)}
      {/* </div> */}
    </div>
  );
};
export default Add;

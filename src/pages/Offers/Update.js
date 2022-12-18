import React, { useState, useEffect } from 'react';
import { Stepper, Loader } from '../../components';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import UpdateSectionOne from './UpdateSectionOne';
import UpdateSectionTwo from './UpdateSectionTwo';
import UpdateSectionThree from './UpdateSectionThree';
import UpdateConfirmation from './UpdateConfirmation';
import { useLocation } from 'react-router-dom';

const Update = () => {
  const { state } = useLocation();
  const { id } = state;
  const { currentStep, setCurrentStep, setMultiValues } = useAuth();

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

  const stepArray = ['Basic I', 'Basic II', 'Basic III', 'Confirm'];
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
      //console.log(response?.data);
    } catch (error) {
      setLoading(false);
      controller.abort();
      console.log(error);
    }

    return () => {
      controller.abort();
    };
  };

  const fetchOffer = async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      const response = await axiosPrivate.get(`/Offer/GetOffer?bid=${id}`, {
        signal: controller.signal
      });
      setLoading(false);
      var dt = response.data;
      setMultiValues({
        id,
        description: dt.description,
        carTypes: { label: dt.cartype.typeName, value: dt.cartype.id },
        brands: {
          label: dt.brandModel.brand.name,
          value: dt.brandModel.brand.id
        },
        models: {
          label: dt.brandModel.modelName,
          value: dt.brandModel.id
        },
        trims: { label: dt.trim.trimName, value: dt.trim.id },
        years: { label: dt.year.yearName, value: dt.year.id },
        colors: { label: dt.colors.colorName, value: dt.colors.id },
        gearbox: { label: dt.gearbox.gearboxName, value: dt.gearbox.id },
        specs: { label: dt.specs.specsName, value: dt.specs.id },
        locations: { label: dt.location.locationName, value: dt.location.id },
        seats: dt.seats,
        kilometer: dt.kilometer,
        price: dt.price,
        currencies: { label: dt.currency.currencyName, value: dt.currency.id },
        ytLink: dt.ytLink,
        isActive: dt.isActive
      });
      //console.log(response?.data);
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
    fetchOffer();
  }, []);

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return (
          <UpdateSectionOne
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
          <UpdateSectionTwo
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
          <UpdateSectionThree
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
          <UpdateConfirmation
            handleClick={handleClick}
            pageVariants={pageVariants}
            pageTransition={pageTransition}
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

      {/* <div className="inline-block relative"> */}
      <Loader loading={loading} override={override} />
      {displaySteps(currentStep)}
      {/* </div> */}
    </div>
  );
};
export default Update;

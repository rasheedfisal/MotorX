import React from 'react';
import '../../OfferDetails.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Loader } from '../../components';

const Details = () => {
  const { state } = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { id } = state;
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(false);

  const override = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)'
  };

  //   const imgs = document.querySelectorAll('.img-select a');
  //   const imgBtns = [...imgs];

  //   imgBtns.forEach((imgItem) => {
  //     imgItem.addEventListener('click', (event) => {
  //       event.preventDefault();
  //       setImgId(imgItem.dataset.id);
  //       slideImage();
  //     });
  //   });

  function slideImage(e, imgNo) {
    e.preventDefault();
    const displayWidth = document.querySelector(
      '.img-showcase img:first-child'
    ).clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${
      -(imgNo - 1) * displayWidth
    }px)`;
  }

  window.addEventListener('resize', slideImage);

  const ReadResponseList = async () => {
    let isMounted = true;
    setLoading(true);
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/Offer/GetOffer?bid=${id}`, {
        ContentType: 'application/json',
        signal: controller.signal
      });

      isMounted && setOffer(response?.data);
      //console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  useEffect(() => {
    ReadResponseList();
  }, []);

  return (
    <div className="card-wrapper">
      <Loader loading={loading} override={override} />
      <div className="card">
        {/* <!-- card left --> */}
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              {offer?.imageGallaries?.map((gal, index) => (
                <img key={index} src={gal.filePath} alt="shoe image" />
              ))}
            </div>
          </div>
          <div className="img-select">
            {offer?.imageGallaries?.map((gal, index) => (
              <div className="img-item" key={index}>
                <a href="#" onClick={(e) => slideImage(e, index + 1)}>
                  <img src={gal.filePath} alt="shoe image" />
                </a>
              </div>
            ))}
          </div>
          <NavLink className="mt-4 w-full underline text-blue-500" to="/Offers">
            Return to Manage Offers
          </NavLink>
        </div>
        {/* <!-- card right --> */}
        <div className="product-content" style={{ marginTop: '15%' }}>
          <h2 className="product-title">{offer?.brandModel?.modelName}</h2>
          <p className="product-link">{offer?.brandModel?.brand?.name}</p>

          <div className="product-price">
            <p className="new-price">
              Price:{' '}
              <span>
                {offer?.price} {offer?.currency?.currencyName}
              </span>
            </p>
          </div>

          <div className="product-detail">
            <h2>Description: </h2>
            <p>{offer?.description}</p>
            <ul>
              <li>
                Category: <span>{offer?.cartype?.typeName}</span>
              </li>
              <li>
                Color: <span>{offer?.colors?.colorName}</span>
              </li>
              <li>
                Year: <span>{offer?.year?.yearName}</span>
              </li>
              <li>
                Trim: <span>{offer?.trim?.trimName || '---'}</span>
              </li>
              <li>
                Specs: <span>{offer?.specs?.specsName || '---'}</span>
              </li>
              <li>
                Gearbox: <span>{offer?.gearbox?.gearboxName || '---'}</span>
              </li>
              <li>
                Location: <span>{offer?.location?.locationName || '---'}</span>
              </li>
              <li>
                Seats: <span>{offer?.seats || '---'}</span>
              </li>
              <li>
                Kilometer: <span>{offer?.kilometer || '---'}</span>
              </li>
              <li>
                Youtube Link: <span>{offer?.ytLink || '---'}</span>
              </li>
              <li>
                Status:{' '}
                {offer?.isActive ? (
                  <span className="text-green-700">Active</span>
                ) : (
                  <span className="text-red-700">Not Active</span>
                )}
              </li>
            </ul>
          </div>

          <div className="purchase-info">
            <div className="flex justify-start  items-start">
              {offer?.featuresTypes?.map((type, i) => (
                <div key={type.i} className="flex flex-col m-3">
                  <h3 className="text-2xl bg-slate-600 rounded text-center text-white p-1">
                    {type.typeName}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="product-detail">
                      <ul>
                        {type.features.map((feat, i) => (
                          <li key={feat.i}>{feat.featureName}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="social-links">
            <p>Share At: </p>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Details;

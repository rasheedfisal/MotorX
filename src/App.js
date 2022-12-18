import './App.css';
import {
  Home,
  Login,
  Brands,
  AddBrand,
  UpdateBrand,
  Models,
  AddBrandModel,
  UpdateBrandModel,
  Gearbox,
  AddGearbox,
  UpdateGearbox,
  Specs,
  AddSpecs,
  UpdateSpecs,
  Trim,
  AddTrim,
  UpdateTrim,
  Location,
  AddLocation,
  UpdateLocation,
  FeatureType,
  AddFeatureType,
  UpdateFeatureType,
  Category,
  AddCategory,
  UpdateCategory,
  Features,
  AddFeature,
  UpdateFeature,
  Colors,
  AddColor,
  UpdateColor,
  Currency,
  AddCurrency,
  UpdateCurrency,
  Years,
  AddYear,
  UpdateYear,
  AddOffer,
  ManageOffer,
  UpdateOffer,
  OfferFeatures,
  Gallary,
  Details,
  OfferStats,
  Notification,
  AddNotification,
  Users,
  UpdateUser,
  Profile,
  AddUser
} from './pages';
import { RequireAuth, Layout, PersistLogin } from './components';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* public Route For Login With Different Layout */}
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            {/* brands */}
            <Route path="Brands" element={<Brands />} />
            <Route path="Brands/Add" element={<AddBrand />} />
            <Route path="Brands/Update" element={<UpdateBrand />} />

            {/* models */}
            <Route path="Models" element={<Models />} />
            <Route path="Models/Add" element={<AddBrandModel />} />
            <Route path="Models/Update" element={<UpdateBrandModel />} />

            {/* gearbox */}
            <Route path="Gearbox" element={<Gearbox />} />
            <Route path="Gearbox/Add" element={<AddGearbox />} />
            <Route path="Gearbox/Update" element={<UpdateGearbox />} />

            {/* Specs */}
            <Route path="Specs" element={<Specs />} />
            <Route path="Specs/Add" element={<AddSpecs />} />
            <Route path="Specs/Update" element={<UpdateSpecs />} />

            {/* trim */}
            <Route path="Trim" element={<Trim />} />
            <Route path="Trim/Add" element={<AddTrim />} />
            <Route path="Trim/Update" element={<UpdateTrim />} />

            {/* Location */}
            <Route path="Location" element={<Location />} />
            <Route path="Location/Add" element={<AddLocation />} />
            <Route path="Location/Update" element={<UpdateLocation />} />

            {/* FeatureType */}
            <Route path="FeatureType" element={<FeatureType />} />
            <Route path="FeatureType/Add" element={<AddFeatureType />} />
            <Route path="FeatureType/Update" element={<UpdateFeatureType />} />

            {/* CarType */}
            <Route path="Category" element={<Category />} />
            <Route path="Category/Add" element={<AddCategory />} />
            <Route path="Category/Update" element={<UpdateCategory />} />

            {/* Features */}
            <Route path="Features" element={<Features />} />
            <Route path="Features/Add" element={<AddFeature />} />
            <Route path="Features/Update" element={<UpdateFeature />} />

            {/* Colors */}
            <Route path="Colors" element={<Colors />} />
            <Route path="Colors/Add" element={<AddColor />} />
            <Route path="Colors/Update" element={<UpdateColor />} />

            {/* Currency */}
            <Route path="Currency" element={<Currency />} />
            <Route path="Currency/Add" element={<AddCurrency />} />
            <Route path="Currency/Update" element={<UpdateCurrency />} />

            {/* Years */}
            <Route path="Years" element={<Years />} />
            <Route path="Years/Add" element={<AddYear />} />
            <Route path="Years/Update" element={<UpdateYear />} />

            {/* Offers */}
            <Route path="Offers" element={<ManageOffer />} />
            <Route path="Offers/Add" element={<AddOffer />} />
            <Route path="Offers/Update" element={<UpdateOffer />} />
            <Route path="Offers/Features" element={<OfferFeatures />} />
            <Route path="Offers/Gallary" element={<Gallary />} />
            <Route path="Offers/Details" element={<Details />} />

            {/* Statistics */}
            <Route path="Statistic/OfferStats" element={<OfferStats />} />

            {/* Notification */}
            <Route path="Notifications" element={<Notification />} />
            <Route path="Notifications/Add" element={<AddNotification />} />

            {/* Users */}
            <Route path="Users" element={<Users />} />
            <Route path="Users/Add" element={<AddUser />} />
            <Route path="Users/Update" element={<UpdateUser />} />
            <Route path="Users/Profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

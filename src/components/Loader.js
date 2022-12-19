import useAuth from '../hooks/useAuth';

import BeatLoader from 'react-spinners/BeatLoader';

const Loader = ({ loading, override }) => {
  const { currentColor } = useAuth();
  return (
    <BeatLoader
      color={currentColor}
      size={20}
      loading={loading}
      cssOverride={override}
    />
  );
};

export default Loader;

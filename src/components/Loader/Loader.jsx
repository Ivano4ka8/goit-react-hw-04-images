import { ColorRing } from 'react-loader-spinner';

export const Loader = () => (
  <ColorRing
    visible={true}
    height="100"
    width="100"
    ariaLabel="blocks-loading"
    wrapperStyle={{}}
    wrapperClass="blocks-wrapper"
    colors={['#8a6644', '#663300', '#f8b26a', '#993300', '#CC3300']}
  />
);

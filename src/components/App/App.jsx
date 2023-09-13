import { useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Gallery } from 'components/ImageGallery/ImageGallery';
import { ButtonLoadMore } from 'components/Button/Button.styled';
import { Loader } from 'components/Loader/Loader';
import * as ApiService from 'services/images';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const height = Math.max(
//   document.body.scrollHeight,
//   document.body.offsetHeight,
//   document.documentElement.clientHeight,
//   document.documentElement.scrollHeight,
//   document.documentElement.offsetHeight
// );
// window.scrollTo(0, height);

const PER_PAGE = 12;

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const getImages = async (value, page) => {
      setLoading(true);

      try {
        const { hits, totalHits } = await ApiService.getImages(
          value,
          page,
          signal
        );

        if (hits.length === 0) {
          setEmpty(true);
          setLoading(false);

          toast.error('Images are not found. Enter other word', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: Date.now(),
          });
        }

        setImages([...images, ...hits]);
        setVisible(page < Math.ceil(totalHits / PER_PAGE));
      } catch (error) {
        console.log({ error });
        if (error.code !== 'ERR_CANCELED') {
          toast.error('Something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: Date.now(),
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getImages(value, page, controller);

    return () => {
      controller.abort();
    };
  }, [page, value]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = value => {
    if (!value) {
      toast.warn('Enter the word', {
        position: toast.POSITION.TOP_RIGHT,
        toastId: Date.now(),
      });
      return;
    }

    setValue(value);
    setPage(1);
    setImages([]);
    setEmpty(false);
  };

  const onLoadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Gallery images={images} />
      {!isEmpty && isVisible && (
        <ButtonLoadMore onClick={onLoadMore}>Load More</ButtonLoadMore>
      )}
      {isLoading && <Loader />}
      <ToastContainer transition={Zoom} theme="dark" />
    </>
  );
};

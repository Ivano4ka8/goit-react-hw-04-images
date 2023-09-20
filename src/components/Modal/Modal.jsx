import { ModalWrapper, ModalContent } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, toogleModal }) => {
  useEffect(() => {
    const handlerKeyDown = event => {
      if (event.code === 'Escape') {
        toogleModal();
      }
    };
    window.addEventListener('keydown', handlerKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
      document.body.style.overflow = '';
    };
  }, [toogleModal]);

  const handlerBackdropClick = event => {
    if (event.currentTarget === event.target) {
      toogleModal();
    }
  };

  return createPortal(
    <ModalWrapper onClick={handlerBackdropClick}>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>,
    modalRoot
  );
};

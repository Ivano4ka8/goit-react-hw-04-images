import { ModalWrapper, ModalContent } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDown);
    document.body.style.overflow = '';
  }

  handlerKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.toogleModal();
    }
  };
  handlerBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.toogleModal();
    }
  };

  render() {
    console.log(this.props);
    const { children } = this.props;
    return createPortal(
      <ModalWrapper onClick={this.handlerBackdropClick}>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>,
      modalRoot
    );
  }
}

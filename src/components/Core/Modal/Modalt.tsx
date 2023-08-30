import '../../../styles/modal.css';

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}) => {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;

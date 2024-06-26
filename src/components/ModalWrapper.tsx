import { useNavigate } from 'react-router';

type ModalWrapperType = {
  children: React.ReactNode | React.ReactNode[];
};

const ModalWrapper = ({ children }: ModalWrapperType) => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div
      id='modal-background'
      className='fixed inset-0 z-10 w-screen overflow-y-auto bg-opacity-50 bg-black'
      onClick={closeModal}
    >
      <div
        id='modal-container'
        className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 '
      >
        <div
          id='modal-outer'
          className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            id='modal-inner'
            className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;

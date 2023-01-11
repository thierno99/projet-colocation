import { FC } from 'react';
import './modal.css'
interface ModalProps {
    closeModal:  () => void;
    children: JSX.Element;
}
const Modal: FC<ModalProps> = (props) => {
    const { closeModal, children } = props;
    const body = document.querySelector('body');
    if(body) {
        body.classList.add('active-modal');
    }
    return (
        <div className='modal'>
            <div className="overlay">
                <div className="modal-content relative">
                    <>
                        <div className="absolute top-0 right-0 px-1 py-half danger pointer" onClick={closeModal}>X</div>
                        {children}
                    </>
                </div>
            </div>
        </div>
    );
}

export default  Modal;
import React from 'react';
import cl from './Modal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.modalContainer]

    if (visible) {
        rootClasses.push(cl.modalActive);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
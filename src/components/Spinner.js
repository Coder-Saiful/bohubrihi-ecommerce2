import React from 'react';

const Spinner = () => {
    return (
        <div className='text-center' disabled>
            <span className="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>
            <span className='ms-2' style={{ fontSize: '30px', fontWeight: 500 }}>Loading...</span>
        </div>
    );
};

export default Spinner;
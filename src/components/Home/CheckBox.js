import React, { useEffect, useState } from 'react';

const CheckBox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([]);
    const checkIds = [...checked];

    const handleToggle = id => {
        const foundId = checked.indexOf(id);
        if (foundId === -1) {
            checkIds.push(id);
        } else {
            checkIds.splice(foundId, 1);
        }

        setChecked(checkIds);
        handleFilters(checkIds);
    }


    return (
        categories.map(category => {
            return (
                <li key={category._id} className='list-unstyled d-inline-block m-2'>
                    <input type="checkbox" value={checked.indexOf(category._id) === -1} className='form-check-input me-1' onChange={() => handleToggle(category._id)} />
                    <label style={{ cursor:'pointer' }} className='form-check-label'>{category.name}</label>
                </li>
            )
        })
    );
};

export default CheckBox;
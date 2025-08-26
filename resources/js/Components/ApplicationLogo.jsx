import React from 'react';
import image from '../../../public/images/logo.png';

export default function ApplicationLogo(props) {
    return (
        <div className="flex items-center justify-center">
            <img
                src={image}
                alt="Tahliyah Tours"
                {...props}
                className="w-16 h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
            />
        </div>
    );
}

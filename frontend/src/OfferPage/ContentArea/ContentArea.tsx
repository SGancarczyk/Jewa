import React, { useState } from 'react';
import './ContentArea.css';
import ImageSlider from './FullInformationBoard/ImageRotor/ImageRotor';
import InformationField from './FullInformationBoard/InformationField/InformationField';
import FullInformationBoard from './FullInformationBoard/FullInformationBoard';
import test1 from '../../assets/Opel-Insignia-2013 1-1.png';
import test2 from '../../assets/Citroën_Grand_C4_Picasso_HDi_110_Tendance_(Facelift)_–_Frontansicht,_16._April_2011,_Düsseldorf 1-1.png';
import test3 from '../../assets/image 1.png';

function ContentArea() {
    const images = [
        test1,
        test2,
        test3
    ];


    return (
        <div className="content-area-offer-page">
            <FullInformationBoard />

        </div>

    );
}

export default ContentArea;

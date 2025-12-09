import React, { useState, useRef, useEffect } from 'react';
import './ContentArea.css';
import test1 from '../../../assets/Opel-Insignia-2013 1-1.png';
import test2 from '../../../assets/Citroën_Grand_C4_Picasso_HDi_110_Tendance_(Facelift)_–_Frontansicht,_16._April_2011,_Düsseldorf 1-1.png';
import test3 from '../../../assets/image 1.png';
import test4 from '../../../assets/ZWRkLmpwdTYzCTpeXwx4InBRbkIRFHcxOwcpQhMWKHokDj4eGRg0eGcKfwlERGw0Z1x5XUIWa29hWn9ZEhI-M3wBPApSCg 1-1.png';
import test5 from '../../../assets/3zZgb8NJ-E9MEe28Gpw-(edit) 1.png';
import OfferTemplate from './OfferTemplate/OfferTemplate';
import { Icon } from '../../Selector/Icons/Icon';

interface ContentAreaProps {
    onExpand?: () => void;
}

function ContentArea({ onExpand }: ContentAreaProps) {
    const [expanded, setExpanded] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);
    const [initialMaxHeight, setInitialMaxHeight] = useState<string>('0px');

    const offers = [
  { imageUrl: test3, title: "Audi A6", price: "54 900 zł" },
  { imageUrl: test1, title: "BMW X5", price: "87 500 zł" },
  { imageUrl: test5, title: "Toyota Corolla", price: "32 400 zł" },
  { imageUrl: test2, title: "Opel Astra", price: "21 900 zł" },
  { imageUrl: test4, title: "Mercedes C-Class", price: "66 200 zł" },
  { imageUrl: test1, title: "Ford Mustang", price: "129 900 zł" },
  { imageUrl: test2, title: "Volkswagen Passat", price: "44 700 zł" },
  { imageUrl: test5, title: "Mazda 6", price: "38 200 zł" },
  { imageUrl: test3, title: "Honda Civic", price: "28 900 zł" },
  { imageUrl: test4, title: "Kia Sportage", price: "56 300 zł" },
  { imageUrl: test2, title: "Hyundai Tucson", price: "58 800 zł" },
  { imageUrl: test3, title: "Peugeot 3008", price: "49 100 zł" },
  { imageUrl: test5, title: "Renault Megane", price: "26 900 zł" },
  { imageUrl: test1, title: "Skoda Octavia", price: "41 500 zł" },
  { imageUrl: test4, title: "Volvo XC60", price: "92 400 zł" },
  { imageUrl: test3, title: "Audi Q3", price: "73 800 zł" },
  { imageUrl: test5, title: "BMW 3 Series", price: "61 200 zł" },
  { imageUrl: test1, title: "Toyota RAV4", price: "79 300 zł" },
  { imageUrl: test2, title: "Ford Focus", price: "24 600 zł" },
  { imageUrl: test4, title: "Mercedes E-Class", price: "118 900 zł" },
  { imageUrl: test3, title: "Nissan Qashqai", price: "52 100 zł" },
  { imageUrl: test5, title: "Mazda CX-5", price: "64 800 zł" },
  { imageUrl: test1, title: "Volkswagen Golf", price: "29 700 zł" },
  { imageUrl: test2, title: "Honda Accord", price: "47 300 zł" },
  { imageUrl: test4, title: "Kia Ceed", price: "27 900 zł" },
  { imageUrl: test3, title: "Hyundai i30", price: "25 400 zł" },
  { imageUrl: test5, title: "Opel Insignia", price: "35 600 zł" },
  { imageUrl: test2, title: "Volvo V60", price: "84 200 zł" },
  { imageUrl: test4, title: "BMW X3", price: "95 700 zł" },
  { imageUrl: test1, title: "Audi A4", price: "58 900 zł" }
];

    useEffect(() => {
        if (gridRef.current) {
            const firstOffer = gridRef.current.firstElementChild as HTMLElement;
            if (firstOffer) {
                const rowHeight = firstOffer.offsetHeight + 16; 
                const visibleRows = 2;
                const extraSpace = 60;
                setInitialMaxHeight(`${rowHeight * visibleRows + extraSpace}px`);
            }
        }
    }, []);

    const handleExpand = () => {
        if (gridRef.current) {
            gridRef.current.style.maxHeight = `${gridRef.current.scrollHeight}px`;
            setExpanded(true);
            if (onExpand) onExpand(); // <-- tutaj wywołujemy callback
        }
    };

    return (
        <div className="content-area">
            <div
                className="offers-grid"
                ref={gridRef}
                style={{
                    maxHeight: expanded ? undefined : initialMaxHeight,
                    overflow: expanded ? 'visible' : 'hidden',
                    transition: 'max-height 0.5s ease',
                }}
            >
                {offers.map((offer, index) => (
                    <OfferTemplate
                        key={index}
                        imageUrl={offer.imageUrl}
                        title={offer.title}
                        price={offer.price}
                    />
                ))}
            </div>

            {!expanded && (
                <button
                    className="scroll-toggle-button"
                    onClick={handleExpand}
                    style={{
                        position: 'absolute',
                        height: '24rem',
                        bottom: '0rem',
                        left: 0,
                        width: '100%',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <span className="button-text">POKAŻ WIĘCEJ</span>
                    <div className="button-icon" style={{ marginTop: '0.5rem', marginLeft: '3.5rem' }}>
                        <Icon name="chevronDown" width={120} height={120} color="#000000ff" />
                    </div>
                </button>
            )}
        </div>
    );
}

export default ContentArea;

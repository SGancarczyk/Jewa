import React from 'react';
import './UpperBar.css';

function UpperBar({ title }: { title: string }) {
    return (
        <div className="upper-bar-offerpage">
            <h1 className="page-title-offerpage">{title}</h1>
        </div>
    );
}

export default UpperBar;
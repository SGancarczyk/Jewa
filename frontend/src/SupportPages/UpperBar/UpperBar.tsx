import React from 'react';
import './UpperBar.css';

function UpperBar({ title }: { title: string }) {
    return (
        <div className="upper-bar">
            <h1 className="page-title-suppage">{title}</h1>
        </div>
    );
}

export default UpperBar;
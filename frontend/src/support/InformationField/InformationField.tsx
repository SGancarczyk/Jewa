import { useState } from "react";
import './InformationField.css';

interface InformationFieldProps {
    price : number;
    fuelType : string;
    make : string;
    model : string;
    productionYear : number;
    vehicleType : string;
    bodyType : string;
    city : string;
    address : string;
}

const InformationField = (props : InformationFieldProps) => {

  return (
    <div className="info-box">
      <div className="info-cell-name">Cena za dzień:</div>
      <div className="info-cell-info">{props.price} zł</div>
      <div className="info-cell-name">Rodzaj paliwa: </div>
      <div className="info-cell-info">{props.fuelType}</div>
      <div className="info-cell-name">Marka: </div>
      <div className="info-cell-info">{props.make}</div>
      <div className="info-cell-name">Model:  </div>
      <div className="info-cell-info">{props.model}</div>  
      <div className="info-cell-name">Rok Produkcji: </div>
      <div className="info-cell-info">{props.productionYear}</div>
      <div className="info-cell-name">Typ Pojazdu: </div>
      <div className="info-cell-info">{props.vehicleType}</div>
      <div className="info-cell-name">Typ nadwozia: </div>
      <div className="info-cell-info">{props.bodyType}</div>
      <div className="info-cell-name">Miasto: </div>
      <div className="info-cell-info">{props.city}</div>
      <div className="info-cell-name">Adres: </div>
      <div className="info-cell-info">{props.address}</div>
    </div>

      
  );
};

export default InformationField;
import { useEffect, useState } from "react";
import "./PaymentForm.css";

const onlyDigits = (str: string): string => str.replace(/\D/g, "");

interface PaymentFormProps {
  onChange: (state: {
    last4Digits: string;
    isComplete: boolean;
  }) => void;
  paymentValue : number;
}

export const PaymentForm = ({ onChange, paymentValue }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const formatPostalCode = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 5);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);

    const groups = digits.match(/.{1,4}/g);

    return groups ? groups.join(" ") : "";
  };

  const last4Digits = formData.cardNumber.replace(/\s/g, "").slice(-4);

  const isComplete = Object.values(formData).every(
    value => value.trim() !== ""
  );

  useEffect(() => {
    onChange({
      last4Digits,
      isComplete,
    });
  }, [last4Digits, isComplete, onChange]);

  return (
    <form className="payment-form">
      <div className="input-group">
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          inputMode="numeric"
          maxLength={19} // 16 cyfr + 3 spacje
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              cardNumber: formatCardNumber(e.target.value),
            }));
          }}
        />
        <label>Numer karty</label>
      </div>

      <div className="row">
        <div className="input-group">
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            inputMode="numeric"
            maxLength={5}
            onChange={(e) => {
              setFormData(prev => ({
                ...prev,
                expiryDate: formatExpiryDate(e.target.value),
              }));
            }}
          />
          <label>Data ważności</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            inputMode="numeric"
            maxLength={3}
            onChange={(e) => {
              const digits = onlyDigits(e.target.value).slice(0, 3);
              setFormData(prev => ({
                ...prev,
                cvv: digits,
              }));
            }}
          />
          <label>CVV</label>
        </div>
      </div>

      <div className="row">
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label>Imię</label>
        </div>

        <div className="input-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <label>Nazwisko</label>
        </div>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <label>Adres</label>
      </div>

      <div className="input-group">
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          inputMode="numeric"
          maxLength={6}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              postalCode: formatPostalCode(e.target.value),
            }));
          }}
        />
        <label>Kod pocztowy</label>
      </div>
      <div className="summary">
        <span>Do zapłaty</span>
        <strong>{paymentValue},00 PLN</strong>
      </div>
    </form>
  );
};

export default PaymentForm;
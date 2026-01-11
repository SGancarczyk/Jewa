```markdown
# Reservation API Documentation

## Base URL

/api/reservation

---

## Endpoints

### 1. Request a Pending Reservation

**POST** `/request`

**Description:** Create a pending reservation for an offer. Validates overlap and card info.  

**Request Body (JSON):**

```json
{
  "offerId": 1,
  "startDate": "2026-01-10",
  "endDate": "2026-01-12",
  "cardToken": "tok_example",
  "cardLast4Digits": "1234"
}
```

**Response (201 Created):**

```json
{
  "id": 10,
  "user": null,
  "offer": {
    "id": 1,
    "title": "Sample Offer"
  },
  "startDate": "2026-01-10",
  "endDate": "2026-01-12",
  "cardToken": null,
  "cardLast4Digits": "1234"
}
```

**Possible Errors:**

- `400 Bad Request` – Missing or invalid fields, start date after end date, invalid card info  
- `409 Conflict` – Dates overlap with existing reservations  
- `404 Not Found` – Offer not found  

---

### 2. Accept a Pending Reservation

**POST** `/accept/{pendingReservationId}`

**Description:** Accept a pending reservation, charges payment, and creates a confirmed reservation. Only the offer owner can accept.  

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pendingReservationId` | Long | ID of the pending reservation to accept |

**Response (201 Created):**

```json
{
  "id": 5,
  "user": {
    "id": 2,
    "username": "johndoe"
  },
  "offer": {
    "id": 1,
    "title": "Sample Offer"
  },
  "startDate": "2026-01-10",
  "endDate": "2026-01-12"
}
```

**Possible Errors:**

- `400 Bad Request` – User not authenticated  
- `403 Forbidden` – Offer does not belong to the user  
- `404 Not Found` – Pending reservation not found  
- `409 Conflict` – Overlapping reservation exists  

---

### 3. Decline a Pending Reservation

**POST** `/decline/{pendingReservationId}`

**Description:** Decline a pending reservation. Only the offer owner can decline it. The reservation will be deleted from pending reservations.  

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pendingReservationId` | Long | ID of the pending reservation to decline |

**Response (201 Created):**

```json
"Reservation has been declined successfully"
```

**Possible Errors:**

- `400 Bad Request` – User not authenticated  
- `403 Forbidden` – Offer does not belong to the user  
- `404 Not Found` – Pending reservation not found  

---

### 4. Get Pending Reservations

**POST** `/get_pending/{offerId}`

**Description:** Retrieve all pending reservations for an offer. Only the offer owner can access.  

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `offerId` | Long | ID of the offer |

**Response (200 OK):**

```json
[
  {
    "id": 10,
    "user": null,
    "offer": {
      "id": 1,
      "title": "Sample Offer"
    },
    "startDate": "2026-01-10",
    "endDate": "2026-01-12",
    "cardToken": null,
    "cardLast4Digits": "1234"
  }
]
```

**Possible Errors:**

- `400 Bad Request` – Missing offerId  
- `403 Forbidden` – Offer does not belong to the user  
- `404 Not Found` – Offer not found  

---

### 5. Get Confirmed Reservations

**POST** `/get_reservations/{offerId}`

**Description:** Retrieve all confirmed reservations for an offer.  

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `offerId` | Long | ID of the offer |

**Response (200 OK):**

```json
[
  {
    "id": 5,
    "user": {
      "id": 2,
      "username": "johndoe"
    },
    "offer": {
      "id": 1,
      "title": "Sample Offer"
    },
    "startDate": "2026-01-10",
    "endDate": "2026-01-12"
  }
]
```

**Possible Errors:**

- `400 Bad Request` – Missing offerId  
- `404 Not Found` – Offer not found  

---
```

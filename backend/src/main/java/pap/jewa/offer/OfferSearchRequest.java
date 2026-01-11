package pap.jewa.offer;

import lombok.Data;
import pap.jewa.vehicle.VehicleType;

@Data
public class OfferSearchRequest {
    private int page = 0;

    private int limit = 10;

    private Long id;

    private VehicleType vehicleType;

    private String make;

    private String model;

    private int year;
}
package pap.jewa.offer;

import lombok.Data;
import pap.jewa.vehicle.VehicleType;

@Data
public class OfferSearchRequest {
    private Integer page = 0;

    private Integer limit = 10;

    private Long id;

    private VehicleType vehicleType;

    private String make;

    private String model;

    private Integer year;

    private Integer ownerId;
}
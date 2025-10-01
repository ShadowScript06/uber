const express = require("express");
const router = express.Router();
const { userAuth, captainAuth } = require("../middlewares/auth");
const ridepostSchema = require("../validations/ridepost.validation");
const Ride = require("../db/models/Ride");
const { route } = require("./captain.route");
const Vehicle = require("../db/models/vehicle.model");
const Captain = require("../db/models/Captain.model");

//POST A RIDE

router.post("/", userAuth, async (request, response) => {
  try {
    const { pickup, dropoff, fare, vehicleType } = request.body;
    const data = {
      pickup,
      dropoff,
      fare,
      vehicleType,
    };

    const parsedData = ridepostSchema.safeParse(data);

    if (!parsedData.success) {
      response.status(400).json({
        message: "Invalid Input, please try again.",
      });
      return;
    }

    const inputData = {
      pickup,
      dropoff,
      fare,
      vehicleType,
      status: "pending",
      captain: null,
      user: request.user._id,
    };

    const newRide = await Ride.create(inputData);

    response.status(200).json({
      message: "Ride Requested please wait for booking.",
      rideId: newRide._id,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// FETCH ALL PENDING RIDES

router.get("/", captainAuth, async (request, response) => {
  console.log("fetch ride api hit");
  try {
    const { vehicleType } = request.query;

    const rides = await Ride.find({ vehicleType, status: "pending" });

    if (rides.length < 1) {
      response.status(404).json({
        message: "No rides available",
      });

      return;
    }

    response.status(200).json({
      rides,
      message: "Rides fetched succesfully.",
    });
    return;
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

//ACCEPT THE RIDE
router.patch("/:rideId", captainAuth, async (request, response) => {
  try {
    const captain = request.captain;
    const rideId = request.params.rideId;

    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      { $set: { status: "booked", captain: captain._id } },
      { new: true }
    );

    if (updatedRide) {
      response.status(200).json({
        message: "Ride Accepted",
        rideId,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error.",
    });
  }
});

//POLLING

router.get("/:rideId", userAuth, async (request, response) => {
  try {
    const rideId = request.params.rideId;

    const ride = await Ride.findById(rideId);

    if (ride.status === "pending") {
      response.status(204).json({
        status: "pending",
      });
    }
    if (ride.status === "booked") {
      const captainInfo = await Captain.findById(ride.captain);
      const vehicleInfo = await Vehicle.findOne({ captain: ride.captain });

      const rideInfo = {
        captain: captainInfo.firstname + " " + captainInfo.lastname,
        plate: vehicleInfo.plate,
      };

      response.status(200).json({ rideInfo :rideInfo});
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error.",
    });
  }
});
module.exports = router;

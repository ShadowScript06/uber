const z = require("zod");



const ridepostSchema = z.object({
  pickup: z.string(),
  dropoff: z.string(),
  fare: z.string(),
  vehicleType: z.enum(["bike", "auto", "car"]),
});

module.exports = ridepostSchema;

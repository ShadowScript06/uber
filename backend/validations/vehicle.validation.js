const z = require("zod");

const vehicleSchema = z.object({
  color: z.string().min(3, "Color must be at least 3 characters long"),
  plate: z.string().min(3, "Plate must be at least 3 characters long"),
  vehicleType: z.enum(["bike", "auto", "car"]),
  capacity: z.number().min(1, "Capacity must be at least 1"),
});

module.exports = vehicleSchema;

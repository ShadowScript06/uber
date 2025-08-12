const z = require("zod");

const userSignupSchema = z.object({
  firstname: z
    .string({
      required_error: "Firstname is required", // Error if missing
      invalid_type_error: "Firstname must be a string",
    })
    .min(3, "Firstname must be at least 2 characters long "),
  lastname: z.string({
    invalid_type_error: "Firstname must be a string",
  }),
  email: z.email({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),
  password: z
    .string({
      required_error: "Password is required", // Error if missing
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long."),
  socketId: z.string({invalid_type_error: "socketId must be a string",}).optional(),
});

module.exports = userSignupSchema;

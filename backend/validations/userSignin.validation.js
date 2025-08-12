const z = require("zod");

const userSigninSchema = z.object({
  email: z.email({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  }),
  password: z
    .string({
      required_error: "Password is required", // Error if missing
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long.")
});

module.exports = userSigninSchema;
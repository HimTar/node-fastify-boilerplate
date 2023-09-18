export const Login = {
  title: "Login",
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
} as const;

export const Register = {
  title: "Register",
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "email", "password"],
  additionalProperties: false,
} as const;

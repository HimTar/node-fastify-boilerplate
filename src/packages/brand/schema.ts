export const Brand = {
  title: "Brand",
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    emailDomains: { type: "array", items: { type: "string" } },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    deactivatedAt: { type: ["string", "null"], format: "date-time" },
    deactivatedBy: { type: ["string", "null"] },
  },
  required: [
    "id",
    "name",
    "emailDomains",
    "createdAt",
    "updatedAt",
    "deactivatedAt",
    "deactivatedBy",
  ],
  additionalProperties: false,
} as const;

export const QueryBrand = {
  title: "QueryBrand",
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
  },
  required: ["id"],
  additionalProperties: false,
} as const;

export const CreateBrand = {
  title: "CreateBrand",
  type: "object",
  properties: {
    name: { type: "string" },
    emailDomains: { type: "array", items: { type: "string" } },
  },
  required: ["name", "emailDomains"],
  additionalProperties: false,
} as const;

import Commerce from "@chec/commerce.js";

// Store
export const commerce = new Commerce(process.env.REACT_APP_PUBLIC_KEY, true);

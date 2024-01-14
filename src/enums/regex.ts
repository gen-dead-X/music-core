export default {
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  EMAIL: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  USERNAME: /^[a-zA-Z0-9]+$/,
  PHONE_NUMBER: /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
};

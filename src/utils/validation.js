// ================================
// COMMON FORM VALIDATION FUNCTIONS
// ================================

// Validate name
export function validateName(name) {
  const value = name.trim();

  if (!value) {
    return "Name is required";
  }

  if (value.length < 2) {
    return "Name must contain at least 2 characters";
  }

  if (!/^[A-Za-z ]+$/.test(value)) {
    return "Name can contain only letters and spaces";
  }

  return "";
}


// Validate email
export function validateEmail(email) {
  const value = email.trim();

  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    return "Enter a valid email address";
  }

  return "";
}


// Validate strong password
export function validatePassword(password) {

  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must contain at least 8 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least 1 uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least 1 lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least 1 number";
  }

  if (!/[@$!%*?&]/.test(password)) {
    return "Password must contain at least 1 special character";
  }

  if (/\s/.test(password)) {
    return "Password must not contain spaces";
  }

  return "";
}


// Validate password confirmation
export function validateConfirmPassword(password, confirmPassword) {

  if (!confirmPassword) {
    return "Please confirm your password";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
}


// Validate car year
export function validateYear(year) {

  if (!year) {
    return "Year is required";
  }

  const value = Number(year);
  const currentYear = new Date().getFullYear();

  if (!Number.isInteger(value)) {
    return "Year must be a valid number";
  }

  if (value < 1886 || value > currentYear + 1) {
    return `Year must be between 1886 and ${currentYear + 1}`;
  }

  return "";
}


// Validate car price
export function validatePrice(price) {

  if (price === "" || price === null || price === undefined) {
    return "Price is required";
  }

  const value = Number(price);

  if (Number.isNaN(value)) {
    return "Price must be a valid number";
  }

  if (value <= 0) {
    return "Price must be greater than 0";
  }

  return "";
}


// Validate image URL
export function validateUrl(url) {

  if (!url.trim()) {
    return "Image URL is required";
  }

  try {
    new URL(url);
    return "";
  } catch {
    return "Enter a valid image URL";
  }
}
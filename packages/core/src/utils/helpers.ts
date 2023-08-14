export function isValidString (value) {
  if (!value || value.length === 0) return false;

  return value instanceof String ||
    (value !== null && value !== undefined && value.constructor === String);
}

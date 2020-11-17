export {
  mapInstanceToProps,
  isValidType,
};

function mapInstanceToProps (vm, props) {
  return props.reduce((newObject, prop) => ({
    ...newObject,
    [prop]: { get: () => vm[prop] },
  }), {});
}

function isValidType (type, value) {
  if (!value || value.length === 0) return false;

  return value instanceof type ||
    (value !== null && value !== undefined && value.constructor === type);
}

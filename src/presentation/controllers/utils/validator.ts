export function validateStringArray(objectToValidate: any): boolean {
  return (
    Array.isArray(objectToValidate) &&
    objectToValidate.every((item) => typeof item === 'string')
  );
}

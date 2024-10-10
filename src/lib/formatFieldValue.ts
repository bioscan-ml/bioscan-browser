export const formatFieldValue = (fieldValue?: string | string[]) =>
  typeof fieldValue === 'object' ? fieldValue.join(', ') : fieldValue

export const formatFieldValue = (fieldValue?: string | number | string[]) =>
  typeof fieldValue === 'object'
    ? fieldValue.join(', ')
    : fieldValue?.toLocaleString()

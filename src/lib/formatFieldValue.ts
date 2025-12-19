export const formatFieldValue = (fieldValue?: string | number | string[]) => {
  if (fieldValue === undefined || fieldValue === null) {
    return undefined
  }

  if (typeof fieldValue === 'object') {
    return fieldValue.join(', ')
  }

  if (typeof fieldValue === 'number') {
    const absValue = Math.abs(fieldValue)
    if (absValue !== 0 && (absValue < 1e-3 || absValue > 1e7)) {
      return fieldValue.toExponential(3)
    }
    return fieldValue.toLocaleString()
  }

  return fieldValue.toLocaleString()
}
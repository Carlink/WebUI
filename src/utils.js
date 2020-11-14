export function getFirstElementOrDefaultValue(array, defaultValueToReturn) {
  if (Array.isArray(array) && array.length) {
    return array[0]
  } else {
    return defaultValueToReturn
  }
}

export let passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 8) || 'Password must have 8+ characters',
  (v) => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
  (v) => /(?=.*\d)/.test(v) || 'Must have one number',
  (v) =>
    /([!#$%^&*~+=;:<>?])/.test(v) ||
    'Must have one special character [!#$%^&*~+=;:<>?]'
]
export let emailFormatRule = (v) => /.+@.+/.test(v) || 'Must be a valid email'

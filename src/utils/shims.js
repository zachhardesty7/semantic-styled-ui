/**
 * Convert an iterable of key, value pair arrays to an object, reverses Object.entries(),
 * shim for Object.fromEntries().
 *
 * @param {[string, any][]} iter - iterable of tuple arrays of key, value pairs
 * @returns {Record<string, any>} obj with key, value pairs assigned
 */
export const ObjectFromEntries = (iter) => {
  const obj = {}
  const arr = [...iter]

  if (Object.getOwnPropertyDescriptor(obj, "fromEntries")) {
    return Object.fromEntries(arr)
  }

  arr.forEach((pair) => {
    // eslint-disable-next-line no-new-object
    if (new Object(pair) !== pair) {
      throw new TypeError("iterable for fromEntries should yield objects")
    }

    const { 0: key, 1: val } = pair

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: val,
    })
  })

  return obj
}

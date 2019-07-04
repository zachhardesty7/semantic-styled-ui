/**
 * Convert an iterable of key, value pair arrays to an object, reverses Object.entries(),
 * shim for Object.fromEntries().
 *
 * @param {Iterable<[string, any]>} iter - iterable of arrays of key, value pairs
 * @returns {{}} obj with key, value pairs assigned
 */
export const ObjectFromEntries = (iter) => {
	const obj = {}
	const arr = [...iter]

	if (Object.getOwnPropertyDescriptor(obj, 'fromEntries')) {
		return Object.fromEntries(arr)
	}

	arr.forEach((pair) => {
		if (Object(pair) !== pair) {
			throw new TypeError('iterable for fromEntries should yield objects')
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

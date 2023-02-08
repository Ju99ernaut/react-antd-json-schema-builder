export const uuidv4 = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) => {
    return (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  })
}

const getAllKeys = (obj: Object, startKeys: string[] = []) => {
  const result = startKeys
  Object.keys(obj).forEach(key => {
    // @ts-ignore
    const val = obj[key]
    result.push(key)
    if (typeof val === 'object') {
      getAllKeys(val, result)
    }
  })
  return result
}

const unique = (prefix: string, obj: Object = {}) => {
  const usedIDs = getAllKeys(obj)
    .map(key => {
      return parseInt(key.split(prefix)[1])
    })
    .filter(val => {
      return Boolean(val)
    })

  return usedIDs.length ? Math.max(...usedIDs) + 1 : 0
}

const idCounter: { [key: string]: number } = {}

const uniqueId = (prefix: string, obj: Object = {}) => {
  if (!idCounter[prefix]) {
    idCounter[prefix] = unique(prefix, obj)
  }

  const id = ++idCounter[prefix]

  return prefix + id
}

export default uniqueId

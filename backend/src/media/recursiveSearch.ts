export default function recursiveSearch(
  data: any,
  condition: (value: string) => boolean,
  results: any[],
) {
  if (Array.isArray(data)) {
    for (const item of data) {
      recursiveSearch(item, condition, results)
    }
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (typeof key !== 'string') continue
      const value = data[key]
      if (!value) continue
      if (typeof key === 'string' && condition(value)) {
        results.push(value)
      } else {
        recursiveSearch(value, condition, results)
      }
    }
  }
}

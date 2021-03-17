import { triggerSuggestLineText } from './constants'

export function removeDuplicationList<T extends string>(arr: T[]): T[] {
  if (Array.isArray(arr)) {
    return [...new Set(arr)]
  }
  return []
}

export function flat<T extends any[]>(arr: T) {
  return arr.reduce((prev: T[], next: T) => {
    if (Array.isArray(next)) {
      return [...prev, ...next]
    }
    return [...prev, next]
  }, [])
}

export function testIsMatch(input: string) {
  return triggerSuggestLineText.test(input)
}

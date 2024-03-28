const statePrefix = 'is-'
const namespace = 'x'
const elementSeparator = '__'
const modifierSeparator = '--'

export function useNamespace(block: string) {
  const bem = (
    block: string,
    e?: string,
    m?: string,
  ) => {
    let ns = `${namespace}-${block}`
    e && (ns += `${elementSeparator}${e}`)
    m && (ns += `${modifierSeparator}${m}`)
    return ns
  }

  const b = () => bem(block)

  const e = (element: string) => bem(block, element)

  const m = (modifier: string) => bem(block, '', modifier)

  const em = (element: string, modifier: string) => bem(block, element, modifier)

  const is = (name: string) => {
    return name ? `${statePrefix}${name}` : ''
  }

  return {
    b,
    e,
    m,
    em,
    is,
    bem,
  }
}

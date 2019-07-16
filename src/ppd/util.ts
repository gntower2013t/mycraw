
export function convert<T>(raw: any, sExample:T, converters:any): T {
  const output: any = {}
  Object.keys(sExample).forEach(prop => {
    const fn = converters[prop]
    if (fn) {
      output[prop] = fn(raw[prop])
    } else {
      output[prop] = raw[prop]
    }
  })
  return output
}

export function toPercent(input: number) {
  return input*100
}

export function toWang(input: number) {
  return Math.round(input / 10000)
}

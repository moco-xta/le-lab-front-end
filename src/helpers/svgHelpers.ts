type CoordinateType = 'x' | 'y' | 'other'

interface CommandDefinition {
  parameters: CoordinateType[]
  isAbsolute: boolean
}

const COMMAND_MAP: Record<string, CommandDefinition> = {
  // Move To
  M: { parameters: ['x', 'y'], isAbsolute: true },
  m: { parameters: ['x', 'y'], isAbsolute: false },
  // Line To
  L: { parameters: ['x', 'y'], isAbsolute: true },
  l: { parameters: ['x', 'y'], isAbsolute: false },
  // Horizontal/Vertical Line To
  H: { parameters: ['x'], isAbsolute: true },
  h: { parameters: ['x'], isAbsolute: false },
  V: { parameters: ['y'], isAbsolute: true },
  v: { parameters: ['y'], isAbsolute: false },
  // Cubic Bezier Curve
  C: { parameters: ['x', 'y', 'x', 'y', 'x', 'y'], isAbsolute: true },
  c: { parameters: ['x', 'y', 'x', 'y', 'x', 'y'], isAbsolute: false },
  // Smooth Cubic Bezier
  S: { parameters: ['x', 'y', 'x', 'y'], isAbsolute: true },
  s: { parameters: ['x', 'y', 'x', 'y'], isAbsolute: false },
  // Quadratic Bezier
  Q: { parameters: ['x', 'y', 'x', 'y'], isAbsolute: true },
  q: { parameters: ['x', 'y', 'x', 'y'], isAbsolute: false },
  // Arc
  A: { parameters: ['other', 'other', 'other', 'other', 'other', 'x', 'y'], isAbsolute: true },
  a: { parameters: ['other', 'other', 'other', 'other', 'other', 'x', 'y'], isAbsolute: false },
}

export function scaleSvgPath(path: string, scaleX: number, scaleY: number = scaleX): string {
  const tokens = path.match(/[A-Za-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || []
  const result: string[] = []
  let currentCommand = ''
  let paramIndex = 0

  const scaleValue = (value: number, type: CoordinateType, isAbsolute: boolean) => {
    if (type === 'x') return value * (isAbsolute ? scaleX : 1) * scaleX
    if (type === 'y') return value * (isAbsolute ? scaleY : 1) * scaleY
    return value
  }

  for (const token of tokens) {
    if (/^[A-Za-z]$/.test(token)) {
      currentCommand = token
      paramIndex = 0
      result.push(token)
      continue
    }

    const numericValue = parseFloat(token)
    if (isNaN(numericValue)) continue

    const commandDef = COMMAND_MAP[currentCommand.toUpperCase()]
    if (!commandDef) {
      result.push(token)
      continue
    }

    const paramType = commandDef.parameters[paramIndex % commandDef.parameters.length]
    const scaled = scaleValue(numericValue, paramType, commandDef.isAbsolute)

    result.push(
      scaled
        .toExponential(6)
        .replace(/\.?0+e/, 'e')
        .replace('e+0', ''),
    )
    paramIndex++
  }

  return result
    .join(' ')
    .replace(/([A-Za-z]) /g, '$1')
    .replace(/ (?=-\d)/g, '')
}

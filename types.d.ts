type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * property name of an object backup theme or any of defaultColors
 */
type DefaultColor = keyof typeof import('./src/utils/colors').defaultColors

type FlattenSimpleInterpolation = import('styled-components').FlattenSimpleInterpolation

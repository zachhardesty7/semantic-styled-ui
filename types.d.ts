// NOTE: valid typings below
/** property name of an object backup theme or any of defaultColors */
type DefaultColor = keyof typeof import('./src/utils/colors').defaultColors

type FlattenSimpleInterpolation = import('styled-components').FlattenSimpleInterpolation

/** define styled components supported theme props */
interface DefaultTheme {
  white: string,
  primary: string,
  secondary: string,
  accent: string,
}

// JSDoc helpers
type Merge<T1, T2> = Omit<T2, keyof T1> & T1;

type Nullable<T> = { [P in keyof T]: T[P] | null };

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

type Intersect<T1, T2> = T1 & T2

// interfaces

/** force HTML node attributes to HTMLElement */
interface HTMLNode extends HTMLElement {
  children: HTMLCollectionOf<HTMLNode>
  parentNode: HTMLNode
}
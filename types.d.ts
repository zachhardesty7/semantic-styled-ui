/**
 * property name of an object backup theme or any of defaultColors
 */
type DefaultColor = keyof typeof import('./src/utils/colors').defaultColors

type FlattenSimpleInterpolation = import('styled-components').FlattenSimpleInterpolation

type Merge<T1, T2> = Omit<T2, keyof T1> & T1;

type Nullable<T> = { [P in keyof T]: T[P] | null };

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/** force HTML node attributes to HTMLElement */
interface HTMLNode extends HTMLElement {
  children: HTMLCollectionOf<HTMLNode>
  parentNode: HTMLNode
}
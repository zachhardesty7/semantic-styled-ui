import React from "react"

/**
 * hook to ensure client-side only rendering
 *
 * @returns {boolean} mount status
 * @example
 * ```
 * const hasMounted = useHasMounted()
 * if (!hasMounted) {
 *  return null
 * }
 * ```
 */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

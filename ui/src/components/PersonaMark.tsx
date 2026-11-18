interface Props {
  path: string
  color: string
  size?: number
}

/** A persona's drawn mark, as inline SVG. */
export default function PersonaMark({ path, color, size = 28 }: Props) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  )
}

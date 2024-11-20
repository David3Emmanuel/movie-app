export default function Button({
  href,
  onClick,
  children,
  className,
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  const combinedClassName = `button ${className || ''}`.trim()

  if (href) {
    return (
      <a href={href} onClick={onClick} className={combinedClassName}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  )
}

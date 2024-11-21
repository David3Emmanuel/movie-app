export default function Button({
  href,
  onClick,
  children,
  className,
  ...elementProps
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const combinedClassName = `button ${className || ''}`.trim()

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClassName}
        {...elementProps}
      >
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName} {...elementProps}>
      {children}
    </button>
  )
}

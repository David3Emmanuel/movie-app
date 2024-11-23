export default function Input({
  className,
  innerClassName,
  label,
  name,
  inputStyle,
  idPrefix,
  overrideInnerStyles,
  ...inputProps
}: {
  name: string
  inputStyle?: 'line' | 'normal'
  label?: string
  className?: string
  innerClassName?: string
  overrideInnerStyles?: boolean
  idPrefix?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = idPrefix ? `${idPrefix}-${name}` : name
  const innerStyles = `${
    overrideInnerStyles
      ? ''
      : 'text-sm flex items-center p-3 w-full rounded-md text-black placeholder:text-neutral-400'
  } ${inputStyle === 'line' ? 'border-b' : 'border bg-white'} ${
    innerClassName || ''
  }`

  return (
    <div className={`flex flex-col gap-1 w-full ${className || ''}`}>
      {label && (
        <label htmlFor={id} className='font-bold text-sm text-neutral-400'>
          {label}
        </label>
      )}
      <input className={innerStyles} name={name} id={id} {...inputProps} />
    </div>
  )
}

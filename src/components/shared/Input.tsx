import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@utils/style'

type InputProps = ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn(
          'p-2 rounded-md border border-gray-300 transition-all hover:border-gray-400',
          className,
        )}
        ref={ref}
        {...rest}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input

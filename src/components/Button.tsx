import { ComponentPropsWithoutRef } from 'react'

import { cn } from '@utils/style'

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        'py-2 rounded-md bg-gray-600 text-white transition-all hover:bg-gray-700',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button

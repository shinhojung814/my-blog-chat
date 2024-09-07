import { ComponentPropsWithoutRef, createElement, ElementType } from 'react'
import { IconType } from 'react-icons'

import { cn } from '@utils/style'

type IconButtonProps<Component extends ElementType> =
  ComponentPropsWithoutRef<Component> & {
    Icon: IconType
    iconClassName?: string
    className?: string
    component?: Component
  }

const IconButton = <Component extends ElementType = 'button'>({
  Icon,
  iconClassName,
  className,
  component,
  ...props
}: IconButtonProps<Component>) => {
  return createElement(
    'button',
    {
      className: cn('p-1.5 lg:p-2', className),
      ...props,
    },
    <Icon
      className={cn('h-5 lg:h-6 w-5 lg:w-6 transition-all', iconClassName)}
    />,
  )
}

export default IconButton

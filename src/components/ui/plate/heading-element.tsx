import React from 'react';
import { PlateElement, PlateElementProps } from '@udecode/plate-common';
import { cva, VariantProps } from 'class-variance-authority';

const headingVariants = cva('', {
  variants: {
    variant: {
      h1: 'mb-1 mt-[0.5em] font-sans text-4xl font-bold',
      h2: 'mb-px mt-[1.4em] font-sans text-2xl font-semibold tracking-tight',
      h3: 'mb-px mt-[1em] font-sans text-xl font-semibold tracking-tight',
      h4: 'mt-[0.75em] font-sans text-lg font-semibold tracking-tight',
      h5: 'mt-[0.75em] text-lg font-semibold tracking-tight',
      h6: 'mt-[0.75em] text-base font-semibold tracking-tight',
    },
    isFirstBlock: {
      true: 'mt-0',
      false: '',
    },
  },
});

export function HeadingElement({
  className,
  variant = 'h1',
  isFirstBlock,
  children,
  ...props
}: PlateElementProps & VariantProps<typeof headingVariants>) {
  const { element, editor } = props;

  const Element = variant!;

  return (
    <PlateElement
      asChild
      className={headingVariants({
        variant,
        className,
        isFirstBlock: false,
      })}
      {...props}
    >
      <Element>{children}</Element>
    </PlateElement>
  );
}

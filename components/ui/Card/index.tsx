import * as React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@libs/classNames';

const cardVariants = cva('rounded-xl bg-white shadow-lg w-full', {
  variants: {
    size: {
      default: 'p-[32px] w-[340px] h-[500px]',
      chart_1: 'p-[16px] w-[458px] h-[297px]',
      dashboard_outstanding: 'p-[16px] w-[211px] h-[84px]',
    },
    variant: {
      default: 'bg-white',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
});

const Card = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof cardVariants> & React.HTMLAttributes<HTMLDivElement>
>(({ className, size, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ size, variant, className }))}
    {...props}
  />
));
Card.displayName = 'Card';

const cardHeaderVariants = cva('flex flex-col space-y-1.5 items-center', {
  variants: {
    variant: {
      default: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const CardHeader = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof cardHeaderVariants> & React.HTMLAttributes<HTMLDivElement>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardHeaderVariants({ variant, className }))}
    {...props}
  >
    <Image
      src="/images/logo-runsystem.png"
      alt="Run System Logo"
      className="max-w-[130px] h-auto"
      width={200}
      height={200}
      layout="responsive"
      quality={100}
    />
  </div>
));
CardHeader.displayName = 'CardHeader';

const cardTitleVariants = cva(
  'w-full text-[20px] font-bold text-left text-black-000',
  {
    variants: {
      variant: {
        default: 'mt-5',
        // emphasized: "font-bold text-blue-600",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  VariantProps<typeof cardTitleVariants> &
    React.HTMLAttributes<HTMLHeadingElement> & { title?: string }
>(({ className, variant, title, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(cardTitleVariants({ variant, className }))}
    {...props}
  >
    {title || 'Welcome to RUN System'}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescriptionVariants = cva(
  'w-full text-[12px] text-black-000 font-normal text-left',
  {
    variants: {
      variant: {
        default: 'mt-0',
        // emphasized: "text-gray-600 font-semibold",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  VariantProps<typeof CardDescriptionVariants> &
    React.HTMLAttributes<HTMLParagraphElement> & { description?: string }
>(({ className, variant, description, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(CardDescriptionVariants({ variant, className }))}
    {...props}
  >
    {description || 'Enter your credentials to access your account'}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6 ', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

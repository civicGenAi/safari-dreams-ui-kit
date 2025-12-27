import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-heading font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary hover:shadow-lg hover:-translate-y-0.5 rounded-full",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-full",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium Brand Variants
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary hover:shadow-lg hover:-translate-y-0.5 rounded-full",
        dark: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:-translate-y-0.5 rounded-full",
        "outline-primary": "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground rounded-full",
        "outline-dark": "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-full",
        "outline-white": "border-2 border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground rounded-full",
        glass: "bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 rounded-full",
        // Legacy aliases
        gold: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary hover:shadow-lg hover:-translate-y-0.5 rounded-full",
        forest: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:-translate-y-0.5 rounded-full",
        "outline-forest": "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-full",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-sm",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

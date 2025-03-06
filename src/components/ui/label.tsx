import * as React from "react"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
    // Combine the styling
    const combinedClassName = `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`;

    return (
        <label
            ref={ref}
            className={combinedClassName}
            {...props}
        />
    )
})
Label.displayName = "Label"

export { Label }

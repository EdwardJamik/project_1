import React from "react";

export const Card = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
        {children}
    </div>
));
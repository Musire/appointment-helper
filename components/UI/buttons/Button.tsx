import clsx from "clsx";

const variants = {
  primary: "bg-whitesmoke text-deep hover:bg-fog active:bg-ash",
  secondary: "bg-deep border border-adjust hover:bg-darker active:bg-darkest",
  ghost: "bg-transparent text-else hover:text-main hover:bg-darkest active:bg-darker",
}

type variantKey = keyof typeof variants

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: variantKey;
}

export default function Button({ 
    variant="primary",
    children,
    className="",
    type='button',
    ...props 
}: Props) {
    return (
        <button
            type={type}
            className={clsx(
                "px-4 py-2 min-w-32 w-fit  rounded transition hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none ",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
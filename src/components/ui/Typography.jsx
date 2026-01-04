import "../../styles/design-tokens.css"
import "./Typography.css"

export const Typography = ({
  variant = "body",
  weight = "regular",
  color = "primary",
  align = "left",
  children,
  className = "",
  ...props
}) => {
  const classes = `typography typography-${variant} typography-weight-${weight} typography-color-${color} typography-align-${align} ${className}`

  const variants = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    body: "p",
    caption: "span",
    label: "label",
  }

  const Component = variants[variant] || "p"

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

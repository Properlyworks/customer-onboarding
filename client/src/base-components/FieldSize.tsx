import { Box } from "@mui/material";
import { makeStyles } from "@styling";
import { ChildrenProps } from "@types";

const useStyles = makeStyles()((theme) => ({
  lg: {
    width: "100%",
    maxWidth: theme.spacing(37.5),
  },
  md: {
    width: "100%",
    maxWidth: theme.spacing(17.75),
  },
  sm: {
    width: "100%",
    maxWidth: theme.spacing(12.5),
  },
  fill: {
    width: "100%",
  },
}));

type Size = "sm" | "md" | "lg" | "fill";

type FieldSizeProps = ChildrenProps & {
  size: Size;
  className?: string;
};

export const FieldSize: React.FC<FieldSizeProps> = ({
  children,
  className,
  size,
}) => {
  const { classes, cx } = useStyles();

  const sizeChart: Record<Size, string> = {
    sm: classes.sm,
    md: classes.md,
    lg: classes.lg,
    fill: classes.fill,
  };

  return (
    <Box className={cx(sizeChart[size], className)} data-testid="FieldSize">
      {children}
    </Box>
  );
};
export const FullWidthField: React.FC<ChildrenProps> = ({ children }) => (
  <FieldSize size="fill">{children}</FieldSize>
);
export const LargeField: React.FC<ChildrenProps> = ({ children }) => (
  <FieldSize size="lg">{children}</FieldSize>
);
export const MediumField: React.FC<ChildrenProps> = ({ children }) => (
  <FieldSize size="md">{children}</FieldSize>
);
export const SmallField: React.FC<ChildrenProps> = ({ children }) => (
  <FieldSize size="sm">{children}</FieldSize>
);

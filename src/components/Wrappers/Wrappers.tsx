import React from 'react';
import { withStyles, Badge as BadgeBase, Typography as TypographyBase, Button as ButtonBase } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/styles';
import classnames, { Argument, Mapping } from 'classnames';
import { Theme } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import { Styles, WithStylesOptions } from '@material-ui/core/styles/withStyles';
import { PaletteColor, TypeText } from '@material-ui/core/styles/createPalette';

// styles
const useStyles = makeStyles(() => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}));

export type TColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning';
type TText = 'text' | 'white';
type TCombined = TColor | TText;
// type TColorBrightness = keyof (PaletteColor & TypeText);
type TColorBrightness = 'light' | 'main' | 'dark' | 'contrastText' | 'primary' | 'secondary' | 'disabled' | 'hint';
type TWeight = 'light' | 'medium' | 'bold';
interface Props {
  children: React.FC | React.ReactNode;
  [key: string]: unknown;
}

interface BadgeProps extends Props {
  color?: TCombined;
  colorBrightness?: TColorBrightness;
}

interface TypographyProps extends BadgeProps {
  weight?: TWeight;
  size?: string;
  constiant?: Variant;
}

interface ButtonProps extends Props {
  color?: TCombined;
  className?: string;
  select?: string;
}

function Badge({ children, colorBrightness, color, ...props }: BadgeProps) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const Styled = createStyled({
    badge: {
      backgroundColor: getColor(color!, theme, colorBrightness),
    },
  });

  return (
    <Styled>
      {(styledProps: { classes: { badge: string | number | boolean | Mapping | Argument[] | null | undefined } }) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
}

function Typography({ children, weight, size, colorBrightness, color, ...props }: TypographyProps) {
  const theme = useTheme<Theme>();

  return (
    <TypographyBase
      style={{
        color: getColor(color!, theme, colorBrightness),
        fontWeight: getFontWeight(weight!),
        fontSize: getFontSize(size!, props.constiant!, theme),
      }}
      {...props}
    >
      {children}
    </TypographyBase>
  );
}

function Button({ children, color, className, ...props }: ButtonProps) {
  const theme = useTheme<Theme>();

  const Styled = createStyled({
    root: {
      color: getColor(color!, theme),
    },
    contained: {
      backgroundColor: getColor(color!, theme),
      boxShadow: theme.customShadows.widget,
      color: `${color ? 'white' : theme.palette.text.primary} !important`,
      '&:hover': {
        backgroundColor: getColor(color!, theme, 'light'),
        boxShadow: theme.customShadows.widgetWide,
      },
      '&:active': {
        boxShadow: theme.customShadows.widgetWide,
      },
    },
    outlined: {
      color: getColor(color!, theme),
      borderColor: getColor(color!, theme),
    },
    select: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  });

  return (
    <Styled>
      {(styledProps: { classes: { contained: any; root: any; outlined: any; select: any } }) => (
        <ButtonBase
          classes={{
            contained: styledProps.classes.contained,
            root: styledProps.classes.root,
            outlined: styledProps.classes.outlined,
          }}
          {...props}
          className={classnames(
            {
              [styledProps.classes.select]: props.select,
            },
            className,
          )}
        >
          {children}
        </ButtonBase>
      )}
    </Styled>
  );
}

export { Badge, Typography, Button };

// ########################################################################
function isTypePalleteColor(brightness: any): brightness is keyof PaletteColor {
  const PaletteColorKeys = ['light', 'main', 'dark', 'contrastText'];
  return Boolean(PaletteColorKeys.indexOf(brightness) !== -1);
}

function isTypeText(brightness: any): brightness is keyof TypeText {
  const TypeTextKeys = ['primary', 'secondary', 'disabled', 'hint'];
  return Boolean(TypeTextKeys.indexOf(brightness) !== -1);
}

function isColor(color: TCombined): color is TColor {
  const ColorValues = ['primary', 'secondary', 'success', 'error', 'warning'];
  return Boolean(ColorValues.indexOf(color) !== -1);
}

function getColor(color: TCombined, theme: Theme, brightness: TColorBrightness = 'main') {
  if (color === 'text' && isTypeText(brightness)) {
    return theme.palette[color][brightness];
  } else if (isColor(color) && isTypePalleteColor(brightness)) {
    return theme.palette[color][brightness];
  }
}

function getFontWeight(style: TWeight) {
  switch (style) {
    case 'light':
      return 300;
    case 'medium':
      return 500;
    case 'bold':
      return 600;
    default:
      return 400;
  }
}

function getFontSize<T extends Theme, V extends Variant>(size: string, variant: V, theme: T) {
  let multiplier;

  switch (size) {
    case 'sm':
      multiplier = 0.8;
      break;
    case 'md':
      multiplier = 1.5;
      break;
    case 'xl':
      multiplier = 2;
      break;
    case 'xxl':
      multiplier = 3;
      break;
    case 'xxxl':
      multiplier = 4;
      break;
    default:
      multiplier = 1;
      break;
  }

  const defaultSize =
    variant && theme.typography[variant] ? theme.typography[variant].fontSize : theme.typography.fontSize + 'px';

  return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(
  styles: Styles<Theme, Record<string, unknown>, string>,
  options?: WithStylesOptions<Theme> | undefined,
) {
  const Styled = function (props: Props) {
    const { children, ...other } = props;
    return (children as React.FC)(other);
  };

  return withStyles(styles, options)(Styled);
}

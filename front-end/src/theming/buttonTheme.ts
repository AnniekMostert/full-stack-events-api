import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  border: "1px solid",
  borderColor: "red.700",
  _focusVisible: { shadow: "none" },
});

const outline = defineStyle({
  ...baseStyle,
  bgColor: "teal.200",
  _hover: { bgColor: "teal.100" },
  _active: { bgColor: "teal.100" },
});

const modal = defineStyle({
  bgColor: "teal.100",
  _hover: { bgColor: "teal.200" },
  _active: { bgColor: "teal.200" },
});

const back = defineStyle({
  bgColor: "red.700",
  color: "teal.200",
  _hover: { bgColor: "red.800" },
  _active: { bgColor: "red.800" },
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { outline, modal, back },
  defaultProps: { variant: "outline" },
});

import { extendTheme } from "@chakra-ui/react";
import { components } from "./components";

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      500: '#0cb259',
      700: '#43ff64d9',
    },
    background: {
      400: '#18191b',
      500: '#111113',
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#111113',
        color: 'white',
      },
    },
  },
  components,
})
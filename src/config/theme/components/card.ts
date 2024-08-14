import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: '#d8feff09',
    borderRadius: 'lg',
    borderColor: '#6d767e',
    borderWidth: '1px',
    textColor: 'white',
  },
  header: {
    paddingBottom: '2px',
  },
  body: {
    paddingTop: '2px',
  },
  footer: {
    paddingTop: '2px',
  },
})

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: 'xl',
    },
  }),
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })
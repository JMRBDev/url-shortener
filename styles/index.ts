import { extendTheme } from "@chakra-ui/react"

const theme = {
    config: {
        initialColorMode: 'dark',
        cssVarPrefix: 'jmrbdev',
        useSystemColorMode: false
    },
}

export default extendTheme(theme);
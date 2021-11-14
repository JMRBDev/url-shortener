import { ChakraProvider } from "@chakra-ui/react"
import theme from '../styles/index'
import { UserProvider } from '../context/userContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp;

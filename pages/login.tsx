import { Box, Container, Flex, GridItem, Heading, VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';
import { useToast } from '@chakra-ui/toast';
import AUTH_ERRORS from '../enums/AUTH_ERRORS';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, loading } = useUser();

    const router = useRouter();

    const toast = useToast();

    const toastErrorContent = {
        [AUTH_ERRORS.INVALID_EMAIL]: `Email '${email}' has to be a valid email address`,
        [AUTH_ERRORS.INTERNAL_ERROR]: 'Wrong credentials (Internal error)',
        [AUTH_ERRORS.USER_NOT_FOUND]: `Wrong credentials`,
        [AUTH_ERRORS.WRONG_PASSWORD]: `Wrong credentials`,
        [AUTH_ERRORS.TOO_MANY_REQUESTS]: `Slow down, you are trying to log in too fast`,
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        signIn(email, password).then(() => {
            router.push('/');
        }).catch((err) => {
            let description = toastErrorContent[err.message.split('(')[1].split(')')[0]];
            if (email.length === 0) {
                description = 'Email is required';
            } else if (password.length === 0) {
                description = 'Password is required';
            }

            toast({
                title: 'Error',
                description,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        });
    };

    return (
        <Container
            w="100vw"
            h="100vh"
        >
            <Flex
                w="full"
                h="full"
                align="center"
                justify="center"
                flexDirection="column"
            >
                <Heading mb={12}>
                    URL Shortening Service
                </Heading>

                <Box
                    p={6}
                    w="full"
                    bg="gray.700"
                    borderRadius="lg"
                >
                    <form onSubmit={handleOnSubmit}>
                        <VStack
                            spacing={4}
                        >
                            <FormControl id="email">
                                <FormLabel
                                    fontWeight="bold"
                                >
                                    Email
                                </FormLabel>
                                <Input
                                    disabled={loading}
                                    variant="filled"
                                    type="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </FormControl>

                            <FormControl id="password">
                                <FormLabel
                                    fontWeight="bold"
                                >
                                    Password
                                </FormLabel>
                                <Input
                                    disabled={loading}
                                    variant="filled"
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </FormControl>
                        </VStack>
                        <Box
                            pt={12}
                        >
                            <Button
                                type="submit"
                                w="full"
                                onClick={handleOnSubmit}
                            >
                                Log in
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Flex>
        </Container >
    );
}

export default Login;

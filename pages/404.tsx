import React from 'react';
import { Container, Flex, Heading, Link, Text } from '@chakra-ui/layout';
import Head from 'next/head';

const NotFound404 = () => {
    return (
        <>
            <Head>
                <title>404 — URL Shortener</title>
                <meta name="description" content="URL Shortening service developed by JMRBDev" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container
                h="100vh"
                w="100vw"
            >
                <Flex
                    flexDirection="column"
                    align="center"
                    justify="center"
                    textAlign="center"
                    h="100%"
                    w="100%"
                >
                    <Heading>
                        El destino no es alcanzable.
                    </Heading>
                    <Text>
                        Por favor, contacta conmigo en el
                        {' '}
                        <Link
                            href="https://www.jmrb.dev/"
                            color="blue.300"
                        >
                            formulario de contacto de mi web personal
                        </Link>
                        .
                    </Text>
                </Flex>
            </Container>
        </>
    );
}

export default NotFound404;

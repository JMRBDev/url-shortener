import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Head from 'next/head';

const TargetURL = () => {
    const [destination, setDestination] = useState(null);

    const { query } = useRouter();
    const { slug } = query;

    useEffect(() => {
        const fetchIt = async () => {
            const res = await fetch(`api/${slug}`, {
                method: 'GET',
            });

            const href = (await res.json()).destination;
            setDestination(href);
            location.href = href;
        };

        if (slug) {
            fetchIt();
        }
    }, [slug]);

    return (
        <>
            <Head>
                <title>Redirecting... — URL Shortener</title>
                <meta name="description" content="URL Shortening service developed by JMRBDev" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container
                w="100vw"
                h="100vh"
            >
                <Flex
                    flexDirection="column"
                    w="100%"
                    h="100%"
                    align="center"
                    justify="center"
                    textAlign="center"
                >
                    <Heading>
                        Redirecting to:
                    </Heading>
                    <ReactPlaceholder showLoadingAnimation type='textRow' ready={!!destination}>
                        <Text>
                            {destination}
                        </Text>
                    </ReactPlaceholder>
                </Flex>
            </Container>
        </>
    );
}

export default TargetURL;
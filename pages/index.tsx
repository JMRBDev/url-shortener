import { Container, Heading, Flex, Box } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast';
import Head from 'next/head'
import { useState, useEffect } from 'react';
import UrlsTable from '../components/UrlsTable';
import firebase from '../lib/firebase';
import { useRouter } from 'next/dist/client/router';
import ShortenForm from '../components/ShortenForm';
import useUser from '../hooks/useUser';

interface IProps {
  existingUrls: {
    url: string;
    slug: string;
  }[]
}

const Home = ({ existingUrls }: IProps) => {
  const { user, loading } = useUser();

  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');

  const toast = useToast();

  const router = useRouter();

  const handleShortenUrl = async () => {
    if (/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({
          url,
          ...(slug.length > 0 && { slug }),
        }),
      });

      toast({
        title: res.status === 200 ? 'Success' : 'Error',
        description: await res.text(),
        status: res.status === 200 ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      });

      if (res.ok) {
        router.replace(router.asPath);
      }
    } else {
      toast({
        title: 'The URL is not valid',
        description: url.length === 0 ? `URL is a required field` : `'${url}' is not a valid URL, try again with a different one`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return (
    <Box overflow="hidden">
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortening service developed by JMRBDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        h="100vh"
        w="100vw"
      >
        <Flex
          flexDirection="column"
          h="100%"
          w="100%"
          justify="center"
          align="center"
        >
          <Heading mb={12}>
            URL Shortening Service
          </Heading>

          <ShortenForm
            onChangeUrl={setUrl}
            onChangeSlug={setSlug}
            onSubmit={handleShortenUrl}
          />

          <UrlsTable urls={existingUrls} />

        </Flex>
      </Container>
    </Box>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const urls = (await firebase.collection('urls').get()).docs;

  const existingUrls = urls.map((url) => url.data());

  return {
    props: {
      existingUrls
    }
  }
}
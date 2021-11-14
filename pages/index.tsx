import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Heading, Flex, VStack, Box } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast';
import Head from 'next/head'
import { useState } from 'react';
import UrlsTable from '../components/UrlsTable';
import firebase from '../lib/firebase';
import { useRouter } from 'next/dist/client/router';
import { RiScissorsFill } from 'react-icons/ri';

interface IProps {
  existingUrls: {
    url: string;
    slug: string;
  }[]
}

const Home = ({ existingUrls }: IProps) => {
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
        description: `'${url}' is not a valid URL. Try it again with a different URL.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

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

          <VStack
            w="100%"
            gridGap={6}
          >
            <FormControl id="url">
              <FormLabel fontWeight="bold">Lengthy URL</FormLabel>
              <Input onChange={(e) => setUrl(e.target.value)} type="url" placeholder="https://www.jmrb.dev/blog/blog-title" variant="filled" />
              <FormHelperText>Original URL you wish to shorten</FormHelperText>
            </FormControl>

            <FormControl id="slug">
              <FormLabel fontWeight="bold">Slug</FormLabel>
              <Input onChange={(e) => setSlug(e.target.value)} type="slug" placeholder="post-01" variant="filled" />
              <FormHelperText>String to be used as shorten key</FormHelperText>
            </FormControl>

            <Button onClick={handleShortenUrl} rightIcon={<RiScissorsFill />}>Shorten</Button>
          </VStack>

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
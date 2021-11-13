import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Text, Container, Heading } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast';
import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');

  const toast = useToast();

  const handleShortenUrl = async () => {
    if (/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
      const res = await (await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({
          url,
          ...(slug.length > 0 && { slug }),
        }),
      })).json();

      console.log('res', res);
    } else {
      toast({
        title: 'The URL is not valid',
        description: `${url} is not a valid URL. Try it again with a different URL.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container>
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortening service developed by JMRBDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading>
        URL Shortening Service
      </Heading>

      <FormControl id="url">
        <FormLabel>Lengthy URL</FormLabel>
        <Input onChange={(e) => setUrl(e.target.value)} type="url" placeholder="https://www.jmrb.dev/blog/blog-title" variant="filled" />
        <FormHelperText>Original URL you wish to shorten</FormHelperText>
      </FormControl>

      <FormControl id="slug">
        <FormLabel>Slug</FormLabel>
        <Input onChange={(e) => setSlug(e.target.value)} type="slug" placeholder="post-01" variant="filled" />
        <FormHelperText>String to be used as shorten key</FormHelperText>
      </FormControl>

      <Button onClick={handleShortenUrl} rightIcon={<Text>✂️</Text>}>Shorten</Button>
    </Container>
  )
}

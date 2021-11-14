import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import { RiScissorsFill } from 'react-icons/ri';
import { FormHelperText, FormLabel, FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';

const ShortenForm = ({ onChangeUrl, onChangeSlug, onSubmit }) => {
    return (
        <VStack
            w="100%"
            gridGap={6}
        >
            <FormControl id="url">
                <FormLabel fontWeight="bold">Lengthy URL</FormLabel>
                <Input onChange={(e) => onChangeUrl(e.target.value)} type="url" placeholder="https://www.jmrb.dev/blog/blog-title" variant="filled" />
                <FormHelperText>Original URL you wish to shorten</FormHelperText>
            </FormControl>

            <FormControl id="slug">
                <FormLabel fontWeight="bold">Slug</FormLabel>
                <Input onChange={(e) => onChangeSlug(e.target.value)} type="slug" placeholder="post-01" variant="filled" />
                <FormHelperText>String to be used as shorten key</FormHelperText>
            </FormControl>

            <Button colorScheme="blue" onClick={onSubmit} rightIcon={<RiScissorsFill />}>Shorten</Button>
        </VStack>
    );
}

export default ShortenForm;

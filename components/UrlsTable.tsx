import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/table";
import { Box, Link, Text } from '@chakra-ui/layout';
import { IconButton } from "@chakra-ui/button";
import { MdDeleteForever } from 'react-icons/md';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useToast } from '@chakra-ui/toast';

interface IProps {
    urls: {
        url: string;
        slug: string;
    }[];
}

const UrlsTable = ({ urls }: IProps) => {
    const toast = useToast();
    const router = useRouter();

    const handleDeleteUrl = async (slug: string) => {
        const res = await fetch(`/api/${slug}`, {
            method: 'DELETE',
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
    };

    return (
        <Box mt={16} overflowY="auto" maxH="30vh">
            <Table variant="simple" style={{ tableLayout: 'fixed' }} size={'sm'}>
                <Thead>
                    <Tr>
                        <Th colSpan={2}>Original</Th>
                        <Th w={{ base: "6rem" }}>Slug</Th>
                        <Th w={{ base: "6rem" }} isNumeric>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        urls.length > 0 ? urls.map((url) => (
                            <Tr key={`row-${url.slug}`}>
                                <Td colSpan={2}>
                                    <Link href={url.url}>
                                        <Text isTruncated>
                                            {url.url}
                                        </Text>
                                    </Link>
                                </Td>
                                <Td>
                                    <NextLink href={`${router.basePath}/${url.slug}`} passHref>
                                        <Link>
                                            <Text isTruncated>
                                                {url.slug}
                                            </Text>
                                        </Link>
                                    </NextLink>
                                </Td>
                                <Td isNumeric><IconButton onClick={() => handleDeleteUrl(url.slug)} aria-label={`Delete ${url.slug}`} colorScheme="red" icon={<MdDeleteForever />} /></Td>
                            </Tr>
                        )) : (
                            <Tr>
                                <Td colSpan={4}>
                                    <Text fontWeight="bold" textAlign="center">
                                        No URLs have been registered yet.
                                    </Text>
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th colSpan={2}>Original</Th>
                        <Th>Slug</Th>
                        <Th isNumeric>Delete</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </Box>
    );
}

export default UrlsTable;

import { Box, Button, Heading, VStack, Text, Spinner, Icon } from '@chakra-ui/react';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
    isLoading?: boolean;
}

export const AuthForm = ({ isLoading = false }: AuthFormProps) => {
    return (
        <Box className={styles.auth__box}>
            <VStack gap={8} className={styles.auth__stack}>
                <Heading className={styles.auth__title}>
                    <Icon size='2xl'>
                        <img src='/favicon.ico' />
                    </Icon>
                    Cloudgram
                </Heading>

                {isLoading ? (
                    <VStack w='300px' gap={8} className={styles.auth__stack_content}>
                        <Spinner color='teal.500' size='xl' />
                        <Text>Authorization...</Text>
                    </VStack>
                ) : (
                    <VStack gap={5} className={styles.auth__stack_content}>
                        <Text className={styles.auth__stack_content_text} textAlign='center'>
                            To log in to Cloudgram, log in via Telegram
                        </Text>
                        <Button asChild className={styles.auth__stack_content_button}>
                            <a href='https://t.me/cloudgram_web_bot' target='_blank'>
                                Log in with Telegram
                            </a>
                        </Button>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

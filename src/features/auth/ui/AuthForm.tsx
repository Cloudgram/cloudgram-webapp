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
                        <img alt='Cloudgram logo' src='/favicon.ico' />
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
                            To log in to Cloudgram,
                            <br /> log in via Telegram bot
                        </Text>
                        <Button asChild className={styles.auth__stack_content_button}>
                            <a
                                href={
                                    import.meta.env.MODE === 'development'
                                        ? import.meta.env.VITE_DEVELOPMENT_URL_BOT
                                        : import.meta.env.VITE_PRODUCTION_URL_BOT
                                }
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Log in with Telegram
                            </a>
                        </Button>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

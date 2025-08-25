import { Box, Button, Heading, Text, Spinner, Icon, Stack, VStack } from '@chakra-ui/react';
import styles from './AuthForm.module.scss';

interface AuthFormProps {
    isLoading?: boolean;
}

export const AuthForm = ({ isLoading = false }: AuthFormProps) => {
    return (
        <Box className={styles.auth__box}>
            <VStack className={styles.auth__stack}>
                <Heading className={styles.auth__title}>
                    <Icon className={styles.auth__icon}>
                        <img alt='Cloudgram logo' src='/favicon.ico' />
                    </Icon>
                    Cloudgram
                </Heading>

                {isLoading ? (
                    <VStack gap={8} className={styles.auth__stack_content}>
                        <Spinner color='teal.500' size='xl' />
                        <Text>Authorization...</Text>
                    </VStack>
                ) : (
                    <Stack gap={5} className={styles.auth__stack_content}>
                        <Text className={styles.auth__stack_content_text}>
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
                    </Stack>
                )}
            </VStack>
        </Box>
    );
};

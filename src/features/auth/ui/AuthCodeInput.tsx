import { useRef } from 'react';
import styles from './AuthCodeInput.module.scss';

interface AuthCodeInputProps {
    onCodeChange: (code: string) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void; // Добавлен новый пропс
}

export const AuthCodeInput = ({ onCodeChange, onKeyDown }: AuthCodeInputProps) => {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.slice(0, 1);
        e.target.value = value;

        const code = inputsRef.current.map(input => input?.value || '').join('');
        onCodeChange(code);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (onKeyDown) {
            onKeyDown(e); // Вызов внешнего обработчика
        }
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        pasteData.split('').forEach((char, index) => {
            if (inputsRef.current[index]) {
                inputsRef.current[index].value = char;
            }
        });
        const code = pasteData.slice(0, 6);
        onCodeChange(code);
        inputsRef.current[Math.min(pasteData.length, 5)]?.focus();
    };

    return (
        <div className={styles.authCodeInput}>
            {Array.from({ length: 6 }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className={styles.authCodeInput__digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputsRef.current[index] = el!)}
                />
            ))}
        </div>
    );
};

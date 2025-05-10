import type { Meta, StoryObj } from '@storybook/react';
import { AuthCodeInput } from '../../../components/AuthCodeInput/AuthCodeInput';

const meta: Meta<typeof AuthCodeInput> = {
    title: 'Components/AuthCodeInput',
    component: AuthCodeInput,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof AuthCodeInput>;

export const Default: Story = {
    args: {
        onCodeChange: code => console.log('Code changed:', code),
        onKeyDown: event => console.log('Key pressed:', event.key),
    },
};

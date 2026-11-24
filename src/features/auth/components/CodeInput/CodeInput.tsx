import TextInput, { type AppTextInputProps } from '@/shared/components/TextInput/TextInput';

type Props = Omit<AppTextInputProps, 'onChangeText' | 'value' | 'maxLength'> & {
  value: string;
  onChangeText: (value: string) => void;
  /** Called once with the full code as soon as the last digit is typed. */
  onComplete?: (code: string) => void;
  length?: number;
};

/** One plain digits-only field, so paste and the keyboard's code suggestion fill it. */
export default function CodeInput({ onChangeText, onComplete, length = 6, ...rest }: Props) {
  return (
    <TextInput
      placeholder={`${length}-digit code`}
      keyboardType="number-pad"
      maxLength={length}
      autoComplete="one-time-code"
      textContentType="oneTimeCode"
      {...rest}
      onChangeText={(text) => {
        const digits = text.replace(/\D/g, '').slice(0, length);
        onChangeText(digits);
        if (digits.length === length) onComplete?.(digits);
      }}
    />
  );
}

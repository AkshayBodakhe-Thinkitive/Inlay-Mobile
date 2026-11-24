import { IconCalendar } from '@/shared/components/Icons/Icons';
import TextInput, { type AppTextInputProps } from '@/shared/components/TextInput/TextInput';
import { formatDateInput } from '@/shared/utils/date';

type Props = Omit<AppTextInputProps, 'onChangeText' | 'value'> & {
  value: string;
  onChangeText: (value: string) => void;
};

/** Date field: calendar icon, number keypad, MM/DD/YYYY hint, slashes added as the user types. */
export default function DatePicker({ onChangeText, ...rest }: Props) {
  return (
    <TextInput
      icon={IconCalendar}
      keyboardType="number-pad"
      placeholder="MM/DD/YYYY"
      maxLength={10}
      autoComplete="birthdate-full"
      {...rest}
      onChangeText={(text) => onChangeText(formatDateInput(text))}
    />
  );
}

import {
  Calendar03Icon,
  FaceIdIcon,
  Mail01Icon,
  SquareLock02Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons';

import HugeIcon from '@/shared/components/HugeIcon/HugeIcon';

type IconProps = { size?: number; color: string };

export const IconMail = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={Mail01Icon} size={size} color={color} />
);
export const IconCalendar = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={Calendar03Icon} size={size} color={color} />
);
export const IconLock = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={SquareLock02Icon} size={size} color={color} />
);
export const IconFaceId = ({ size = 22, color }: IconProps) => (
  <HugeIcon icon={FaceIdIcon} size={size} color={color} />
);
export const IconEye = ({ size = 18, color }: IconProps) => (
  <HugeIcon icon={ViewIcon} size={size} color={color} />
);
export const IconEyeOff = ({ size = 18, color }: IconProps) => (
  <HugeIcon icon={ViewOffSlashIcon} size={size} color={color} />
);

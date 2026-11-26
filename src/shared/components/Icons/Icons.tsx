import {
  ArrowLeft01Icon,
  Calendar03Icon,
  CalendarCheck01Icon,
  Call02Icon,
  ChartLineData01Icon,
  ClipboardIcon,
  FavouriteIcon,
  InformationCircleIcon,
  HealthIcon,
  FaceIdIcon,
  Hospital01Icon,
  Location01Icon,
  Mail01Icon,
  SentIcon,
  SquareLock02Icon,
  TestTube01Icon,
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
export const IconBack = ({ size = 22, color }: IconProps) => (
  <HugeIcon icon={ArrowLeft01Icon} size={size} color={color} />
);
export const IconPhone = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={Call02Icon} size={size} color={color} />
);
export const IconPin = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={Location01Icon} size={size} color={color} />
);
export const IconFlask = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={TestTube01Icon} size={size} color={color} />
);
export const IconSend = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={SentIcon} size={size} color={color} />
);
export const IconClinic = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={Hospital01Icon} size={size} color={color} />
);
export const IconHeartPulse = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={HealthIcon} size={size} color={color} />
);
export const IconChartLine = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={ChartLineData01Icon} size={size} color={color} />
);
export const IconCalendarCheck = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={CalendarCheck01Icon} size={size} color={color} />
);
export const IconClipboard = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={ClipboardIcon} size={size} color={color} />
);
export const IconHeart = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={FavouriteIcon} size={size} color={color} />
);
export const IconInfo = ({ size = 20, color }: IconProps) => (
  <HugeIcon icon={InformationCircleIcon} size={size} color={color} />
);

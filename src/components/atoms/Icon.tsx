import AccessibleOutlined from "@mui/icons-material/AccessibleOutlined";
import Add from "@mui/icons-material/Add";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined";
import BedtimeOutlined from "@mui/icons-material/BedtimeOutlined";
import CardGiftcardOutlined from "@mui/icons-material/CardGiftcardOutlined";
import CelebrationOutlined from "@mui/icons-material/CelebrationOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Close from "@mui/icons-material/Close";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import Directions from "@mui/icons-material/Directions";
import DirectionsCarOutlined from "@mui/icons-material/DirectionsCarOutlined";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import EventOutlined from "@mui/icons-material/EventOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Facebook from "@mui/icons-material/Facebook";
import FitnessCenterOutlined from "@mui/icons-material/FitnessCenterOutlined";
import FlightLandOutlined from "@mui/icons-material/FlightLandOutlined";
import FlightTakeoffOutlined from "@mui/icons-material/FlightTakeoffOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Instagram from "@mui/icons-material/Instagram";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KingBedOutlined from "@mui/icons-material/KingBedOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import LocalParkingOutlined from "@mui/icons-material/LocalParkingOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import Menu from "@mui/icons-material/Menu";
import Pause from "@mui/icons-material/Pause";
import Phone from "@mui/icons-material/Phone";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PoolOutlined from "@mui/icons-material/PoolOutlined";
import Remove from "@mui/icons-material/Remove";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import RouteOutlined from "@mui/icons-material/RouteOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import Search from "@mui/icons-material/Search";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import WarningAmber from "@mui/icons-material/WarningAmber";
import WhatsApp from "@mui/icons-material/WhatsApp";
import X from "@mui/icons-material/X";
import type { SvgIconProps } from "@mui/material/SvgIcon";

import { LEGAL_ICONS } from "@/components/atoms/iconSetLegal";
import { LEISURE_ICONS } from "@/components/atoms/iconSetLeisure";

const ICONS = {
  accessible: AccessibleOutlined,
  add: Add,
  "auto-awesome": AutoAwesomeOutlined,
  "auto-stories": AutoStoriesOutlined,
  "arrow-forward": ArrowForward,
  "arrow-upward": ArrowUpward,
  bedtime: BedtimeOutlined,
  car: DirectionsCarOutlined,
  celebration: CelebrationOutlined,
  chat: ChatBubbleOutline,
  "check-circle": CheckCircle,
  gift: CardGiftcardOutlined,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  close: Close,
  "dark-mode": DarkModeOutlined,
  directions: Directions,
  "error-outline": ErrorOutline,
  event: EventOutlined,
  "expand-more": ExpandMore,
  facebook: Facebook,
  flight: FlightLandOutlined,
  "flight-takeoff": FlightTakeoffOutlined,
  "fitness-center": FitnessCenterOutlined,
  groups: GroupsOutlined,
  info: InfoOutlined,
  instagram: Instagram,
  "keyboard-arrow-down": KeyboardArrowDown,
  "king-bed": KingBedOutlined,
  "light-mode": LightModeOutlined,
  linkedin: LinkedIn,
  parking: LocalParkingOutlined,
  location: LocationOnOutlined,
  mail: MailOutline,
  menu: Menu,
  pause: Pause,
  phone: Phone,
  pool: PoolOutlined,
  play: PlayArrow,
  remove: Remove,
  restaurant: RestaurantOutlined,
  route: RouteOutlined,
  schedule: ScheduleOutlined,
  search: Search,
  spa: SpaOutlined,
  "support-agent": SupportAgentOutlined,
  translate: TranslateOutlined,
  verified: VerifiedUserOutlined,
  warning: WarningAmber,
  whatsapp: WhatsApp,
  x: X,
  ...LEISURE_ICONS,
  ...LEGAL_ICONS,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends SvgIconProps {
  name: IconName;
}

/**
 * With `iconSetLeisure.ts`, the only place `@mui/icons-material` is imported —
 * a closed, typed name map.
 */
export function Icon({ name, ...rest }: IconProps) {
  const Component = ICONS[name];
  return <Component {...rest} />;
}

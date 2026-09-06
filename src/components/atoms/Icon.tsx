import Add from "@mui/icons-material/Add";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import AutoStoriesOutlined from "@mui/icons-material/AutoStoriesOutlined";
import CelebrationOutlined from "@mui/icons-material/CelebrationOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Close from "@mui/icons-material/Close";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import Directions from "@mui/icons-material/Directions";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import EventOutlined from "@mui/icons-material/EventOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Facebook from "@mui/icons-material/Facebook";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Instagram from "@mui/icons-material/Instagram";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KingBedOutlined from "@mui/icons-material/KingBedOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import Menu from "@mui/icons-material/Menu";
import Pause from "@mui/icons-material/Pause";
import Phone from "@mui/icons-material/Phone";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PoolOutlined from "@mui/icons-material/PoolOutlined";
import Remove from "@mui/icons-material/Remove";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import Search from "@mui/icons-material/Search";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import WarningAmber from "@mui/icons-material/WarningAmber";
import WhatsApp from "@mui/icons-material/WhatsApp";
import X from "@mui/icons-material/X";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const ICONS = {
  add: Add,
  "auto-stories": AutoStoriesOutlined,
  "arrow-forward": ArrowForward,
  "arrow-upward": ArrowUpward,
  celebration: CelebrationOutlined,
  "check-circle": CheckCircle,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  close: Close,
  "dark-mode": DarkModeOutlined,
  directions: Directions,
  "error-outline": ErrorOutline,
  event: EventOutlined,
  "expand-more": ExpandMore,
  facebook: Facebook,
  info: InfoOutlined,
  instagram: Instagram,
  "keyboard-arrow-down": KeyboardArrowDown,
  "king-bed": KingBedOutlined,
  "light-mode": LightModeOutlined,
  linkedin: LinkedIn,
  location: LocationOnOutlined,
  mail: MailOutline,
  menu: Menu,
  pause: Pause,
  phone: Phone,
  pool: PoolOutlined,
  play: PlayArrow,
  remove: Remove,
  restaurant: RestaurantOutlined,
  search: Search,
  spa: SpaOutlined,
  warning: WarningAmber,
  whatsapp: WhatsApp,
  x: X,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends SvgIconProps {
  name: IconName;
}

/** The only place `@mui/icons-material` is imported — a closed, typed name map. */
export function Icon({ name, ...rest }: IconProps) {
  const Component = ICONS[name];
  return <Component {...rest} />;
}

import DiamondOutlined from "@mui/icons-material/DiamondOutlined";
import FireplaceOutlined from "@mui/icons-material/FireplaceOutlined";
import FreeBreakfastOutlined from "@mui/icons-material/FreeBreakfastOutlined";
import HelpOutline from "@mui/icons-material/HelpOutline";
import KeyOutlined from "@mui/icons-material/KeyOutlined";
import LaptopMacOutlined from "@mui/icons-material/LaptopMacOutlined";
import LocalBarOutlined from "@mui/icons-material/LocalBarOutlined";
import LocalCafeOutlined from "@mui/icons-material/LocalCafeOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import LuggageOutlined from "@mui/icons-material/LuggageOutlined";
import MusicNoteOutlined from "@mui/icons-material/MusicNoteOutlined";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import PhotoCameraOutlined from "@mui/icons-material/PhotoCameraOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import ThumbDownOutlined from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import WifiOutlined from "@mui/icons-material/WifiOutlined";
import WineBarOutlined from "@mui/icons-material/WineBarOutlined";

/**
 * The second half of the `Icon` name map — hospitality and leisure glyphs
 * (bar, café, garden, fireplace, camera…), the travel/amenity icons the
 * Airport Transfer page introduced, and the help-centre glyphs the FAQ page
 * needs (help, key, check-out, breakfast, receipt, thumbs). Split out of
 * `Icon.tsx` purely so that file stays under the repo's `max-lines` ceiling;
 * `Icon` spreads this map into its own, so `IconName` is still one closed
 * union and every call site is unchanged.
 */
export const LEISURE_ICONS = {
  breakfast: FreeBreakfastOutlined,
  cocktail: LocalBarOutlined,
  coffee: LocalCafeOutlined,
  camera: PhotoCameraOutlined,
  "check-out": LogoutOutlined,
  diamond: DiamondOutlined,
  fireplace: FireplaceOutlined,
  garden: ParkOutlined,
  help: HelpOutline,
  key: KeyOutlined,
  laptop: LaptopMacOutlined,
  luggage: LuggageOutlined,
  music: MusicNoteOutlined,
  payments: PaymentsOutlined,
  receipt: ReceiptLongOutlined,
  "thumb-down": ThumbDownOutlined,
  "thumb-up": ThumbUpOutlined,
  wifi: WifiOutlined,
  wine: WineBarOutlined,
} as const;

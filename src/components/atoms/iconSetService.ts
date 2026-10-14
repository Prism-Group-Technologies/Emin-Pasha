import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import LocalLaundryServiceOutlined from "@mui/icons-material/LocalLaundryServiceOutlined";
import LocalTaxiOutlined from "@mui/icons-material/LocalTaxiOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import PrintOutlined from "@mui/icons-material/PrintOutlined";
import RoomServiceOutlined from "@mui/icons-material/RoomServiceOutlined";
import TourOutlined from "@mui/icons-material/TourOutlined";

/**
 * The third slice of the `Icon` name map — the front-desk glyphs the reception
 * surfaces introduced (bell, laundry, bureau de change, printing, taxi, tours,
 * city map). Split out for the same reason as `iconSetLeisure`: `Icon.tsx` is
 * at the repo's `max-lines` ceiling, and `Icon` spreads this map into its own,
 * so `IconName` remains one closed union.
 */
export const SERVICE_ICONS = {
  bell: RoomServiceOutlined,
  "city-map": MapOutlined,
  exchange: CurrencyExchangeOutlined,
  laundry: LocalLaundryServiceOutlined,
  print: PrintOutlined,
  taxi: LocalTaxiOutlined,
  tour: TourOutlined,
} as const;

import BlockOutlined from "@mui/icons-material/BlockOutlined";
import ContrastOutlined from "@mui/icons-material/ContrastOutlined";
import CookieOutlined from "@mui/icons-material/CookieOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import ElevatorOutlined from "@mui/icons-material/ElevatorOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import GavelOutlined from "@mui/icons-material/GavelOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import HearingOutlined from "@mui/icons-material/HearingOutlined";
import HistoryOutlined from "@mui/icons-material/HistoryOutlined";
import KeyboardOutlined from "@mui/icons-material/KeyboardOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import PrivacyTipOutlined from "@mui/icons-material/PrivacyTipOutlined";
import PublicOutlined from "@mui/icons-material/PublicOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import ToggleOnOutlined from "@mui/icons-material/ToggleOnOutlined";
import TuneOutlined from "@mui/icons-material/TuneOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

/**
 * The third slice of the `Icon` name map — the trust and legal glyphs the
 * Privacy, Cookie, Terms, Accessibility and Cookie Settings pages need (lock,
 * shield, gavel, cookie, the data-rights verbs, the accessibility aids).
 * Split out of `Icon.tsx` for the same `max-lines` reason as
 * `iconSetLeisure.ts`; `Icon` spreads it in, so `IconName` stays one closed
 * union.
 */
export const LEGAL_ICONS = {
  block: BlockOutlined,
  contrast: ContrastOutlined,
  cookie: CookieOutlined,
  delete: DeleteOutlineOutlined,
  download: DownloadOutlined,
  edit: EditOutlined,
  elevator: ElevatorOutlined,
  "fact-check": FactCheckOutlined,
  gavel: GavelOutlined,
  handshake: HandshakeOutlined,
  hearing: HearingOutlined,
  history: HistoryOutlined,
  keyboard: KeyboardOutlined,
  lock: LockOutlined,
  "privacy-tip": PrivacyTipOutlined,
  public: PublicOutlined,
  shield: ShieldOutlined,
  toggle: ToggleOnOutlined,
  tune: TuneOutlined,
  visibility: VisibilityOutlined,
} as const;

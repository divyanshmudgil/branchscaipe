// Icon — thin wrapper around lucide-react so every call site in the app can
// keep using <Icon name="git-branch" size={18} sw={1.75} /> with a plain
// kebab-case name string, matching the design system's Lucide convention
// (1.75 stroke, 20px default in chrome, 16px inline).
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Copy,
  CornerDownRight,
  File,
  FileText,
  GitBranch,
  GitMerge,
  History,
  Image,
  Info,
  Keyboard,
  Link,
  LogOut,
  Menu,
  MessageSquare,
  MessagesSquare,
  Mic,
  MicOff,
  MoreHorizontal,
  Moon,
  PanelLeft,
  Paperclip,
  Pencil,
  Quote,
  RotateCcw,
  Search,
  Send,
  Settings,
  Sparkles,
  Square,
  SquarePen,
  Star,
  StarOff,
  Sun,
  Trash2,
  User,
  X,
} from "lucide-react";

const ICONS = {
  "alert-triangle": AlertTriangle,
  "arrow-right": ArrowRight,
  check: Check,
  "chevron-right": ChevronRight,
  clock: Clock,
  copy: Copy,
  "corner-down-right": CornerDownRight,
  file: File,
  "file-text": FileText,
  "git-branch": GitBranch,
  "git-merge": GitMerge,
  history: History,
  image: Image,
  info: Info,
  keyboard: Keyboard,
  link: Link,
  "log-out": LogOut,
  menu: Menu,
  "message-square": MessageSquare,
  "messages-square": MessagesSquare,
  mic: Mic,
  "mic-off": MicOff,
  "more-horizontal": MoreHorizontal,
  moon: Moon,
  "panel-left": PanelLeft,
  paperclip: Paperclip,
  pencil: Pencil,
  quote: Quote,
  "rotate-ccw": RotateCcw,
  search: Search,
  send: Send,
  settings: Settings,
  sparkles: Sparkles,
  square: Square,
  "square-pen": SquarePen,
  star: Star,
  "star-off": StarOff,
  sun: Sun,
  trash: Trash2,
  user: User,
  x: X,
};

export function Icon({ name, size = 20, sw = 1.75, color = "currentColor", style = {} }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return (
    <Cmp
      size={size}
      strokeWidth={sw}
      color={color}
      style={{ display: "inline-flex", flex: "none", ...style }}
    />
  );
}

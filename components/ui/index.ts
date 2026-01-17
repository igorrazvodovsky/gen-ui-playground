export { Alert } from "./alert";
export { Badge } from "./badge";
export { Button } from "./button";
export { Card } from "./card";
export { Chart } from "./chart";
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";
export { DatePicker } from "./date-picker";
export { Divider } from "./divider";
export {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuCheckboxItemIndicator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRadioItemIndicator,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSubTriggerItem,
  DropdownMenuSubTriggerSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
export { Empty } from "./empty";
export { Grid } from "./grid";
export { Heading } from "./heading";
export { List } from "./list";
export { Metric } from "./metric";
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
export { RenderButton } from "./render-button";
export { Select } from "./select";
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./sidebar";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
export { Stack } from "./stack";
export { Table } from "./table";
export { Text } from "./text";
export { TextField } from "./text-field";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

import { Alert } from "./alert";
import { Badge } from "./badge";
import { Card } from "./card";
import { Chart } from "./chart";
import { DatePicker } from "./date-picker";
import { Divider } from "./divider";
import { Empty } from "./empty";
import { Grid } from "./grid";
import { Heading } from "./heading";
import { List } from "./list";
import { Metric } from "./metric";
import { RenderButton } from "./render-button";
import { Select } from "./select";
import { Stack } from "./stack";
import { Table } from "./table";
import { Text } from "./text";
import { TextField } from "./text-field";

export const componentRegistry = {
  Alert,
  Badge,
  Button: RenderButton,
  Card,
  Chart,
  DatePicker,
  Divider,
  Empty,
  Grid,
  Heading,
  List,
  Metric,
  Select,
  Stack,
  Table,
  Text,
  TextField,
};

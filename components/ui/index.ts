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
export { Input } from "./input";
export { List } from "./list";
export { Metric } from "./metric";
export { ObjectView } from "./object-view";
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
export { RenderButton } from "./render-button";
export { Separator } from "./separator";
export { Select } from "./select";
export { Checkbox } from "./checkbox";
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
export { TableEmpty } from "./table-empty";
export { Text } from "./text";
export { TextField } from "./text-field";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
export { DataTable } from "./data-table";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
export { RenderTabs } from "./render-tabs";
export { TasksTable } from "./tasks-table";

import { Alert } from "./alert";
import { Badge } from "./badge";
import { Card } from "./card";
import { Chart } from "./chart";
import { Checkbox } from "./checkbox";
import { DataTable } from "./data-table";
import { DatePicker } from "./date-picker";
import { Divider } from "./divider";
import { Empty } from "./empty";
import { Grid } from "./grid";
import { Heading } from "./heading";
import { List } from "./list";
import { Metric } from "./metric";
import { ObjectView } from "./object-view";
import { RenderButton } from "./render-button";
import { Select } from "./select";
import { Stack } from "./stack";
import { Table } from "./table";
import { RenderTabs } from "./render-tabs";
import { Text } from "./text";
import { TextField } from "./text-field";
import { TasksTable } from "./tasks-table";

export const componentRegistry = {
  Alert,
  Badge,
  Button: RenderButton,
  Card,
  Chart,
  Checkbox,
  DataTable,
  DatePicker,
  Divider,
  Empty,
  Grid,
  Heading,
  List,
  Metric,
  ObjectView,
  Select,
  Stack,
  Table,
  Tabs: RenderTabs,
  TasksTable,
  Text,
  TextField,
};

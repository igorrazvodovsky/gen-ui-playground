import { TASKS } from "@/lib/tasks";

import { ACCOUNTS } from "./accounts";
import { ANALYTICS } from "./analytics";
import { ASSETS } from "./assets";
import { BATCHES } from "./batches";
import { DASHBOARD } from "./dashboard";
import { EPCIS } from "./epcis";
import { FACILITIES } from "./facilities";
import { FORM } from "./form";
import { MATERIALS } from "./materials";
import { SETTINGS } from "./settings";
import { SHIPMENTS } from "./shipments";

export const INITIAL_DATA = {
  analytics: ANALYTICS,
  form: FORM,
  dashboard: DASHBOARD,
  accounts: ACCOUNTS,
  facilities: FACILITIES,
  materials: MATERIALS,
  batches: BATCHES,
  shipments: SHIPMENTS,
  assets: ASSETS,
  epcis: EPCIS,
  settings: SETTINGS,
  tasks: {
    items: TASKS,
  },
};

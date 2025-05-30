
import { initAuth } from "./auth.js";
import { initEntryStore } from "./entry-store.js";
import { initCalendar } from "./calendar.js";
import { initNav } from "./nav.js";
import { initEntryDetailDialog } from "./entry-detail-dialog.js";
import { initDeleteDialog } from "./entry-delete-dialog.js";
import { initEntryFormDialog } from "./entry-form-dialog.js";
import { initViewStatsDialog } from "./view-stats-dialog.js";
import { initViewSelect } from "./view-select.js";


initAuth();
const entryStore = initEntryStore();
initCalendar(entryStore);
initNav();
initEntryDetailDialog();
initDeleteDialog();
initEntryFormDialog();
initViewStatsDialog(entryStore);
initViewSelect();




import { initAuth } from "./auth.js";
import { initEntryStore } from "./entry-store.js";
import { initCalendar } from "./calendar.js";
import { initMiniCalendars } from "./mini-calendar.js";
import { initNav } from "./nav.js";
import { initEntryCreateButtons } from "./entry-create-button.js";
import { initEntryDetailDialog } from "./entry-detail-dialog.js";
import { initDeleteDialog } from "./entry-delete-dialog.js";
import { initEntryFormDialog } from "./entry-form-dialog.js";
import { initViewSelect } from "./view-select.js";


initAuth();
const entryStore = initEntryStore();
initCalendar(entryStore);
initMiniCalendars();
initNav();
initEntryCreateButtons();
initEntryDetailDialog();
initDeleteDialog();
initEntryFormDialog();
initViewSelect();



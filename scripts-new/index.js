import { initEntryStore } from "./entry-store.js";
import { initCalendar } from "./calendar.js";
import { initNav } from "./nav.js";
import { initEntryCreateButtons } from "./entry-create-button.js";
import { initEntryFormDialog } from "./entry-form-dialog.js";
import { initViewSelect } from "./view-select.js";



const entryStore = initEntryStore();
initCalendar(entryStore);
initNav();
initEntryCreateButtons();
initEntryFormDialog();
initViewSelect();




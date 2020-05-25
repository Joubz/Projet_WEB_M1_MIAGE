import {MatDateFormats} from "@angular/material";


/**
 * This is a date format in French for the calendar
 */
export const dateFrenchFormat: MatDateFormats = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

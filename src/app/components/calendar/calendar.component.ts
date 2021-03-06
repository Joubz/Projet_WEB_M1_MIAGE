import {AfterViewInit, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild} from "@angular/core";
import { Moment } from "moment";
import * as moment from "moment";
import { MatCalendar } from "@angular/material";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent {

  @Output()
  dateSelected: EventEmitter<Moment> = new EventEmitter();

  @Output()
  monthSelected: EventEmitter<Moment> = new EventEmitter();

  @Output()
  selectedDate = moment();

  // @ts-ignore
  @ViewChild("calendar")
  calendar: MatCalendar<Moment>;

  constructor() {}

  /**
   * Change the active date on the calendar when a new date is chosen
   */
  dateChanged() {
    this.calendar.activeDate = this.selectedDate;
    this.dateSelected.emit(this.selectedDate);
  }


  monthChanged() {
    this.calendar._goToDateInView(this.selectedDate, "month");
    this.monthSelected.emit(this.selectedDate);
  }
}

import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Moment} from "moment";
import {Doctor} from "../../classes/Doctor";
import {Gender} from "../../classes/Gender";
import {Schedule} from "../../classes/Schedule";
import * as moment from "moment";
import {JSONReaderService} from "../../services/JSONReaderService";
import {MatDialog} from "@angular/material";
import {DialogResetAppointmentDialogComponent} from "../dialog-reset-appointment-dialog/dialog-reset-appointment-dialog.component";
import {DialogConfirmAppointmentDialogComponent} from "../dialog-confirm-appointment-dialog/dialog-confirm-appointment-dialog.component";

/**
 * Component for the stepper form
 */
@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"]
})
export class AppointmentFormComponent implements OnInit {

  // @ts-ignore
  @ViewChild("myCalendar")
  // @ts-ignore
  @ViewChild("stepper") stepper;

  displayedColumns: string[] = ["selection", "schedule"];
  dataSource: string[];

  /**
   * Patient Tab
   */

  patientTabFormGroup: FormGroup;

  sexType = Gender;
  sexes: string[];

  /**
   * Doctor Tab
   */

  doctorTabFormGroup: FormGroup;

  selectedDoctor: Doctor;
  doctors: Doctor[];


  /**
   * Appointment Tab
   */
  appointmentTabFormGroupe: FormGroup;

  schedules: Schedule[];
  private tmpDay: string;
  private tmpMonth: string;
  private findCorrespondingDate: boolean;
  private chooseDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private jsonReaderService: JSONReaderService,
    public dialog: MatDialog
  ) {
    this.patientTabFormGroup = formBuilder.group({
      nameCtrl : formBuilder.control("", [Validators.required]),
      firstNameCtrl: formBuilder.control("", [Validators.required]),
      phoneCtrl: formBuilder.control("", [Validators.required]),
      mailCtrl: formBuilder.control("", [Validators.required]),
      birthDateCtrl: formBuilder.control("", [Validators.required]),
      sexCtrl: formBuilder.control("", [Validators.required]),
      weightCtrl: formBuilder.control("", [Validators.required]),
      sizeCtrl: formBuilder.control("", [Validators.required])
    });

    this.doctorTabFormGroup = formBuilder.group({
      doctorChoiceCtrl: formBuilder.control("", [Validators.required])
    });

    this.appointmentTabFormGroupe = formBuilder.group({
      dayCtrl: formBuilder.control("", [Validators.required]),
      scheduleCtrl:  formBuilder.control("", [Validators.required])
    });
  }

  ngOnInit() {
    this.dataSource = [""];

    this.schedules = [];
    this.jsonReaderService.getJSON().subscribe(data => {
      data.forEach(schedule => {
        this.schedules.push(schedule);
      });
      this.dateSelected(moment());
      this.appointmentTabFormGroupe.get("dayCtrl").setValue(this.conversionToFrenchDate(moment()));
    });

    this.sexes = [];
    this.sexes = Object.keys(this.sexType);

    this.doctors = [];
    this.doctors.push(new Doctor("Dr Joubert", "Généraliste", "33 rue Emile Combes, 33400 Talence"));
    this.doctors.push(new Doctor("Dr Bascouzaraix", "Dentiste", "2 Avenue Pierre Louis, 33400 Talence"));
    this.doctors.push(new Doctor("Dr Pissotte", "Ostéopathe", "6 rue du Luc, 33400 Talence"));
  }

  onDoctorSelectionChange(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }

  conversionToFrenchDate(value: Moment) {
    this.tmpDay = "";
    this.tmpMonth = "";
    if (value.date().toString().length === 1) {
      this.tmpDay = "0" + value.date().toString();
    } else {
      this.tmpDay = value.date().toString();
    }

    if (value.month().toString().length === 1) {
      this.tmpMonth = "0" + (value.month() + 1).toString();
    } else {
      this.tmpMonth = (value.month() + 1).toString();
    }
    return this.tmpDay + "/" + this.tmpMonth + "/" + value.year();
  }

  /**
   * Help to get the data of a day
   * @param value is the selected date
   */
  dateSelected(value: Moment) {
    this.findCorrespondingDate = false;
    this.schedules.forEach(schedule => {
      if (this.conversionToFrenchDate(value) === schedule.date) {
        this.dataSource = schedule.appointments;
        this.chooseDate = schedule.date;
        this.findCorrespondingDate = true;
      }
    });
    if (this.findCorrespondingDate === false) {
      this.dataSource = [];
    }
  }

  setDayAndScheduleCtrl(appointment: string) {
    this.appointmentTabFormGroupe.get("dayCtrl").setValue(this.chooseDate);
    this.appointmentTabFormGroupe.get("scheduleCtrl").setValue(appointment);
  }

  openResetDialog(): void {
    const dialogRef = this.dialog.open(DialogResetAppointmentDialogComponent, {
      width: "300px",
      data: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.stepper.reset();
        this.patientTabFormGroup.reset();
        this.doctorTabFormGroup.reset();
        this.selectedDoctor = null;
        this.appointmentTabFormGroupe.reset();
      }
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmAppointmentDialogComponent, {
      width: "300px",
      data: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.save();
      }

    });
  }

  save() {
    console.log("save");
  }
}

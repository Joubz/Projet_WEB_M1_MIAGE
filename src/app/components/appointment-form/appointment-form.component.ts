import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Moment} from "moment";
import {Doctor} from "../../classes/Doctor";
import {Gender} from "../../classes/Gender";
import {Schedule} from "../../classes/Schedule";
import * as moment from "moment";
import {JSONReaderService} from "../../services/JSONReaderService";
import {MatDialog} from "@angular/material";
import {DialogResetAppointmentDialogComponent} from "../dialog-reset-appointment-dialog/dialog-reset-appointment-dialog.component";
import {DialogConfirmAppointmentDialogComponent} from "../dialog-confirm-appointment-dialog/dialog-confirm-appointment-dialog.component";
import {Patient} from "../../classes/Patient";
import {Appointment} from "../../classes/Appointment";

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

  sexes: string[];

  /**
   * Doctor Tab
   */

  doctorTabFormGroup: FormGroup;

  selectedDoctor: Doctor;
  doctors: Doctor[] = [];


  /**
   * Appointment.ts Tab
   */
  appointmentTabFormGroupe: FormGroup;

  schedules: Schedule[];
  private tmpDay: string;
  private tmpMonth: string;
  private findCorrespondingDate: boolean;
  private chooseDate: string;
  private patient: Patient;
  private appointment: Appointment;

  constructor(
    private formBuilder: FormBuilder,
    private jsonReaderService: JSONReaderService,
    public dialog: MatDialog
  ) {
    /**
     * Declaration of form group for patient tab
     */
    this.patientTabFormGroup = formBuilder.group({
      lastNameCtrl: formBuilder.control("", [Validators.required, Validators.minLength(2)]),
      firstNameCtrl: formBuilder.control("", [Validators.required, Validators.minLength(2)]),
      phoneCtrl: formBuilder.control("", [Validators.required, Validators.pattern(/^([0-9]\d*)?$/)]),
      mailCtrl: formBuilder.control("", [Validators.required, Validators.pattern("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$")]),
      birthDateCtrl: formBuilder.control("", [Validators.required]),
      genderCtrl: formBuilder.control("", [Validators.required]),
      weightCtrl: formBuilder.control("", [Validators.required, Validators.pattern(/^([0-9]\d*)?$/)]),
      sizeCtrl: formBuilder.control("", [Validators.required, Validators.pattern(/^([0-9]\d*)?$/)])
    });

    /**
     * Declaration of form group for patient tab
     */
    this.doctorTabFormGroup = formBuilder.group({
      doctorChoiceCtrl: formBuilder.control("", [Validators.required])
    });

    /**
     * Declaration of form group for patient tab
     */
    this.appointmentTabFormGroupe = formBuilder.group({
      dayCtrl: formBuilder.control("", [Validators.required]),
      scheduleCtrl: formBuilder.control("", [Validators.required])
    });
  }

  /**
   * Init the service and other variables
   */
  ngOnInit() {
    this.dataSource = [""];
    this.schedules = [];

    /**
     * Call to the JSONReader service, in order to get the doctor array
     */
    this.jsonReaderService.getJSONDoctors().subscribe(doctorData => {
      this.doctors = doctorData.doctors;
    }, error => console.log(error));

    /**
     * Call to the JSONReader service, in order to get the schedule array
     */
    this.jsonReaderService.getJSONSchedules().subscribe(scheduleData => {
      this.schedules = scheduleData;
      this.dateSelected(moment());
      this.appointmentTabFormGroupe.get("dayCtrl").setValue(this.conversionToFrenchDate(moment()));
    }, error => console.log(error));

    this.sexes = [];
    this.sexes.push("Femme", "Homme");

    /*
    this.doctors.push(new Doctor("Joubert", "Nathan", "Généraliste", "33 rue Emile Combes, 33400 Talence", 8,
       12, 14, 17, 30));
     this.doctors.push(new Doctor("Bascouzaraix", "Julien", "Dentiste", "2 Avenue Pierre Louis, 33400 Talence", 8,
       12, 14, 17, 30));
     this.doctors.push(new Doctor("Pissotte", "Alexandre", "Ostéopathe", "6 rue du Luc, 33400 Talence", 8,
       12, 14, 17, 30));
       */

  }

  /**
   * This fonction is called when a doctor is choose by the user, allows variables to be stored in an easily accessible object
   * @param doctor, a doctor object
   */
  onDoctorSelectionChange(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }

  /**
   * This function converts a date in English format to a date in French format
   * @param value, a moment
   */
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
   * This function is called when a date is chosen in the calendar, it allows to initialize the table containing the schedules available at the chosen date.
   * @param value is the selected date from the calendar
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

  /**
   * This fonction is called when a schedule is chose, it set the values in the form group
   * @param appointment, the schedule of the appointment
   */
  setDayAndScheduleCtrl(appointment: string) {
    this.appointmentTabFormGroupe.get("dayCtrl").setValue(this.chooseDate);
    this.appointmentTabFormGroupe.get("scheduleCtrl").setValue(appointment);
  }

  /**
   * Open the dialog the the reset action
   */
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

  /**
   * Open the dialog the the reset action
   */
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

  /**
   * Convert the string into a gender enum type
   * @param gender the string of the select
   */
  genderConversion(gender: string) {
    if (gender === "Femme") {
      return Gender.F;
    } else if (gender === "Homme") {
      return Gender.M;
    } else {
      return Gender.M;
    }
  }

  /**
   * Save the data from the tab, and put them into object for the transfer to the server part of the application
   */
  save() {
    this.patient = new Patient(this.patientTabFormGroup.get("lastNameCtrl").value, this.patientTabFormGroup.get("firstNameCtrl").value,
      this.patientTabFormGroup.get("phoneCtrl").value, this.patientTabFormGroup.get("mailCtrl").value,
      this.conversionToFrenchDate(this.patientTabFormGroup.get("birthDateCtrl").value), this.genderConversion(this.patientTabFormGroup.get("genderCtrl").value),
      parseInt(this.patientTabFormGroup.get("weightCtrl").value, 10), parseInt(this.patientTabFormGroup.get("sizeCtrl").value, 10));

    this.appointment = new Appointment(this.selectedDoctor, this.patient, this.appointmentTabFormGroupe.get("dayCtrl").value, this.appointmentTabFormGroupe.get("scheduleCtrl").value);


    console.log(JSON.stringify(this.appointment));

  }
}

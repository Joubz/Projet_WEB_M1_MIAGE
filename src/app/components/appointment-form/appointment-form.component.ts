import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Moment} from "moment";
import {Doctor} from "../../classes/Doctor";
import {Gender} from "../../classes/Gender";
import {Schedule} from "../../classes/Schedule";
import * as moment from "moment";
import {AppointmentService} from "../../services/AppointmentService";
import {MatDialog} from "@angular/material";
import {DialogResetAppointmentDialogComponent} from "../dialog-reset-appointment-dialog/dialog-reset-appointment-dialog.component";
import {DialogConfirmAppointmentDialogComponent} from "../dialog-confirm-appointment-dialog/dialog-confirm-appointment-dialog.component";
import {Patient} from "../../classes/Patient";
import {Appointment} from "../../classes/Appointment";

const scheduleSplitter = "T";

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

  genderSelect: string[];

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
  private appointments: Appointment[];

  private currentDate: string;
  private schedulesBeforeSet: string[];

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
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

    this.loadDoctors();

    /**
     * Initialize the gender selection
     */
    this.genderSelect = [];
    this.genderSelect.push("Femme", "Homme");

    this.appointments = [];
  }

  /**
   * Service to get the doctors
   */
  loadDoctors() {
    /**
     * Call to the JSONReader service, in order to get the doctor array
     */
    this.appointmentService.getDoctors().subscribe(doctorData => {
      this.doctors = doctorData;
    }, error => console.log(error));
  }

  /**
   * Service to get the schedules the first time, to initiate the calendar day
   */
  loadSchedulesFirstTime() {
    /**
     * Call to the JSONReader service, in order to get the schedule array
     */
    this.appointmentService.getSchedules(this.selectedDoctor.id.toString(), (moment().month() + 1).toString(), moment().year().toString()).subscribe(scheduleData => {
      this.currentDate = "";
      this.schedulesBeforeSet = [];

      scheduleData.forEach(schedule => {
        if (this.currentDate === "") {
          this.currentDate = schedule.split(scheduleSplitter)[0];
          this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
        } else if (this.currentDate === schedule.split(scheduleSplitter)[0]) {
          this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
        } else {
          if ( parseInt(this.currentDate.split("-")[2], 10) >=  moment().date()) {
            this.schedules.push(new Schedule(this.currentDate, this.schedulesBeforeSet));
            this.currentDate = schedule.split(scheduleSplitter)[0];
            this.schedulesBeforeSet = [];
            this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
          } else {
            this.currentDate = schedule.split(scheduleSplitter)[0];
            this.schedulesBeforeSet = [];
            this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
          }
        }
      });

      this.currentDate = "";
      this.schedulesBeforeSet = [];

      this.dateSelected(moment());
      this.appointmentTabFormGroupe.get("dayCtrl").setValue(this.conversionToPersonnalDateFormat(moment()));
    }, error => console.log(error));
  }

  /**
   * Service to get the schedules
   */
  loadSchedules(value: Moment) {
    this.schedules = [];

    /**
     * Call to the JSONReader service, in order to get the schedule array
     */
    this.appointmentService.getSchedules(this.selectedDoctor.id.toString(), value.month().toString(), value.year().toString()).subscribe(scheduleData => {
      this.currentDate = "";
      this.schedulesBeforeSet = [];

      scheduleData.forEach(schedule => {
        if (this.currentDate === "") {
          this.currentDate = schedule.split(scheduleSplitter)[0];
          this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
        } else if (this.currentDate === schedule.split(scheduleSplitter)[0]) {
          this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
        } else {
          if ( parseInt(this.currentDate.split("-")[2], 10) >=  moment().date()) {
            this.schedules.push(new Schedule(this.currentDate, this.schedulesBeforeSet));
            this.currentDate = schedule.split(scheduleSplitter)[0];
            this.schedulesBeforeSet = [];
            this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
          } else {
            this.currentDate = schedule.split(scheduleSplitter)[0];
            this.schedulesBeforeSet = [];
            this.schedulesBeforeSet.push(schedule.split(scheduleSplitter)[1]);
          }
        }
      });

      this.currentDate = "";
      this.schedulesBeforeSet = [];

      this.dateSelected(moment());
      this.appointmentTabFormGroupe.get("dayCtrl").setValue(this.conversionToPersonnalDateFormat(moment()));
    }, error => console.log(error));
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
  conversionToPersonnalDateFormat(value: Moment) {
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
    return value.year() + "-" + this.tmpMonth + "-" + this.tmpDay;
  }

  /**
   * This function is called when a date is chosen in the calendar, it allows to initialize the table containing the schedules available at the chosen date.
   * @param value is the selected date from the calendar
   */
  dateSelected(value: Moment) {

    this.findCorrespondingDate = false;
    this.schedules.forEach(schedule => {
      if (this.conversionToPersonnalDateFormat(value) === schedule.date) {
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
        this.resetStepper();
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
        this.postAndSendAppointment();
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
   * Reset the stepper
   */
  resetStepper() {
    this.stepper.reset();
    this.patientTabFormGroup.reset();
    this.doctorTabFormGroup.reset();
    this.selectedDoctor = null;
    this.appointmentTabFormGroupe.reset();

    this.loadDoctors();
    this.schedules = [];
  }

  /**
   * Save the data from the tab, and put them into object for the transfer to the server part of the application
   */
  postAndSendAppointment() {
    this.patient = new Patient(this.patientTabFormGroup.get("lastNameCtrl").value, this.patientTabFormGroup.get("firstNameCtrl").value,
      this.patientTabFormGroup.get("phoneCtrl").value, this.patientTabFormGroup.get("mailCtrl").value,
      this.conversionToPersonnalDateFormat(this.patientTabFormGroup.get("birthDateCtrl").value), this.genderConversion(this.patientTabFormGroup.get("genderCtrl").value),
      parseInt(this.patientTabFormGroup.get("weightCtrl").value, 10), parseInt(this.patientTabFormGroup.get("sizeCtrl").value, 10));

    this.appointment = new Appointment(this.selectedDoctor, this.patient, this.appointmentTabFormGroupe.get("dayCtrl").value, this.appointmentTabFormGroupe.get("scheduleCtrl").value);

    this.appointmentService.postAppointment(this.appointment).subscribe(appointment => this.appointments.push(appointment));

    this.resetStepper();
  }
}


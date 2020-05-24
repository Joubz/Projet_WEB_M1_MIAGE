import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Moment} from "moment";
import {Doctor} from "../../classes/Doctor";
import {SexType} from "../../classes/SexType";
import {CalendarComponent} from "../calendar/calendar.component";
import {Schedule} from "../../classes/Schedule";
import * as moment from "moment";
import {JSONReaderService} from "../../services/JSONReaderService";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";


/**
 * Dialog for reset action
 */
@Component({
  selector: "app-dialog-reset-appointement-dialog",
  templateUrl: "dialog-reset-appointement-dialog.html",
})
export class DialogResetAppointementDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogResetAppointementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

/**
 * Dialog for confirm action
 */
@Component({
  selector: "app-dialog-confirm-appointement-dialog",
  templateUrl: "dialog-confirm-appointement-dialog.html",
})
export class DialogConfirmAppointementDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmAppointementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

/**
 * Component for the stepper
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

  nameCtrl: FormControl;
  firstNameCtrl: FormControl;
  phoneCtrl: FormControl;
  mailCtrl: FormControl;
  birthDateCtrl: FormControl;
  sexCtrl: FormControl;
  weightCtrl: FormControl;
  sizeCtrl: FormControl;
  patientTabFormGroup: FormGroup;

  sexType = SexType;
  sexes: string[];

  /**
   * Doctor Tab
   */

  doctorChoiceCtrl: FormControl;
  doctorTabFormGroup: FormGroup;

  doctorName: string;
  doctorSpeciality: string;
  doctorAdress: string;

  doctor1: Doctor;
  doctor2: Doctor;
  doctor3: Doctor;
  doctors: Doctor[];


  /**
   * Appointement Tab
   */
  dayCtrl: FormControl;
  scheduleCtrl: FormControl;
  appointementTabFormGroupe: FormGroup;

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
    this.nameCtrl = formBuilder.control("", [Validators.required]);
    this.firstNameCtrl = formBuilder.control("", [Validators.required]);
    this.phoneCtrl = formBuilder.control("", [Validators.required]);
    this.mailCtrl = formBuilder.control("", [Validators.required, Validators.email]);
    this.birthDateCtrl = formBuilder.control("", [Validators.required]);
    this.sexCtrl = formBuilder.control("", [Validators.required]);
    this.weightCtrl = formBuilder.control("", [Validators.required]);
    this.sizeCtrl = formBuilder.control("", [Validators.required]);
    this.patientTabFormGroup = formBuilder.group({
      name: this.nameCtrl,
      firstName: this.firstNameCtrl,
      phone: this.phoneCtrl,
      mail: this.mailCtrl,
      birthDate: this.birthDateCtrl,
      sex: this.sexCtrl,
      weight: this.weightCtrl,
      size: this.sizeCtrl
    });

    this.doctorChoiceCtrl = formBuilder.control("", [Validators.required]);
    this.doctorTabFormGroup = formBuilder.group({
      doctorChoice: this.doctorChoiceCtrl
    });

    this.dayCtrl = formBuilder.control("", [Validators.required]);
    this.scheduleCtrl = formBuilder.control("", [Validators.required]);
    this.appointementTabFormGroupe = formBuilder.group({
      day: this.dayCtrl,
      schedule: this.scheduleCtrl
    });
  }

  ngOnInit() {
    this.dataSource = [];

    this.schedules = [];
    this.jsonReaderService.getJSON().subscribe(data => {
      data.forEach(schedule => {
        this.schedules.push(schedule);
      });
      this.dateSelected(moment());
      this.dayCtrl.setValue(this.conversionToFrenchDate(moment()));
    });

    this.sexes = [];
    this.sexes = Object.keys(this.sexType);

    this.doctor1 = new Doctor("Dr Joubert", "Généraliste", "33 rue Emile Combes, 33400 Talence");
    this.doctor2 = new Doctor("Dr Bascouzaraix", "Dentiste", "2 Avenue Pierre Louis, 33400 Talence");
    this.doctor3 = new Doctor("Dr Pissotte", "Ostéopathe", "6 rue du Luc, 33400 Talence");

    this.doctors = [];
    this.doctors.push(this.doctor1);
    this.doctors.push(this.doctor2);
    this.doctors.push(this.doctor3);
  }

  onDoctorSelectionChange(doctor: Doctor) {
    this.doctorAdress = doctor.adress;
    this.doctorName = doctor.name;
    this.doctorSpeciality = doctor.speciality;
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
        this.dataSource = schedule.appointements;
        this.chooseDate = schedule.date;
        this.findCorrespondingDate = true;
      }
    });
    if (this.findCorrespondingDate === false) {
      this.dataSource = [];
    }
  }

  setDayAndScheduleCtrl(appointement: string) {
    this.dayCtrl.setValue(this.chooseDate);
    this.scheduleCtrl.setValue(appointement);
  }

  openResetDialog(): void {
    const dialogRef = this.dialog.open(DialogResetAppointementDialogComponent, {
      width: "300px",
      data: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.stepper.reset();
      }
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmAppointementDialogComponent, {
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

import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Moment} from "moment";
import {Doctor} from "../../classes/Doctor";
import {SexType} from "../../classes/SexType";
import {CalendarComponent} from "../calendar/calendar.component";
import {Schedule} from "../../classes/Schedule";
import * as moment from "moment";
import {JSONReaderService} from "../../services/JSONReaderService";


/**
 * Nathan Joubert
 */
@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"]
})
export class AppointmentFormComponent implements OnInit {
  // @ts-ignore
  @ViewChild("myCalendar")
  myCalendar: CalendarComponent;

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

  doctor1: Doctor;
  doctor2: Doctor;
  doctor3: Doctor;
  doctors: Doctor[];
  doctorAdress: string;

  /**
   * Appointement Tab
   */
  dayCtrl: FormControl;
  scheduleCtrl: FormControl;
  appointementTabFormGroupe: FormGroup;

  schedules: Schedule[];
  private tmpDay: string;
  private tmpMonth: string;
  private find: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private jsonReaderService: JSONReaderService
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
    this.find = false;
    this.schedules.forEach(schedule => {
      if (this.conversionToFrenchDate(value) === schedule.date) {
        this.dataSource = schedule.appointements;
        this.find = true;
      }
    });
    if (this.find === false) {
      this.dataSource = [];
    }
  }
}

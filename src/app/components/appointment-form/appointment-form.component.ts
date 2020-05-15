import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Doctor} from "../../classes/Doctor";
import {SexType} from "../../classes/SexType";

/**
 * Nathan Joubert
 */
@Component({
  selector: "app-appointment-form",
  templateUrl: "./appointment-form.component.html",
  styleUrls: ["./appointment-form.component.scss"]
})
export class AppointmentFormComponent implements OnInit {
  nameCtrl: FormControl;
  firstNameCtrl: FormControl;
  phoneCtrl: FormControl;
  mailCtrl: FormControl;
  birthDateCtrl: FormControl;
  sexCtrl: FormControl;
  weightCtrl: FormControl;
  sizeCtrl: FormControl;
  patientFormGroup: FormGroup;

  doctorChoiceCtrl: FormControl;
  doctorFormGroup: FormGroup;

  doctor1: Doctor;
  doctor2: Doctor;
  doctor3: Doctor;
  doctors: Doctor[];
  doctorAdress: string;

  sexType = SexType;
  sexes: string[];



  constructor(
    private formBuilder: FormBuilder
  ) {
    this.nameCtrl = formBuilder.control("", [Validators.required]);
    this.firstNameCtrl = formBuilder.control("", [Validators.required]);
    this.phoneCtrl = formBuilder.control("", [Validators.required]);
    this.mailCtrl = formBuilder.control("", [Validators.required]);
    this.birthDateCtrl = formBuilder.control("", [Validators.required]);
    this.sexCtrl = formBuilder.control("", [Validators.required]);
    this.weightCtrl = formBuilder.control("", [Validators.required]);
    this.sizeCtrl = formBuilder.control("", [Validators.required]);
    this.patientFormGroup = formBuilder.group({
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
    this.doctorFormGroup = formBuilder.group({
      doctorChoice: this.doctorChoiceCtrl
    });
  }

  ngOnInit() {

  //  this.sexType = SexType;
    this.sexes = [];
    this.sexes = Object.keys(this.sexType);

    this.doctor1 = new Doctor("Dr Joubert", "Généraliste", "33 rue Emile Combes, 33400 Talence");
    this.doctor2 =  new Doctor("Dr Bascouzaraix", "Dentiste", "2 Avenue Pierre Louis, 33400 Talence");
    this.doctor3 =  new Doctor("Dr Pissotte", "Ostéopathe", "6 rue du Luc, 33400 Talence");

    this.doctors = [];
    this.doctors.push(this.doctor1);
    this.doctors.push(this.doctor2);
    this.doctors.push(this.doctor3);
  }


  onDoctorSelectionChange(doctor: Doctor) {
    this.doctorAdress = doctor.adress;
  }
}

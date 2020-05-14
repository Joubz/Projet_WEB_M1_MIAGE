import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

interface Sex {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
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

  doctorFormGroup: FormGroup;

  sexes: Sex[] = [
    {value: 'man-0', viewValue: 'Homme'},
    {value: 'woman-1', viewValue: 'Femme'}
  ];


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.nameCtrl = formBuilder.control('', [Validators.required]);
    this.firstNameCtrl = formBuilder.control('', [Validators.required]);
    this.phoneCtrl = formBuilder.control('', [Validators.required]);
    this.mailCtrl = formBuilder.control('', [Validators.required]);
    this.birthDateCtrl = formBuilder.control('', [Validators.required]);
    this.sexCtrl = formBuilder.control('', [Validators.required]);
    this.weightCtrl = formBuilder.control('', [Validators.required]);
    this.sizeCtrl = formBuilder.control('', [Validators.required]);
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
  }

  ngOnInit() {
    this.doctorFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}

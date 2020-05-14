import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  sexes: Sex[] = [
    {value: 'man-0', viewValue: 'Homme'},
    {value: 'woman-1', viewValue: 'Femme'}
  ];


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}

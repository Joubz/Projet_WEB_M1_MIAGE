export class Doctor {
  name: string;
  speciality: string;
  adress: string;


  constructor(name: string, speciality: string, adress: string) {
    this.name = name;
    this.speciality = speciality;
    this.adress = adress;
  }

  title() {
    return this.name + " - " + this.speciality;
  }
}

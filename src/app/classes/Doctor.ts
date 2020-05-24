export class Doctor {
  name: string;
  speciality: string;
  address: string;


  constructor(name: string, speciality: string, address: string) {
    this.name = name;
    this.speciality = speciality;
    this.address = address;
  }

  title() {
    return this.name + " - " + this.speciality;
  }
}

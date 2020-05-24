export class Schedule {
  date: string;
  appointments: string[];

  constructor(date: string, appointments: string[]) {
    this.date = date;
    this.appointments = appointments;
  }
}

export class Schedule {
  date: string;
  appointements: string[];

  constructor(date: string, appointements: string[]) {
    this.date = date;
    this.appointements = appointements;
  }
}

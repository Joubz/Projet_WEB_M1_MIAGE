import {Doctor} from "./Doctor";
import {Patient} from "./Patient";

/**
 * This class represents a appointment and all his information
 */
export class Appointment {

  /**
   * Attributes
   */
  doctorId: number;
  patient: Patient;
  date: string;
  time: string;

  /**
   * Constructor of a appointment
   *
   * @param doctor for the appointment
   * @param patient for the appointment
   * @param date appointment date
   * @param time appointment schedule
   */
  constructor(doctorId: number, patient: Patient, date: string, time: string) {
    this.doctorId = doctorId;
    this.patient = patient;
    this.date = date;
    this.time = time;
  }
}

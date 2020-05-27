import {Patient} from "./Patient";
import {Doctor} from './Doctor';

/**
 * This class represents a appointment and all his information
 */
export class Appointment {

  /**
   * Attributes
   */
  doctor: Doctor;
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
  constructor(doctor: Doctor, patient: Patient, date: string, time: string) {
    this.doctor = doctor;
    this.patient = patient;
    this.date = date;
    this.time = time;
  }
}

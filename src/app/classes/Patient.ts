import {Gender} from "./Gender";

/**
 * This class represents a patient and all his information
 */
export class Patient {

  /**
   * Attributes
   */
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
  weight: number;
  height: number;

  /**
   * Constructor of a patient
   *
   * @param lastName of the patient
   * @param firstName of the patient
   * @param phone of the patient
   * @param email of the patient
   * @param dateOfBirth of the patient
   * @param gender of the patient
   * @param weight of the patient
   * @param height of the patient
   */
  constructor(lastName: string, firstName: string, phone: string, email: string, dateOfBirth: string, gender: Gender, weight: number, height: number) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
  }
}

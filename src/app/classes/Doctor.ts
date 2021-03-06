/**
 * This class represents a doctor and all his information
 */
export class Doctor {

  /**
   * Attributes
   */
  id: number;
  lastName: string;
  firstName: string;
  speciality: string;
  address: string;
  morningStartHour: number;
  morningEndHour: number;
  afternoonStartHour: number;
  afternoonEndHour: number;
  appointmentLast: number;

  /**
   * Constructors of a doctor
   *
   * @param lastName of the doctor
   * @param firstName of the doctor
   * @param speciality of the doctor
   * @param address of the doctor
   * @param morningStartHour of the doctor
   * @param morningEndHour of the doctor
   * @param afternoonStartHour of the doctor
   * @param afternoonEndHour of the doctor
   * @param appointmentLast of the doctor
   */
  constructor(id: number, lastName: string, firstName: string, speciality: string, address: string, morningStartHour: number,
              morningEndHour: number, afternoonStartHour: number, afternoonEndHour: number, appointmentLast: number) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.speciality = speciality;
    this.address = address;
    this.morningStartHour = morningStartHour;
    this.morningEndHour = morningEndHour;
    this.afternoonStartHour = afternoonStartHour;
    this.afternoonEndHour = afternoonEndHour;
    this.appointmentLast = appointmentLast;
  }
}

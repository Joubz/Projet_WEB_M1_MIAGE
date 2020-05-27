import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Schedule} from "../classes/Schedule";
import {Appointment} from "../classes/Appointment";
import {catchError, retry} from "rxjs/operators";
import {Doctor} from "../classes/Doctor";

@Injectable()
export class AppointmentService {

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get the JSON with the schedules
   */
  public getSchedules(doctorId: string, month: string, year: string): Observable<string[]> {
    return this.http.get<string[]>("http://localhost:8080/BordeauxMedicServer_war_exploded/Schedules/" + doctorId + "/" + month + "/" + year
    ).pipe(retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Method to get the JSON with the doctors
   */
  public getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>("http://localhost:8080/BordeauxMedicServer_war_exploded/Doctors").pipe(retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Post the appointment
   * @param appointment is a new appointment
   */
  public postAppointment(appointment: Appointment): Observable<Appointment> {
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Access-Control-Allow-Origin", "*");
    return this.http.post<Appointment>("http://localhost:8080/BordeauxMedicServer_war_exploded/Appointments", appointment, {headers: this.headers});
  }

  /**
   *  Handle the http errors
   * @param error a HttpErrorResponse
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      "Something bad happened; please try again later.");
  }
}

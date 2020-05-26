import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Schedule} from "../classes/Schedule";
import {IDoctors} from "../interfaces/IDoctors";
import {Appointment} from "../classes/Appointment";
import {catchError, retry} from "rxjs/operators";

@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get the JSON with the schedules
   */
  public getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("./assets/mydata.json").pipe(retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Method to get the JSON with the doctors
   */
  public getDoctors(): Observable<IDoctors> {
    return this.http.get<IDoctors>("http://localhost:8080/BordeauxMedicServer_war_exploded/Doctors").pipe(retry(3),
      catchError(this.handleError)
    );
  }

  /**
   * Post the appointment
   * @param appointment is a new appointment
   */
  public postAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>("http://localhost:8080/BordeauxMedicServer_war_exploded/Appointments/post", appointment).pipe(retry(3),
        catchError(this.handleError)
      );
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

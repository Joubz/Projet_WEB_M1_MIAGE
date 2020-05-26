import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Schedule} from "../classes/Schedule";
import {Doctor} from "../classes/Doctor";
import {IDoctors} from "../interfaces/IDoctors";

@Injectable()
export class JSONReaderService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get the JSON with the schedules
   */
  public getJSONSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("./assets/mydata.json");
  }

  /**
   * Method to get the JSON with the doctors
   */
  public getJSONDoctors(): Observable<IDoctors> {
    return this.http.get<IDoctors>("http://localhost:8080/BordeauxMedicServer_war_exploded/Doctors");
  }
}

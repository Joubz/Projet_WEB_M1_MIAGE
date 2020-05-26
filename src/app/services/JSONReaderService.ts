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

  public getJSONSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("./assets/mydata.json");
  }

  public getJSONDoctors(): Observable<IDoctors> {
    return this.http.get<IDoctors>("http://localhost:8080/BordeauxMedicServer_war_exploded/Doctors");
  }
}

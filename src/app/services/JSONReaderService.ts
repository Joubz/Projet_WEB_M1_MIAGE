import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {Schedule} from "../classes/Schedule";

@Injectable()
export class JSONReaderService {

  constructor(private http: HttpClient) {}

  public getJSON(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>("./assets/mydata.json");
  }
}

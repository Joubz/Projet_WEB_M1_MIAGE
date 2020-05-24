import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";


const routes: Routes = [{path: "", component: AppointmentFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

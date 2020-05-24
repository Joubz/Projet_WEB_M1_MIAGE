import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE, MatDialogModule,
  MatIconModule,
  MatInputModule, MatMenuModule,
  MatRadioModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {
  AppointmentFormComponent,
  DialogResetAppointementDialogComponent,
  DialogConfirmAppointementDialogComponent
} from "./components/appointment-form/appointment-form.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from "@angular/material-moment-adapter";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {dateFrenchFormat} from "./components/calendar/dateFrenchFormat";
import {JSONReaderService} from "./services/JSONReaderService";
import {ThemingService} from "./services/theming.service";
import {HttpClientModule} from "@angular/common/http";
import {ToolBarComponent} from "./components/tool-bar/tool-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    AppointmentFormComponent,
    DialogResetAppointementDialogComponent,
    DialogConfirmAppointementDialogComponent,
    CalendarComponent,
  ],
  entryComponents: [DialogResetAppointementDialogComponent, DialogConfirmAppointementDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatMomentDateModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    HttpClientModule,
    JSONReaderService,
    ThemingService,
    {provide: MAT_DATE_LOCALE, useValue: "fr-FR"},
    {provide: MAT_DATE_FORMATS, useValue: dateFrenchFormat},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

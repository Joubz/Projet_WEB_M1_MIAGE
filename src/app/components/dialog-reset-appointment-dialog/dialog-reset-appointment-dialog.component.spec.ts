import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogResetAppointmentDialogComponent } from "./dialog-reset-appointment-dialog.component";

describe("DialogResetAppointmentDialogComponent", () => {
  let component: DialogResetAppointmentDialogComponent;
  let fixture: ComponentFixture<DialogResetAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResetAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResetAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

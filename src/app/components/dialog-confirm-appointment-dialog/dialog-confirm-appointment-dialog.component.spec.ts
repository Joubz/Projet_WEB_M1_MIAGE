import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogConfirmAppointmentDialogComponent } from "./dialog-confirm-appointment-dialog.component";

describe("DialogConfirmAppointmentDialogComponent", () => {
  let component: DialogConfirmAppointmentDialogComponent;
  let fixture: ComponentFixture<DialogConfirmAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

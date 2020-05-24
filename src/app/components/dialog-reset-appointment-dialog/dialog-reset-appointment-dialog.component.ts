import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

/**
 * Dialog for reset action
 */
@Component({
  selector: "app-dialog-reset-appointment-dialog",
  templateUrl: "./dialog-reset-appointment-dialog.component.html",
  styleUrls: ["./dialog-reset-appointment-dialog.component.scss"]
})
export class DialogResetAppointmentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogResetAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



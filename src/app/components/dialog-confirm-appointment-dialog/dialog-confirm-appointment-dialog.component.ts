import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

/**
 * Dialog for confirm action
 */
@Component({
  selector: "app-dialog-confirm-appointment-dialog",
  templateUrl: "./dialog-confirm-appointment-dialog.component.html",
  styleUrls: ["./dialog-confirm-appointment-dialog.component.scss"]
})
export class DialogConfirmAppointmentDialogComponent  {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  /**
   * When the cancel button in click
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }

}

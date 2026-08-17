import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div style="padding: 8px;">
      <h2 mat-dialog-title style="display:flex;align-items:center;gap:10px;color:#c62828;font-size:1.1rem;">
        <i class="bi bi-exclamation-triangle-fill"></i>
        Confirm Delete
      </h2>
      <mat-dialog-content style="padding:16px 0;color:#555;font-size:0.92rem;">
        {{ data.message }}
      </mat-dialog-content>
      <mat-dialog-actions align="end" style="gap:10px;padding-bottom:8px;">
        <button mat-button (click)="onCancel()" style="border-radius:8px;">Cancel</button>
        <button mat-raised-button color="warn" (click)="onConfirm()"
          style="border-radius:8px;padding:0 20px;">
          <i class="bi bi-trash me-1"></i> Delete
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

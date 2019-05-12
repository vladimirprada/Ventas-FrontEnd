import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorIntl, MatCardModule, MatSnackBarModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatDialogModule } from '@angular/material/';
import { MatPaginatorImpl } from '../_shared/mat-paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl }
  ]
})
export class MaterialModule { }

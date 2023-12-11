import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EletronicComponent } from './eletronic.component';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddEditEletronicModule } from '../eletronic-add-edit/add-edit-eletronic.module';






@NgModule({
  declarations: [
    EletronicComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    AddEditEletronicModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    EletronicComponent
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class EletronicModule { }

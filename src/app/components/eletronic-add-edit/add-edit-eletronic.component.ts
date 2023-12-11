import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EletronicService } from '../../services/eletronic.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-eletronic',
  templateUrl: './add-edit-eletronic.component.html',
  styleUrls: ['./add-edit-eletronic.component.css'],
})
export class AddEditEletronicComponent implements OnInit, OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedEletronic: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  isEdit = false;

  eletronicForm = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control(''),
    brand: this.fb.nonNullable.control('', Validators.required),
    price: this.fb.nonNullable.control(0, Validators.required),
    amount: this.fb.nonNullable.control(0, Validators.required),
    image: this.fb.nonNullable.control(''),
  });
  constructor(
    private fb: FormBuilder,
    private eletronicService: EletronicService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.selectedEletronic) {
      this.eletronicForm.patchValue(this.selectedEletronic);
      this.isEdit = true;
    } else {
      this.eletronicForm.reset;
      this.isEdit = false;
    }
  }

  closeModal() {
    this.eletronicForm.reset();
    this.selectedEletronic = undefined;
    this.clickClose.emit(true);
  }

  addEditEletronic() {
    this.eletronicForm.controls['image'].setValue('https://picsum.photos/200');
    this.eletronicService.addEditEletronics(this.eletronicForm.value, this.selectedEletronic).subscribe(
      (data) => {
        this.closeModal();
        if (this.isEdit == true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Eletrônico editado com sucesso!',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Eletrônico adicionado com sucesso!',
          });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Error occured');
      },
    );
  }
}

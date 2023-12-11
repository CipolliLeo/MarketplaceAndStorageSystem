import { Component, OnInit } from '@angular/core';
import { EletronicService } from '../../services/eletronic.service';
import { Eletronic } from '../../models/eletronic';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-eletronic',
  templateUrl: './eletronic.component.html',
  styleUrls: ['./eletronic.component.css'],
})
export class EletronicComponent implements OnInit {
  eletronics: Eletronic[] = [];
  displayAddEditModal = false;
  selectedEletronic: any = null;

  constructor(
    private eletronicService: EletronicService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getEletronicList();
  }

  getEletronicList() {
    this.eletronicService.getEletronics().subscribe((data) => {
      this.eletronics = data;
    });
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedEletronic = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.getEletronicList();
  }

  showEditModal(eletronic: Eletronic) {
    this.displayAddEditModal = true;
    this.selectedEletronic = eletronic;
  }

  deleteEletronic(eletronic: Eletronic) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover esse produto?',
      accept: () => {
        if (eletronic.id)
          this.eletronicService.deleteEletronic(eletronic.id).subscribe(
            (data) => {
              this.getEletronicList();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Eletrônico excluído com sucesso!',
              });
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
              console.log('Error occured');
            },
          );
      },
    });
  }
}

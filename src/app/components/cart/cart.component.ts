import { Component, OnInit } from '@angular/core';
import { EletronicService } from 'src/app/services/eletronic.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { Eletronic } from 'src/app/models/eletronic';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  eletronic: any;
  displayMakeOrderModal = false;
  hiddenPage: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private eletronicService: EletronicService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.getCartByUser(email);
    }
  }

  getCartByUser(email: string) {
    this.cartService.getAllCartByUser(email).subscribe((data) => {
      if (data.length === 0) {
        this.hiddenPage = false;
      } else {
        this.hiddenPage = true;
      }
      this.carts = data;
      this.carts.forEach((item) => {
        this.eletronicService.getEletronicById(Number(item.idEletronic)).subscribe((data) => {
          this.eletronic = data;
          if (this.eletronic !== undefined) {
            item.eletronic = data;
          }
        });
      });
    });
  }

  deleteFromCart(cart: Cart) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover esse produto do carrinho?',
      accept: () => {
        this.cartService.removeFromCart(Number(cart.id)).subscribe(
          (data) => {
            this.getCart();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto removido do Carrinho',
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

  showOrderModal() {
    this.carts.forEach((cart) => {
      this.cartService.updateCart(cart).subscribe((data) => {
        this.displayMakeOrderModal = true;
      });
    });
  }

  hideMakeOrderModal(isClosed: boolean) {
    this.displayMakeOrderModal = !isClosed;
    this.getCart();
  }
}

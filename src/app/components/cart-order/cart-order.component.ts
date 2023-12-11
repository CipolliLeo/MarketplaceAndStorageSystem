import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css'],
})
export class CartOrderComponent implements OnInit {
  @Input() displayMakeOrderModal: boolean = true;
  @Input() selectedEletronic: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  name?: string;
  okPersonalInfo: boolean = false;
  order: Order = {};
  cart: Cart = {};
  carts: Cart[] = [];
  totalValue: number = 0;

  orderForm = this.fb.group({
    endereco: this.fb.nonNullable.control('', Validators.required),
    complemento: this.fb.nonNullable.control(''),
    bairro: this.fb.nonNullable.control('', Validators.required),
    cidade: this.fb.nonNullable.control('', Validators.required),
    estado: this.fb.nonNullable.control('', Validators.required),
    pais: this.fb.nonNullable.control('', Validators.required),
  });

  cardForm = this.fb.group({
    cardNumber: this.fb.nonNullable.control('', Validators.required),
    cardName: this.fb.nonNullable.control('', Validators.required),
    cardValid: this.fb.nonNullable.control('', Validators.required),
    cardCVV: this.fb.nonNullable.control(0, Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const storageName = sessionStorage.getItem('nome');
    if (storageName) {
      this.name = storageName;
    }
    const storageEmail = sessionStorage.getItem('email');
    if (storageEmail)
      this.cartService.getAllCartByUser(storageEmail).subscribe((data) => {
        this.carts = data;
        this.calculateTotalValue();
      });
  }

  calculateTotalValue() {
    this.totalValue = 0;
    this.carts.forEach((item) => {
      if (item.amount && item.eletronic?.price) this.totalValue += item.amount * item.eletronic?.price;
    });
  }

  closeModal() {
    this.clickClose.emit(true);
    this.orderForm.reset();
    this.cardForm.reset();
    this.okPersonalInfo = false;
  }

  nextStep() {
    this.okPersonalInfo = true;
    console.log(this.cardForm.value);
  }

  makeOrder() {
    const now = new Date();
    this.order.address = this.orderForm.value;
    this.order.payment = this.cardForm.value;
    this.order.date = now.toDateString();
    this.carts.forEach((cart) => {
      this.order.cart = cart;
      this.orderService.createOrder(this.order).subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pedido Realizado com sucesso. Em breve ele chegará em sua casa!',
        });

        if (cart) {
          this.cartService.removeFromCart(Number(cart.id)).subscribe((data) => {
            console.log('Carrinho removido com sucesso');
          });
        }

        console.log(this.orderForm.value);
        console.log(this.cardForm.value);
        console.log(this.carts);
      });
    });
  }
}

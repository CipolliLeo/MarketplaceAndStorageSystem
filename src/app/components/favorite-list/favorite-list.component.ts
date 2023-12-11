import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Eletronic } from 'src/app/models/eletronic';
import { EletronicService } from 'src/app/services/eletronic.service';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/auth';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  eletronics: Eletronic[] = [];
  eletronic: any;
  userEmail: string = '';
  favorites: Favorite[] = [];
  cart: Cart = {};
  user: User = {};

  constructor(
    private favoriteService: FavoritesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private eletronicService: EletronicService,
    private cartService: CartService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getFavoritesbyUser();
    // this.favorites.forEach((favorite => {
    //   const eletronic = this.getEletronicById(favorite.id);
    //   if(eletronic){
    //     this.eletronics.push(eletronic);
    //   }
    // }))
  }

  getFavoritesbyUser() {
    this.eletronics = [];
    const email = sessionStorage.getItem('email');
    if (email) {
      this.favoriteService.getAllFavoritesByUser(email).subscribe((data) => {
        this.favorites = data;
        this.favorites.forEach((favorite) => {
          this.eletronicService.getEletronicById(Number(favorite.idEletronic)).subscribe((data) => {
            this.eletronic = data;
            if (this.eletronic !== undefined) {
              favorite.eletronic = data;
            }
          });
        });
      });
    }
  }

  getEletronicById(id: number) {
    this.eletronicService.getEletronicById(id);
  }

  removeFavorite(favorite: Favorite) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja remover esse produto da lista de favoritos?',
      accept: () => {
        this.favoriteService.removeFavorite(favorite.id).subscribe(
          (data) => {
            this.getFavoritesbyUser();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto removido da lista de Favoritos',
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

  addCart(eletronic: Eletronic) {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.userEmail = email;
      this.getUserInfo(email);
      this.cart.emailUser = this.userEmail;
    }
    this.cart.idEletronic = eletronic.id;
    this.cart.amount = 1;
    this.cartService.addToCart(this.cart).subscribe(
      (data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto adicionado ao carrinho',
        });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    );
  }

  getUserInfo(email: string) {
    this.authService.getUserByEmail(email).subscribe((data) => {
      this.user = data;
    });
  }
}

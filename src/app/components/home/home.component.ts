import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/auth';
import { Eletronic } from 'src/app/models/eletronic';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/services/auth.service';
import { EletronicService } from 'src/app/services/eletronic.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MessageService } from 'primeng/api';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  eletronicsList: Eletronic[] = [];
  eletronics: Eletronic[] = [];
  responsiveOptions: any[] | undefined;
  userEmail: string | undefined;
  favorite: Favorite = {};
  favorites: Favorite[] = [];
  cart: Cart = {};
  user: User = {};
  alreadyOnFavorite: boolean = false;

  constructor(
    private router: Router,
    private eletronicService: EletronicService,
    private favoriteService: FavoritesService,
    private cartService: CartService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getEletronicList();
    this.getFavoriteEletronics();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getEletronicList() {
    this.eletronicService.getEletronics().subscribe((data) => {
      this.eletronics = data;
      this.eletronicsList = data;
      this.eletronics.forEach((eletronic) => {
        eletronic.quantity = 1;
      });
    });
  }

  getFavoriteEletronics() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.favoriteService.getAllFavoritesByUser(email).subscribe((data) => {
        this.favorites = data;
      });
    }
  }

  getSeverity(amount: number) {
    if (amount > 50) {
      return 'success';
    } else if (amount < 50 && amount > 15) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  addCart(eletronic: Eletronic) {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.userEmail = email;
      this.getUserInfo(email);
      this.cart.emailUser = this.userEmail;
    }
    this.cart.idEletronic = eletronic.id;
    this.cart.amount = eletronic.quantity;
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

  addFavorites(eletronic: Eletronic) {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.userEmail = email;
      this.getUserInfo(email);
      this.favorite.userEmail = this.userEmail;
    }
    this.favorite.idEletronic = eletronic.id;
    this.favorite.idUser = this.user.id;
    this.favoriteService.addFavorite(this.favorite).subscribe(
      (data) => {
        console.log(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto adicionado aos favoritos',
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

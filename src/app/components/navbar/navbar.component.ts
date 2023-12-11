import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  nameUser: string | undefined;
  userLogged = false;
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((route) => {
      console.log('Navegou');
      const name = sessionStorage.getItem('nome');
      if (name) {
        this.userLogged = true;
        this.nameUser = name;
      } else {
        this.userLogged = false;
      }

      this.items = [
        {
          label: 'Olá, ' + this.nameUser,
          icon: 'pi pi-user',
        },
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: ['home'],
        },
        {
          label: 'Marketplace',
          icon: 'pi pi-shopping-bag',
          routerLink: ['marketplace'],
        },
        {
          label: 'Favorites',
          icon: 'pi pi-star-fill',
          routerLink: ['favorite'],
        },
        {
          label: 'Cart',
          icon: 'pi pi-shopping-cart',
          routerLink: ['cart'],
        },
        {
          label: 'Storage',
          icon: 'pi pi-box',
          routerLink: ['storage'],
          disabled: !Boolean(sessionStorage.getItem('admin')),
        },
      ];
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.ngOnInit;
  }
}

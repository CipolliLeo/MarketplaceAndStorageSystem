import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EletronicComponent } from './components/eletronic-list/eletronic.component';
import { authGuard, storageGuard } from './guards/auth.guard';
import { MarketComponent } from './components/market/market.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'storage',
    component: EletronicComponent,
    canActivate: [storageGuard]
  },
  {
    path: 'marketplace',
    component: MarketComponent,
    canActivate: [authGuard]
  },
  {
    path: 'favorite',
    component: FavoriteListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

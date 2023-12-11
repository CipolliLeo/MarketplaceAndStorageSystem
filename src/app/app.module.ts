import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EletronicModule } from '../app/components/eletronic-list/eletronic.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { MarketComponent } from './components/market/market.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { CartComponent } from './components/cart/cart.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartOrderComponent } from './components/cart-order/cart-order.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    MarketComponent,
    FavoriteListComponent,
    CartComponent,
    CartOrderComponent,
  ],
  imports: [
    BrowserModule,
    ConfirmDialogModule,
    AppRoutingModule,
    EletronicModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    ButtonModule,
    CheckboxModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    MenubarModule,
    CarouselModule,
    TagModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    FormsModule,
    DropdownModule,
    InputMaskModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

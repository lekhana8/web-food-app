import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurants/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { CartComponent } from './restaurants/cart/cart.component';
import { HomeComponent } from './home/home/home.component';
import { MyaccountComponent } from './shared/header/myaccount/myaccount.component';
import { TermsofuseComponent } from './shared/footer/termsofuse/termsofuse.component';
import { OrderConfirmationComponent } from './restaurants/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, 
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'restaurants',
    component: RestaurantListComponent
  },
  {
    path: 'restaurant/:id',
    component: RestaurantDetailComponent
  },
  {
    path: 'account',
    component: MyaccountComponent
  },
  { path: 'terms', 
    component: TermsofuseComponent },
  {
    path:'orderconfirmation',
    component : OrderConfirmationComponent
  }
];

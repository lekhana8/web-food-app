import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [ NgFor, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;

    constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();

    if (this.cartItems.length === 0) {
      // Redirect if no items in cart
      this.router.navigate(['/']);
      return;
    }

    this.total = this.cartService.getTotal();

    // Clear cart after order confirmation
    this.cartService.clearCart();
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgIf, NgFor,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  taxRate = 0.10; // 10% tax
subtotal = 0;
taxAmount = 0;
  total = 0;

  constructor(private cartService: CartService, private location: Location) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotal(): void {
    this.total = this.cartService.getTotal();
  }

  calculateTotals(): void {
  this.subtotal = this.cartService.getTotal();
  this.taxAmount = this.subtotal * this.taxRate;
  this.total = this.subtotal + this.taxAmount;
}

  increaseQuantity(item: any): void {
    this.cartService.addToCart(item); 
    this.loadCart();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item.id); 
    this.loadCart();
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }
   goBack(): void {
    this.location.back(); 
  }

}

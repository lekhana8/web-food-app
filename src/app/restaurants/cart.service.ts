import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  constructor() {}

  addToCart(item: any): void {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  }

  removeFromCart(itemId: number): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  getCartItems(): any[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }

  decreaseQuantity(itemId: number): void {
  const item = this.items.find(i => i.id === itemId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      this.removeFromCart(itemId);
    }
  }
}

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Location, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgFor, FormsModule],  
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;
  showLoginForm: boolean = false;
  loginForm!: FormGroup;
  paymentMethods = ['Credit Card', 'PayPal', 'Cash on Delivery'];
  selectedPaymentMethod: string = '';
  isLoggedIn = false;


  constructor(
    private cartService: CartService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.formInputs();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartService.getTotal();
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

  toggleLoginForm(): void {
    this.showLoginForm = !this.showLoginForm;
  }
  formInputs(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._@]+$/)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]]
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.showLoginForm = false;
          this.isLoggedIn = true;

    }
  }
}

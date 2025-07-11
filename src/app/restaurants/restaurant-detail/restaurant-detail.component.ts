import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.scss'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any = null;
  cartQuantities: { [dishId: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getRestaurantById(id).subscribe((data) => {
      if (data) {
        this.restaurant = data;

        const cartItems = this.cartService.getCartItems();
        cartItems.forEach(item => {
          if (item.restaurantId === this.restaurant.id) {
            this.cartQuantities[item.id] = item.quantity;
          }
        });
      }
    });
  }

  addToCart(dish: any): void {
    this.cartService.addToCart({
      ...dish,
      restaurantId: this.restaurant.id,
      restaurantName: this.restaurant.name,
      price: dish.price
    });

    const currentQty = this.cartQuantities[dish.id] || 0;
    this.cartQuantities[dish.id] = currentQty + 1;
  }

  decreaseQuantity(dish: any): void {
    if ((this.cartQuantities[dish.id] || 0) > 0) {
      this.cartQuantities[dish.id] -= 1;
      this.cartService.decreaseQuantity(dish.id);
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { RestaurantService } from '../../restaurants/restaurant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredRestaurants: any[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants(0, 4).subscribe(data => {
      this.featuredRestaurants = data;
    });
  }

  goToRestaurants(): void {
    this.router.navigate(['/restaurants']);
  }
}

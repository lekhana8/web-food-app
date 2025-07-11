import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
  offset = 0;
  limit = 10;
  loading = false;
  selectedCuisine = 'All';
  cuisines: string[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants();
    this.restaurantService.getCuisines().subscribe(cuisines => {
      this.cuisines = cuisines;
    });
    window.addEventListener('scroll', this.onScroll, true);
  }

  loadRestaurants(): void {
    if (this.loading) return;
    this.loading = true;

    this.restaurantService.
      getRestaurants(this.offset, this.limit, this.selectedCuisine).subscribe((data) => {
        this.restaurants = [...this.restaurants, ...data];
        this.offset += this.limit;
        this.loading = false;
      });
  }

  onScroll = (): void => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      this.loadRestaurants();
    }
  };


  onFilterChange(): void {
    this.offset = 0;
    this.restaurants = [];
    window.scrollTo({ top: 0 });
    this.loadRestaurants();
  }


  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, true);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: string;
  image: string;
  dishes?: Dish[];
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurantNames = [
    'Spice Garden', 'Olive Kitchen', 'Tandoori Flames', 'Noodle House', 'The Curry Pot',
    'Basil & Thyme', 'The Pasta Place', 'Dragon Wok', 'Masala Magic', 'Pizza Craft',
    'Bombay Bistro', 'Chi Chow', 'Taste of Tuscany', 'Chennai Express', 'Golden Dumpling',
    'Café Italiano', 'Urban Tadka', 'Szechuan Express', 'Roti & Rice', 'Mamma Mia',
    'Punjabi Rasoi', 'Mandarin Leaf', 'The Rice Bowl', 'Paneer Point', 'Thai Orchid'
  ];

  private dishesByCuisine: Record<string, string[]> = {
    Indian: ['Butter Chicken', 'Paneer Tikka', 'Chole Bhature', 'Biryani', 'Dal Makhani'],
    Italian: ['Margherita Pizza', 'Spaghetti Carbonara', 'Pesto Pasta', 'Lasagna', 'Bruschetta'],
    Chinese: ['Kung Pao Chicken', 'Spring Rolls', 'Fried Rice', 'Sweet and Sour Pork', 'Chow Mein']
  };

  private restaurants = this.restaurantNames.map((name, index) => ({
    id: index + 1,
    name,
    cuisine: ['Italian', 'Indian', 'Chinese'][index % 3],
    rating: (Math.random() * 2 + 3).toFixed(1),
    image: `assets/image${index + 1}.jpg`
  }));

 

  constructor() {}

  getRestaurants(offset: number = 0, limit: number = 25, cuisine: string = 'All'): Observable<Restaurant[]> {
    let filtered = this.restaurants;
    if (cuisine !== 'All') {
      filtered = filtered.filter(r => r.cuisine === cuisine);
    }

    const data = filtered.slice(offset, offset + limit);
    return of(data);
  }

  getRestaurantById(id: number): Observable<Restaurant | null> {
    const restaurant = this.restaurants.find(r => r.id === id);
    if (!restaurant) return of(null);

    const cuisine = restaurant.cuisine;
    const dishNames = this.dishesByCuisine[cuisine] || [];
    
    const dishes: Dish[] = dishNames.map((name, i) => ({
      id: i + 1,
      name,
      price: parseFloat((Math.random() * 20 + 5).toFixed(2)),
      description: `Delicious ${name} prepared with authentic ingredients.`,
      image: `assets/dishes/dish${i + 1}.jpg`
    }));

    return of({ ...restaurant, dishes });
  }

  getCuisines(): Observable<string[]> {
    return of(['All', 'Italian', 'Indian', 'Chinese']);
  }
}

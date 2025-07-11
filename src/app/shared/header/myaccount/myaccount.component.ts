import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [NgFor],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.scss'
})
export class MyaccountComponent {

 user = { name: 'John Doe', email: 'john@example.com' };
  recentOrders = [
    { id: 101, date: '2025-06-25', total: 45.99 },
    { id: 102, date: '2025-06-27', total: 23.49 },
  ];
  addresses = ['123 Main St, Cityville', '456 Oak Ave, Townsville'];

  constructor(private location:Location) { }

  ngOnInit(): void { }

  goHome(): void {
this.location.back();  }
}

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  locations=['Bellandur','Maratahalli','BTMLayout','Koramangala'];
  selectedlocation = 'Maratahalli';
  constructor(private router: Router) {}
  
 goHome() {
  this.router.navigate(['/']);
}
}

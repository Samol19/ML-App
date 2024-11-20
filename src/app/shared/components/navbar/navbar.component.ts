import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../models/auth-response.model';
import { StorageService } from '../../../core/services/storage.service';
import { Observable } from 'rxjs';

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatSnackBarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private SnackBar = inject(MatSnackBar);
  private storageService = inject(StorageService);
  user: AuthResponse | null = null;
  
  img: string = '';
  isStudent: boolean = false;
  isAuthenticated: boolean = false;
  cartItemsCount: number = 0;

  notificationCount: number = 0;
  showNotifications: boolean = false;
  notifications: Notification[] = [];

  ngOnInit(): void {
    this.isAuthenticated = true;


    // Intentar obtener los datos directamente desde el localStorage
    const storedUser = localStorage.getItem('coleXpert_auth');
    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Deserializar el JSON del localStorage
this.img = this.user?.user_img?.startsWith('data:image') 
  ? this.user.user_img 
  : `data:image/png;base64,${this.user?.user_img}`;
    } else {
      this.loadUserProfile();  // Si no se encuentra el usuario, lo cargas desde el servicio
    }


    this.loadUserProfile();
    this.updateCartItemsCount();
    this.loadNotifications();
  }

  loadUserProfile(): void {
    // Suponiendo que authService.getUser() devuelve un Observable
    this.authService.getUser().subscribe({
      next: (user: AuthResponse| null) => {
        this.user = user;
        console.log('User profile loaded:', this.user);
      },
      error: (err) => {
        console.error('Error loading user profile', err);
      }
    });
  }

  updateCartItemsCount(): void {
    // Lógica para actualizar el número de elementos en el carrito
  }

  loadNotifications(): void {
    // Lógica para cargar las notificaciones
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  openCrearSubasta(): void {
    this.router.navigate(['home/create']);
  }
  openCrearItem(): void {
    this.router.navigate(['home/create-item']);
  }
}

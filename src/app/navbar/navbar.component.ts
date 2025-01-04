import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public items: MenuItem[];
  private staticItems = [
    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
    {
      label: 'Recognition',
      icon: 'pi pi-fw pi-microchip-ai',
      routerLink: '/recognition',
    },
    { label: 'Breeds', icon: 'pi pi-fw pi-database', routerLink: '/breeds' },
    // { label: 'Statistics', icon: 'pi pi-fw pi-chart-line' },
    {
      label: 'Admin panel',
      icon: 'pi pi-fw pi-shield',
      routerLink: '/admin',
    },
  ];

  update_items(isAuthenticated: boolean) {
    let loginButton = {
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      routerLink: '/login',
    };
    let logoutButton = {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.authService.logout(),
    };
    this.items = [
      ...this.staticItems,
      isAuthenticated ? logoutButton : loginButton,
    ];
  }

  constructor(private authService: AuthService) {
    this.items = [];
    this.authService = authService;

    authService.isAuthenticated().subscribe((isAuth: boolean) => {
      this.update_items(isAuth);
    });

    authService.loginEvent.asObservable().subscribe((isAuth: boolean) => {
      this.update_items(isAuth);
    });
  }
}

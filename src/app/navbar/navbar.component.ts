import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public items: MenuItem[];

  constructor() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
      {
        label: 'Recognition',
        icon: 'pi pi-fw pi-cloud-upload',
        routerLink: '/recognition',
      },
      { label: 'Breeds', icon: 'pi pi-fw pi-database', routerLink: '/breeds'},
      // { label: 'Statistics', icon: 'pi pi-fw pi-chart-line' },
    ];
  }
}

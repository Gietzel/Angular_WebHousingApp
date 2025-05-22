import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="header">
          <div class="logomark"></div>
          <div class="logotype">
            <h1>Bom Cafofo</h1>
            <p>Sinta-se em casa.</p>
          </div>
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
  logoPath = 'assets/logo.png';
}

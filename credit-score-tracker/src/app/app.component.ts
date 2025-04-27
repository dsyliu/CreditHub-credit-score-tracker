import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'credit-score-tracker';
}

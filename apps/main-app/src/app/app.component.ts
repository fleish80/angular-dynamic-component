import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicComponent } from './dynamic.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    DynamicComponent
  ],
  selector: 'df-root',
  template: `
  <df-dynamic ngSkipHydration />

  `,
  styles: '',
})
export class AppComponent {
  title = 'main-app';
}

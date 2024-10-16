import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicComponent } from './dynamic.component';
import { DynamicDeclarativeComponent } from './dynamic-declarative.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    DynamicComponent,
    DynamicComponent,
    DynamicDeclarativeComponent,
    MatTab,
    MatTabGroup
  ],
  selector: 'df-root',
  template: `
    <mat-tab-group color="primary">
      <mat-tab label="Dynamic Imperative">
        <df-dynamic ngSkipHydration/>
      </mat-tab>
      <mat-tab label="Dynamic Declarative">
        <df-dynamic-declarative ngSkipHydration/>
      </mat-tab>
    </mat-tab-group>`,
  styles: '',
})
export class AppComponent {
  title = 'main-app';
}

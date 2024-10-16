import { Component, inject, TemplateRef, Type, viewChild, ViewContainerRef } from '@angular/core';
import { WidgetComponent } from './widget.component';
import { WeatherContentComponent } from './weather-content.component';
import { NgComponentOutlet, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'df-dynamic-declarative',
  standalone: true,
  imports: [
    NgComponentOutlet,
    WeatherContentComponent,
    NgOptimizedImage
  ],
  template: `
    <img class="logo" ngSrc="./logo.svg" alt="Decoded Frontend" width="115" height="79"/>
    <h1 class="page-title">Dynamic Components</h1>

    <ng-template #contentTpl>
      <df-weather-content/>
    </ng-template>

    <main id="content">
      <ng-container [ngComponentOutlet]="component"
      [ngComponentOutletInputs]="{
        title: 'Weather',
        description: 'Currently no home',
      }"
      [ngComponentOutletContent]="content"/>
      <section class="toolbar">
        <button (click)="createComponent()" class="create">Create Component</button>
        <button (click)="destroyComponent()" class="destroy">Destroy Component with componentRef</button>
      </section>
    </main>
  `
})
export class DynamicDeclarativeComponent {

  vcr = inject(ViewContainerRef);
  contentTpl = viewChild<TemplateRef<unknown>>('contentTpl');

  protected component: Type<WidgetComponent> | null = null;
  protected content: Node[][];

  createComponent() {
    this.content = [this.vcr.createEmbeddedView(this.contentTpl()!).rootNodes];
    this.component = WidgetComponent;
  }

  destroyComponent() {
    this.component = null
  }

}

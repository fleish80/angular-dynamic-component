import { Component, ComponentRef, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { WidgetComponent } from './widget.component';
import { WeatherContentComponent } from './weather-content.component';

@Component({
  selector: 'df-dynamic',
  standalone: true,
  imports: [
    WeatherContentComponent
  ],
  template: `
    <img class="logo" src="./logo.svg" alt="Decoded Frontend" />
    <h1 class="page-title">Dynamic Components</h1>
    <ng-template #content>
      <df-weather-content/>
    </ng-template>

    <main id="content">
      <ng-container #container />
      <section class="toolbar">
        <button (click)="createComponent()" class="create">Create Component</button>
        <button (click)="destroyComponentComponentRef()" class="destroy">Destroy Component with componentRef</button>
        <button (click)="destroyComponentVcr()" class="destroy">Destroy Component with vcr</button>
      </section>
    </main>
  `
})
export class DynamicComponent {

  private vcr = viewChild('container', {read: ViewContainerRef});
  private componentRef:  ComponentRef<WidgetComponent> | undefined;
  private content = viewChild.required<TemplateRef<unknown>>('content');


  createComponent() {
    this.vcr()!.clear();
    const contentView = this.vcr()?.createEmbeddedView(this.content());
    const component = WidgetComponent;
    this.componentRef = this.vcr()?.createComponent(component, {
      projectableNodes: [
        contentView!.rootNodes!
      ]
    });
    this.componentRef?.setInput('title', 'Weather');
    this.componentRef?.setInput('description', 'Currently no home');

    // According to angular docs, if single based output is used, no need to use takeUntilDestoyed, this will be destroyed automatically
    this.componentRef?.instance.closed.subscribe(() => {
      this.componentRef?.destroy();
    })
  }

  destroyComponentComponentRef() {
    this.componentRef?.destroy();
  }

  destroyComponentVcr() {
    this.vcr()!.clear();
  }
}

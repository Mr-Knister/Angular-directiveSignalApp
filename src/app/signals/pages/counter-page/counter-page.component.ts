import { Component, computed, signal } from '@angular/core';

const name = signal('fernando');

@Component({
  selector: 'signals-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {
  public counter = signal(10);
  public squareCounter = computed(() => this.counter() * this.counter());
  //solo lectura;

  constructor() {
    console.log(name());
  }

  increaseBy(value:number):void {
    // this.counter.set(this.counter() + value);
    this.counter.update(current => current + value);
  }
}

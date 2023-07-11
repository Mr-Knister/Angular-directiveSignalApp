import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?:ElementRef<HTMLElement>;
  private _color:string = 'red';
  private _errors?:ValidationErrors|null|undefined;

  @Input()
  set color(value:string) {
    this._color = value;
    this.setStyle();
  }
  @Input()
  set errors(value:ValidationErrors|null|undefined) {
    this._errors = value;
    this.setErrorMessage();
    // console.log(this._errors);
  }

  constructor(private element:ElementRef<HTMLElement>) {
    this.htmlElement = element;
    // this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';
  }
  ngOnInit(): void {
    // console.log(this.htmlElement);
    this.setStyle();
  }

  setStyle():void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }
    const errors = Object.keys(this._errors);
    console.log(errors);
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errors.includes('minlength')) {
      const { requiredLength, actualLength } = this._errors['minlength'];
      console.log(this._errors['minlength']);
      this.htmlElement.nativeElement.innerText = `Longitud mínima ${actualLength}/${requiredLength} catacteres`;
      return;
    }
    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo';
      return;
    }
    this.htmlElement.nativeElement.innerText = 'Error no identificado';
  }

}

import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'signals-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counter = signal(10);

  public user = signal<User>({
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
    avatar: "https://reqres.in/img/faces/12-image.jpg"
  })
  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}` )

  public userChangeEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`)
    // console.log('userChangeEffect trigger');
  });

  ngOnDestroy(): void {
    this.userChangeEffect.destroy();
  }
  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current + 1);
    }, 1000);
  }

  increaseBy(value:number):void {
    this.counter.update(current => current + value);
  }

  onFieldUpdated(field:keyof User, value:string):void {
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

    // this.user.update(currentUser => {
    //   return {
    //     ...currentUser,
    //     [field]: value
    //   }
    // });

    this.user.mutate(currentUser => {
      switch(field) {
        case 'email':
          currentUser.email = value;
          break;
        case 'first_name':
          currentUser.first_name = value;
          break;
        case 'last_name':
          currentUser.last_name = value;
          break;
        case 'id':
          currentUser.id = Number(value);
          break;
      }
    })

    // console.log({field, value});
  }
}

import { Component, ElementRef, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'user-menu-button',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuButtonComponent {
  @Input()
  public user: User;

  constructor(el: ElementRef) {
    el.nativeElement.classList.add('position-relative');
  }
}

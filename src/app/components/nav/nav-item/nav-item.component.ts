import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
// $brand-primary'
@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [
    trigger('hoverOnItem', [
      state('enter',style({ color: 'white' })),
      state('leave',style({ color: '#cbcaca' })),
      transition('enter => leave', [
        animate('500ms ease-in')
      ]),
      transition('leave => enter', [
        animate('500ms ease-out')
      ]),
    ])
  ]
})
export class NavItemComponent implements OnInit {
  state: string = 'leave';
  @Input() title: string;

  @Input() link: string;

  @Input() icon: string;
  @Input() disable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setHover(state: string) {
    this.state = state;
  }

}

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
  @Input()
  public title: string;

  @Input()
  public link: string;

  @Input()
  public icon: string;


  constructor() { }

  ngOnInit(): void {
  }

  setHover(state: string) {
    this.state = state;
  }

}

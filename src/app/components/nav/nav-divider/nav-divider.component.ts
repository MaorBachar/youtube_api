import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-divider',
  templateUrl: './nav-divider.component.html',
  styleUrls: ['./nav-divider.component.scss']
})
export class NavDividerComponent {
  @Input()
  public title: string;

  @Input()
  public icon: string;
}

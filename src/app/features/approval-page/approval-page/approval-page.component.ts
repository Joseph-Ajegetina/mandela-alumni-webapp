import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-page',
  imports: [],
  templateUrl: './approval-page.component.html',
  styleUrl: './approval-page.component.less'
})
export class ApprovalPageComponent {
  protected breakpoints = [
    'tui-mobile',
    'tui-mobile-min',
    'tui-mobile-interval',
    'tui-tablet',
    'tui-tablet-min',
    'tui-tablet-interval',
    'tui-desktop',
    'tui-desktop-min',
    'tui-desktop-interval',
    'tui-desktop-lg-min',
] as const;

}

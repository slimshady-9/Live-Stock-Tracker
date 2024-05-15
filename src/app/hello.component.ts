import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'hello-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class HelloComponent {
  name = 'Angular ' + VERSION.major;
}

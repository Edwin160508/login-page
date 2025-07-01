import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title = "";
  @Input() primaryButtonText = "";
  @Input() secondaryButtonText = "";
  @Output("submit") onSubmit = new EventEmitter<void>();
  @Output("navigate") onNavigate = new EventEmitter<void>();

  submit(): void {
    this.onSubmit.emit();
  }

  navigate(): void {
    this.onNavigate.emit();
  }
}

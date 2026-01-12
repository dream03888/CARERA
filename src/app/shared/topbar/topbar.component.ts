import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Input() title = 'ตรวจสถานะกล้อง — รอบ 01–15 Jan 2026';
  @Input() lastUpdate = '02 Jan 2026 11:00';

  toggleTheme() {
    const el = document.documentElement;
    el.dataset['theme'] = el.dataset['theme'] === 'light' ? '' : 'light';
  }
}

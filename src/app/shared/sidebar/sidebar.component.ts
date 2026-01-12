import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CctvService } from '../services/cctv.service';
import { SocketSupplyService } from '../services/socket-supply.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgSelectModule,
    CommonModule,
    FormsModule, // ✅ สำหรับ ngModel
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // ตัวเลขพวกนี้ต่อ API จริงทีหลังได้
  @Input() pendingCount = 50;
  @Input() zonesCount = 49;
  @Input() issuesCount = 28;

 startDate!: string;        // yyyy-mm-dd
frequency: number = 7;

endDate!: string;          // yyyy-mm-dd
displayStartDate = '';
displayEndDate = '';

calculateEndDate() {
  if (!this.startDate || !this.frequency) return;

  const start = new Date(this.startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + this.frequency);

  // เก็บแบบ ISO สำหรับ backend
  this.endDate = end.toISOString().split('T')[0];

  // แสดงแบบ พ.ศ.
  this.displayStartDate = this.formatThaiDate(start);
  this.displayEndDate = this.formatThaiDate(end);
}

formatThaiDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear() + 543; // แปลงเป็น พ.ศ.

  // เอาแค่ 2 หลัก เช่น 2569 → 69
  return `${d}/${m}/${y.toString().slice(-2)}`;
}


  _zoneData: any[] = [];
  _ReqZone: any[] = [];
selectedZoneId!: number;

  constructor(
    private router: Router,
    private getData: CctvService,
    private sockets: SocketSupplyService
  ) {
    console.log('zone component loaded');

    this.zonData();
  }

  async ngOnInit() {
    console.log('zone component loaded');

    this.zonData();
    this.ReqzoneData();
  }

  async zonData() {
    const data = await this.getData.getZone();
    if (data.status == 200) {
      this._zoneData = data.msg;
      console.log(this._zoneData);
    }
  }

  async ReqzoneData() {
    const data = await this.getData.ReqZones();
    if (data.status === 200 && Array.isArray(data.msg)) {
      this._ReqZone = data.msg;
      // default เลือกตัวแรก (ถ้าต้องการ)
      this.selectedZoneId = this._ReqZone[0]?.zone_id ?? null;
      console.log(data.msg);
    }
  }

  async reqTransaction() {
  if (!this.startDate || !this.endDate || !this.selectedZoneId) {
    Swal.fire({
      icon: 'warning',
      title: 'ข้อมูลไม่ครบ',
      text: 'กรุณาเลือกวันที่เริ่ม, ระยะเวลา และ Zone',
    });
    return;
  }

  const payload = {
    start_date: this.startDate,
    end_date: this.endDate,
    emp_code: 6639,
    zone_id: this.selectedZoneId
  };

  console.log('SEND PAYLOAD', payload);

  const data = await this.getData.reqInsertTRansaction(payload);

  if (data.status === 200) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'สร้างรอบตรวจสำเร็จ',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

}

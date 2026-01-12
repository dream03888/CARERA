import { Component } from '@angular/core';
import { SocketSupplyService } from '../../shared/services/socket-supply.service';
import { CctvService } from '../../shared/services/cctv.service';
import { Router, RouterLink } from '@angular/router';
import { Zone } from '../../shared/interfaces/cctv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone',
  imports: [CommonModule],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.css'
})
export class ZoneComponent {
  _zoneData: any[] = []; 
  _cameraData: any[] = [];
  pageSize = 10;
currentPage = 1;
totalPages = 0;
pagedData: any[] = [];
  constructor(
    private router: Router,
    private getData: CctvService,
    private sockets: SocketSupplyService
  ) {

console.log("zone component loaded")

    this.zonData();
     this.CameraZone();

  }

async ngOnInit() {
  console.log("zone component loaded")

    this.zonData();


  }
  async zonData() {
    const data = await this.getData.getZone();
    if (data.status == 200) {
      this._zoneData = data.msg;
      console.log(this._zoneData);
    }
  }

 async CameraZone() {
  const data = await this.getData.getCameraByZone(this.currentPage, 10);

  if (data.status === 200) {
    this._cameraData = data.msg;

    // ✅ ใช้ total จาก backend
    this.totalPages = Math.ceil(data.total / 10);
  }
}
changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.CameraZone();
}

setPage(page: number) {
  if (page < 1 || page > this.totalPages) return;

  this.currentPage = page;

  const start = (page - 1) * this.pageSize;
  const end = start + this.pageSize;

  this.pagedData = this._cameraData.slice(start, end);
}

}

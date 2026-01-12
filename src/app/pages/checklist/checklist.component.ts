import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CctvService } from '../../shared/services/cctv.service';

type StatusCode = 1 | 2 | 3;

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css',
})
export class ChecklistComponent {
  rounds: any[] = [];
  _dataZone: any[] = [];

  constructor(private router: Router, private getData: CctvService) {
    this.MyRequestion();
  }

  // ================= LOAD DATA =================
  async MyRequestion() {
    const data = await this.getData.MyRequestion();
    if (data.status !== 200 || !Array.isArray(data.msg)) return;

    this._dataZone = data.msg.map((z: any) => {
      const rawLists =
        typeof z.lists === 'string' ? JSON.parse(z.lists) : z.lists ?? [];
      return {
        transaction_id: z.transaction_id,
        completed: z.completed,
        start_date: z.start_date,
        end_date: z.end_date,
        emp_code: z.emp_code,
        zone_id: z.zone_id ?? z.id ?? null,
        zone_name: z.zone_name ?? 'Unassigned Zone',
        brand: rawLists[0]?.camera_brand || '-',
        lists: rawLists,
      };
    });

    this.buildRoundsFromZones();
  }

  // ================= BUILD STRUCTURE =================
  buildRoundsFromZones() {
  this.rounds = this._dataZone.map((z) => {
    const pointMap = new Map<string, any[]>();

    z.lists.forEach((item: any) => {
      const pointName = item.camera_point || 'Unknown Point';
      if (!pointMap.has(pointName)) pointMap.set(pointName, []);
      pointMap.get(pointName)!.push(item);
    });

    const points = Array.from(pointMap.entries()).map(
      ([pointName, items]) => {

        const cameras = items.map((item: any, index: number) => ({
          camera_id: item.camera_id,
          camera_code: `CAM${String(item.camera_id).padStart(2, '0')}-${index + 1}`,

          // ✅ ดึงจาก backend
          status: item.status !== null ? Number(item.status) as StatusCode : null,
          remark: item.remark || '',
          confirmed: false,
          justConfirmed: false,

          id: item.id,
          transaction_id: item.transaction_id,
          item_id: item.item_id,
        }));

        const completed_count = cameras.filter(c => c.status !== null).length;

        return {
          point_name: pointName,
          total_cameras: cameras.length,
          completed_count,
          progress: Math.round((completed_count / cameras.length) * 100),
          expanded: false,
          cameras,
        };
      }
    );

    const zone_total = points.reduce((s: number, p: any) => s + p.total_cameras, 0);
    const zone_completed = points.reduce((s: number, p: any) => s + p.completed_count, 0);

    const zone = {
      zone_id: z.zone_id,
      zone_name: z.zone_name,
      brand: z.brand,
      expanded: false,
      points,

      total_cameras: zone_total,
      completed_count: zone_completed,
      progress: Math.round((zone_completed / zone_total) * 100),

      closed: false,
      justClosed: false,

      nvr: {
        status: z.nvr_status ? Number(z.nvr_status) as StatusCode : null,
        remark: z.nvr_remark || '',
        confirmed: false,
        justConfirmed: false,
      },

      transaction_id: z.transaction_id,
    };

    const round = {
      round_id: z.transaction_id,
      start_date: z.start_date,
      end_date: z.end_date,
      emp_code: z.emp_code,
      completed:z.completed,
      expanded: false,
      zones: [zone],

      total_cameras: zone.total_cameras,
      completed_count: zone.completed_count,
      progress: Math.round((zone.completed_count / zone.total_cameras) * 100),
    };

    return round;
  });
}


  // ================= TOGGLE =================
  toggleRound(r: any) {
    this.rounds.forEach((x: any) => (x.expanded = false));
    r.expanded = true;
  }

  toggleZone(r: any, z: any) {
    r.zones.forEach((x: any) => (x.expanded = false));
    z.expanded = true;
  }

  togglePoint(z: any, p: any) {
    z.points.forEach((x: any) => (x.expanded = false));
    p.expanded = true;
  }

  // ================= STATUS (CAMERA) =================
  setStatus(cam: any, status: StatusCode) {
    cam.status = status;
    if (status === 1) cam.remark = '';
  }

  // ================= STATUS (NVR) =================
  setNvrStatus(zone: any, status: StatusCode) {
    zone.nvr.status = status;
    if (status === 1) zone.nvr.remark = '';
  }

  // ================= CONFIRM (NVR) =================
  async confirmNvr(round: any, zone: any) {
    if (
      (zone.nvr.status === 2 || zone.nvr.status === 3) &&
      (!zone.nvr.remark || zone.nvr.remark.trim() === '')
    ) {
      alert('กรุณากรอกเหตุผล NVR ก่อน Confirm');
      return;
    }

    const payload = {
      id: zone.zone_id ?? null,
      transaction_id: zone.transaction_id ?? round.round_id,
      item_id: null,
      status: 1,
      remark: null,
      nvr: {
        status: zone.nvr.status,
        remark: zone.nvr.remark || null,
      },
    };

    console.log('CONFIRM NVR PAYLOAD', payload);

    // ✅ ถ้าจะยิง API จริง แยก endpoint ก็ได้
    // const res = await this.getData.confirmNvrStatus(payload);
    // if(res.status !== 200) return;

    zone.nvr.confirmed = true;
    zone.nvr.justConfirmed = true;

    setTimeout(() => {
      zone.nvr.justConfirmed = false;
      this.rounds = [...this.rounds];
    }, 700);

    this.rounds = [...this.rounds];
  }

  // ================= CONFIRM (CAMERA) =================
  async confirmCamera(round: any, zone: any, point: any, cam: any) {
    if (
      (cam.status === 2 || cam.status === 3) &&
      (!cam.remark || cam.remark.trim() === '')
    ) {
      alert('กรุณากรอกเหตุผลก่อน Confirm');
      return;
    }

    const payload = {
      id: cam.id,
      transaction_id: cam.transaction_id ?? round.round_id,
      item_id: cam.item_id ?? null,
      status: cam.status,
      remark: cam.remark || null,
      nvr:zone.nvr.status
      // // ✅ แนบ nvr ไปด้วยตาม requirement
      // nvr: {
      //   status: zone.nvr.status,
      //   remark: zone.nvr.remark || null,
      // },
    };

    console.log('CONFIRM CAMERA PAYLOAD', payload);

    // ✅ ยิง API จริง
    const res = await this.getData.UpdateDataList(payload);
    if(res.status !== 200) return;
    if(res.status == 200){
      console.log('fghfghfghfghfghgfh',res.msg)
      cam.confirmed = true;
      cam.justConfirmed = true;
  
      this.recalcPoint(point);
      this.recalcZone(zone);
      this.recalcRound(round);
  
      setTimeout(() => {
        cam.justConfirmed = false;
        this.rounds = [...this.rounds];
      }, 700);
  
      this.rounds = [...this.rounds];
    }
  }

  // ================= PROGRESS RECALC =================
  recalcPoint(point: any) {
    point.completed_count = point.cameras.filter(
      (c: any) => c.confirmed
    ).length;
  }

  recalcZone(zone: any) {
    zone.completed_count = zone.points.reduce(
      (sum: number, p: any) => sum + p.completed_count,
      0
    );
  }

  recalcRound(round: any) {
    round.completed_count = round.zones.reduce(
      (sum: number, z: any) => sum + z.completed_count,
      0
    );
  }

  // ================= PERCENT =================
  getPointPercent(p: any) {
    if (!p.total_cameras) return 0;
    return Math.round((p.completed_count / p.total_cameras) * 100);
  }

  getZonePercent(z: any) {
    if (!z.total_cameras) return 0;
    return Math.round((z.completed_count / z.total_cameras) * 100);
  }

  getRoundPercent(r: any) {
    if (!r.total_cameras) return 0;
    return Math.round((r.completed_count / r.total_cameras) * 100);
  }

  // ================= CLOSE JOB =================
  async closeJob(round: any) {
    if (round.completed_count !== round.total_cameras) {
      alert('ยังตรวจไม่ครบ ไม่สามารถปิดงานได้');
      return;
    }
    console.log('CLOSE JOB PAYLOAD', round.round_id);

    // 🔥 ยิง API ปิดงาน
    const res = await this.getData.finish(round.round_id);
    if(res.status !== 200) return;

    round.closed = true;
    round.justClosed = true;

    setTimeout(() => {
      round.justClosed = false;
      this.rounds = [...this.rounds];
    }, 1200);

    this.rounds = [...this.rounds];
  }
}

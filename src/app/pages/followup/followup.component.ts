import { Component } from '@angular/core';
import { CctvService } from '../../shared/services/cctv.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-followup',
    imports: [CommonModule, FormsModule],

  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent {

  apiUrl = 'http://localhost:3000';

  issues: any[] = [];
  selectedIssue: any = null;

  statusOpen = false;

  selectedImageFile: File | null = null;
  previewImage: string | null = null;
  previewFull: string | null = null;

  constructor(private getData: CctvService) {
    this.loadIssues();
  }

  async loadIssues() {
    const data = await this.getData.ErrorCamera();
    if (data.status === 200) {
      this.issues = data.msg.map((x:any) => ({
        ...x,
        status: Number(x.status)
      }));
    }
  }

  selectIssue(issue:any) {
    this.selectedIssue = issue;
    this.previewImage = null;
    this.selectedImageFile = null;
  }

  getStatusLabel(status:number) {
    if (status === 1) return 'Online';
    if (status === 2) return 'Offline';
    if (status === 3) return 'N/A';
    return '-';
  }

  toggleStatusDropdown() {
    this.statusOpen = !this.statusOpen;
  }

  setStatus(status:number, event:MouseEvent) {
    event.stopPropagation();
    this.selectedIssue.status = status;
    this.statusOpen = false;
  }

onSelectImage(event:any) {
  const file = event.target.files[0];
  if (!file) return;

  this.selectedImageFile = file;

  const reader = new FileReader();
  reader.onload = () => {
    this.previewImage = reader.result as string; // 👈 base64
  };
  reader.readAsDataURL(file);
}

  openPreview(photo:string) {
    this.previewFull = photo;
  }

  closePreview() {
    this.previewFull = null;
  }

async saveIssue() {

  const payload = {
    id: this.selectedIssue.id,
    status: this.selectedIssue.status,
    fix_remark: this.selectedIssue.fix_remark || '',
    photo_base64: this.previewImage   // 👈 ส่ง base64
  };

  console.log("Payload:", payload);

  const res = await this.getData.UpdateIssueWithPhoto(payload);

  if (res.status === 200) {
    alert('บันทึกเรียบร้อย');
    this.loadIssues();
  }
}



}

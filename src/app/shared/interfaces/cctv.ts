// src/app/models/cctv.models.ts


export interface Zone {
  id: number;
  name: string;
  cameraCount: number;
  cameras: Camera[];
  description?: string;
  completed:string
  ticket_name:string
  countZone?:number
}

export interface StatusSummary {
  working: number;
  maintenance: number;
  offline: number;
  total: number;
}


export interface ReportData {
  zone: string;
  exportDate: string;
  summary: StatusSummary;
  cameras: CameraReportItem[];
}

export interface CameraReportItem {
  name: string;
  location: string;
  status: string;
  lastChecked?: Date;
  note: string;
}

export interface Zone {
  zone_id: number;
  zone_name: string;
}
export interface Camera{
    camera_id :number
    transaction_id :number
    camera_point : string
    camera_zone : string
    camera_brand: string
    camera_qty:number
    zone_name:string
    zone_id:number
    ticket_name:string
    completed:boolean
    item_id:string
    remark:string
    status:string
    readOnly?:boolean
    nvr_id:number
    nvr_name:string
    date:string


}
export interface CameraItem {
  camera_id: number;
  camera_code: string;
  camera_point: string;
  status: 'OK' | 'DEGRADED' | 'OFFLINE' | 'NA';
  logged?: boolean;
}

export interface ZoneItem {
  zone_name: string;
  brand: string;
  cameras: CameraItem[];
  expanded?: boolean;
}
export interface Datatransaction{
  transaction_id : number
  ticket_name:string
  start_date:string
  end_date:string
  complete_date:string
  emp_code:string
  completed:boolean
    brand:string

  zone_name:string
  expanded:boolean
  lists:List[]
  
}
export interface List {
  id: number;
  transaction_id: number;
  status: string;
  qty: number;
  remark: string | null;
  item_id: string;
  camera_id: number;
  camera_point: string;
  camera_zone: string;
  camera_qty: number;
  camera_brand: string;
  zone_name: string;
  date?: string;
  camera_code:string
    expanded:boolean
  confirmed:boolean
}


export interface HistoryData{
transaction_id:number
ticket_name:string
start_date:number
end_date:string
complete_date:string
emp_code:string
completed:string
staff_name:string
lists:List[]

}


export interface InspectionRound {
  round_id: number;
  round_name: string;        // "01–15 Jan 2026"
  start_date: string;
  end_date: string;
  inspector: string;
  expanded: boolean;         // สำหรับ slide
  zones: ZoneSummary[];
}

export interface ZoneSummary {
  zone_id: number;
  zone_name: string;
  brand: string;
  total_cameras: number;
  completed_count: number;
  expanded: boolean;         // slide detail ของ zone
  cameras: CameraItem[];
}

export interface CameraItem {
  camera_id: number;
  camera_code: string;
  camera_point: string;
  status: 'OK' | 'DEGRADED' | 'OFFLINE' | 'NA';
}
export interface IssueItem {
  id: number;
  transaction_id: number;
  status: number;
  qty: number;
  remark: string;
  camera_id: number;
  camera_point: string;
  camera_brand: string;
  date: string;
  zone_id: number;
  zone_name: string;
  open_days: number;
}
// src/app/services/cctv.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Camera, StatusSummary, Zone } from '../interfaces/cctv';
import { SocketSupplyService } from './socket-supply.service';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CctvService {
constructor(private socket: SocketSupplyService) {}


   async getZone(): Promise<IResponseMessage> {
    await this.socket.emit('get_zone');
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_get_zone')
      .then((response) => {
        return response;
      });
  }


  async getCameraByZone(page: number,limit: number): Promise<IResponseMessage> {
    await this.socket.emit('get_camByzone', page, limit);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_camByzone')
      .then((response) => {
        return response;
      });
  }


  async getCameraByZoneByid(camera_id:number): Promise<IResponseMessage> {
    await this.socket.emit('get_camByzone_Byid',camera_id);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_camByzone_Byid')
      .then((response) => {
        return response;
      });
  }



async reqInsertTRansaction(transaction:any): Promise<IResponseMessage> {
    await this.socket.emit('insert_transaction',transaction);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_insert_transaction')
      .then((response) => {
        return response;
      });
  }

   async getTick_ket(): Promise<IResponseMessage> {
    await this.socket.emit('get_ticket');
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('retrun_get_ticket')
      .then((response) => {
        return response;
      });

      
  }

  async MyRequestion(): Promise<IResponseMessage> {
    await this.socket.emit('get_my_request',);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_get_my_request')
      .then((response) => {
        return response;
      });
    }



  async ReqZones(): Promise<IResponseMessage> {
    await this.socket.emit('req_zones',);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_req_zones')
      .then((response) => {
        return response;
      });
    }




  async ErrorCamera(): Promise<IResponseMessage> {
    await this.socket.emit('error_camera',);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_error_camera')
      .then((response) => {
        return response;
      });
    }




    async MyRequestionByTransation(transaction_id:number): Promise<IResponseMessage> {
    await this.socket.emit('get_my_request_by_id',transaction_id);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_get_my_request_by_id')
      .then((response) => {
        return response;
      });
    }




async CheckList_camera(camera_id:number,transaction_id:number): Promise<IResponseMessage> {
    await this.socket.emit('check_list_data',camera_id,transaction_id);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_check_list_data')
      .then((response) => {
        return response;
      });
    }


    async UpdateDataList(data:any): Promise<IResponseMessage> {
    await this.socket.emit('update_datalist',data);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_update_datalist')
      .then((response) => {
        return response;
      });
    }

    async UpdateDataTransactions(data:any): Promise<IResponseMessage> {
    await this.socket.emit('Update_transaction',data);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_Update_transaction')
      .then((response) => {
        return response;
      });
    }


    async finish(transaction_id:number): Promise<IResponseMessage> {
    await this.socket.emit('finish',transaction_id);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_status_finish')
      .then((response) => {
        return response;
      });
    }

    async history_data(camera_id:number): Promise<IResponseMessage> {
    await this.socket.emit('history_report',camera_id);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_history_report')
      .then((response) => {
        return response;
      });
    }


 async history_data_user(camera_id:number , transaction_id:number): Promise<IResponseMessage> {
    await this.socket.emit('history_report_user',camera_id,transaction_id);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_history_report_user')
      .then((response) => {
        return response;
      });
    }







 async Register_login(users:any): Promise<IResponseMessage> {

    await this.socket.emit('register_login_user',users);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_register_login_user')
      .then((response) => {
        return response;
      });
    }



 async insert_camera_zone(cameras:any): Promise<IResponseMessage> {

    await this.socket.emit('insert_camera_zone',cameras);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_insert_camera_zone')
      .then((response) => {
        return response;
      });
    }





 async insert_zone(zone_name:string): Promise<IResponseMessage> {

    await this.socket.emit('insert_zone',zone_name);
    return await this.socket
      .fromOneTimeEvent<IResponseMessage>('return_insert_zone')
      .then((response) => {
        return response;
      });
    }
  }
  



  




  


  





  


  




  



















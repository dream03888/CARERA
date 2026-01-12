import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

import { IResponseMessage,IResponseStatus } from '../interfaces/response.interface';
import { Roles, User, UserData } from '../interfaces/user';
import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { SwalService } from './swal.service';
import { SocketSupplyService } from './socket-supply.service';
const USER_KEY = environment.USER_KEY

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  status: any
  user!: User

 

  constructor(private socket: SocketSupplyService, private storage: LocalStorageService, private router: Router, private swalSrv: SwalService) {
  
  }

  
  // async programStart(params: any) {
  //   try {
  //     if (!params.get('id')) {
  //       // const user = this.storage.getLocalStorage('user')
  //       const tokens = this.storage.getLocalStorage('auth');
  //       // console.log("user in start pg",user)
  //       if (!tokens) {
  //         await this.checkPageLogin().then((response) => {
  //           // console.log("url",response.url)
  //           if (!response.active) {
  //             this.router.navigateByUrl(response.url);
  //             return
  //           }
  //           window.location.assign(response.url)
  //         })
  //         return
  //       }
  //       return
  //     }
  //     const token = params.get('id');
  //     await this.loginToken(token)
  //   }
  //   catch (error) {
  //     console.error(error)
  //   }
  // }

  // async loginToken(token: string) {
  //   this.swalSrv.loadingAlert({ title: 'รบกวนรอสักครู่', text: 'กำลังเข้าสู่ระบบ' });
  //   await this.loginInToken(token).then(async (response) => {
  //     Swal.close()
  //     if (response.status === 201) {
  //       this.swalSrv.errorAlert({ title: 'เกิดข้อผิดพลาด', text: 'ไม่พบผู้ใช้งาน' });
  //       return
  //     }
  //     if (response.status !== 200) {
  //       this.swalSrv.errorAlert({ title: 'เกิดข้อผิดพลาด', text: 'ตรวจสอบการเชื่อมต่อ' });
  //       return
  //     }
  //     const data = await this.filterPermission(response.msg[0])
  //     if (!data.check) {
  //       this.swalSrv.warningAlert({ title: 'เกิดข้อผิดพลาด', text: 'ไม่มีสิทธิ์เข้าใช้โปรแกรมนี้' });
  //       return
  //     }
  //     this.storage.setLocalStorage('user', data.user);
  //     this.storage.setLocalStorage('auth', token);
  //     if(data.user.role_programs[0].role_description == 'Admin'){
  //       this.router.navigateByUrl('/home');
  //     }else if(data.user.role_programs[0].role_description == 'Editor'){
  //       this.router.navigateByUrl('/withdraw');
  //     }
  //   });
  // }

  /// เฉพาะโปรแกรมที่ใช้ Permissions
  // async filterPermission(user: User): Promise<IResponseMessage> {

  //   let data = {} as ResponseDataCheckPermissions
  //   data.user = user;
  //   data.check = false;

  //   try {

  //     data.user.role_programs = data.user.role_programs.filter((x: Roles) => x.program_id == environment.PROGRAM_ID);
  //     if (data.user.role_programs.length > 0) {
  //       data.check = true;
  //       return data;
  //     }
  //     return data
  //   }
  //   catch (error) {
  //     console.error('ข้อผิดพลาด ' + (error as Error).message);
  //     return data
  //   }
  // }

  //// ถ้าเข้าลิ้งมาแล้วไม่มีการ Login ให้ตรวจสอบว่า มีการล๊อคอินที่ Passport หรือ location program

  async checkPageLogin(): Promise<IResponseMessage> {
    await this.socket.emit('check_page_login');
    return await this.socket.fromOneTimeEvent<IResponseMessage>('send_page_login').then((response) => {
      return response
    });
  }

  /// ตรวจสอบการ Login จาก Token ใน Localstorage

  async checkDataLogin() {
    const token = this.storage.getLocalStorage('auth');
    if (!token) {
      this.router.navigateByUrl('/login');
      return
    }
    await this.checkLogin(token);
  }

  async checkLogin(token: string | null) {
    await this.checkAlreadyLogin(token).then(async (response) => {
      if (response.status === 203) {
        this.swalSrv.warningAlert({ title: 'แจ้งเตือน', text: 'ได้มีการเข้าสู้ระบบจากที่อื่น หรือ ออกจากระบบไปแล้ว' });
        this.storage.clearLocalStorage();
        await this.checkPageLogin();
        return;
      }
      if (response.status !== 200) {
        console.log('ตรวจสอบการเชื่อมต่อ ตรวจสอบการ Login ไม่สำเร็จ');
        return
      }
    });
  }
  async login(username: any, password: any): Promise<IResponseMessage> {
    await this.socket.emit('login_user', (username), (password));
    return await this.socket.fromOneTimeEvent<IResponseMessage >('return_login_user').then((response) => {
      return response;
    });
  }

  async loginInToken(token: string): Promise<IResponseMessage> {
    await this.socket.emit('get_login_user_token', (token));
    return await this.socket.fromOneTimeEvent<IResponseMessage>('return_get_login_user_token').then((response) => {
      return response;
    });
  }

  async checkAlreadyLogin(token: string | null): Promise<IResponseMessage> {
    await this.socket.emit('check_user_login', (token));
    return await this.socket.fromOneTimeEvent<IResponseMessage>('status_check_user_login').then((response) => {
      return response;
    });
  }

  getLoggedInUser() {
    this.user = JSON.parse((localStorage.getItem(USER_KEY) || JSON.stringify({} as User)))
    return this.user 
  }

  /// ออกจากโปรแกรม ทุก ๆ หน้า
  async logout() {
    await this.storage.getLocalStorage('auth');
    this.storage.clearLocalStorage();
    await this.router.navigate(['/login']);
    }

  }



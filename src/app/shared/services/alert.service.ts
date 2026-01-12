import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  DeleteConfirm(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  async AlertError(title:string,text:string,icon:any){

    await Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })

  }
  async AlertLoading1(options?: {title?: string, text?: string, timer?: number}){
    let timerInterval: any
    await Swal.fire({
      title: (options?.title ? options.title : 'Loading'),
      text: (options?.text ? options.text : 'Please wait for loading...'),
      timerProgressBar: true,
      showConfirmButton: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 0,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

  }

  async AlertError2(title:string,text:string){

    await Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    })

  }

  async AlertLoading3(options?: {title?: string, text?: string, timer?: number}){
    let timerInterval: any
    await Swal.fire({
      title: (options?.title ? options.title : 'Loading'),
      text: (options?.text ? options.text : 'Please wait for loading...'),
      timerProgressBar: true,
      showConfirmButton: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

  }

  async AlertSuccess(text:string){
    await Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  async AlertSuccessToast(text:string){
    await Swal.fire({
      toast:true,
      position:"top-end",
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  async AlertLoading(title:string,text:string,timer:any = 500){

    await Swal.fire({
      title: title,
      text: text,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true
    })

  }

  async AlertLoading2(title:string,text:string){

    await Swal.fire({
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true
    })

  }

  async AlertConfrim(title:string,text:string){
    let confirm = false
    await Swal.fire({
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        confirm = true;
      }
    })

    return confirm

  }
}

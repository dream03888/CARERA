import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


const AUTH_KEY = environment.AUTH_KEY
const USER_KEY = environment.USER_KEY
const ROUTE_KEY = environment.ROUTE_KEY
const STORAGE_KEYS = [
  { path: 'auth', key: AUTH_KEY },
  { path: 'user', key: USER_KEY },
  { path: 'route', key: ROUTE_KEY },
]
const VALIDATE_KEY = environment.VALIDATE_KEY
const SESSION_KEY = [
  { path: 'validate', key: VALIDATE_KEY}
]

export type KeyPath = 'auth' | 'user' | 'route' | 'role'
export type SKeyPath = 'validate'

@Injectable({
  providedIn: 'root'
})


export class LocalStorageService {

  
  
  constructor() { }

  setLocalStorage(path: KeyPath, value: object | string) {
    if(!path || !value) {
      return false;
    }
    const key = this.findStorageKey(path)
    if(!key) {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
    return true;
  }


  getLocalStorage(path: KeyPath) {
    if(!path) {
      return false;
    }
    const key = this.findStorageKey(path)
    if(!key) {
      return false;
    }
    const data = localStorage.getItem(key)
    if(!data) {
      return false;
    }
    return JSON.parse(data)
  }

  findStorageKey(path: KeyPath) {
    const index = STORAGE_KEYS.findIndex((x) => x.path === path)
    if(index < 0) {
      return false;
    }
    return STORAGE_KEYS[index].key
  }

  removeLocalStorage(path: KeyPath) {
    if(!path) {
      return false;
    }
    const key = this.findStorageKey(path)
    if(!key) {
      return false;
    }
    localStorage.removeItem(key)
    return true;
  }

  clearLocalStorage() {
    localStorage.clear()
    console.log("local in clear",localStorage)
    return true;
  }

  setSessionStorage(path: SKeyPath, value: string) {
    if(!value) {
      return false
    }
    const key = this.findSessionKey(path)
    if(!key) {
      return false
    }
    sessionStorage.setItem(VALIDATE_KEY, value)
    return true
  }

  getSessionStorage(path: SKeyPath) {
    if(!path) {
      return false;
    }
    const key = this.findSessionKey(path)
    if(!key) {
      return false;
    }
    const data = sessionStorage.getItem(key)
    if(!data) {
      return false;
    }
    return JSON.parse(data)
  }

  findSessionKey(path: SKeyPath) {
    const index = SESSION_KEY.findIndex((x) => x.path === path)
    if(index < 0) {
      return false
    }
    return SESSION_KEY[index].key
  }

  removeSessionStorage(path: SKeyPath) {
    if(!path) {
      return false;
    }
    const key = this.findSessionKey(path)
    if(!key) {
      return false;
    }
    localStorage.removeItem(key)
    return true;
  }

  clearSessionStorage() {
    sessionStorage.clear()
    return true;
  }
}

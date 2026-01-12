export interface User {
    admin_system: boolean
    department_name: string
    employee_code: string
    expire_date: any
    ip_address: string
    last_login_time: string
    rfid_card: string
    role_id: number
    role_programs: Roles[]
    start_date: any
    user_email: string
    user_fname: string
    user_id: number
    user_lname: string
    user_pname: string
    user_profile_img: string
    user_tel: string
    department_id: number
    user_login_name: string
    is_active: boolean
    position_id: number
    position_name: string

    staff_name:string
    emp_code:string
    password:string
    role:number
    role_name:string
  }
  
  export interface Roles {
    role_id: number
    role_description: string
    program_id: number
    permissions: Permissions[]
  }
  
  export interface Permissions {
    permission_id: number
    permission_description: string
  }
  
  // export interface DataUser {
  //   user_login_name: any
  //   password: any
  //   employee_id: any
  //   department_id: any
  //   user_pname: any
  //   user_fname: any
  //   user_lname: any
  //   user_email: any
  //   user_tel: any
  //   user_id: any
  //   is_active: boolean
  //   admin_system: boolean
  // }
  
  export interface UserData {
    token: string
    user: User
  }
  
  
  
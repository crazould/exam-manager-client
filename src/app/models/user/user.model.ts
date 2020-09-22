export class User {
 
    id: number
    username: string
    email: string
    password: string
    isEdit: boolean
    isDelete: boolean

    constructor(name: string, email: string, password: string) {
        this.username = name,
        this.email = email,
        this.password = password,
        this.isEdit = false,
        this.isDelete = false
    }
    
}

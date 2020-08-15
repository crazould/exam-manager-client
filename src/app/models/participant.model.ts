export class Participant {
    
    id: string
    name: string
    email: string
    password: string
    isEdit: boolean
    isDelete: boolean

    constructor(name, email, password) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.isEdit = false,
        this.isDelete = false
    }

}

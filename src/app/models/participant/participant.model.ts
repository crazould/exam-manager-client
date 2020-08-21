import { User } from '../user/user.model'

export class Participant extends User{
   
    constructor(name: string, email: string, password: string) {
       super(name, email, password)
    }

}

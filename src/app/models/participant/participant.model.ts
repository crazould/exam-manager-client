import { User } from '../user/user.model'

export class Participant extends User{
   
    constructor(name: string, email: string) {
       super(name, email)
    }

}

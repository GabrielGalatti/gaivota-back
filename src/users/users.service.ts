import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async findByEmail(userEmail: string): Promise<User>{
        return await this.userModel.findOne({email: userEmail});
    }
}

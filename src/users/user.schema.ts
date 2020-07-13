import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop({enum: ['admin', 'client']})
    type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
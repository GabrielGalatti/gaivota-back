import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Data {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;
}

const DataSchema = SchemaFactory.createForClass(Data);

@Schema()
export class Bid {
  @Prop({required: true})
  price: number;

  @Prop({required: true})
  yield: number;

  @Prop({required: true})
  user_key: string;
}

const BidSchema = SchemaFactory.createForClass(Bid)

@Schema()
export class Farm extends Document {
  @Prop({ required: true, unique: true })
  farm_id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  culture: string;

  @Prop({ required: true })
  variety: string;

  @Prop({ required: true })
  total_area: number;

  @Prop({ required: true })
  yield_estimation: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  buyer_key: string;

  @Prop({type: [BidSchema]})
  bids: Bid[]

  @Prop({ type: [DataSchema] })
  nvdi: Data[];

  @Prop({ type: [DataSchema] })
  precipitation: Data[];

  @Prop()
  geoJson: any;
}

export const FarmSchema = SchemaFactory.createForClass(Farm);

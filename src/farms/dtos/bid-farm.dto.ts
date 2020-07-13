import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class BidFarmDto {
    @IsPositive()
    farm_key: number;

    @IsPositive()
    price: number;
  
    @IsPositive()
    yield: number;
}
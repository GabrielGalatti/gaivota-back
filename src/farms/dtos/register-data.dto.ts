import { IsDate, IsPositive, IsNumber, IsDateString } from 'class-validator';

export class RegisterDataDto {
    @IsPositive()
    farm_key: number;

    @IsNumber()
    nvdi: number;

    @IsNumber()
    precipitation: number;

    @IsDateString()
    date: Date;
}
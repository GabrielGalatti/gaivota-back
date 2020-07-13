import { IsPositive, IsDefined } from 'class-validator';

export class RegisterGeoJsonDto {
    @IsPositive()
    farm_key: number;

    @IsDefined()
    geoJson: any;
}
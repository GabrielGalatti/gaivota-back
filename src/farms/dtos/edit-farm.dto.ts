import { IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';

export class EditFarmDto {
    @IsInt({message: "Id deve ser um número"})
    farm_id: number;
    
    @IsOptional()
    @IsNotEmpty({message: "Nome deve ser preenchido"})
    name: string;
  
    @IsOptional()
    @IsLatitude({message: "Latitude não reconhecida"})
    latitude: number;
  
    @IsOptional()
    @IsLongitude({message: "Longitude deve ser preenchida"})
    longitude: number;
  
    @IsOptional()
    @IsNotEmpty({message: "Cultura deve ser preenchida"})
    culture: string;
  
    @IsOptional()
    @IsNotEmpty()
    variety: string;
  
    @IsOptional()
    @IsPositive()
    total_area: number;
  
    @IsOptional()
    @IsPositive()
    yield_estimation: number;
  
    @IsOptional()
    @IsPositive()
    price: number;
}
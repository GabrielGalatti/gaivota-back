import { IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateFarmDto {
    @IsInt({message: "Id deve ser um número"})
    farm_id: number;
  
    @IsNotEmpty({message: "Nome deve ser preenchido"})
    name: string;
  
    @IsLatitude({message: "Latitude não reconhecida"})
    latitude: number;
  
    @IsLongitude({message: "Longitude deve ser preenchida"})
    longitude: number;
  
    @IsNotEmpty({message: "Cultura deve ser preenchida"})
    culture: string;
  
    @IsNotEmpty()
    variety: string;
  
    @IsPositive()
    total_area: number;
  
    @IsPositive()
    yield_estimation: number;
  
    @IsPositive()
    price: number;
}
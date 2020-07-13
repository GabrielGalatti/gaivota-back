import { Controller, Get, UseGuards, Body, Param, Post, Put, UsePipes, Patch, Req } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { EditFarmDto } from './dtos/edit-farm.dto';
import { BidFarmDto } from './dtos/bid-farm.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.schema';
import { RegisterDataDto } from './dtos/register-data.dto';
import { RegisterGeoJsonDto } from './dtos/register-geoJson.dto';

@Controller('farms')
export class FarmsController {
    constructor(private farmsService: FarmsService){}

    @Get('')
    getFarms(){
        return this.farmsService.findAll();
    }

    @Get(':id')
    getFarm(@Param() params){
        return this.farmsService.findByFarmId(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createFarm(@Body() createFarm: CreateFarmDto){
        return this.farmsService.createFarm(createFarm);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('edit')
    editFarm(@Body() editFarm: EditFarmDto){
        return this.farmsService.editFarm(editFarm);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('bid')
    bidFarm(@Body() bidFarm: BidFarmDto, @CurrentUser() user: any){
        return this.farmsService.bidFarm(bidFarm, user.key);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch('data')
    registerData(@Body() data: RegisterDataDto){
        return this.farmsService.registeNvdiAndPrecipitation(data);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('geoJson')
    registerGeoJson(@Body() geoJson: RegisterGeoJsonDto){
        return this.farmsService.registerGeoJson(geoJson);
    }

}

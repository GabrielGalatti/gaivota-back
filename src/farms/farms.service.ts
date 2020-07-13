import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Farm } from './farm.schema';
import { Model } from 'mongoose';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { EditFarmDto } from './dtos/edit-farm.dto';
import { BidFarmDto } from './dtos/bid-farm.dto';
import { RegisterDataDto } from './dtos/register-data.dto';

@Injectable()
export class FarmsService {
  constructor(@InjectModel(Farm.name) private farmsModel: Model<Farm>) {}

  async findAll() {
    return await this.farmsModel.find();
  }

  async findByFarmId(farm_id: number) {
    return await this.farmsModel.findOne({ farm_id: farm_id });
  }

  async createFarm(createFarmDto: CreateFarmDto) {
    const newFarm = new this.farmsModel(createFarmDto);
    return newFarm.save();
  }

  async editFarm(editFarmDto: EditFarmDto) {
    await this.farmsModel.updateOne(
      { farm_id: editFarmDto.farm_id },
      { $set: editFarmDto },
    );
    return await this.farmsModel.findOne({ farm_id: editFarmDto.farm_id });
  }

  async bidFarm(bidFarmDto: BidFarmDto, user_key: string) {
    const farm = await this.farmsModel.findOne({
      farm_id: bidFarmDto.farm_key,
    });

    farm.bids.push({
        user_key: user_key,
        price: bidFarmDto.price,
        yield: bidFarmDto.yield
    })

    return farm.save();
  }

  async registeNvdiAndPrecipitation(registerDataDto: RegisterDataDto){
    const farm = await this.farmsModel.findOne({
      farm_id: registerDataDto.farm_key,
    });

    farm.nvdi.push({
      date: registerDataDto.date,
      value: registerDataDto.nvdi
    });

    farm.precipitation.push({
      date: registerDataDto.date,
      value: registerDataDto.precipitation
    })

    return farm.save();
  }

  async registerGeoJson({geoJson, farm_key}){
    const farm = await this.farmsModel.findOne({
      farm_id: farm_key,
    });

    farm.geoJson = geoJson;

    return farm.save()
  }
}

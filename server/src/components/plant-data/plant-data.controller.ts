import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { PlantData } from '../../schemas/plant-data.schema';
import { PlantDataService } from './plant-data.service';

@ApiTags('Plant data')
@Controller('plant-data')
export class PlantDataController {
  constructor(private readonly service: PlantDataService) {}

  @ApiOperation({
    description: 'Get sorted list of plants',
    operationId: 'GetPlants',
  })
  @ApiOkResponse({
    description: 'Sorted list of Plants',
    type: [PlantData],
  })
  @ApiQuery({
    name: 'limit',
    description: 'Quantity limitation',
    example: '15',
  })
  @ApiQuery({
    name: 'state',
    description: 'State for filtering',
    example: 'IA',
  })
  @Get()
  getPlants(@Query('limit') limit: number, @Query('state') state: string) {
    return this.service.getAll(limit, state);
  }

  @ApiOperation({
    description: 'Populate plants',
    operationId: 'PopulatePlants',
  })
  @ApiOkResponse({
    description: 'Plants are populated',
  })
  @Get('populate')
  populatePlants() {
    return this.service.populate();
  }
}

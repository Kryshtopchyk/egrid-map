import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Plant } from '../../schemas/plant.schema';
import { PlantService } from './plant.service';

@ApiTags('Plant')
@Controller('plant')
export class PlantController {
  constructor(private readonly service: PlantService) {}

  @ApiOperation({
    description: 'Get sorted list of plants',
    operationId: 'GetPlants',
  })
  @ApiOkResponse({
    description: 'Sorted list of Plants',
    type: [Plant],
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

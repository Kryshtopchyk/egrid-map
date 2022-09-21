import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

import { StateDataService } from './state-data.service';
import { StateData } from '../../schemas';

@ApiTags('State data')
@Controller('state-data')
export class StateDataController {
  constructor(private readonly service: StateDataService) {}

  @ApiOperation({
    description: 'Populate states',
    operationId: 'PopulateStates',
  })
  @ApiOkResponse({
    description: 'States are populated',
  })
  @Get('populate')
  populateStates() {
    return this.service.populate();
  }

  @ApiOperation({
    description: 'Get list of states',
    operationId: 'GetStates',
  })
  @ApiOkResponse({
    description: 'List of States',
    type: [StateData],
  })
  @Get()
  getStates() {
    return this.service.getAll();
  }
}

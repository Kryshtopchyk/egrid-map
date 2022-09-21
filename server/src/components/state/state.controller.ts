import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

import { StateService } from './state.service';
import { State } from '../../schemas';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly service: StateService) {}

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
    type: [State],
  })
  @Get()
  getStates() {
    return this.service.getAll();
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';

import { SchemaName } from '../constants';

export type StateDocument = State & Document;

@Schema({ collection: SchemaName.states })
export class State {
  @ApiProperty({
    description: 'Id',
    example: '620d43c901c7e41a00e2046a',
  })
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'State Abbreviation',
    example: 'AI',
  })
  @Prop()
  stateAbbreviation: string;

  @ApiProperty({
    description: 'Net Generation',
    example: '1000',
  })
  @Prop()
  netGeneration: number;

  @ApiProperty({
    description: 'Percentage Of The Total',
    example: '10',
  })
  @Prop()
  percentage: number;
}

export const StateSchema = SchemaFactory.createForClass(State);

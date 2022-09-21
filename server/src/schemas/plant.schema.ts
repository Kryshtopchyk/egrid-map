import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';

import { SchemaName } from '../constants';

export type PlantDocument = Plant & Document;

@Schema({ collection: SchemaName.plants })
export class Plant {
  @ApiProperty({
    description: 'Id',
    example: '620d43c901c7e41a00e2046a',
  })
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'Plant Name',
    example: 'Some kind of plant',
  })
  @Prop()
  plantName: string;

  @ApiProperty({
    description: 'Plant State Abbreviation',
    example: 'AI',
  })
  @Prop()
  plantStateAbbreviation: string;

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

  @ApiProperty({
    description: 'Latitude',
    example: '10',
  })
  @Prop()
  latitude: number;

  @ApiProperty({
    description: 'Longitude',
    example: '-10',
  })
  @Prop()
  longitude: number;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);

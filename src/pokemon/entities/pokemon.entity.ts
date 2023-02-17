import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';

@Schema() //INFO: extends the document
export class Pokemon extends Document {
  //INFO define our properties with settings
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

//INFO: export our schema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

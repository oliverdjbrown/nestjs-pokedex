import { Injectable } from '@nestjs/common';
import { Apis } from 'src/common/enums/apis';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { HttpRequestAdapter } from 'src/common/adapters/http.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: HttpRequestAdapter,
  ) {}

  async populateDB(limit: string) {
    //INFO: clear a DB table
    await this.pokemonModel.deleteMany({});

    const pokemonsToInsert: { name: string; no: number }[] = [];

    const { results } = await this.http.get<PokeResponse>(
      `${Apis.pokeApiPopulate}${limit}`,
    );
    results.forEach(({ name, url }) => {
      const urlSegments = url.split('/');
      const no: number = +urlSegments[urlSegments.length - 2];

      pokemonsToInsert.push({ name, no });
    });
    //INFO: Bulk data into DB
    await this.pokemonModel.insertMany(pokemonsToInsert);
    return 'Database Populated';
  }
}

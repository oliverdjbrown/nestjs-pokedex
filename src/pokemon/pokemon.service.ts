import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  //INFO: implements constructor to inject the Schema class
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    //INFO: paginate data
    const { limit = 20, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    //INFO: method to validated a valid mongo ID
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: term });

    if (!pokemon) throw new NotFoundException();

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      //INFO: send object { new: true } returns the updated object
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    //Two Request
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //OneRequest
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException();
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      //INFO: set bad request exception
      throw new BadRequestException();
    } else {
      console.log(error);
      //INFO: set internal server exception
      throw new InternalServerErrorException();
    }
  }
}

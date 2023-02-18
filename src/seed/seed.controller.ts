import { Controller, Get, Param } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get(':limit')
  populateDB(@Param('limit') limit: string) {
    return this.seedService.populateDB(limit);
  }
}

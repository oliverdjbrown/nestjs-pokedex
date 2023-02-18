import { Module } from '@nestjs/common';
import { HttpRequestAdapter } from './adapters/http.adapter';

@Module({
  providers: [HttpRequestAdapter],
  exports: [HttpRequestAdapter],
})
export class CommonModule {}

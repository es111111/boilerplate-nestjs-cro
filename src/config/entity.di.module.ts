import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [EntityDiModule],
})
export class EntityDiModule {}

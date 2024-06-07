import { Injectable } from '@nestjs/common';
import { CustomRepository } from 'src/decorator/custom.repository.decorator';
import ExampleEntity from 'src/entities/example.entity';
import { Repository } from 'typeorm';

@CustomRepository(ExampleEntity)
@Injectable()
export class ExamplRepository extends Repository<ExampleEntity> {}

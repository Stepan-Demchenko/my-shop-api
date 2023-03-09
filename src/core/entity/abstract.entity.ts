import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiResponseProperty()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}

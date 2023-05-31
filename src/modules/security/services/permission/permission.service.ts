import { Permission } from '@models/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private readonly _permissionRepo: Repository<Permission>) {}

  async findAll(): Promise<Permission[]> {
    return await this._permissionRepo.find();
  }
}

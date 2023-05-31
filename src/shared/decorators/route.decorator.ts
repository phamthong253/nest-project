import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StringHelper } from '../helpers/string.helper';

export function Route(prefix: string): ClassDecorator {
  return applyDecorators(ApiTags(StringHelper.kebabCaseToTitleCase(prefix)), Controller(prefix));
}

import { applyDecorators, Controller } from '@nestjs/common';
import { StringHelper } from '@helpers/string.helper';
import { ApiTags } from '@nestjs/swagger';

export function Route(prefix: string): ClassDecorator {
  return applyDecorators(ApiTags(StringHelper.kebabCaseToTitleCase(prefix)), Controller(prefix));
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exeption/validationException';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    try {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
      const object = plainToInstance(metatype, value);
      const errors = await validate(object);
      if (errors.length) {
        const messages = errors.map((err) => {
          return `${err.property}-${Object.values(err.constraints).join('. ')}`;
        });
        throw new ValidationException(messages);
      }
      return value;
    } catch (e) {
      throw new BadRequestException({ error: 'validation pipe is broken' });
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as schema from 'src/drizzle/schema';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { userTable } from 'src/drizzle/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable.username, createUserDto.username),
    });

    if (user) throw new ConflictException('User already exists');

    const hashedPassword = await argon2.hash(createUserDto.password);

    const newUser = await this.db
      .insert(userTable)
      .values({
        username: createUserDto.username,
        password: hashedPassword,
      })
      .returning({
        username: userTable.username,
      });

    return newUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

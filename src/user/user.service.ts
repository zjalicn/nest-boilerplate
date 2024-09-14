import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { userTable } from 'src/drizzle/schema';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class UserService extends DrizzleService {
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

  // findByUsername(username: string) {
  //   // CHANGE TO QUERY DB LATER
  //   // const user = await this.db.query.userTable.findFirst({
  //   //   where: eq(userTable.id, id),
  //   // });

  //   //TEMPOERARY
  //   const users = [
  //     {
  //       id: 1,
  //       username: 'niko',
  //       password: 'password',
  //     },
  //   ];

  //   return users.find((user) => user.username === username);
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

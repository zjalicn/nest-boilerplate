import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { userTable } from 'src/drizzle/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/drizzle/schema';
import { ShopService } from 'src/shop/shop.service';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleProvider) private readonly db: NodePgDatabase<typeof schema>,
    private readonly shopService: ShopService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable.email, createUserDto.email),
    });

    if (user) throw new ConflictException('User already exists');

    const hashedPassword = await argon2.hash(createUserDto.password);
    const uuid = uuidv4();

    const customer = await this.shopService.createOrRetrieveCustomer(
      createUserDto.email,
    );

    const newUser = await this.db
      .insert(userTable)
      .values({
        id: uuid,
        email: createUserDto.email,
        password: hashedPassword,
        stripeCustomerId: customer,
      })
      .returning({
        email: userTable.email,
      });

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

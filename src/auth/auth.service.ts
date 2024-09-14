import { Inject, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import * as argon2 from 'argon2';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(DrizzleProvider) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async validateUser({ email, password }) {
    const user = await this.db.query.userTable.findFirst({
      where: eq(schema.userTable.email, email),
    });
    if (!user) return null;

    const passwordMatch = await argon2.verify(user.password, password);
    if (passwordMatch) {
      return this.jwtService.sign(user, {
        secret: process.env.JWT_TOKEN_SECRET,
      });
    } else return null;
  }
}

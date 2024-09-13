import { Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private userId: string;

  constructor(private readonly jwtService: JwtService) {}

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  validateUser({ username, password }) {
    const users = [
      {
        id: 1,
        username: 'niko',
        password: 'password',
      },
    ];
    const findUser = users.find((user) => user.username === username);
    if (!findUser) return null;
    else {
      if (findUser.password === password) {
        const { password, ...user } = findUser;
        return this.jwtService.sign({ user });
      } else return null;
    }
  }
}

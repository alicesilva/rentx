import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensREpository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}
@injectable()
class RefreshTokenService {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensREpository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { email, sub } = verify(token, secret_refresh_token) as IPayload;
    const user_id = sub;
    const usersTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!usersTokens) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(usersTokens.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      expires_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    });

    return refresh_token;
  }
}

export { RefreshTokenService };

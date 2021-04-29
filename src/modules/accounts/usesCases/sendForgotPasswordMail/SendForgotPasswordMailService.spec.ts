import { DayjsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemomry";
import { UsersTokensRepositoryInMemomry } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailService } from "./SendForgotPasswordMailService";

let sendForgotPasswordMailService: SendForgotPasswordMailService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemomry: UsersTokensRepositoryInMemomry;
let dayjsDateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemomry = new UsersTokensRepositoryInMemomry();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemomry,
      dayjsDateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "driver license",
      email: "user@gmail.com",
      name: "user test",
      password: "134",
    });

    await sendForgotPasswordMailService.execute("user@gmail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailService.execute("user@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemomry, "create");

    await usersRepositoryInMemory.create({
      driver_license: "driver license",
      email: "user@gmail.com",
      name: "user test",
      password: "134",
    });

    await sendForgotPasswordMailService.execute("user@gmail.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});

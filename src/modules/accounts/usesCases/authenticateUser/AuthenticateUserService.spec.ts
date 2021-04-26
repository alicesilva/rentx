import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemomry";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";

let authenticationUserService: AuthenticateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserService: CreateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticationUserService = new AuthenticateUserService(
      usersRepositoryInMemory
    );

    createUserService = new CreateUserService(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@gmail.com",
      password: "1234",
      name: "User Test",
    };

    await createUserService.execute(user);

    const result = await authenticationUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticationUserService.execute({
        email: "user.email@gmail.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@gmail.com",
      password: "1234",
      name: "User Test",
    };

    await createUserService.execute(user);

    await expect(
      authenticationUserService.execute({
        email: user.email,
        password: "12345",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});

import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repositoy: Repository<Rental>;

  constructor() {
    this.repositoy = getRepository(Rental);
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repositoy.findOne({ car_id });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repositoy.findOne({ user_id });
    return openByUser;
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repositoy.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.repositoy.save(rental);

    return rental;
  }
}

export { RentalsRepository };

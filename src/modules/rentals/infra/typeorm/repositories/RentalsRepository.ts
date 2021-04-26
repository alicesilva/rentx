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
    const openByCar = await this.repositoy.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repositoy.findOne({
      where: { user_id, end_date: null },
    });
    return openByUser;
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repositoy.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repositoy.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.repositoy.findOne(id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repositoy.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentals;
  }
}

export { RentalsRepository };

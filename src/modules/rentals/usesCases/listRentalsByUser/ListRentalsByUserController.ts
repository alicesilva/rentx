import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserService } from "./ListRentalsByUserService";

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listRentalByUserService = container.resolve(ListRentalsByUserService);

    const rentals = await listRentalByUserService.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };

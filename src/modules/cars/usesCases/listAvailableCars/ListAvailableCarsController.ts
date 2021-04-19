import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsService } from "./ListAvailableCarsService";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableSerivde = container.resolve(ListAvailableCarsService);

    const cars = await listAvailableSerivde.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}
export { ListAvailableCarsController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationService } from "./CreateCarSpecificationService";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const creaateCarSpecificationService = container.resolve(
      CreateCarSpecificationService
    );

    const car = await creaateCarSpecificationService.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(car);
  }
}

export { CreateCarSpecificationController };

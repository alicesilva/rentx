import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageService } from "./UploadCarImageService";

interface IFiles {
  filename: string;
}
class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImageService = container.resolve(UploadCarImageService);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageService.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };

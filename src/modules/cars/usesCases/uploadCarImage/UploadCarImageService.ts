import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/provider/StorageProvider/IStorageProvider";
import { CarsImageRepository } from "../../infra/typeorm/repositories/CarsImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImageService {
  constructor(
    @inject("CarsImageRepository")
    private carImageRepository: CarsImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImageService };

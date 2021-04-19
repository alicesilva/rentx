import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService";

let lisAvailableCarsService: ListAvailableCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    lisAvailableCarsService = new ListAvailableCarsService(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audit",
      brand: "Audi",
      category_id: "672ff96c-6ddb-439e-befd-c5b48327c72d",
      daily_rate: 140,
      description: "Carro bonito",
      fine_amount: 100,
      license_plate: "AFFS-1212",
    });
    const cars = await lisAvailableCarsService.execute({});

    expect(cars).toEqual([car]);
  });

  it("sholud be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      brand: "Audi",
      category_id: "672ff96c-6ddb-439e-befd-c5b48327c72d",
      daily_rate: 140,
      description: "car_brand_test",
      fine_amount: 100,
      license_plate: "AFFS-1212",
    });
    const cars = await lisAvailableCarsService.execute({
      brand: "car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("sholud be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Audi",
      category_id: "672ff96c-6ddb-439e-befd-c5b48327c72d",
      daily_rate: 140,
      description: "car_brand_test",
      fine_amount: 100,
      license_plate: "AFFS-1212",
    });
    const cars = await lisAvailableCarsService.execute({ name: "Car3" });

    expect(cars).toEqual([car]);
  });

  it("sholud be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      brand: "Audi",
      category_id: "12345",
      daily_rate: 140,
      description: "car_brand_test",
      fine_amount: 100,
      license_plate: "AFFS-1212",
    });
    const cars = await lisAvailableCarsService.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});

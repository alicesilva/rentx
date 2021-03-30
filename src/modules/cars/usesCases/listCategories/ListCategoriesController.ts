import { Request, Response } from "express";

import { ListCategoriesService } from "./ListCategoriesService";

class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {
    // nada
  }

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesService.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };

import { Request, Response } from "express";

import { ImportCategoryService } from "./ImportCategoryService";

class ImportCategoryController {
  constructor(private importCategorySevice: ImportCategoryService) {
    // nada
  }
  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategorySevice.execute(file);
    return response.send();
  }
}

export { ImportCategoryController };

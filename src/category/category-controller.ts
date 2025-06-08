import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Category } from "./category-types";
import { CategoryService } from "./category-service";
import { Logger } from "winston";

export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private logger: Logger,
  ) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const { name, priceConfiguration, attributes } = req.body as Category;
    const category = await this.categoryService.create({
      name,
      priceConfiguration,
      attributes,
    });
    this.logger.info("Category created", { id: category._id });
    res.json({ id: category._id });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const { name, priceConfiguration, attributes } = req.body as Category;
    const category = await this.categoryService.update(req.params.id, {
      name,
      priceConfiguration,
      attributes,
    });
    this.logger.info("Category updated", { id: category?._id });
    res.json({ id: category?._id });
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const id = req.params.id;
    const category = await this.categoryService.getById(id);
    if (!category) {
      return next(createHttpError(404, "Category not found"));
    }
    this.logger.info("Category retrieved", { id });
    res.json(category);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const categories = await this.categoryService.getAll();
    this.logger.info("Categories retrieved", { count: categories.length });
    res.json(categories);
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(createHttpError(400, result.array()[0].msg as string));
    }
    const id = req.params.id;
    const category = await this.categoryService.getById(id);
    if (!category) {
      return next(createHttpError(404, "Category not found"));
    }
    const deletedCategory = await this.categoryService.remove(id);
    this.logger.info("Category removed", { deletedCategory });
    res.json({ name: `${deletedCategory?.name} category removed` });
  }
}

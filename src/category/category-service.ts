import CategoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
  async create(category: Category) {
    const newCategory = new CategoryModel(category);
    return newCategory.save();
  }

  async update(id: string, category: Category) {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, category);
    return updatedCategory;
  }

  async getById(id: string) {
    const category = await CategoryModel.findOne({ _id: id });
    return category;
  }

  async remove(id: string) {
    const deletedCategory = await CategoryModel.findOneAndDelete({ _id: id });
    return deletedCategory;
  }

  async getAll() {
    const categories = await CategoryModel.find();
    return categories;
  }
}


export type TIngredientType = 'Булки' | 'Соусы' | 'Начинки';
export type TIngredientTypeName = 'bun' | 'sauce' | 'main';


export interface TIngredient {
  _id: string;
  name: string;
  type: TIngredientTypeName;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

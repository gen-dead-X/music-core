import { RecipeResolver } from './recipe/recipe.resolver';
import { UserResolvers } from './user/user.resolver';

export default function Resolvers() {
  return [RecipeResolver, UserResolvers];
}

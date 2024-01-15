import { AllUserDetails } from '@entities/user/user.entity';
import { Query, Resolver, UseMiddleware } from 'type-graphql';
import validateIsAdmin from '@middlewares/auth/admin.auth.middleware';
import validateToken from '@middlewares/auth/validateToken.auth.middleware';
import AdminController from '@controllers/admin/admin.controller';
import { handleResolverError } from '@helpers/resolver.helpers';

const adminController = new AdminController();

@Resolver()
export class AdminResolver {
  @Query(() => AllUserDetails)
  @UseMiddleware([validateToken, validateIsAdmin])
  async getAllUsers() {
    try {
      const response = await adminController.getAllUsers();

      if (response instanceof Error) {
        throw response;
      }

      return {
        data: response,
        success: true,
        message: 'Details of All Users.',
      };
    } catch (error) {
      return handleResolverError(error);
    }
  }
}

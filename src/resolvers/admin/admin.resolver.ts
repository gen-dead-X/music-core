import { AllUserDetails } from '@entities/user/user.entity';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import validateIsAdmin from '@middlewares/auth/admin.auth.middleware';
import validateToken from '@middlewares/auth/validateToken.auth.middleware';
import AdminController from '@controllers/admin/admin.controller';
import { handleResolverError } from '@helpers/resolver.helpers';
import { NewTrackResponse, TrackInputs } from '@entities/admin/track.entity';
import { Context } from '../../types/global.types';

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

  @Mutation(() => NewTrackResponse)
  @UseMiddleware([validateToken, validateIsAdmin])
  async uploadNewTrack(
    @Arg('data') trackInputs: TrackInputs,
    @Ctx()
    ctx: Context
  ) {
    try {
      console.log(ctx.res);

      const res = await adminController.uploadTrack(trackInputs);

      return {
        message: 'OK',
        success: true,
        data: trackInputs,
      };
    } catch (error) {
      return handleResolverError(error);
    }
  }
}

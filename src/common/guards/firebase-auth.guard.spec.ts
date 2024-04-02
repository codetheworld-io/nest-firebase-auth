import {
  FirebaseAuthGuard,
  IS_PUBLIC__METADATA_KEY,
} from './firebase-auth.guard';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('FirebaseAuthGuard', () => {
  let guard: FirebaseAuthGuard;
  let reflector: jest.MockedObject<Reflector>;
  let context: ExecutionContext;
  let baseCanActivateFn: jest.SpyInstance;
  const handlerFunction = 'handlerFunction';
  const handlerClass = 'handlerClass';

  beforeEach(async () => {
    jest.resetAllMocks();

    baseCanActivateFn = jest.spyOn(
      AuthGuard('bearer').prototype,
      'canActivate',
    );
    reflector = {
      getAllAndOverride: jest.fn(),
    } as jest.MockedObject<Reflector>;
    context = {
      getHandler: jest.fn().mockReturnValueOnce(handlerFunction),
      getClass: jest.fn().mockReturnValueOnce(handlerClass),
    } as unknown as ExecutionContext;

    const module = await Test.createTestingModule({
      providers: [
        FirebaseAuthGuard,
        { provide: Reflector, useValue: reflector },
      ],
    }).compile();

    guard = module.get(FirebaseAuthGuard);
  });

  describe('canActivate()', () => {
    it(`should return super.canActivate() result when it is not a public route`, async () => {
      const canActiveResult = 'canActiveResult' as unknown as boolean;
      reflector.getAllAndOverride.mockReturnValueOnce(false);
      baseCanActivateFn.mockResolvedValueOnce(canActiveResult);

      const result = await guard.canActivate(context);

      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
        IS_PUBLIC__METADATA_KEY,
        [handlerFunction, handlerClass],
      );
      expect(baseCanActivateFn).toHaveBeenCalledWith(context);
      expect(result).toBe(canActiveResult);
    });

    it(`should return true when it is a public route`, async () => {
      reflector.getAllAndOverride.mockReturnValueOnce(true);

      const result = await guard.canActivate(context);

      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
        IS_PUBLIC__METADATA_KEY,
        [handlerFunction, handlerClass],
      );
      expect(baseCanActivateFn).not.toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });
});

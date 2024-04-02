import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { Test } from '@nestjs/testing';
import * as FirebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { FirebaseAuthError } from 'firebase-admin/lib/utils/error';
import { UnauthorizedException } from '@nestjs/common';

describe('FirebaseAuthStrategy', () => {
  let strategy: FirebaseAuthStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FirebaseAuthStrategy],
    }).compile();
    strategy = module.get(FirebaseAuthStrategy);
  });

  describe('validate()', () => {
    const idToken = 'idToken';
    let verifyIdTokenFn: jest.Mock;

    beforeEach(() => {
      verifyIdTokenFn = jest.fn();
      jest.spyOn(FirebaseAdmin, 'auth').mockReturnValueOnce({
        verifyIdToken: verifyIdTokenFn,
      } as unknown as FirebaseAdmin.auth.Auth);
    });

    it('should return id token verification result', async () => {
      const decodedIdToken = 'DecodedIdToken' as unknown as DecodedIdToken;
      verifyIdTokenFn.mockReturnValueOnce(decodedIdToken);

      const result = await strategy.validate(idToken);

      expect(verifyIdTokenFn).toHaveBeenCalledWith(idToken);
      expect(result).toBe(decodedIdToken);
    });

    it('should handle exception', async () => {
      const error = { message: 'FirebaseAuthError' } as FirebaseAuthError;
      verifyIdTokenFn.mockRejectedValueOnce(error);

      const execution = strategy.validate(idToken);

      await expect(execution).rejects.toThrow(UnauthorizedException);
      await expect(execution).rejects.toThrow(error.message);
      expect(verifyIdTokenFn).toHaveBeenCalledWith(idToken);
    });
  });
});

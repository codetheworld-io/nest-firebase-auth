import { AuthController } from './auth.controller';
import { Test } from '@nestjs/testing';
import { UserCredential } from '@firebase/auth';
import * as FirebaseAuth from 'firebase/auth';

jest.mock('firebase/auth');

describe('AuthController', () => {
  const auth = 'auth' as unknown as FirebaseAuth.Auth;
  const email = 'email';
  const password = 'password';
  const idToken = 'idToken';
  let controller: AuthController;
  let getIdTokenFn: jest.Mock;
  let userCredential: UserCredential;

  beforeEach(async () => {
    getIdTokenFn = jest.fn().mockResolvedValueOnce(idToken);
    userCredential = {
      user: {
        getIdToken: getIdTokenFn,
      },
    } as unknown as UserCredential;
    jest.spyOn(FirebaseAuth, 'getAuth').mockReturnValueOnce(auth);

    const module = await Test.createTestingModule({
      providers: [AuthController],
    }).compile();

    controller = module.get(AuthController);
  });

  describe('signIn()', () => {
    it('should return user id token', async () => {
      jest
        .spyOn(FirebaseAuth, 'signInWithEmailAndPassword')
        .mockResolvedValueOnce(userCredential);

      const result = await controller.signIn({ email, password });

      expect(FirebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password,
      );
      expect(result).toEqual({ idToken });
    });
  });

  describe('signUp()', () => {
    it('should return user id token', async () => {
      jest
        .spyOn(FirebaseAuth, 'createUserWithEmailAndPassword')
        .mockResolvedValueOnce(userCredential);

      const result = await controller.signUp({ email, password });

      expect(FirebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password,
      );
      expect(result).toEqual({ idToken });
    });
  });
});

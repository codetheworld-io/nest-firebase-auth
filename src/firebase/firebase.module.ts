import { Module, OnApplicationBootstrap } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';
import * as path from 'path';
import * as FirebaseClient from 'firebase/app';
import { readFile } from 'fs/promises';

@Module({})
export class FirebaseModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    FirebaseAdmin.initializeApp({
      credential: FirebaseAdmin.credential.cert(
        path.join(
          __dirname,
          '..',
          'certificates',
          'firebase-service-account-key.json',
        ),
      ),
    });

    const clientConfigJsonString = await readFile(
      path.join(__dirname, '..', 'certificates', 'firebase-client-config.json'),
      'utf-8',
    );
    FirebaseClient.initializeApp(
      JSON.parse(clientConfigJsonString) as FirebaseClient.FirebaseOptions,
    );
  }
}

import { normalize } from '@angular-devkit/core';
import {
    SchematicTestRunner,
    UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { HostTree } from '@angular-devkit/schematics';

const collectionPath = path.join(__dirname, '../collection.json');

const MAIN_FILE = `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
`;

const APP_MODULE_CONTENT = `
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`;


describe('nest add function', () => {
    let tree: UnitTestTree;
    let runner: SchematicTestRunner;
    beforeEach(() => {
        tree = new UnitTestTree(new HostTree());
        tree.create('/package.json', JSON.stringify({}));
        tree.create('/nest-cli.json', JSON.stringify({
            "language": "ts",
            "collection": "@nestjs/schematics",
            "sourceRoot": "src"
        }));
        tree.create('/src/main.ts', MAIN_FILE);
        tree.create('/src/app.module.ts', APP_MODULE_CONTENT);
        runner = new SchematicTestRunner('schematics', collectionPath);
    })
    it('should add package to module', () => {
        const ngAddTree = runner.runSchematic('nest-add', '', tree);
        const module = ngAddTree.readContent('/src/app.module.ts');
        expect(module).toMatchSnapshot();
    });
})
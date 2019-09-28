import { JsonParseMode, parseJson, Path } from '@angular-devkit/core';
import {
  branchAndMerge,
  chain,
  Rule,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { addImportToModule, insertImport } from '../utils/ast-utils';
import { InsertChange } from '../utils/change';
import { ModuleFinder } from '../utils/module.finder';
import { NestAddOptions } from './schema';

function getWorkspace(tree: Tree): { path: string; workspace: any } {
  const possibleFiles = ['/nest-cli.json'];
  const path = possibleFiles.filter(configPath => tree.exists(configPath))[0];

  const configBuffer = tree.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find nest-cli.json`);
  }
  const content = configBuffer.toString();
  let workspace: any;
  try {
    workspace = parseJson(content, JsonParseMode.Loose);
  } catch (e) {
    throw new SchematicsException(
      `Could not parse nest-cli.json: ` + e.message,
    );
  }
  return {
    path,
    workspace,
  };
}

function addDeclarationToModule(options: NestAddOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }

    const { workspace } = getWorkspace(tree);

    options.module = new ModuleFinder(tree).find({
      name: options.module ? options.module : 'app',
      path: ('./' + workspace.sourceRoot) as Path,
    });

    if (!tree.exists(options.module)) {
      throw new SchematicsException(
        `Could not find root module, please use --module flag to specify the root module path.`,
      );
    }

    const content = tree.read(options.module).toString();
    const modulePath =
      './' + workspace.sourceRoot + '/' + options.module
        ? options.module
        : 'app';

    const source = ts.createSourceFile(
      modulePath,
      content,
      ts.ScriptTarget.Latest,
      true,
    );

    const importChanges = addImportToModule(
      source,
      modulePath,
      'InMemoryDBModule.forRoot()',
      '@nestjs-addons/in-memory-db',
    ).shift();

    const commonImports = [
      insertImport(
        source,
        modulePath,
        'InMemoryDBModule',
        '@nestjs-addons/in-memory-db',
      ),
      importChanges,
    ];
    const changes = [...commonImports];
    const recorder = tree.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    tree.commitUpdate(recorder);

    return tree;
  };
}

export default function(options: NestAddOptions): Rule {
  return branchAndMerge(chain([addDeclarationToModule(options)]));
}

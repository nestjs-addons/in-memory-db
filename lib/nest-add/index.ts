import {
    Rule, SchematicContext,
    SchematicsException, Tree, chain
} from '@angular-devkit/schematics';
import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import {
    addPackageJsonDependency,
    NodeDependency,
    NodeDependencyType
} from 'schematics-utilities';

function addPackageJsonDependencies(options: NgAddOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        const dependencies: NodeDependency[] = [
            { type: NodeDependencyType.Default, version: '~0.0.0', name: '@nestjs-addons/in-memory-db' }
        ];

        const { path: workspacePath } = getWorkspace(host);

        dependencies.forEach(dependency => {
            addPackageJsonDependency(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });

        return host;
    };
}

interface NgAddOptions {
    skipImport?: boolean;
    module: string;
}


function getWorkspace(tree: Tree): { path: string } {

    const possibleFiles = ['/nest-cli.json'];
    const path = possibleFiles.filter(path => tree.exists(path))[0];

    const configBuffer = tree.read(path);
    if (configBuffer === null) {
        throw new SchematicsException(`Could not find nest-cli.json`);
    }
    const content = configBuffer.toString();
    let workspace: experimental.workspace.WorkspaceSchema;
    try {
        workspace = (parseJson(
            content,
            JsonParseMode.Loose
        ) as {}) as experimental.workspace.WorkspaceSchema;
    } catch (e) {
        throw new SchematicsException(`Could not parse nest-cli.json: ` + e.message);
    }
    return {
        path
    };
}

export default function (options: NgAddOptions): Rule {
    return chain(
        [
            addPackageJsonDependencies(options)
        ]
    )
}
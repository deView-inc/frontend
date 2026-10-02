// Scripts/unbarrel.ts
import path from 'node:path';

import { Project } from 'ts-morph';

const BARREL = '~&/shared/ui';
const srcRoot = path.resolve('src');
const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

for (const sf of project.getSourceFiles(['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'])) {
    for (const imp of sf.getImportDeclarations()) {
        if (imp.getModuleSpecifierValue() !== BARREL) {
            continue;
        }

        const groups = new Map<string, string[]>();
        for (const n of imp.getNamedImports()) {
            const decl = n.getNameNode().getSymbol()?.getAliasedSymbol()?.getDeclarations()[0];
            if (!decl) {
                continue;
            }
            const file = decl.getSourceFile().getFilePath();
            const rel = path
                .relative(srcRoot, file)
                .replace(/\.(tsx?|jsx?)$/, '')
                .replace(/\/index$/, '');
            const spec = `~&/${rel}`;
            const text = n.getText();
            groups.set(spec, [...(groups.get(spec) ?? []), text]);
        }

        for (const [spec, names] of groups) {
            sf.addImportDeclaration({
                moduleSpecifier: spec,
                namedImports: names,
                isTypeOnly: imp.isTypeOnly(),
            });
        }
        imp.remove();
    }
    sf.saveSync();
}

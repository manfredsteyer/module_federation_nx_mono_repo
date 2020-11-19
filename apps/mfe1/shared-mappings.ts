import {NormalModuleReplacementPlugin} from 'webpack';
import * as path from 'path';

interface KeyValuePair {
    key: string;
    value: string;
}

export default class SharedMappings {

    private mappings: KeyValuePair[] = [];

    register(tsConfigPath: string, shared: string[] = null): void {

        const tsConfig = require(tsConfigPath);
        const mappings = tsConfig?.compilerOptions?.paths;
        const rootPath = path.normalize(path.dirname(tsConfigPath));

        if (!mappings) {
            console.warn('No path mappings found in registered tsConfig!');
            return;
        }

        for (const key in mappings) {
            if (!shared || shared.length === 0 || shared.includes(key)) {
                this.mappings.push({
                    key,
                    value: path.normalize(path.join(__dirname, rootPath, mappings[key][0]))
                });
            }
        }
    }

    getPlugin(): NormalModuleReplacementPlugin {
        return new NormalModuleReplacementPlugin(/./, (req) => {
            const from = req.context;
            const to = path.normalize(path.join(req.context, req.request));

            const log = from.includes('auth-lib') || to.includes('auth-lib');

            for (const m of this.mappings) {
                const libFolder = path.normalize(path.dirname(m.value));
                if (!from.startsWith(libFolder) && to.startsWith(libFolder)) {
                    req.request = m.key;
                    console.log('remapping', { from, to, libFolder });
                }
            }
        });
    }

    getDescriptors(): object {
        const result = {};

        for (const m of this.mappings) {
            result[m.key] = {
                import: m.value,
                requiredVersion: false
            };
        }

        return result;
    }

    getDescriptor(mappedPath: string, requiredVersion: string = null): any {

        if (!this.mappings[mappedPath]) {
            throw new Error('No mapping found for ' + mappedPath + ' in tsconfig');
        }

        return ({
            [mappedPath]: {
                import: this.mappings[mappedPath],
                requiredVersion: requiredVersion ?? false
            }
        });
    }
}

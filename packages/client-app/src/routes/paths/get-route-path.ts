import { join } from 'path'
import type { RouterRoutePaths } from "./types";

export function getRoutePath(
    config: RouterRoutePaths,
    name: keyof typeof config
): string {
    if (name === 'root') {
        return config.root
    }
    return join(config.root, '/', config[name])
}
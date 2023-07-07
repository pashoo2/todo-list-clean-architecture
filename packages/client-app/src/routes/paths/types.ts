export type RoutePath = string;

export interface RouterRoutePaths {
    [routeName: string]: RoutePath;
    root: RoutePath;
}

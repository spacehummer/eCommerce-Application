import { Router } from "#src/logic/router/route-types";

export default class CategoryRouter implements Router {
    public navigate(urlStr: string): void {
        throw new Error("Method not implemented.");
    }
}
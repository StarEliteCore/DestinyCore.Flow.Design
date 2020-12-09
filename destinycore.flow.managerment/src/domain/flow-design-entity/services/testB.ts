import { injectable } from "@/sharad/destinycoreIoc/destinycoreIocFactory";
import TestC from './testC';
 



@injectable
export default class TestB {
    public constructor(public c: TestC) {
        debugger
    }
}

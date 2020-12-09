import { injectable } from '@/sharad/destinycoreIoc/destinycoreIocFactory';
import TestB from './testB';
import TestC from './testC';

@injectable
export default class TestA {
    public constructor(public b: TestB, public c: TestC) {
        debugger
    }
}
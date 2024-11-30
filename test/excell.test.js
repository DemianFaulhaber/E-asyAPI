import { importExcellCategory } from "../tasks/excellFilesManagment";


test('asd', () => {
    expect(importExcellCategory(1,5)).toBe(3);
})
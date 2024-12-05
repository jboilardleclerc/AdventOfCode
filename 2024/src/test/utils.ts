import { vol } from "memfs";

export const mockInputFile = (input: string) => {
  vol.fromNestedJSON({
    [__dirname]: {
      "input.txt": input,
    },
  });
};

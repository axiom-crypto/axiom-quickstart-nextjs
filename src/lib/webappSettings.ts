import compiledCircuit from "../../axiom/data/compiled.json";
import inputs from "../../axiom/data/inputs.json";
import AverageBalanceAbi from "./abi/AverageBalance.json";

export const WebappSettings = {
  compiledCircuit,
  inputs,
  provider: process.env.NEXT_PUBLIC_PROVIDER_URI_SEPOLIA as string,
  chainId: "11155111",
  callbackTarget: "0x50F2D5c9a4A35cb922a631019287881f56A00ED5",
  callbackAbi: AverageBalanceAbi,
}
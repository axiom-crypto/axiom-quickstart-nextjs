import {
  sum,
  div,
  addToCallback,
  CircuitValue,
  CircuitValue256,
  constant,
  witness,
  getAccount,
  add,
} from "@axiom-crypto/client";

/// For type safety, define the input types to your circuit here.
/// These should be the _variable_ inputs to your circuit. Constants can be hard-coded into the circuit itself.
export interface CircuitInputs {
  blockNumber: CircuitValue;
  address: CircuitValue;
}

export const circuit = async (inputs: CircuitInputs) => {
  const added = add(inputs.blockNumber, 1);

  // We call `addToCallback` on all values that we would like to be passed to our contract after the circuit has
  // been proven in ZK. The values can then be handled by our contract once the prover calls the callback function.
  addToCallback(added);
  addToCallback(inputs.address);
};

import minimist from "minimist";

const optionalArgsObject = {
  alias: {p: "puerto"}, default: {p: "8080"}
};

const args = minimist(process.argv, optionalArgsObject);

console.log("Transformacion ARGV con Minimist");
console.log(args);

const isEven = require("is-even");
const figlet = require("figlet");

const result = isEven(process.argv[2]);

result
  ? figlet(`${process.argv[2]} Is Even`, function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    })
  : figlet(`${process.argv[2]} Is not Even`, function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    });

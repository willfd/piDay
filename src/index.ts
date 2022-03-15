import express, { Application } from "express";
import morgan from "morgan";
import { moveMessagePortToContext } from "worker_threads";
import { MonteCarloService } from "./Services/MonteCarloService";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(morgan("tiny"));
app.use(express.static("Public"));

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

app.get("/pi/number_of_points/:number_of_points/radius/:radius", async (_req, res) => {
    const start_time = Date.now()
    const number_of_points = Number(_req.params.number_of_points)
    const radius = Number(_req.params.radius)
    const monteCarloService = new MonteCarloService()
    let pi = monteCarloService.get_pi_for_given_number_of_points(number_of_points, radius)
    let pi_accuracy = monteCarloService.get_pi_accuracy(pi)
    const end_time = Date.now()
    const time_elapsed = end_time - start_time
    res.send({
      pi: pi,
      "percentage accuracy (%)": pi_accuracy,
      "time taken (ms)": time_elapsed
    });
  });

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
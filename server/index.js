const express = require('express');
const axios = require('axios').default;

const PORT = process.env.PORT || 3001;
const app = express();

let url = 'https://api.runpod.ai/v2/stable-diffusion-v1/runsync';
let apiToken = 'R88UVOE86CR90EI8ZBINT3ND8S33AIYEQAX144X2';
let headers = {
  Authorization: `Bearer ${apiToken}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

app.post('/search/:str', async (req, res) => {
  console.log(req.params.str);
  let data = {
    input: {
      prompt: req.params.str,
      guidance_scale: 7.5,
      num_inference_steps: 50,
      num_outputs: 8,
      prompt_strength: 1,
      scheduler: 'KLMS',
    },
  };
  try {
    let job = await axios.post(url, data, { headers });
    console.log(job.data);
    res.send(job.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});

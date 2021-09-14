const Image = require("../models/Image");

const router = require("express").Router();

router.get("/", async (req, res) => {
  console.log("Request GET: /api/unsplash/");
  try {
    const response = await Image.find({});
    //   console.log(response);
    res.send(response);
  } catch (err) {
    res.send({ error: true });
  }
});

router.post("/add", async (req, res) => {
  console.log("Request POST: /api/unsplash/add");
  const { label, url } = req.body;

  try {
    let imageObject = new Image({
      label: label,
      url: url,
    });
    const response = await imageObject.save();
    console.log(response);
    res.send(response);
  } catch (err) {
    res.send({ error: true });
  }
});
router.post("/search", async (req, res) => {
  console.log("Request POST: /api/unsplash/search");
  const { label } = req.body;
  //   console.log(label);
  try {
    const response = await Image.find({
      label: { $regex: label, $options: "i" },
    });
    //   console.log(response);
    res.send(response);
  } catch (err) {
    res.send({ error: true });
  }
});
router.post("/delete/", async (req, res) => {
  console.log("Request DELETE: /api/unsplash/delete");


  const { _id, password } = req.body;
  console.log(_id, password);
  try {
    const response = await Image.findOneAndRemove({ _id });
    console.log(response);
    res.send(response);
  } catch (err) {
    res.send({ error: true });
  }
});

router.delete("/wipe", async (req, res) => {
  console.log("[WARNING] Deleting all records!");
  try {
    await Image.deleteMany();
    res.send("collection wiped successfully");
  } catch {
    res.send("failed to wipe collection");
  }
});

module.exports = router;

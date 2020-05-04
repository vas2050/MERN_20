const router = require("express-promise-router")();
const Country = require("../model/country");

const { logger } = require("../logger");

router.get("/show/:code?", async (req, res) => {
  const { code } = req.params;
  const filter = code ? { code } : {};
  Country.find(filter, { _id: 0 }, (err, data) => {
    if (err) {
      logger.error(err);
    }
    else {
      res.json(data);
    }
  }).sort({code: 1});
});

router.post("/add", async (req, res) => {
  const { country } = req.body;

  let data = [];
  if (Array.isArray(country)) {
    data = [...country];
  }
  else {
    data.push(country);
  }

  let error = [], success = [];
  data.forEach((c, index, array) => {
    let obj = new Country(c);
    obj.save((err, rec) => {
      if (err) {
        logger.error(`failed to add country:  ${c.code}`);
        logger.error(err);
        error.push(c.code);
      }
      else {
        logger.info(`added country: ${c.code}`);
        success.push(c.code);
      }
      if (index == array.length-1) res.json({error, success});
    });
  });
});

router.post("/add/:code/:name", async (req, res) => {
  let country = new Country(req.params);

  country.save()
  .then(data => {
    res.status(200).json({ success: 'added' });
  })
  .catch(err => {
    logger.error(err);
    res.status(400).json({ error: 'failed' });
  });
});

module.exports = router;

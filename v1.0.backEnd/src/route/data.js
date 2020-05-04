const router = require("express-promise-router")();

const Data = require("../model/data");
const Country = require("../model/country");

const { logger } = require("../logger");

router.get("/show", async (req, res) => {
  const filter = {};
  Data.find(filter, { _id: 0 }, (err, data) => {
    if (err) {
      logger.error(err);
    }
    else {
      res.json(data);
    }
  }).sort({code: 1, date: 1});
});

router.get("/show/date/:date/:code?", async (req, res) => {
  const { code, date } = req.params;
  const filter = code ? { code, date } : { date };
  Data.find(filter, { _id: 0 }, (err, data) => {
    if (err) {
      logger.error(err);
    }
    else {
      res.json(data);
    }
  }).sort({code: 1, date: 1});
});

router.get("/show/country/:code/:date?", async (req, res) => {
  const { code, date } = req.params;
  const filter = date ? { code, date } : { code };
  Data.find(filter, { _id: 0 }, (err, data) => {
    if (err) {
      logger.error(err);
    }
    else {
      res.json(data);
    }
  }).sort({code: 1, date: 1});
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

  const findAndUpdate = async (filter, update) => {
    return Data.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true
    })
  };

  const findOne = async code => {
    return Country.findOne({code});
  }

  for (let i in data) {
    const c = data[i];
    let date = c.date ? new Date(c.date).toLocaleDateString() : new Date().toLocaleDateString();

    let response = await findOne(c.code);
    if (response === null) {
      logger.error(`invalid country: ${c.code}`);
      error.push(c.code);
    }
    else {
      const filter = { code: c.code, date };
      const update = {};
      if ('cases' in c) update.cases = c.cases;
      if ('deaths' in c) update.deaths = c.deaths;
      if ('okays' in c) update.okays = c.okays;

      response = await findAndUpdate(filter, update);
      if (response) {
        logger.info(`data added for: ${c.code}`);
        success.push(c.code);
      }
      else {
        logger.error(`adding data failed for: ${c.code}`);
        error.push(c.code);
      }
    }
  }

  res.json({error, success});
});

router.post("/add/country/:code/cases/:cases/:date?", async (req, res) => {
  let { code, cases, date } = req.params;

  date = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();

  Country.findOne({code: code})
  .then(data => {
    if (data == null) {
      logger.error(`invalid country: ${code}`);
      res.status(400).send({ error: "invalid country" });
    }
    else {
      const filter = { code, date };
      const update = { cases };
      Data.findOneAndUpdate(filter, update, {
        upsert: true
      })
      .then(data => {
        res.status(200).json({ success: "added" });
      })
      .catch(err => {
        logger.error(err);
        res.status(400).send({ error: "failed" });
      });
    }
  })
  .catch(err => {
    logger.error(err);
  });
});

router.post("/add/country/:code/deaths/:deaths/:date?", async (req, res) => {
  let { code, deaths, date } = req.params;

  date = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();

  Country.findOne({code: code})
  .then(data => {
    if (data == null) {
      logger.error(`invalid country: ${code}`);
      res.status(400).send({ error: "invalid country" });
    }
    else {
      const filter = { code, date };
      const update = { deaths };
      Data.findOneAndUpdate(filter, update, {
        upsert: true
      })
      .then(data => {
        res.status(200).json({ success: "added" });
      })
      .catch(err => {
        logger.error(err);
        res.status(400).send({ error: "failed" });
      });
    }
  })
  .catch(err => {
    logger.error(err);
  });
});

router.post("/add/country/:code/okays/:okays/:date?", async (req, res) => {
  let { code, okays, date } = req.params;

  date = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();

  Country.findOne({code: code})
  .then(data => {
    if (data == null) {
      logger.error(`invalid country: ${code}`);
      res.status(400).send({ error: "invalid country" });
    }
    else {
      const filter = { code, date };
      const update = { okays };
      Data.findOneAndUpdate(filter, update, {
        upsert: true
      })
      .then(data => {
        res.status(200).json({ success: "added" });
      })
      .catch(err => {
        logger.error(err);
        res.status(400).send({ error: "failed" });
      });
    }
  })
  .catch(err => {
    logger.error(err);
  });
});

module.exports = router;

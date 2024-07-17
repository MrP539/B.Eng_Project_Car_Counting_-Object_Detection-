const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Car = require('../models/car');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = rateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});


// READ (ONE)
router.get('/:id', (req, res) => {
  Car.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such car.` });
    });
});




// READ (ALL)
router.get('/', (req, res) => {
  const { cartype, gatein, gateout, timein, timeout,licenseplatenumber,page = 1, pageSize, startTime, endTime , In,Out } = req.query;
  let query = {}; // เริ่มต้นเป็น query ว่าง

  // ตรวจสอบแต่ละพารามิเตอร์และสร้าง query ตามเงื่อนไขที่กำหนด
  if (cartype) {
    query.cartype = cartype;
  }
  if (gatein) {
    query.gatein = gatein;
  }
  if (gateout) {
    query.gateout = gateout;
  }


  if (timein&&startTime&&endTime) {
    query.timein = {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    };
  }

  if (timeout&&startTime&&endTime) {
    query.timeout = {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    };
  }
  
  if (licenseplatenumber) {
    query.licenseplatenumber = { $regex : licenseplatenumber };
  }

  // เพิ่มการค้นหาแบบทีละ 2 ข้อมูล
  if (cartype && gatein) {
    query = { ...query, cartype: cartype, gatein: gatein };
  } else if (cartype && gateout) {
    query = { ...query, cartype: cartype, gateout: gateout };
  } else if (cartype && timein) {
    query = { 
      ...query,
      cartype: cartype, 
      timein: {
        $gte: new Date(startTime),
        $lte: new Date(endTime)
      } 
};

  } else if (cartype && timeout) {
    query = { ...query, cartype: cartype, timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }   };
  } else if (gatein && timein) {
    query = { ...query, gatein: gatein,  timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (gatein && timeout) {
    query = { ...query, gatein: gatein, 
      timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    } 
  };
  } else if (gateout && timein) {
    query = { ...query, gateout: gateout,  timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (gateout && timeout) {
    query = { ...query, gateout: gateout,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (timein && licenseplatenumber) {
    query = { ...query, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }, licenseplatenumber: { $regex : licenseplatenumber } };
  } else if (licenseplatenumber && timeout) {
    query = { ...query, licenseplatenumber: { $regex : licenseplatenumber },    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (licenseplatenumber && gatein) {
    query = { ...query, licenseplatenumber: { $regex : licenseplatenumber }, gatein: gatein };
  } else if (licenseplatenumber && gateout) {
    query = { ...query, licenseplatenumber: { $regex : licenseplatenumber }, gatein: gateout };
  }

  else if (cartype && gatein && gateout) {
    query = { cartype: cartype, gatein: gatein, gateout: gateout };
  } else if (cartype && gatein && timein) {
    query = { cartype: cartype, gatein: gatein, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (cartype && gatein && timeout) {
    query = { cartype: cartype, gatein: gatein,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (cartype && gateout && timein) {
    query = { cartype: cartype, gateout: gateout, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (cartype && gateout && timeout) {
    query = { cartype: cartype, gateout: gateout,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (licenseplatenumber && gateout && timeout) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, gateout: gateout,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (licenseplatenumber && gatein && timeout) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, gatein: gatein,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (licenseplatenumber && gateout && timein) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, gateout: gateout, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    } };
  } else if (licenseplatenumber && gatein && timein) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, gatein: gatein, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    } };
  } else if (licenseplatenumber && cartype && timeout) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, cartype: cartype,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (licenseplatenumber && cartype && timeout) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, cartype: cartype,    timeout : {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }  };
  } else if (licenseplatenumber && cartype && timein) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, cartype: cartype, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    } };
  } else if (licenseplatenumber && cartype && timein) {
    query = { licenseplatenumber: { $regex : licenseplatenumber }, cartype: cartype, timein: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    } };
  }
  const skip = (page - 1) * pageSize;

  Car.find(query) // แก้ไข YourModel เป็นชื่อโมเดลของคุณ
  .skip(skip)
    .limit(Number(pageSize))
    .then((result) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  // Validate the age
  
  let newCar = new Car({
    cartype: req.body.cartype,
    gatein: req.body.gatein,
    gateout: req.body.gateout,
    timein: req.body.timein,
    timeout: req.body.timeout,
    licenseplatenumber: req.body.licenseplatenumber,
    // base64: req.body.base64,
  });

  newCar.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          cartype: result.cartype,
          licenseplatenumberValidator: result.licenseplatenumberValidator,
          gatein: result.gatein,
          gateout: result.gateout,
          timein: result.timein,
          timeout: result.timeout,
          // base64: result.base64,
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.description) {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put('/:id', (req, res) => {


  let updatedCar = {
    cartype: req.body.cartype,
    licenseplatenumber: req.body.licenseplatenumber,
    gatein: req.body.gatein,
    gateout: req.body.gateout,
    timein: req.body.timein,
    timeout: req.body.timeout
  };

  Car.findOneAndUpdate({ _id: req.params.id }, updatedCar, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Car.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              cartype: newResult.cartype,
              licenseplatenuber: newResult.licenseplatenumber,
              gatein: newResult.gatein,
              gateout: newResult.gateout,
              timein: newResult.timein,
              timeout: newResult.timeout
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.description) {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {

  Car.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          cartype: result.cartype,
          licenseplatenumberValidator: result.licenseplatenumberValidator,
          gatein: result.gatein,
          gateout: result.gateout,
          timein: result.timein,
          timeout: result.timeout
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
}
sanitizeAge = (age) => {
  // Return empty if age is non-numeric
  if (isNaN(age) && age != '') return '';
  return (age === '') ? age : parseInt(age);
}
sanitizeGender = (gender) => {
  // Return empty if it's neither of the two
  return (gender === 'm' || gender === 'f') ? gender : '';
}

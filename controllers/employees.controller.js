const Employee = require('../models/employees.modele')

exports.getAll = async (req, res) => {
    try {
      res.json (await Employee.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err })
    }
}

exports.getRandom = async (req, res) => {

    try {
      const count = await Employee.countDocuments();
      const random = Math.floor(Math.random() * count)
      const emp = await Employee.findOne().skip(random)
      if(!emp) res.status(404).json( { message: 'Not found' })
      else res.json(emp)
    }
    catch(err) {
      res.status(500).json( { message: err })
    }
  
}

exports.getById = async (req, res) => {
    try {
      const emp = await Employee.findById(req.params.id).populate('department')
      if (!emp) res.status(404).json( { message: 'Not found'})
      else res.json(emp)
    }
    catch(err) {
      res.status(500).json({ message: err })
    }
}

exports.postById = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const newEmp = new Employee( { firstName: firstName, lastName: lastName});
      await newEmp.save();
      res.json( { message: 'OK'})
    }
    catch(err) {
      res.status(500).json({ message: err})
    }
  }

exports.putById = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const employee = await Employee.findById(req.params.id);
      if(employee) {
        await Employee.updateOne({ _id: req.params.id, }, {$set: {firstName: firstName, lastName:lastName }})
        res.json( { message: 'OK' })
      }
      else res.status(404).json( { message: 'Not found' })
    }
    catch(err) {
      res.status(500).json( { message: err })
    }
}

exports.deleteById = async (req, res) => {
    try {
      const emplo = await Employee.findById(req.params.id)
      if ( emplo) {
        await Employee.deleteOne({ _id: req.params.id})
        res.json( { message: emplo })
      }
      else res.status(404).json( { message: 'Not found'})
  
    }
    catch(err) {
      res.status(500).json( { message: err })
    }
  
  }

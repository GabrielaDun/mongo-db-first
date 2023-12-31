const Department = require('../models/department.modele');

exports.getAll = async (req, res) => {
    try {
      res.json(await Department.find()); 
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

exports.getRandom = async (req, res) => {
    try {
      const count = await Department.countDocuments();
      const random = Math.floor(Math.random() * count);
      const dep = await Department.findOne().skip(random);
      if(!dep) res.status(404).json({ message: 'Not found' })
      else res.json(dep)
    }
    catch(err) {
      res.status(500).json({ message: err })
    }
}

exports.getById = async (req, res) => {
    try {
      const dep = await Department.findById(req.params.id);
      if (!dep) res.status(404).json({ message: 'Not found' })
      else res.json(dep)
    }
    catch(err) {
      res.status(500).json({ message: err })
    }
}

exports.postById = async (req, res) => {

    try {
      const { name } = req.body;
   
      const newDepartment = new Department({ name: name });
      await newDepartment.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
}

exports.putById = async (req, res) => {
    const { name } = req.body;
  
    try {
      const dep = await Department.findById(req.params.id)
      if (dep) {
        await Department.updateOne({ _id: req.params.id }, {$set: { name: name }});
        const newDep = await Department.findById(req.params.id);
        res.json( { message: newDep })
      } 
      else res.status(404).json({ message: 'Not found...' })
    }
    catch(err) {
      res.status(500).json( { massage: err})
    }
}

exports.deleteById = async (req, res) => {

    try {
      const dep = await Department.findById(req.params.id)
      if (dep) {
        await Department.deleteOne( { id: req.params.id })
        res.json( { message: dep})
      }
      else res.status(404).json( { message: 'Not found...'})
      
    }
    catch(err) {
      res.status(500).json( { message: err })
    }
  
}
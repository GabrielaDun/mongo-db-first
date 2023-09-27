const Department = require('../department.modele.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    before(async () => {
      console.log('Connecting to database...');
        try {
            await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
          } catch(err) {
            console.error(err);
          }
    })
    describe('Reading data', () => {

      before(async () => {
        const testDepOne = new Department({ name: 'Department #1' });
        await testDepOne.save();
    
        const testDepTwo = new Department({ name: 'Department #2' });
        await testDepTwo.save();
      });
    
      it('should return all the data with "find" method', async () => {
        const departments = await Department.find();
        const expectedLength = 3;
        expect(departments.length).to.be.equal(expectedLength);
      });
    
      it('should return a proper document by "name" with "findOne" method', async () => {
        const department = await Department.findOne({name: 'Department #1'});
        const expectName = 'Department #1'
        expect(department.name).to.be.equal(expectName)
      })
    
      after(async () => {
        console.log('Disconnecting from database...');
        await Department.deleteMany();
      })
    });
    describe('Creating data', () => {
    
      it('should insert new document with "insertOne" method', async () => {
        const department = new Department({ name: 'Department #1' })
        await department.save();
        expect(department.isNew).to.be.false;
    
      });
      after(async () => {
        await Department.deleteMany();
      });
    
    });
    describe('Updating data', () => {
    
      beforeEach(async () => {
        const testDepOne = new Department({ name: 'Department #1' });
        await testDepOne.save();
      
        const testDepTwo = new Department({ name: 'Department #2' });
        await testDepTwo.save();
      });
    
      it('should properly update one document with "updateOne" method', async () => {
        await Department.updateOne({ name: 'Department #1' }, { $set: { name: '=Department #1=' }});
        const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
        expect(updatedDepartment).to.not.be.null;
      });
      
    
      it('should properly update one document with "save" method', async () => {
        const department = await Department.findOne({ name: 'Department #1' });
        department.name = '=Department #1=';
        await department.save();
      
        const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
        expect(updatedDepartment).to.not.be.null;
      });
    
      it('should properly update multiple documents with "updateMany" method', async () => {
        await Department.updateMany({}, { $set: {name: 'DepX'}});
        const departments = await Department.find();
        expect(departments[0].name).to.be.equal('DepX')
        expect(departments[1].name).to.be.equal('DepX')
    
      });
      afterEach(async () => {
        await Department.deleteMany();
      });
    
    });
    
    describe('Removing data', () => {
      beforeEach(async () => {
        const testDepOne = new Department({ name: 'Department #1' });
        await testDepOne.save();
      
        const testDepTwo = new Department({ name: 'Department #2' });
        await testDepTwo.save();
      });
      afterEach(async () => {
        await Department.deleteMany();
      });
    
      it('should properly remove one document with "deleteOne" method', async () => {
        await Department.deleteOne({ name: 'Department #1' });
        const removed = await Department.findOne({ name: 'Department #1'})
        expect(removed).to.be.null;
      });
    
      it('should properly remove multiple documents with "deleteMany" method', async () => {
        await Department.deleteMany()
        const departments = await Department.find()
        expect(departments.length).to.be.equal(0)
    
      });
      
    
    });
    
})


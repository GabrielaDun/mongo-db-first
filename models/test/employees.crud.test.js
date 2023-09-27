const Employee = require('../employees.modele.js')
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', async () => {

    before(async () => {
      console.log('Connecting to database...');
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
          } catch(err) {
            console.error(err);
          }
    })
    describe('Reading data', () => {

        before(async () => {
          const testEmpOne = new Employee({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing' });
          await testEmpOne.save();
      
          const testEmpTwo = new Employee({ firstName: 'John', lastName: 'Smith', department: 'Online Marketing' });
          await testEmpTwo.save();
        });
      
        it('should return all the data with "find" method', async () => {
          const employees = await Employee.find();
          const expectedLength = 2;
          expect(employees.length).to.be.equal(expectedLength);
        });
      
        it('should return a proper document by "firstName" with "findOne" method', async () => {
          const employee = await Employee.findOne({firstName: 'Amy'});
          const expectName = 'Amy'
          expect(employee.firstName).to.be.equal(expectName)
        })
        it('should return a proper document by "lastName" with "findOne" method', async () => {
            const employee = await Employee.findOne({lastName: 'Smith'});
            const expectName = 'Smith'
            expect(employee.lastName).to.be.equal(expectName)
        })
        it('should return a proper document by "department" with "findOne" method', async () => {
            const employee = await Employee.findOne({department: 'Online Marketing'});

            expect(employee.department).to.be.equal('Online Marketing');
        })
          
      
        after(async () => {
          console.log('Disconnecting from database...');
          await Employee.deleteMany();
        })
      });
      describe('Creating data', () => {
    
        it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing'})
          await employee.save();
          expect(employee.isNew).to.be.false;
      
        });
        after(async () => {
          await Employee.deleteMany();
        });
      
    });
    describe('Updating data', () => {
    
        beforeEach(async () => {
          const testDepOne = new Employee({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing' });
          await testDepOne.save();
        
          const testDepTwo = new Employee({ firstName: 'John', lastName: 'Smith', department: 'Online Marketing' });
          await testDepTwo.save();
        });
      
        it('should properly update one document with "updateOne" method', async () => {
          await Employee.updateOne({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing'  }, { $set: { firstName: 'Amy2', lastName: 'Cooper2', department: 'Online Marketing2'  }});
          const updatedEmployee = await Employee.findOne({ firstName: 'Amy2', lastName: 'Cooper2', department: 'Online Marketing2' });
          expect(updatedEmployee).to.not.be.null;
        });
        
      
        it('should properly update one document with "save" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing'});
          employee.firstName = 'Amy3';
          await employee.save();
        
          const updatedEmployee = await Employee.findOne({firstName: 'Amy3', lastName: 'Cooper', department: 'Online Marketing'});
          expect(updatedEmployee).to.not.be.null;
        });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
          await Employee.updateMany({}, { $set: {firstName: 'Kate'}});
          const employees = await Employee.find();
          expect(employees[0].firstName).to.be.equal('Kate')
          expect(employees[1].firstName).to.be.equal('Kate')
      
        });
        afterEach(async () => {
          await Employee.deleteMany();
        });
      
      });

      describe('Removing data', () => {
        beforeEach(async () => {
          const testDepOne = new Employee({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing' });
          await testDepOne.save();
        
          const testDepTwo = new Employee({ firstName: 'Tom', lastName: 'Cooperos', department: 'Online M' });
          await testDepTwo.save();
        });
      
        it('should properly remove one document with "deleteOne" method', async () => {
          await Employee.deleteOne({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing' });
          const removed = await Employee.findOne({ firstName: 'Amy', lastName: 'Cooper', department: 'Online Marketing'})
          expect(removed).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
          await Employee.deleteMany()
          const employees = await Employee.find()
          expect(employees.length).to.be.equal(0)
      
        });
        afterEach(async () => {
            await Employee.deleteMany();
          });
        
      
      });

})
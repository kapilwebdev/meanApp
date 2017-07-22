const mongoose = require('mongoose');

module.exports.connect = function() {
    mongoose.connect('mongodb://localhost:27017/crudapp', {useMongoClient: true} );

    mongoose.connection.on('connected', () => {
        console.log('Connected to database : '+mongoose.connection.db.s.databaseName);
    });

    mongoose.connection.on('error', ()=>{
        console.log('Error while connected to Database');
    });
}


module.exports.secret = function(){
    let secret = 'anything';
    return (secret);
}
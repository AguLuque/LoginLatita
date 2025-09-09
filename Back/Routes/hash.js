// hash-password.js
const bcrypt = require('bcryptjs');

// 👇 Cambia 'admin' por la contraseña que quieras usar
const passwordToHash = 'admin'; 

const saltRounds = 10;

bcrypt.hash(passwordToHash, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`$2b$10$8/qAwpD8.lB4TaOMYqpHr.laGIkAZCc/iZAbS/wVh1VBWMdTB8vS2'${passwordToHash}'123456`);
    console.log(hash);
});
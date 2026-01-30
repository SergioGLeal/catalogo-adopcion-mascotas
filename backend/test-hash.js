const bcrypt = require('bcryptjs');
bcrypt.hash('user123', 10).then(hash => {
    console.log("TU NUEVO HASH ES:");
    console.log(hash);
});
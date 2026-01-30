const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(hash => {
    console.log("TU NUEVO HASH ES:");
    console.log(hash);
});
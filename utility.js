const readline = require('readline-sync')

const getName = () => {

    const option = readline.question("Choose (Default : Bitcoin) \n 1. Bitcoin \n 2. Ether \n");
    if (option == 2)
        return 'Ether';
    return 'Bitcoin';
}

module.exports = {
    getName : getName
}

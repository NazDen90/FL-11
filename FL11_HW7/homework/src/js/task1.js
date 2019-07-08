let userEmail = 'user@gmail.com';
let adminEmail = 'admin@gmail.com';
let userPass = 'UserPass';
let adminPass = 'AdminPass';
const SIX = 6;
const FIVE = 5;
let email, password;
email = prompt('Enter your email:');
if (!!email === false) {
    alert('Canceled.');
} else if (email.length < SIX) {
    alert('I don\'t know any emails having name length less than 6 symbols.');
} else if (email.match(/(user|admin)@gmail\.com/)) {
    password = prompt('Enter your password:');
    let isUser = email === userEmail && password === userPass;
    let isAdmin = email === adminEmail && password === adminPass;
    if (!!password === false) {
        alert('Canceled.');
    } else if (isUser || isAdmin) {
        if (confirm('Do you want to change your password?')) {
            let passwordOld = prompt('Enter your old password:');
            if (passwordOld === password) {
                let passwordNew = prompt('Enter your new password:');
                if (passwordNew === null || passwordNew.length < FIVE) {
                    alert('It’s too short password. Sorry.');
                } else {
                    let passwordNew2 = prompt('Enter your new password again:');
                    if (passwordNew === passwordNew2) {
                        alert('You have successfully changed your password.')
                    } else {
                        alert('You wrote the wrong password.')
                    }
                }
            } else {
                alert('Wrong password.');
            }
        } else {
            alert('You have failed the change.');
        }
    } else {
        alert('Wrong password.');
    }
} else {
    alert('I don’t know you.');
}

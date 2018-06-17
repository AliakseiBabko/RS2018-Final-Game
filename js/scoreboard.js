const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const table = document.getElementById('tableBody');
const tableWrapper = document.getElementById('tableWrapper');

// Load
let users = JSON.parse(localStorage.getItem("users") || "[]");

// Modify
document.getElementById('add').onclick = function(){
    let user = {
        difficulty: 'easy',
  rank: 0,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        seconds: Math.floor(Math.random() * 1000)
        };
        if (!user.firstName) {	
            user.firstName = 'anonymus';
        }
        users.push(user);			
    //Sort users by time
    const orderedArray = _.sortBy(users, o => o.seconds);
// Assign rank to players according to gaming time
_.times(orderedArray.length, (i) => { orderedArray[i].rank = i+1; });
    //Save changes
    localStorage.setItem("users", JSON.stringify(orderedArray));
    
    table.innerHTML = '';
    drawTable(orderedArray);
    document.getElementById('info').textContent = "# of players: " + users.length;
}
    
// Clear
document.getElementById('clear').onclick = function(){
localStorage.clear();
users.length = 0;
document.getElementById('info').textContent = "# of players: " + users.length;
table.innerHTML = '';
}

// Draw table
function drawTable(users) {
let newCell, tr, th, tb, col = [];
let usersLength = users.length;
if (users.length > 10) { usersLength = 10; }
col = Object.keys(users[0]);
col.shift();
th = table.createTHead();
tr = th.insertRow();
for (let i=0; i<col.length; i++) {
    newCell = tr.insertCell();
    newCell.textContent = col[i];
}
tb = table.createTBody();
for (let i=0; i<usersLength; i++) {
    tr = tb.insertRow();
    for (let j=0; j<col.length; j++) {
    newCell = tr.insertCell();
        if([col[j]] in users[i]){
            newCell.textContent = users[i][col[j]];
        } else {
            newCell.textContent = '';
        }
    }
}
}

drawTable(users);
document.getElementById('info').textContent = "# of players: " + users.length;

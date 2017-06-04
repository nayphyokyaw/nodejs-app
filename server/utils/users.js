[{
	id:'/#12poiajdspfoif',
	name: 'Andrew',
	room: 'The office Fans'
}]
//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users{
	constructor(){
		this.users = [];
	}
	addUser (id, name, room) {
	var user = {id, name, room};
	this.users.push(user);
	return user;
	}
	removeUser(id){
		var user = this.getUser(id);

		if (user) {
		this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
		//return user that was removed
	}

	getUser(id){
		return this.users.filter((user) => user.id === id)[0] // return true
	}
	getUserList(room){
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);

		return namesArray;
	}
}
module.exports = {Users};

// class Person{
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription(){
// 		return`${this.name} is ${this.age} year(s) old`;
// 	}
// }
// var me = new Person('andrew', 32);
// var decreption = me.getUserDescription();
// console.log(decreption);

// console.log('this.name', me.name);
// console.log('this.age', me.age);
///////////////////////////////////////////////////////////////////
//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)


// var user = [];
// var addUser = (id, name, room) => {
// 	user.push({})
// }
// module.export = {addUser}

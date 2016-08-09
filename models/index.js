var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    // logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
    	type: Sequelize.DATE,
    	defaultValue: Sequelize.NOW
    }
}, {
	hooks: {
	afterValidate: function (row) {
		console.log('here');
	  if (row.title) {
	    // Removes all non-alphanumeric characters from title
	    // And make whitespace underscore
	    row.title = row.title.replace(/\s+/g, '_').replace(/\W/g, '');
	  } else {
	    // Generates random 5 letter string
	    row.title = Math.random().toString(36).substring(2, 7);
	  }
},
	getterMethods : {
		urlTitle: {
			function(){
				return this.getDataValue('title');
			}
		}
	}
}
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};
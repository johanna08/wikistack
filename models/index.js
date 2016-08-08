var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    // urlTitle: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     get: function(){
    //     	return '/wiki/' + this.getDataValue('title').split(" ").join("_");
    //     }
    // }, 
    	
    	// setterMethods : {
    	// 	urlTitle : function(title) {
    	// 		var urlName = this.setDataValue('title', title.split(" ").join("_"));
    	// 	}
    	// },
    
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
getterMethods : {
	urlTitle : function() { 
		return this.getDataValue('title');
		
	}
	//2nd getter fn would go here
	// secondgetter : function(){} 
	// } //setter methods would go here
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
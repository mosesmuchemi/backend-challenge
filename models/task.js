/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('task', {
		task_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		customer_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		personnel_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		task_status_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		created: {
			type: DataTypes.DATE,
			allowNull: false
		},
		modified_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		in_progress: {
			type: DataTypes.DATE,
			allowNull: true
		},
		completed: {
			type: DataTypes.DATE,
			allowNull: true
		},
		deferred: {
			type: DataTypes.DATE,
			allowNull: true
		},
		customer_first_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		customer_last_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		customer_city: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		customer_username: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		inserted: {
			type: DataTypes.DATE,
			allowNull: true
		},
		personnel_first_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		personnel_other_name: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		personnel_phone: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		task_status_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		customer_location: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		customer_gender: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		customer_age: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		customer_access_code: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		customer_splash_page: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		customer_mpesa: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		customer_autoplay: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		customer_comments: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		customer_updated: {
			type: DataTypes.DATE,
			allowNull: true
		},
		customer_updated_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		agentId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		customerId: {
			type: DataTypes.BIGINT,
			allowNull: true
		}
	}, {
		tableName: 'task'
	});
};

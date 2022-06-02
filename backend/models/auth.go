package models

type Auth struct {
	Id       int    `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"id"`
	Account  string `gorm:"column:account;NOT NULL" json:"user_name"`
	Password string `gorm:"column:password;NOT NULL" json:"user_pwd"`
	Email    string `gorm:"column:email;NOT NULL" json:"email"`
	Photo    string `gorm:"column:photo;NOT NULL" json:"photo"`
}

// 查询账号密码
func GetAuth(user_name, user_pwd string, auth Auth) bool {
	result := db.First(&auth, "account = ? AND  password = ?", user_name, user_pwd)
	return result.RowsAffected != 0
}

// TODO: 查询信息接口

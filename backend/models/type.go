package models

type Auth struct {
	Id       int    `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"id"`
	Account  string `gorm:"column:account;NOT NULL" json:"user_name"`
	Password string `gorm:"column:password;NOT NULL" json:"user_pwd"`
	Email    string `gorm:"column:email;NOT NULL" json:"email"`
	Photo    string `gorm:"column:photo;NOT NULL" json:"photo"`
}

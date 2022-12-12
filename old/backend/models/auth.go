package models

var auth Auth

// 查询账号密码
// ! 查询单条数据
func GetAuth(user_name, user_pwd string) bool {
	// SELECT * FROM `blog_auth`  WHERE (account = 'reoreo' AND  password = '1540689086Zyt@') LIMIT 1
	result := db.Where("account = ? AND  password = ?", user_name, user_pwd).Take(&auth)
	return result.RowsAffected != 0
}

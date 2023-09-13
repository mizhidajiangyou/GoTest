package conf

import (
	"fmt"
	"github.com/mizhidajiangyou/go-linux/db"
	"github.com/mizhidajiangyou/go-linux/log"
	"time"
)

type Task struct {
	Id           int64     `xorm:"pk autoincr"`
	TaskName     string    `xorm:"varchar(255)"`
	Description  string    `xorm:"text"`
	StartTime    time.Time `xorm:"datetime"`
	EndTime      time.Time `xorm:"datetime"`
	TotalCases   int       `xorm:"int"`
	SuccessCases int       `xorm:"int"`
	FailureCases int       `xorm:"int"`
}

type CaseData struct {
	Id          int64     `xorm:"pk autoincr"`
	TaskId      int64     `xorm:"index"`
	Name        string    `xorm:"varchar(255)"`
	Description string    `xorm:"text"`
	StartTime   time.Time `xorm:"datetime"`
	EndTime     time.Time `xorm:"datetime"`
	Result      string    `xorm:"varchar(255)"`
	ReturnValue string    `xorm:"varchar(255)"`
}

func init() {
	c := "global.yaml"
	//ReadIni(c)
	//log.SetLogLevel(Conf.Log.Level)
	log.Debugf(fmt.Sprintf("加载配置文件%s", c))
	db.ReadDBConf(c)
	e, err := db.StartDb()
	if err != nil {
		return
	}
	// 初始化表
	err = e.Sync2(new(Task), new(CaseData))
	if err != nil {
		log.Errorf("初始化表失败了。")
		return
	}
}

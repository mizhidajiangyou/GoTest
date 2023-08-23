package conf

import (
	"fmt"
	"github.com/mizhidajiangyou/go-linux/log"
	"gopkg.in/ini.v1"
)

type Config struct {
	Log logger `ini:"log"`
}

type logger struct {
	Level        string `ini:"level,omitempty"`
	ConsolePrint string `ini:"console_print,omitempty"`
	File         string `ini:"file,omitempty"`
}

var Conf Config

func ReadIni(confFilePath string) {
	//加载配置文件
	config, err := ini.Load(confFilePath)
	if err != nil {
		log.Errorf(fmt.Sprintf("加载配置文件失败 %v", err))
		return
	}
	//读取并映射到结构体中

	err = config.MapTo(&Conf)
	if err != nil {
		log.Errorf(fmt.Sprintf("加载配置文件失败 %v", err))
		return
	}

}

func init() {
	c := "global.cfg"
	ReadIni(c)
	log.SetLogLevel(Conf.Log.Level)
	log.Debugf(fmt.Sprintf("加载配置文件%s", c))
}

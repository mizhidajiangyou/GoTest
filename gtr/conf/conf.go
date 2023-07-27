package conf

import (
	"fmt"
	"gopkg.in/ini.v1"
)

type Config struct {
	Log log `ini:"log"`
}

type log struct {
	Level        string `ini:"level,omitempty"`
	ConsolePrint string `ini:"console_print,omitempty"`
	File         string `ini:"file,omitempty"`
}

var Conf Config

func ReadConf(confFilePath string) {
	//加载配置文件
	config, err := ini.Load(confFilePath)
	if err != nil {
		fmt.Printf("加载配置文件失败 %v", err)
		return
	}
	//读取并映射到结构体中

	err = config.MapTo(&Conf)
	if err != nil {
		fmt.Printf("映射配置信息失败 %v", err)
		return
	}

}

func init() {
	ReadConf("global.cfg")
}

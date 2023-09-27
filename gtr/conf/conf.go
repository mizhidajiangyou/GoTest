package conf

import (
	"github.com/ghodss/yaml"
	"github.com/mizhidajiangyou/go-linux/log"
	"os"
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
var confFilePath = "global.yaml"

func ReadYaml() {

	y, err := os.ReadFile(confFilePath)
	if err != nil {
		log.Fatalf("读取配置%s错误：%s", confFilePath, err)
	}

	err = yaml.Unmarshal(y, &Conf)
	if err != nil {
		log.Fatal(err)
	}

}

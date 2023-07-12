package logic

import (
	"context"
	"fmt"
	"github.com/mizhidajiangyou/go-linux/cmd"
	"gotest/internal/svc"
	"gotest/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type BashCustomLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewBashCustomLogic(ctx context.Context, svcCtx *svc.ServiceContext) *BashCustomLogic {
	return &BashCustomLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *BashCustomLogic) BashCustom(req *types.BashRequset) (resp *types.Response, err error) {
	resp = &types.Response{}
	err = cmd.BashFile("${SHELL_HOME}normal/go_test.sh")
	if err != nil {
		resp.Message = fmt.Sprintf("Error: %s", err)
		return
	}
	resp.Message = fmt.Sprintf("run with %v successful", req)

	return
}

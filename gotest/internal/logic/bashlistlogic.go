package logic

import (
	"context"
	"fmt"
	"github.com/mizhidajiangyou/go-linux/cmd"
	"strings"

	"gotest/internal/svc"
	"gotest/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type BashListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewBashListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *BashListLogic {
	return &BashListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *BashListLogic) BashList(req *types.ListRequset) (resp *types.Response, err error) {

	file, err := cmd.LsDir(*req.Name)
	if err != nil {
		resp.Message = fmt.Sprintf("Error: %s", err)
		return
	}

	resp = &types.Response{Message: strings.Join(file, "")}
	return

}

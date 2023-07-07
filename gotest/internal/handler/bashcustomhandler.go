package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"gotest/internal/logic"
	"gotest/internal/svc"
	"gotest/internal/types"
)

func BashCustomHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.BashRequset
		if err := httpx.Parse(r, &req); err != nil {
			httpx.Error(w, err)
			return
		}

		l := logic.NewBashCustomLogic(r.Context(), svcCtx)
		resp, err := l.BashCustom(&req)
		if err != nil {
			httpx.Error(w, err)
		} else {
			httpx.OkJson(w, resp)
		}
	}
}

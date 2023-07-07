package handler

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/zeromicro/go-zero/rest/httpx"
	"gotest/internal/logic"
	"gotest/internal/svc"
	"gotest/internal/types"
)

func BashListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ListRequset
		query, err := url.ParseQuery(r.RequestURI)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		name := query.Get("name")
		if name == "" {
			http.Error(w, fmt.Sprintf("name为空或解析失败"), http.StatusBadRequest)
			return
		}
		req.Name = &name

		l := logic.NewBashListLogic(r.Context(), svcCtx)
		resp, err := l.BashList(&req)
		if err != nil {
			httpx.Error(w, err)
		} else {
			httpx.OkJson(w, resp)
		}
	}
}

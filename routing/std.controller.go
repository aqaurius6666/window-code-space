package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type StudentController struct {
}

func (s StudentController) HandleGet(g *gin.Context) {
	g.AbortWithStatusJSON(http.StatusOK, gin.H{
		"status": "OK",
		"data":   []string{"1", "2", "3"},
	})
}

func (s StudentController) HandleGetById(g *gin.Context) {
	g.AbortWithStatusJSON(http.StatusOK, gin.H{
		"status": "OK",
		"data": gin.H{
			"masv": g.Param("id"),
		},
	})
}

func (s StudentController) HandlePutById(g *gin.Context) {
	var body struct {
		Masv  string `json:"masv"`
		Hoten string `json:"hoten"`
	}
	err := g.BindJSON(&body)
	if err != nil {
		g.AbortWithStatusJSON(http.StatusOK, gin.H{
			"status":  "ERROR",
			"message": err.Error(),
		})
		return
	}
	g.AbortWithStatusJSON(http.StatusOK, gin.H{
		"status": "OK",
		"data":   body,
	})
}

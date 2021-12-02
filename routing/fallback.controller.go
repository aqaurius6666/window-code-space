package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type FallbackController struct {
}

func (s FallbackController) HandleFallback(g *gin.Context) {
	g.AbortWithStatusJSON(http.StatusOK, gin.H{"message": "Go go bruh bruh ..."})
}

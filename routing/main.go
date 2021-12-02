package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	PORT = 8080
)

func main() {
	g := gin.Default()
	stdController := StudentController{}
	fallbackController := FallbackController{}
	std := g.Group("/students")
	std.GET("/:id", stdController.HandleGetById)
	std.PUT("/:id", stdController.HandlePutById)
	std.GET("", stdController.HandleGet)
	g.NoRoute(fallbackController.HandleFallback)
	g.StaticFS("/statics", http.Dir("statics"))
	log.Printf("Server listening on port %d\n", PORT)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", PORT), g); err != nil {
		log.Fatalln(err)
	}
}

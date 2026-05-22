const express = require("express");

const app = express();


app.get("/api/restaurants", (request, response)=>{
    response.json({resName: 'mehfil', resId: 275345, })
});


app.get("/api/menu", (req, res)=>{
    res.json({itemName: "paneer tikka masala"})
})

app.get("/api/user", (req,res)=>{
    res.json({
        username: "Ismail",
        profilURL: "https://ik.imagekit.io/acrrubsd0/default-image.jpg?updatedAt=1770155875615"
    })
})

const PORT = 8080;
app.listen(PORT ,()=>{
    console.log("server is listening on port 8080")
});
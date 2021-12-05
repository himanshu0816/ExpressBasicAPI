const express = require('express')
const members= require('./Members')
const uuid = require('uuid')
const app = express()
// console.log(members)
app.use(express.json())

//Get Request
app.get('/api/members',(req,res)=>{
    return res.status(200).json({members})
})

//Get a specfic members
app.get('/api/members/:id',(req,res)=>{
    //  console.log(req.params.id) THis is also called query parameter
    const found= members.some(m=>m.id === parseInt(req.params.id))
    // console.log(found)
    if(found)
    {
        return res.json(members.filter(m=>m.id === parseInt(req.params.id)))
    }else{
        return res.status(400).json({msg:`No members found with this ${req.params.id}id`})
    }
}) 

//Post 
app.post('/api/members',(req,res)=>{
// console.log(req.body)
const{name,email}={...req.body}//object destructing
// console.log(name,email)
const newMembers={
    id:uuid.v4(),
    name,
    email,
    status:'active'
}
if(!newMembers.name || !newMembers.email){
return res.status(400).json({msg:'please include name and email'})
}else{
    members.push(newMembers)
    return res.status(200).json({msg:'Members are Added Successfully',members})
}
})


//Put request for update

app.put('/api/members/:id',(req,res)=>{
    const found = members.some(himanshu =>himanshu.id === parseInt(req.params.id))
    // console.log(found)
    if(found)
    {
        const updMember= req.body
        members.forEach(insan =>{
            if(insan.id === parseInt(req.params.id)){
                insan.name=updMember.name
                insan.email=updMember.email
                // console.log(insan)
                return res.json({msg:'Member Updated',members:insan})
            }
        })
        // console.log(req.body)
    }else{
        return res.status(400).json({msg:`No member found with id of ${req.params.id}`})
    }
})

//Delete Request
app.delete('/api/members/:id',(req,res)=>{
    const found= members.some(member =>member.id === parseInt(req.params.id))
    // console.log(found)
    if(found){
        return res.json({msg:'Member Deleted',members:members.filter(member => member.id !==parseInt(req.params.id))})
    }else{
        return res.status(400).json({msg:`No members found with the id of ${req.params.id}`})
    }
}) 

const PORT = process.env.PORT||3000
app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))
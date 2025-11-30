//handles staff operations and task

const contact = 'guest_info'
const reserve = 'reservation'
const room = 'rooms'
const admin = 'staff'

const staffRoutes = (app)=>{

//adding a staff memeber credential to employee table
app.Post('/api/login', async(req,res)=>{
    try{
        let {name, username, password} = req.body;
        const qs = `Insert into ${admin} (name, position, salary, working, username, password) 
                    values ($1, 'Front Desk Receptionist', 52000, 'yes', $2,$3)`
        const data = await query(qs,[name, username,password])
        res.json({message: `staff inserted`})
    }catch(err){
        res.status(500).json({error: 'internal server error'})
    }
})

//getting all reservations
app.get('/api/reservation', async(req,res)=>{
    try{
        const getAll = `Select c.name, res.room_id, res.status, res.check_in, res.check_out 
                    From ${reserve} res join ${contact} c 
                    Where res.guest_id = c.guest_id`
        const {rows} = await query(getAll)
        res.json(rows)
    }catch(err){
        res.status(500).json({error: 'internal server error'})
    }
    
})
//retrieve reservation by guest name
//GET - /reservation?search=[query]
app.get('/api/reservation/search', async(req,res) => {
    const searchQuery = req.query.searchQuery
    if(!searchQuery){
        return res.status(400).json({error: 'Execution error'})
    }
    try{
        let qs = `Select * 
                From  ${reserve} r join ${contact} c
                Where c.name ILIKE $1 `

        const {rows} = await query(qs, [`%${searchQuery}%`])
        if(rows.length ===0){
            return res.status(404).json({ error: 'No reservation found' })
        }
        res.json(rows)
    }catch(err){
        res.status(500).json({error: 'internal server error'})
    }

})

//changing reservation status from confirmed to cancelled - (cancelling reservation)
app.put('/api/reservation/:reservation_num', async(req,res)=>{
    try{
        const rs_num = req.params.reservation_num
        const {status} = req.body
        const statusQuery = `Update ${reserve} res
                            Set 
                            status = $1
                            where res.reservation_num = $2`
        const data = await query(statusQuery,[status, rs_num])
        if(data.rowCount === 0){
        return res.status(404).json({ error: 'No reservation found' })
        }
        res.json({ message: `${data.rowCount} row updated` })

    }catch(err){
         res.status(500).json({error: 'internal server error'})
    }

})

}
export default staffRoutes
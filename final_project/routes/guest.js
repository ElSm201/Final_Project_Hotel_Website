//contain the routes that handle guest input

/**
 * storing tablenames for better code flow
 * conatct: stores the contact information associated with the guest, retrieved at front end
 * reserve: will hold information about guest resevration from the room type and assigned room number and the
 *  check-in and check-out date the the guest has specified for their vist
 * room: needed for the reservation table
*/
const contact = 'guest_info'
const reserve = 'reservation'
const room = 'rooms'


const guestRoutes = (app) => {
    /**
     * Post /api/booking
     * routes purpose is to establishing which rooms are available that match the type indicated 
     * by the user and will asigned a room to the user from those available(which is a reservation update)
    */
   app.Post('/api/booking', async(req,res)=> {
    try{
        let{name, email, type,check_in, check_out} = req.body; //have to get the guest_id
        //getting the specified type of room requested
        let room_query = `Select room_num 
                            FROM ${room} r
                            WHERE r.type = $1
                            AND r.room_num NOT IN (
                                SELECT room_id FROM ${reserve}
                                WHERE ($2 < check_out AND $3 > check_in)
                            ) `
        const {rows: roomRows} = await query(room_query,[type])
        if(rows.length === 0){
            throw new Error("no rooms of that type")
        }
        //picking a random room from the list to assign to the guest upon making reservation
        const randRow = roomRows[Math.floor(Math.random() * roomRows.length)]
        /**if a guest is already in the system we grab the assigned guest id and reuse it. Else we add the guest
        * we add guest to guest_info, get the assigned guest id and use that for reservation
        */
        let reserve_query = `
            With guest As(
                Insert into ${contact} (name,email)
                select $1,$2
                where not exists(
                    select 1 from ${contact} where email=$2
                )
                returning guest_id
            ),   
            final_guest As(
                select guest_id from guest
                union
                select guest_id from ${contact} where email = $2
            )
            Insert into ${reserve}(guest_id ,room_id, status, check_in, check_out)
            select guest_id, $3,'confirmed',$4,$5
            from final_guest
            `
        const done = await query(reserve_query,[name,email,randRow.room_num,check_in, check_out])
    }catch(err){
        res.status(500).json({error: 'internal server error'})
    }

   }) 

   /**
    * Booking is meant to check that there are available room types 
    * for the check-in/out date specified by potential guest
   */
   app.get('/api/availability', async(req,res) =>{
        try{
            let {type, check_in, check_out} = req.body
            const available =  `Select room_num 
                                FROM ${room} r
                                WHERE r.type = $1
                                AND r.room_num NOT IN (
                                    SELECT room_id FROM ${reserve}
                                    WHERE ($2 < check_out AND $3 > check_in)
                                )`
            const {rows} = await query(available, [type, check_in, check_out])
            if(rows.length === 0){
                return res.status(404).json({error: 'No available rooms'})
            }
            res.json(rows)

        }catch(err){
            res.status(500).json({error: 'internal server error'})
        }
   })


}
export default guestRoutes

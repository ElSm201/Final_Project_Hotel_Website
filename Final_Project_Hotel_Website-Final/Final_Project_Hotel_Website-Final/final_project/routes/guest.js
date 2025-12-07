//contain the routes that handle guest input
import { query } from "../db/postgres.js"
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
   app.post('/api/booking', async(req,res)=> {
    try{
        let{name, email,phone,type,check_in, check_out} = req.body; //have to get the guest_id
        const checkInISO = new Date(check_in).toISOString();
        const checkOutISO = new Date(check_out).toISOString();
        //getting the specified type of room requested
        let room_query = `Select room_num 
                            FROM ${room} r
                            WHERE r.type = $1
                            AND r.room_num NOT IN (
                                SELECT room_id FROM ${reserve}
                                WHERE ($2::timestamptz < check_out AND $3::timestamptz > check_in)
                            ) `
        const {rows: roomRows} = await query(room_query,[type,checkInISO, checkOutISO])
        console.log(roomRows)
        if(roomRows.length === 0){
            throw new Error("no rooms of that type")
        }
        //picking a random room from the list to assign to the guest upon making reservation
        const randRow = roomRows[Math.floor(Math.random() * roomRows.length)]
        const roomId = Number(randRow.room_num)
        /**if a guest is already in the system we grab the assigned guest id and reuse it. Else we add the guest
        * we add guest to guest_info, get the assigned guest id and use that for reservation
        */
       console.log("error here")
        let reserve_query = `
            With guest As(
                Insert into ${contact} (name,email,phone_number)
                select $1,$2::varchar,$3::varchar
                where not exists(
                    select 1 from ${contact} where email=$2::varchar
                )
                returning guest_id
            ),   
            final_guest As(
                select guest_id from guest
                union
                select guest_id from ${contact} where email = $2::varchar
            )
            Insert into ${reserve}(guest_id ,room_id, status, check_in, check_out)
            select guest_id, $4,'confirmed',$5,$6
            from final_guest
            returning reservation_num
            `
        const done = await query(reserve_query,[name,email,phone,roomId,checkInISO, checkOutISO])
        res.status(201).json({ message: "Booking confirmed", room: randRow.room_num, reservation_num: done.rows[0].reservation_num });
    }catch(err){
        res.status(500).json({error: 'internal server error'})
    }

   }) 

   /**
    * Booking is meant to check that there are available room types 
    * for the check-in/out date specified by potential guest
   */
   app.post('/api/availability', async(req,res) =>{
        try{
            let {type, check_in, check_out} = req.body
            if (!type || !check_in || !check_out) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            const checkInISO = new Date(check_in).toISOString();
            const checkOutISO = new Date(check_out).toISOString();
            console.log("good")
            const available =  `Select room_num 
                                FROM ${room} r
                                WHERE r.type = $1
                                AND r.room_num NOT IN (
                                    SELECT room_id FROM ${reserve}
                                    WHERE ($2::timestamptz < check_out AND $3::timestamptz > check_in)
                                )`
            const {rows} = await query(available, [type, checkInISO, checkOutISO])
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

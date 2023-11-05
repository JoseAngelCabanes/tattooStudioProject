import { Response, Request, NextFunction } from "express";
import { Appointment } from "../models/Appointment";

const create = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const custumer_id = req.body.customer_id
        const tattoo_artist_id = req.body.tattoo_artist_id
        const date = req.body.date;

        const newCustomer = await Appointment.create({
            customer_id: custumer_id,
            tattoo_artist_id: tattoo_artist_id,
            date: date
          }).save()

          return res.json({
            success: true,
            message: "Appoiment created succesfully",
            token: newCustomer
          })
    }catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appoiment cant be created",
                error: error
            }
        )
    }
}

const updateAppointmentById = async(req: any, res: Response) => {
    try {
      const tattoo_artist_id = req.body.tattoo_artist_id
      const status = req.body.status
      const date = req.body.date
    
      const appoimentId = req.params.id
  
      const appointment = await Appointment.findOneBy(
        {
          id: parseInt(appoimentId),
          customer_id: req.token.id
        }
      )
  
      if (!appointment) {
        return res.status(404).json({
          success: true,
          message: "appointment by user doesnt found and cant updated",
        })
      }
  
      const updateAppointment = await Appointment.update(
        {
          id: parseInt(appoimentId)
        },
        {
          tattoo_artist_id: tattoo_artist_id,
          status: status,
          date: date
        }
      )
  
      return res.json({
        success: true,
        message: "Appointment updated",
        data: updateAppointment
      })
    } catch (error) {
      return res.json({
        success: false,
        message: "Appointment cant by updated",
        error: error
      })
    }
  }

  const deleteAppointmentByUserId = async (req: Request, res: Response) => {
    try {
      const appointmentToRemove = await Appointment.findOneBy({
        customer_id: req.token.id,
        id : req.body.id
      });
      if (appointmentToRemove) {
        await Appointment.remove(appointmentToRemove);
      }
  
      return res.json({
        success: true,
        message: "Appointment deleted",
        data: appointmentToRemove,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Appointment cant by deleted",
        error: error,
      });
    }
  };

export { create, updateAppointmentById, deleteAppointmentByUserId }
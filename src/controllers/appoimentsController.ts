import { Response, Request, NextFunction } from "express";
import { Appointment } from "../models/Appointment";

const create = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const client_id = req.body.client_id
        const artist_id = req.body.artist_id
        const date = req.body.date;

        const newClient = await Appointment.create({
            client_id: client_id,
            artist_id: artist_id,
            date: date
          }).save()

          return res.json({
            success: true,
            message: "Appointment created succesfully",
            token: newClient
          })
    }catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Appointment cant be created",
                error: error
            }
        )
    }
}

const updateAppointmentById = async(req: any, res: Response) => {
    try {
      const artist_id = req.body.artist_id
      const status = req.body.status
      const date = req.body.date
    
      const appointmentId = req.params.id
  
      const appointment = await Appointment.findOneBy(
        {
          id: parseInt(appointmentId),
          client_id: req.token.id
        }
      )
  
      if (!appointment) {
        return res.status(404).json({
          success: true,
          message: "appointment couldn't be updated",
        })
      }
  
      const updateAppointment = await Appointment.update(
        {
          id: parseInt(appointmentId)
        },
        {
          artist_id: artist_id,
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
        message: "Appointment can not by updated",
        error: error
      })
    }
  }

  const deleteAppointmentByUserId = async (req: Request, res: Response) => {
    try {
      const appointmentToRemove = await Appointment.findOneBy({
        client_id: req.token.id,
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
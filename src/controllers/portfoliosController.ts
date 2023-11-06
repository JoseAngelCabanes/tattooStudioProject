import { Response, Request, NextFunction } from "express";
import { Portfolio } from "../models/Portfolio";

const createImage = async (req: Request, res:Response, next: NextFunction) => {
    try{
        const artist_id = req.body.artist_id
        const image = req.body.image;

        const newImage = await Portfolio.create({
            artist_id: artist_id,
            image: image
          }).save()

          return res.json({
            success: true,
            message: "Image uploaded successfully",
            token: newImage
          })
    }catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Image can not be uploaded",
                error: error
            }
        )
    }
}

const updateImageById = async(req: any, res: Response) => {
    try {
      const image = req.body.image
    
      const portfolioId = req.params.id
  
      const portfolio = await Portfolio.findOneBy(
        {
          id: parseInt(portfolioId),
          artist_id: req.token.id
        }
      )
  
      if (!portfolio) {
        return res.status(404).json({
          success: true,
          message: "Portfolio can't be updated",
        })
      }
  
      const updateImage = await Portfolio.update(
        {
          id: parseInt(portfolioId)
        },
        {
          image: image,
        }
      )
  
      return res.json({
        success: true,
        message: "Image updated",
        data: updateImage
      })
    } catch (error) {
      return res.json({
        success: false,
        message: "Image cant by updated",
        error: error
      })
    }
  }

  const deleteImageByArtistId = async (req: Request, res: Response) => {
    try {
      const ImageToRemove = await Portfolio.findOneBy({
        artist_id: req.token.id,
        id : req.body.id
      });
      if (ImageToRemove) {
        await Portfolio.remove(ImageToRemove);
      }
  
      return res.json({
        success: true,
        message: "Image deleted",
        data: ImageToRemove,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Image cant by deleted",
        error: error,
      });
    }
  };

  const getAllPortfolio = async (req: Request, res: Response) => {
    try {
      const artists = await Portfolio.find(
        {
          select: {
            image: true,
            artist_id: true,
            artist: {
                name: true,
                surname: true,
                email: true,
                password: false
              }
        }, relations: {
            artist: true
        }
        }
      );
  
      return res.json(
        {
          success: true,
          message: "Portfolio retrieved",
          data: artists
        }
      )
  
    } catch (error) {
      return res.json(
        {
          success: false,
          message: "Portfolio can not be retrieved",
          error: error
        }
      )
    }
  }


export { createImage, updateImageById, deleteImageByArtistId, getAllPortfolio }
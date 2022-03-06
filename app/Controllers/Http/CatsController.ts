import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// Import Mongoose
import Mongoose, { Schema } from 'mongoose'


const Cat = Mongoose.model('cat', new Schema({
    name: String,
   
  }))
  
export default class CatsController {


  public async index ({ }: HttpContextContract) {
    // Create a cat with random name
    // const cat = new Cat({
    //   name: Math.random().toString(36).substring(7),
    // })
    // Save cat to DB
    // await cat.save()

    // Return list of all saved cats
    let cats = await Cat.find()
    

    // Close the connection
    // await Mongoose.connection.close()

    // Return all the cats (including the new one)
    return cats
  }
}